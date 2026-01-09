import { User } from '../App';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

type HeaderProps = {
  user: User;
  onLogout: () => void;
  currentPage: string;
  onNavigateToDashboard?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToProjects?: () => void;
};

export function Header({ 
  user, 
  onLogout, 
  currentPage, 
  onNavigateToDashboard,
  onNavigateToProfile,
  onNavigateToProjects 
}: HeaderProps) {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          {onNavigateToDashboard && (
            <button
              onClick={onNavigateToDashboard}
              className="hover:text-gray-300 transition-colors"
            >
              Αρχική Σελίδα
            </button>
          )}
          <span className="text-gray-300">|</span>
          <button
            onClick={onNavigateToProjects}
            className="hover:text-gray-300 transition-colors"
          >
            Αξιολογήσεις
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={onNavigateToProfile}
            className="hover:text-gray-300 transition-colors"
          >
            Ρυθμίσεις
          </button>
          <span className="text-gray-300">|</span>
          <span>Σχ. Έτος: 25/26</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-white hover:bg-gray-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Αποσύνδεση
        </Button>
      </div>
    </header>
  );
}
