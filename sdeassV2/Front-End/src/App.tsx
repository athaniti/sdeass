import { useState } from 'react';
import { ModernLogin } from './components/modern/ModernLogin';
import { ModernLayout } from './components/modern/ModernLayout';
import { ModernDashboard } from './components/modern/ModernDashboard';
import { StudentAssessment } from './components/StudentAssessment';
import { UserProfile } from './components/UserProfile';
import { ProjectAssessment } from './components/ProjectAssessment';
import { ManageStudents } from './components/ManageStudents';
import { ManageTeachers } from './components/ManageTeachers';
import { ManageProjects } from './components/ManageProjects';
import { TeacherProjectAssessment } from './components/TeacherProjectAssessment';
import { TeacherAssessmentsHub } from './components/TeacherAssessmentsHub';
import { AssessmentsHub } from './components/AssessmentsHub';
import { Toaster } from './components/ui/sonner';

export type User = {
  id: string;
  username: string;
  fullName: string;
  department: string;
  role: 'admin' | 'teacher';
};

export type Assessment = {
  id: string;
  title: string;
  type: string;
  level: string;
};

export type Student = {
  id: string;
  lastName: string;
  firstName: string;
  section: string;
  literacy: string;
  aTerm: string;
  aPresence: string;
  aParticipation: string;
  bTerm: string;
  bPresence: string;
  bParticipation: string;
  tdd: number;
  notes: string;
};

type Page = 
  | 'login' 
  | 'dashboard' 
  | 'assessment' 
  | 'literacy-assessment'
  | 'profile' 
  | 'projects'
  | 'teacher-project-assessment'
  | 'teacher-assessments-hub'
  | 'admin-dashboard'
  | 'manage-students'
  | 'manage-teachers'
  | 'manage-projects'
  | 'admin-assessments';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [academicYear, setAcademicYear] = useState<string>('2024-2025');

  const handleAcademicYearChange = (year: string) => {
    setAcademicYear(year);
    // In production, this would trigger data reload for the new academic year
  };

  const handleLogin = (username: string, password: string) => {
    // Mock login - in production, this would call your API
    // Check if admin login
    if (username === 'admin' || username === 'administrator') {
      const adminUser: User = {
        id: '0',
        username: username,
        fullName: 'Διαχειριστής Συστήματος',
        department: 'Διαχείριση',
        role: 'admin'
      };
      setCurrentUser(adminUser);
      setCurrentPage('admin-dashboard');
    } else {
      const teacherUser: User = {
        id: '1',
        username: username,
        fullName: 'Ανδρέας Αθανίτης',
        department: 'Α1Α2Β1Β2',
        role: 'teacher'
      };
      setCurrentUser(teacherUser);
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setSelectedAssessment(null);
  };

  const handleNavigateToDashboard = () => {
    if (currentUser?.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('dashboard');
    }
    setSelectedAssessment(null);
  };

  const handleNavigateToManageStudents = () => {
    setCurrentPage('manage-students');
  };

  const handleNavigateToManageTeachers = () => {
    setCurrentPage('manage-teachers');
  };

  const handleNavigateToAssessments = () => {
    setCurrentPage('admin-assessments');
  };

  const handleOpenAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setCurrentPage('assessment');
  };

  const handleNavigateToProfile = () => {
    setCurrentPage('profile');
  };

  const handleNavigateToProjects = () => {
    setCurrentPage('projects');
  };

  const handleNavigateToManageProjects = () => {
    setCurrentPage('manage-projects');
  };

  const handleNavigateToTeacherProjectAssessment = () => {
    setCurrentPage('teacher-project-assessment');
  };

  const handleNavigateToTeacherAssessmentsHub = () => {
    setCurrentPage('teacher-assessments-hub');
  };

  const handleNavigateToLiteracyAssessment = () => {
    setCurrentPage('literacy-assessment');
  };

  // Helper function to navigate from sidebar
  const handleSidebarNavigate = (page: string) => {
    switch (page) {
      case 'dashboard':
        handleNavigateToDashboard();
        break;
      case 'manage-students':
        handleNavigateToManageStudents();
        break;
      case 'manage-teachers':
        handleNavigateToManageTeachers();
        break;
      case 'assessments':
        if (currentUser.role === 'admin') {
          handleNavigateToAssessments();
        } else {
          // For teachers, go to assessments hub
          handleNavigateToTeacherAssessmentsHub();
        }
        break;
      case 'projects':
        handleNavigateToManageProjects();
        break;
      case 'profile':
        handleNavigateToProfile();
        break;
      case 'reports':
        handleNavigateToAssessments();
        break;
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      {currentPage === 'login' ? (
        <ModernLogin onLogin={handleLogin} />
      ) : (
        currentUser && renderPage()
      )}
    </>
  );

  function renderPage() {
    if (!currentUser) return null;
    if (currentPage === 'dashboard' && currentUser.role === 'teacher') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <ModernDashboard
            user={currentUser}
            onOpenAssessment={handleOpenAssessment}
            onNavigateToProjects={handleNavigateToProjects}
            onNavigateToManageProjects={handleNavigateToManageProjects}
            onNavigateToTeacherProjectAssessment={handleNavigateToTeacherProjectAssessment}
            onNavigateToAssessments={handleNavigateToTeacherAssessmentsHub}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'admin-dashboard' && currentUser.role === 'admin') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <ModernDashboard
            user={currentUser}
            onOpenAssessment={handleOpenAssessment}
            onNavigateToProjects={handleNavigateToProjects}
            onNavigateToManageStudents={handleNavigateToManageStudents}
            onNavigateToManageTeachers={handleNavigateToManageTeachers}
            onNavigateToManageProjects={handleNavigateToManageProjects}
            onNavigateToTeacherProjectAssessment={handleNavigateToTeacherProjectAssessment}
            onNavigateToAssessments={handleNavigateToAssessments}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'teacher-assessments-hub') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <TeacherAssessmentsHub
            user={currentUser}
            onNavigateToLiteracyAssessment={handleNavigateToLiteracyAssessment}
            onNavigateToProjectAssessment={handleNavigateToTeacherProjectAssessment}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'literacy-assessment') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <StudentAssessment
            user={currentUser}
            assessment={{
              id: '1',
              title: 'Αξιολόγηση Εκπαιδευόμενων ανά Γραμματισμό',
              type: 'literacy',
              level: 'A1'
            }}
            onLogout={handleLogout}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'assessment' && selectedAssessment) {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <StudentAssessment
            user={currentUser}
            assessment={selectedAssessment}
            onLogout={handleLogout}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'profile') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <UserProfile
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'projects') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <ProjectAssessment
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'teacher-project-assessment') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <TeacherProjectAssessment
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'manage-students' && currentUser.role === 'admin') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <ManageStudents
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'manage-teachers' && currentUser.role === 'admin') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <ManageTeachers
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'manage-projects') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <ManageProjects
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        </ModernLayout>
      );
    }

    if (currentPage === 'admin-assessments' && currentUser.role === 'admin') {
      return (
        <ModernLayout
          user={currentUser}
          currentPage={currentPage}
          onNavigate={handleSidebarNavigate}
          onLogout={handleLogout}
          academicYear={academicYear}
          onAcademicYearChange={handleAcademicYearChange}
        >
          <AssessmentsHub
            user={currentUser}
            onLogout={handleLogout}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        </ModernLayout>
      );
    }

    return null;
  }
}
