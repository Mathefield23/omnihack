import React from 'react';
import { Calendar } from 'lucide-react';
import { HackathonCardCatalyst } from './HackathonCardCatalyst';
import { Heading } from '../catalyst/heading';
import { Text } from '../catalyst/text';

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
  onHackathonEdit: (hackathon: Hackathon) => void;
}

export const HackathonList: React.FC<HackathonListProps> = ({
  hackathons,
  loading,
  onHackathonDeleted,
  onHackathonEdit,
}) => {

  if (loading) {
    return (
      <div className="mb-12">
        <Heading level={2} className="mb-4">Meus Hackathons</Heading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse ring-1 ring-zinc-950/5">
              <div className="h-6 bg-zinc-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-zinc-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-zinc-200 rounded w-5/6 mb-4"></div>
              <div className="h-8 bg-zinc-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hackathons.length === 0) {
    return (
      <div className="mb-12">
        <Heading level={2} className="mb-4">Meus Hackathons</Heading>
        <div className="bg-white rounded-xl shadow-sm p-12 text-center ring-1 ring-zinc-950/5">
          <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-zinc-400" />
          </div>
          <Heading level={3} className="mb-2">
            Nenhum hackathon cadastrado
          </Heading>
          <Text>
            Comece criando seu primeiro hackathon usando o botão acima.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <Heading level={2} className="mb-4">Meus Hackathons</Heading>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hackathons.map((hackathon) => (
          <HackathonCardCatalyst
            key={hackathon.id}
            hackathon={hackathon}
            showActions={true}
            onDelete={onHackathonDeleted}
            onEdit={onHackathonEdit}
          />
        ))}
      </div>
    </div>
  );
};
