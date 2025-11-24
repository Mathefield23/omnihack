import React from 'react';
import { Plus } from 'lucide-react';

interface HackathonSectionHeaderProps {
  onCreateClick: () => void;
}

export const HackathonSectionHeader: React.FC<HackathonSectionHeaderProps> = ({
  onCreateClick,
}) => {
  return (
    <div className="mb-8 flex justify-between items-center">
      
      <button
        onClick={onCreateClick}
        className="bg-omnihack-primary text-white px-6 py-3 rounded-lg hover:bg-omnihack-secondary transition-colors font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
      >
        <Plus className="w-5 h-5" />
        Cadastrar Novo Hackathon
      </button>
    </div>
  );
};
