import { User } from '../../App';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  ClipboardCheck, 
  FileText, 
  Settings,
  BookOpen,
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';
import { useState } from 'react';

type SidebarProps = {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
};

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  page: string;
  roles?: ('admin' | 'teacher')[];
};

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Αρχική',
    icon: <LayoutDashboard className="w-5 h-5" />,
    page: 'dashboard',
    roles: ['admin', 'teacher']
  },
  {
    id: 'students',
    label: 'Εκπαιδευόμενοι',
    icon: <GraduationCap className="w-5 h-5" />,
    page: 'manage-students',
    roles: ['admin']
  },
  {
    id: 'teachers',
    label: 'Εκπαιδευτικοί',
    icon: <Users className="w-5 h-5" />,
    page: 'manage-teachers',
    roles: ['admin']
  },
  {
    id: 'assessments',
    label: 'Αξιολογήσεις',
    icon: <ClipboardCheck className="w-5 h-5" />,
    page: 'assessments',
    roles: ['admin', 'teacher']
  },
  {
    id: 'projects',
    label: 'Projects/Εργαστήρια',
    icon: <BookOpen className="w-5 h-5" />,
    page: 'projects',
    roles: ['admin']
  },
  {
    id: 'reports',
    label: 'Εκθέσεις',
    icon: <FileText className="w-5 h-5" />,
    page: 'reports',
    roles: ['admin']
  },
  {
    id: 'settings',
    label: 'Ρυθμίσεις',
    icon: <Settings className="w-5 h-5" />,
    page: 'profile',
    roles: ['admin', 'teacher']
  }
];

export function Sidebar({ user, currentPage, onNavigate, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filteredNavItems = navItems.filter(
    item => !item.roles || item.roles.includes(user.role)
  );

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo & Header */}
      <div className="p-6 border-b border-indigo-800/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-violet-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <div className="flex-1">
              <h1 className="text-white font-semibold">ΣΔΕ Σύστημα</h1>
              <p className="text-indigo-300 text-xs">Διαχείριση Σχολείου</p>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-indigo-800/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">
              {user.fullName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm truncate">{user.fullName}</p>
              <p className="text-indigo-300 text-xs">
                {user.role === 'admin' ? 'Διαχειριστής' : 'Εκπαιδευτικός'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.page);
              setIsMobileOpen(false);
            }}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
              'hover:bg-indigo-800/30',
              currentPage === item.page || 
              (item.page === 'dashboard' && (currentPage === 'admin-dashboard' || currentPage === 'dashboard')) ||
              (item.page === 'assessments' && (currentPage === 'admin-assessments' || currentPage === 'teacher-assessments-hub' || currentPage === 'literacy-assessment' || currentPage === 'teacher-project-assessment')) ||
              (item.page === 'reports' && currentPage === 'admin-assessments')
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-indigo-200 hover:text-white'
            )}
          >
            {item.icon}
            {isOpen && (
              <>
                <span className="flex-1 text-left text-sm">{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-indigo-800/30">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-indigo-200 hover:text-white hover:bg-indigo-800/30"
        >
          <LogOut className="w-5 h-5 mr-3" />
          {isOpen && <span>Αποσύνδεση</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-900 text-white rounded-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        >
          <div 
            className="w-72 h-full bg-gradient-to-b from-indigo-900 to-indigo-950"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={cn(
          'hidden lg:block h-screen bg-gradient-to-b from-indigo-900 to-indigo-950 transition-all duration-300 sticky top-0',
          isOpen ? 'w-72' : 'w-20'
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-8 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors"
        >
          <ChevronRight className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
        </button>

        {sidebarContent}
      </div>
    </>
  );
}
