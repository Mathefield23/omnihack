import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BigNumbers } from '../components/BigNumbers';
import { HackathonList } from '../components/HackathonList';
import { CreateHackathonModal } from '../components/CreateHackathonModal';

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
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Dashboard da Empresa
              </h1>
              <p className="text-sm text-gray-500">{profile?.full_name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <BigNumbers
          totalParticipants={totalParticipants}
          totalPremios={totalPremios}
          loading={false}
        />

        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Meus Hackathons</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-omnihack-primary text-white px-6 py-3 rounded-lg hover:bg-omnihack-secondary transition-colors font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Cadastrar Novo Hackathon
          </button>
        </div>

        <HackathonList hackathons={hackathons} loading={false} />
      </div>

      <CreateHackathonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleHackathonCreated}
        empresaId={id!}
      />
    </div>
  );
};
