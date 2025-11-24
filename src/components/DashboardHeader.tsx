import React from 'react';
import { Briefcase, LogOut, ChevronDown } from 'lucide-react';
import { Navbar, NavbarSection, NavbarSpacer } from '../catalyst/navbar';
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem, DropdownLabel } from '../catalyst/dropdown';
import { Avatar } from '../catalyst/avatar';

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  onLogout,
}) => {
  return (
    <nav className="bg-white border-b border-zinc-950/10">
      <div className="max-w-6xl mx-auto px-6">
        <Navbar>
          <NavbarSection>
            <div className="w-12 h-12 bg-omnihack-primary/10 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-omnihack-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-zinc-950">
                Dashboard da Empresa
              </h1>
              <p className="text-sm text-zinc-500">{userName}</p>
            </div>
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as="div" className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  initials={userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  className="size-10 bg-omnihack-primary text-white"
                />
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem onClick={onLogout}>
                  <LogOut data-slot="icon" />
                  <DropdownLabel>Sair</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      </div>
    </nav>
  );
};
