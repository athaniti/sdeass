import { User } from '../../App';
import { Sidebar } from './Sidebar';
import { AcademicYearSelector } from './AcademicYearSelector';
import { ReactNode } from 'react';

type ModernLayoutProps = {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  children: ReactNode;
  academicYear?: string;
  onAcademicYearChange?: (year: string) => void;
};

export function ModernLayout({
  user,
  currentPage,
  onNavigate,
  onLogout,
  children,
  academicYear = '2024-2025',
  onAcademicYearChange
}: ModernLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        user={user}
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Top Bar with Academic Year Selector */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <h3 className="text-gray-700">
              Σχολείο Δεύτερης Ευκαιρίας
            </h3>
          </div>
          {onAcademicYearChange && (
            <AcademicYearSelector
              value={academicYear}
              onChange={onAcademicYearChange}
            />
          )}
        </div>

        <div className="p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
