import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BigNumbers } from '../components/BigNumbers';
import { HackathonList } from '../components/HackathonList';
import { CreateHackathonModal } from '../components/CreateHackathonModal';
import { DashboardHeader } from '../components/DashboardHeader';
import { HackathonSectionHeader } from '../components/HackathonSectionHeader';

interface Profile {
  id: string;
  full_name: string;
  user_type: string;
}

interface Hackathon {
  id: string;
  nome: string;
  descricao: string;
  premio: number;
  data: string;
  participant_count?: number;
}

export const EmpresaDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalPremios, setTotalPremios] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);

  const fetchData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.id !== id) {
        navigate('/');
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (!profileData || profileData.user_type !== 'empresa') {
        navigate('/');
        return;
      }

      setProfile(profileData);

      const { data: hackathonsData, error: hackathonsError } = await supabase
        .from('hackathons')
        .select('*')
        .eq('empresa_id', user.id)
        .is('deleted_at', null)
        .order('data', { ascending: true });

      if (hackathonsError) throw hackathonsError;

      const hackathonsWithCounts = await Promise.all(
        (hackathonsData || []).map(async (hackathon) => {
          const { count } = await supabase
            .from('hackathon_participants')
            .select('*', { count: 'exact', head: true })
            .eq('hackathon_id', hackathon.id);

          return {
            ...hackathon,
            participant_count: count || 0,
          };
        })
      );

      setHackathons(hackathonsWithCounts);

      const totalParts = hackathonsWithCounts.reduce(
        (sum, h) => sum + (h.participant_count || 0),
        0
      );
      setTotalParticipants(totalParts);

      const totalPremiosSum = hackathonsWithCounts.reduce(
        (sum, h) => sum + Number(h.premio),
        0
      );
      setTotalPremios(totalPremiosSum);
    } catch (error) {
      console.error('Error fetching data:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleHackathonCreated = () => {
    fetchData();
  };

  const handleHackathonDeleted = (id: string) => {
    setHackathons((prev) => prev.filter((h) => h.id !== id));
    const deletedHackathon = hackathons.find((h) => h.id === id);
    if (deletedHackathon) {
      setTotalParticipants((prev) => prev - (deletedHackathon.participant_count || 0));
      setTotalPremios((prev) => prev - Number(deletedHackathon.premio));
    }
  };

  const handleHackathonEdit = (hackathon: Hackathon) => {
    setEditingHackathon(hackathon);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingHackathon(null);
  };

  const handleCreateClick = () => {
    setEditingHackathon(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-omnihack-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={profile?.full_name || ''}
        onLogout={handleLogout}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <BigNumbers
          totalParticipants={totalParticipants}
          totalPremios={totalPremios}
          loading={false}
        />

        <HackathonSectionHeader onCreateClick={handleCreateClick} />

        <HackathonList
          hackathons={hackathons}
          loading={false}
          onHackathonDeleted={handleHackathonDeleted}
          onHackathonEdit={handleHackathonEdit}
        />
      </div>

      <CreateHackathonModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleHackathonCreated}
        empresaId={id!}
        editingHackathon={editingHackathon}
      />
    </div>
  );
};
