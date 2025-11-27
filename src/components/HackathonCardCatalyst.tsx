import React, { useState } from 'react';
import { Calendar, Trophy, Users, Trash2, Edit } from 'lucide-react';
import { Card, CardBadge, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../catalyst/card';
import { Button } from '../catalyst/button';
import { Badge } from '../catalyst/badge';
import { Text } from '../catalyst/text';
import { supabase } from '../lib/supabase';

export interface HackathonCardData {
  id?: string;
  nome: string;
  descricao?: string;
  premio: number;
  data: string;
  empresa?: string;
  participant_count?: number;
  colorScheme?: 'primary' | 'accent' | 'gold';
}

interface HackathonCardCatalystProps {
  hackathon: HackathonCardData;
  showActions?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (hackathon: HackathonCardData) => void;
}

export const HackathonCardCatalyst: React.FC<HackathonCardCatalystProps> = ({
  hackathon,
  showActions = false,
  onDelete,
  onEdit,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: dateString.length > 10 ? 'numeric' : undefined,
    });
  };

  const formatPrize = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  const handleDelete = async () => {
    if (!hackathon.id || !confirm(`Tem certeza que deseja deletar "${hackathon.nome}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('hackathons')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', hackathon.id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (onDelete) {
        onDelete(hackathon.id);
      }
    } catch (error) {
      
      alert(`Erro ao deletar hackathon: ${error instanceof Error ? error.message : 'Tente novamente.'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const colorSchemes = {
    primary: {
      gradient: 'bg-gradient-to-r from-omnihack-primary to-omnihack-secondary',
      iconBg: 'bg-omnihack-primary/10',
      iconColor: 'text-omnihack-primary',
    },
    accent: {
      gradient: 'bg-gradient-to-r from-omnihack-accent to-omnihack-primary',
      iconBg: 'bg-omnihack-accent/10',
      iconColor: 'text-omnihack-accent',
    },
    gold: {
      gradient: 'bg-gradient-to-r from-omnihack-gold to-omnihack-secondary',
      iconBg: 'bg-omnihack-gold/10',
      iconColor: 'text-omnihack-gold',
    },
  };

  const colors = colorSchemes[hackathon.colorScheme || 'primary'];

  return (
    <Card className="group">
      <CardBadge color={colors.gradient} />

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl mb-1 pr-2">{hackathon.nome}</CardTitle>
            {hackathon.empresa && (
              <CardDescription>{hackathon.empresa}</CardDescription>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center`}>
              <Trophy className={`w-6 h-6 ${colors.iconColor}`} />
            </div>

            {showActions && (
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit && onEdit(hackathon)}
                  className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar hackathon"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Deletar hackathon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {hackathon.descricao && (
          <Text className="line-clamp-2">{hackathon.descricao}</Text>
        )}

        <div>
          <div className="text-2xl font-bold text-zinc-950 mb-1">
            {formatPrize(hackathon.premio)}
          </div>
          <Text className="text-sm">em prêmios</Text>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-zinc-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(hackathon.data)}</span>
          </div>

          {hackathon.participant_count !== undefined && (
            <div className="flex items-center gap-1.5 text-zinc-600">
              <Users className="w-4 h-4" />
              <span>{hackathon.participant_count} inscritos</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button color="omnihack-primary" className="w-full">
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};
