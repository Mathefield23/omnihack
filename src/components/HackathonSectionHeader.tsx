import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../catalyst/button';

interface HackathonSectionHeaderProps {
  onCreateClick: () => void;
}

export const HackathonSectionHeader: React.FC<HackathonSectionHeaderProps> = ({
  onCreateClick,
}) => {
  return (
    <div className="mb-8 flex justify-between items-center">
      <Button onClick={onCreateClick} color="omnihack-primary">
        <Plus className="w-5 h-5" />
        Cadastrar Novo Hackathon
      </Button>
    </div>
  );
};
