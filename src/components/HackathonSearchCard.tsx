import { Calendar, DollarSign, Building2 } from 'lucide-react';
import { Button } from '../catalyst/button';

export interface HackathonSearchResult {
  id: string;
  nome: string;
  descricao: string;
  premio: number;
  data: string;
  empresa: string;
  isParticipating?: boolean;
}

interface HackathonSearchCardProps {
  hackathon: HackathonSearchResult;
  onJoin?: (id: string) => void;
  onLeave?: (id: string) => void;
  isLoading?: boolean;
}

export function HackathonSearchCard({
  hackathon,
  onJoin,
  onLeave,
  isLoading = false
}: HackathonSearchCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
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

  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-zinc-950/5 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 mb-2">{hackathon.nome}</h3>
          <p className="text-sm text-zinc-600 line-clamp-2">{hackathon.descricao}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <Building2 className="w-4 h-4" />
          <span>{hackathon.empresa}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(hackathon.data)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-omnihack-primary">
          <DollarSign className="w-4 h-4" />
          <span>{formatPrize(hackathon.premio)} em prêmios</span>
        </div>
      </div>

      {hackathon.isParticipating ? (
        <Button
          color="zinc"
          onClick={() => onLeave?.(hackathon.id)}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Processando...' : 'Cancelar Inscrição'}
        </Button>
      ) : (
        <Button
          color="omnihack-primary"
          onClick={() => onJoin?.(hackathon.id)}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Processando...' : 'Participar'}
        </Button>
      )}
    </div>
  );
}
