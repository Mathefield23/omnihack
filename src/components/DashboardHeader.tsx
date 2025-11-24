import React from 'react';
import { Briefcase, LogOut } from 'lucide-react';
import { Button } from '../catalyst/button';

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  onLogout,
}) => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Dashboard da Empresa
            </h1>
            <p className="text-sm text-gray-500">{userName}</p>
          </div>
        </div>
        <Button plain color="dark" onClick={onLogout}>
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </Button>
      </div>
    </nav>
  );
};
