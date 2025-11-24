import React from 'react';
import { Calendar } from 'lucide-react';
import { HackathonCard } from './HackathonCard';

interface Hackathon {
  id: string;
  nome: string;
  descricao: string;
  premio: number;
  data: string;
  participant_count?: number;
}

interface HackathonListProps {
  hackathons: Hackathon[];
  loading: boolean;
  onHackathonDeleted: (id: string) => void;
}

export const HackathonList: React.FC<HackathonListProps> = ({
  hackathons,
  loading,
  onHackathonDeleted,
}) => {

  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Meus Hackathons</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hackathons.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Meus Hackathons</h2>
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum hackathon cadastrado
          </h3>
          <p className="text-gray-600">
            Comece criando seu primeiro hackathon usando o botão acima.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Meus Hackathons</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons.map((hackathon) => (
          <HackathonCard
            key={hackathon.id}
            hackathon={hackathon}
            onDelete={onHackathonDeleted}
          />
        ))}
      </div>
    </div>
  );
};
