import React, { useState } from 'react';
import { Calendar, Trophy, Users, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HackathonCardProps {
  id: string;
  nome: string;
  descricao: string;
  premio: number;
  data: string;
  participantCount: number;
  onDelete: () => void;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({
  id,
  nome,
  descricao,
  premio,
  data,
  participantCount,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm(`Tem certeza que deseja excluir o hackathon "${nome}"?`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      console.log('Current user ID:', userData?.user?.id);
      console.log('Hackathon ID:', id);

      const { data: hackathonData } = await supabase
        .from('hackathons')
        .select('empresa_id')
        .eq('id', id)
        .single();

      console.log('Hackathon empresa_id:', hackathonData?.empresa_id);

      const { data, error } = await supabase
        .from('hackathons')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id)
        .select();

      console.log('Update result:', { data, error });

      if (error) throw error;

      onDelete();
    } catch (error) {
      console.error('Error deleting hackathon:', error);
      alert('Erro ao excluir hackathon. Tente novamente.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow relative">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Excluir hackathon"
      >
        <X className="w-5 h-5" />
      </button>

      <h3 className="text-xl font-bold text-gray-900 mb-2 pr-8">
        {nome}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {descricao}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Trophy className="w-4 h-4 text-yellow-600" />
          <span className="font-semibold">
            R$ {premio.toLocaleString('pt-BR')}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-omnihack-primary" />
          <span>{formatDate(data)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Users className="w-4 h-4 text-omnihack-secondary" />
          <span>
            {participantCount}{' '}
            {participantCount === 1 ? 'participante' : 'participantes'}
          </span>
        </div>
      </div>

      <button className="w-full bg-omnihack-primary text-white py-2 px-4 rounded-lg hover:bg-omnihack-secondary transition-colors font-medium">
        Ver detalhes
      </button>
    </div>
  );
};
