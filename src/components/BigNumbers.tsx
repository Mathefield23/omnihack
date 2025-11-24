import React from 'react';
import { Users, Trophy } from 'lucide-react';

interface BigNumbersProps {
  totalParticipants: number;
  totalPremios: number;
  loading: boolean;
}

export const BigNumbers: React.FC<BigNumbersProps> = ({
  totalParticipants,
  totalPremios,
  loading,
}) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 bg-omnihack-primary/10 rounded-xl flex items-center justify-center">
            <Users className="w-7 h-7 text-omnihack-primary" />
          </div>
        </div>
        <p className="text-4xl font-bold text-gray-900 mb-2">{totalParticipants}</p>
        <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
          Total de Participantes
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center">
            <Trophy className="w-7 h-7 text-yellow-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-gray-900 mb-2">
          R$ {totalPremios.toLocaleString('pt-BR')}
        </p>
        <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
          Prêmios Distribuídos
        </p>
      </div>
    </div>
  );
};
