import { User, Assessment } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FileText } from 'lucide-react';
import { Header } from './Header';

type DashboardProps = {
  user: User;
  onLogout: () => void;
  onOpenAssessment: (assessment: Assessment) => void;
  onNavigateToProfile?: () => void;
  onNavigateToProjects?: () => void;
};

// Mock data
const assessments: Assessment[] = [
  {
    id: '1',
    title: 'Αξιολόγηση Εκπαιδευόμενων ανά Γραμματισμό',
    type: 'literacy',
    level: 'A1'
  },
  {
    id: '2',
    title: 'Αξιολόγηση Εκπαιδευόμενων σε Project - Εργαστήρια',
    type: 'project',
    level: 'A1'
  }
];

const departmentAssessments = [
  { id: '1', title: 'Κατηγοριοιη Γενικές Αξιολόγησης ανά Εκπαιδεύσιμο για το Α1', level: 'A1' },
  { id: '2', title: 'Κατηγοριοιη Γενικές Αξιολόγησης ανά Εκπαιδεύσιμο για το Α2', level: 'A2' },
  { id: '3', title: 'Κατηγοριοιη Γενικές Αξιολόγησης ανά Εκπαιδεύσιμο για το Β1', level: 'B1' },
  { id: '4', title: 'Κατηγοριοιη Γενικές Αξιολόγησης ανά Εκπαιδεύσιμο για το Β2', level: 'B2' },
  { id: '5', title: 'Εξαγωγ�� αξιολόγησης σε word ανά Εκπαιδεύσιμο (Α Τετράμηνο) για το Α1', level: 'A1' },
  { id: '6', title: 'Εξαγωγή αξιολόγησης σε word ανά Εκπαιδεύσιμο (Α Τετράμηνο) για το Α2', level: 'A2' },
  { id: '7', title: 'Εξαγωγή αξιολόγησης σε word ανά Εκπαιδεύσιμο (Α Τετράμηνο) για το Β1', level: 'B1' },
  { id: '8', title: 'Εξαγωγή αξιολόγησης σε word ανά Εκπαιδεύσιμο (Α Τετράμηνο) για το Β2', level: 'B2' },
  { id: '9', title: 'Εξαγωγή αξιολόγησης σε word ανά Εκπαιδεύσιμο (Β Τετράμηνο) για το Α1', level: 'A1' },
  { id: '10', title: 'Εξαγωγή αξιολόγησης σε word ανά Εκπαιδεύσιμο (Β Τετράμηνο) για το Α2', level: 'A2' },
  { id: '11', title: 'Εξαγωγή αξιολόγησης σε word ανά Εκπαιδεύσιμο (Β Τετράμηνο) για το Β1', level: 'B1' },
  { id: '12', title: 'Εξαγωγή αξιολόγησης σε word ανά Εκπαιδεύσιμο (Β Τετράμηνο) για το Β2', level: 'B2' }
];

const projects = [
  { id: '1', title: 'Εργαστήριο 1', description: 'Περιγραφή εργαστηρίου 1' },
  { id: '2', title: 'Εργαστήριο 2', description: 'Περιγραφή εργαστηρίου 2' },
  { id: '3', title: 'Εργαστήριο 3', description: 'Περιγραφή εργαστηρίου 3' }
];

export function Dashboard({ 
  user, 
  onLogout, 
  onOpenAssessment,
  onNavigateToProfile,
  onNavigateToProjects 
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={onLogout} 
        currentPage="Αρχική Σελίδα"
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToProjects={onNavigateToProjects}
      />

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6">Προσωπική Σελίδα του: {user.fullName}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Αξιολογήσεις */}
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Αξιολογήσεις</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assessments.map((assessment) => (
                <button
                  key={assessment.id}
                  onClick={() => onOpenAssessment(assessment)}
                  className="w-full text-left text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {assessment.title}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Τμήμα Ευθύνης */}
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Τμήμα Ευθύνης: {user.department}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {departmentAssessments.map((item) => (
                <div key={item.id} className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm">
                    {item.title}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects / Εργαστήρια */}
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Projects / Εργαστήρια:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="border-b border-green-200 pb-2 last:border-0">
                  <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    {project.title}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
