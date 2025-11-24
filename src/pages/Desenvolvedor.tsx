import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code2, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Desenvolvedor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-omnihack-primary to-omnihack-secondary rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Painel do Desenvolvedor</h1>
              <p className="text-sm text-gray-500">{profile?.nome}</p>
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-omnihack-primary to-omnihack-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo, {profile?.nome}!
            </h2>
            <p className="text-gray-600">Painel do Desenvolvedor</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Nome Completo</h3>
              <p className="text-gray-600">{profile?.nome}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">CPF</h3>
              <p className="text-gray-600">{profile?.cpf}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Data de Nascimento</h3>
              <p className="text-gray-600">
                {profile?.data_nascimento
                  ? new Date(profile.data_nascimento).toLocaleDateString('pt-BR')
                  : 'Não informado'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Tipo de Usuário</h3>
              <p className="text-gray-600 capitalize">{profile?.user_type}</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-omnihack-primary/10 to-omnihack-secondary/10 border border-omnihack-primary/20 rounded-lg text-center">
            <p className="text-omnihack-primary">
              <strong>Login validado com sucesso!</strong> Esta é uma página placeholder para desenvolvedores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
