import React, { useState } from 'react';
import { Calendar, Trophy, Users, Trash2, Edit } from 'lucide-react';
import { Button } from '../catalyst/button';
import { supabase } from '../lib/supabase';

interface Hackathon {
  id: string;
  nome: string;
  descricao: string;
  premio: number;
  data: string;
  participant_count?: number;
}

interface HackathonCardProps {
  hackathon: Hackathon;
  onDelete: (id: string) => void;
  onEdit: (hackathon: Hackathon) => void;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({
  hackathon,
  onDelete,
  onEdit,
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

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja deletar "${hackathon.nome}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      // Check current user session
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user?.id);
      console.log('Hackathon empresa_id:', hackathon);
      console.log('Deleting hackathon:', hackathon.id);

      const { data, error } = await supabase
        .from('hackathons')
        .update({ deleted_at: new Date() })
        .eq('id', hackathon.id)
        .select();

      console.log('Delete response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Hackathon deleted successfully');
      onDelete(hackathon.id);
    } catch (error) {
      console.error('Error deleting hackathon:', error);
      alert(`Erro ao deletar hackathon: ${error instanceof Error ? error.message : 'Tente novamente.'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => onEdit(hackathon)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Editar hackathon"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Deletar hackathon"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 pr-20">
        {hackathon.nome}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {hackathon.descricao}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Trophy className="w-4 h-4 text-yellow-600" />
          <span className="font-semibold">
            R$ {hackathon.premio.toLocaleString('pt-BR')}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-omnihack-primary" />
          <span>{formatDate(hackathon.data)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Users className="w-4 h-4 text-omnihack-secondary" />
          <span>
            {hackathon.participant_count || 0}{' '}
            {hackathon.participant_count === 1 ? 'participante' : 'participantes'}
          </span>
        </div>
      </div>

      <Button color="omnihack-primary" className="w-full">
        Ver detalhes
      </Button>
    </div>
  );
};
