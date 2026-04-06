import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code2, LogOut, Search, Trophy, Calendar, Clock, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Heading } from '../catalyst/heading';
import { Text } from '../catalyst/text';
import { Input } from '../catalyst/input';
import { Badge } from '../catalyst/badge';
import { Card } from '../catalyst/card';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../catalyst/table';
import { AnnouncementBanner } from '../components/AnnouncementBanner';
import { HackathonSearchCard, HackathonSearchResult } from '../components/HackathonSearchCard';

interface Profile {
  id: string;
  full_name: string;
  user_type: string;
}

interface Participation {
  id: string;
  status: string;
  prize_won: number;
  placement: number | null;
  hackathon_id: string;
  hackathons: {
    id: string;
    nome: string;
    data: string;
    premio: number;
    profiles: {
      full_name: string;
    };
  };
}

interface Announcement {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  link_url?: string;
}

export const Desenvolvedor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [upcomingHackathons, setUpcomingHackathons] = useState<Participation[]>([]);
  const [pastHackathons, setPastHackathons] = useState<Participation[]>([]);
  const [searchResults, setSearchResults] = useState<HackathonSearchResult[]>([]);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          navigate('/');
          return;
        }

        if (user.id !== id) {
          navigate('/');
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (!data || data.user_type !== 'desenvolvedor') {
          navigate('/');
          return;
        }

        setProfile(data);
        await Promise.all([
          fetchParticipations(user.id),
          fetchAnnouncements(),
          fetchAvailableHackathons(user.id)
        ]);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, navigate]);

  const fetchParticipations = async (userId: string) => {
    const { data, error } = await supabase
      .from('hackathon_participants')
      .select(`
        id,
        status,
        prize_won,
        placement,
        hackathon_id,
        hackathons (
          id,
          nome,
          data,
          premio,
          profiles:empresa_id (
            full_name
          )
        )
      `)
      .eq('user_id', userId)
      .order('hackathons(data)', { ascending: true });

    if (error) {
      console.error('Error fetching participations:', error);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = data?.filter(p => {
      const hackathonDate = new Date(p.hackathons.data);
      return hackathonDate >= today;
    }) || [];

    const past = data?.filter(p => {
      const hackathonDate = new Date(p.hackathons.data);
      return hackathonDate < today;
    }) || [];

    setUpcomingHackathons(upcoming);
    setPastHackathons(past);
  };

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .lte('start_date', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      setAnnouncement(data);
    }
  };

  const fetchAvailableHackathons = async (userId: string) => {
    const { data: participatingData } = await supabase
      .from('hackathon_participants')
      .select('hackathon_id')
      .eq('user_id', userId);

    const participatingIds = participatingData?.map(p => p.hackathon_id) || [];

    const { data, error } = await supabase
      .from('hackathons')
      .select(`
        id,
        nome,
        descricao,
        premio,
        data,
        profiles:empresa_id (
          full_name
        )
      `)
      .is('deleted_at', null)
      .gte('data', new Date().toISOString().split('T')[0])
      .order('data', { ascending: true });

    if (error) {
      console.error('Error fetching hackathons:', error);
      return;
    }

    const results: HackathonSearchResult[] = (data || []).map((h: any) => ({
      id: h.id,
      nome: h.nome,
      descricao: h.descricao || '',
      premio: parseFloat(h.premio),
      data: h.data,
      empresa: h.profiles?.full_name || 'Empresa',
      isParticipating: participatingIds.includes(h.id)
    }));

    setSearchResults(results);
  };

  const handleJoinHackathon = async (hackathonId: string) => {
    if (!profile) return;

    setActionLoading(hackathonId);
    try {
      const { error } = await supabase
        .from('hackathon_participants')
        .insert({
          hackathon_id: hackathonId,
          user_id: profile.id,
          status: 'inscrito'
        });

      if (error) throw error;

      await Promise.all([
        fetchParticipations(profile.id),
        fetchAvailableHackathons(profile.id)
      ]);
    } catch (error) {
      console.error('Error joining hackathon:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleLeaveHackathon = async (hackathonId: string) => {
    if (!profile) return;

    setActionLoading(hackathonId);
    try {
      const { error } = await supabase
        .from('hackathon_participants')
        .delete()
        .eq('hackathon_id', hackathonId)
        .eq('user_id', profile.id);

      if (error) throw error;

      await Promise.all([
        fetchParticipations(profile.id),
        fetchAvailableHackathons(profile.id)
      ]);
    } catch (error) {
      console.error('Error leaving hackathon:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const filteredSearchResults = searchResults.filter(h =>
    h.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.empresa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatPrize = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      inscrito: <Badge color="blue">Inscrito</Badge>,
      participando: <Badge color="yellow">Participando</Badge>,
      finalizado: <Badge color="zinc">Finalizado</Badge>,
    };
    return badges[status as keyof typeof badges] || <Badge>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-omnihack-primary mx-auto"></div>
          <p className="mt-4 text-zinc-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="bg-white border-b border-zinc-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-omnihack-primary to-omnihack-secondary rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900">OmniHack</h1>
              <p className="text-sm text-zinc-500">{profile?.full_name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors px-4 py-2 rounded-lg hover:bg-zinc-100"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div>
          <Heading level={1} className="text-3xl mb-2">Dashboard</Heading>
          <Text>Gerencie suas participações e descubra novos hackathons</Text>
        </div>

        {announcement && (
          <AnnouncementBanner announcement={announcement} />
        )}

        <section>
          <div className="mb-6">
            <Heading level={2} className="text-2xl mb-2">Próximos Hackathons</Heading>
            <Text>Eventos que você está inscrito</Text>
          </div>
          {upcomingHackathons.length === 0 ? (
            <Card className="p-8 text-center">
              <Clock className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
              <Text className="text-zinc-600">Você não está inscrito em nenhum hackathon futuro</Text>
            </Card>
          ) : (
            <div className="grid gap-4">
              {upcomingHackathons.map((participation) => (
                <Card key={participation.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Trophy className="w-6 h-6 text-omnihack-secondary" />
                        <Heading level={3} className="text-xl">{participation.hackathons.nome}</Heading>
                      </div>
                      <div className="space-y-2 text-sm text-zinc-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(participation.hackathons.data)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>{formatPrize(parseFloat(participation.hackathons.premio as any))}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(participation.status)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-6">
            <Heading level={2} className="text-2xl mb-2">Histórico</Heading>
            <Text>Hackathons que você já participou</Text>
          </div>
          {pastHackathons.length === 0 ? (
            <Card className="p-8 text-center">
              <Trophy className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
              <Text className="text-zinc-600">Você ainda não participou de nenhum hackathon</Text>
            </Card>
          ) : (
            <Card>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Hackathon</TableHeader>
                    <TableHeader>Data</TableHeader>
                    <TableHeader>Colocação</TableHeader>
                    <TableHeader>Prêmio Ganho</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pastHackathons.map((participation) => (
                    <TableRow key={participation.id}>
                      <TableCell className="font-medium text-zinc-900">
                        {participation.hackathons.nome}
                      </TableCell>
                      <TableCell>{formatDate(participation.hackathons.data)}</TableCell>
                      <TableCell>
                        {participation.placement ? `${participation.placement}º lugar` : '-'}
                      </TableCell>
                      <TableCell>
                        {participation.prize_won > 0 ? formatPrize(participation.prize_won) : '-'}
                      </TableCell>
                      <TableCell>{getStatusBadge(participation.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </section>

        <section>
          <div className="mb-6">
            <Heading level={2} className="text-2xl mb-2">Buscar Hackathons</Heading>
            <Text>Encontre e participe de novos desafios</Text>
          </div>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Buscar por nome, descrição ou empresa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          {filteredSearchResults.length === 0 ? (
            <Card className="p-8 text-center">
              <Search className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
              <Text className="text-zinc-600">
                {searchQuery ? 'Nenhum hackathon encontrado' : 'Nenhum hackathon disponível'}
              </Text>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSearchResults.map((hackathon) => (
                <HackathonSearchCard
                  key={hackathon.id}
                  hackathon={hackathon}
                  onJoin={handleJoinHackathon}
                  onLeave={handleLeaveHackathon}
                  isLoading={actionLoading === hackathon.id}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
