import { User } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Header } from './Header';
import { Button } from './ui/button';

type AdminDashboardProps = {
  user: User;
  onLogout: () => void;
  onNavigateToManageStudents: () => void;
  onNavigateToManageTeachers: () => void;
  onNavigateToGeneralAssessment?: () => void;
  onNavigateToLiteracyAssessment?: () => void;
  onNavigateToAdminProjects?: () => void;
};

export function AdminDashboard({
  user,
  onLogout,
  onNavigateToManageStudents,
  onNavigateToManageTeachers,
  onNavigateToGeneralAssessment,
  onNavigateToLiteracyAssessment,
  onNavigateToAdminProjects,
}: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} currentPage="Αρχική Σελίδα" />

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6">Σελίδα Διαχείρισης</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Διαχείριση Προσωπικού */}
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Διαχείριση Προσωπικού</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                onClick={onNavigateToManageTeachers}
                className="w-full text-left text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Εκπαιδευτικοί
              </button>
              <button
                onClick={onNavigateToManageStudents}
                className="w-full text-left text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Εκπαιδευόμενοι
              </button>
            </CardContent>
          </Card>

          {/* Διαχείριση Μαθημάτων */}
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Διαχείριση Μαθημάτων</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                Project - Εργαστήρια
              </a>
            </CardContent>
          </Card>

          {/* Διαχείριση Αξιολογήσεων */}
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Διαχείριση Αξιολογήσεων</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2 text-sm">
                <button
                  onClick={onNavigateToLiteracyAssessment}
                  className="block text-blue-600 hover:text-blue-800 hover:underline text-left w-full"
                >
                  Αξιολόγηση Εκπαιδευόμενων ανά Μάθημα
                </button>
                <button
                  onClick={onNavigateToAdminProjects}
                  className="block text-blue-600 hover:text-blue-800 hover:underline text-left w-full"
                >
                  Αξιολόγηση Εκπαιδευόμενων ανά Project - Εργαστήριο
                </button>
                <button
                  onClick={onNavigateToGeneralAssessment}
                  className="block text-blue-600 hover:text-blue-800 hover:underline text-left w-full"
                >
                  Γενική Αξιολόγηση Εκπαιδευόμενων
                </button>
                <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  Εξαγωγή σε Word για το Α΄ Τετράμηνο
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  Εξαγωγή σε Word για το Β΄ Τετράμηνο
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  Εξαγωγή Γνωματεύσεων - Αποτελέσματος Τάξης
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  Εξαγωγή Ακαδημαϊκή Βαθμολογίας σε Word
                </a>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Εξαγωγή Ακαδημαϊκή Βαθμολογίας σε Word
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Εξαγωγή Τίτλων Σπουδών σε Word
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Εξαγωγή Αποδεικτικών Τίτλων Σπουδών σε Word
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Εξαγωγή Διπλωμ για αναλυτικά
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Νέο Ακαδημαϊκό Έτος</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Δημιουργία Νέου Ακαδημαϊκού Έτους
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  Δημιουργία Αρχείων νέου Ακαδημαϊκού Έτους
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  Εισαγωγή από Excel νέων Εκπαιδευόμενων
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
