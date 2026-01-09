import { useState } from 'react';
import { User } from '../App';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Edit, FileDown, BookOpen } from 'lucide-react';
import { Badge } from './ui/badge';
import { EditTeacherProjectAssessmentDialog } from './EditTeacherProjectAssessmentDialog';

type TeacherProjectAssessmentProps = {
  user: User;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

type ProjectStudent = {
  id: string;
  lastName: string;
  firstName: string;
  section: string;
  projectName: string;
  aTerm: string;
  aPresence: string;
  aParticipation: string;
  bTerm: string;
  bPresence: string;
  bParticipation: string;
};

// Mock data για τα projects του εκπαιδευτικού
const mockProjectStudents: ProjectStudent[] = [
  {
    id: '1',
    lastName: 'Athanit',
    firstName: 'Flutur',
    section: 'A1',
    projectName: 'Χρόνος και διαχρονικές συσκευές',
    aTerm: 'Εξαιρετική συμμετοχή στις δραστηριότητες του εργαστηρίου. Κατανόηση της έννοιας του χρόνου.',
    aPresence: 'Πολύ καλό',
    aParticipation: 'Πολύ καλό',
    bTerm: 'Συνεχίζει με ενθουσιασμό. Ολοκλήρωσε την κατασκευή ηλιακού ρολογιού.',
    bPresence: 'Πολύ καλό',
    bParticipation: 'Άριστο'
  },
  {
    id: '2',
    lastName: 'Cekaj',
    firstName: 'Hertila',
    section: 'A1',
    projectName: 'Χρόνος και διαχρονικές συσκευές',
    aTerm: 'Καλή συμμετοχή, ενδιαφέρον για το θέμα.',
    aPresence: 'Καλό',
    aParticipation: 'Καλό',
    bTerm: 'Βελτίωση στη συνεργασία με την ομάδα.',
    bPresence: 'Καλό',
    bParticipation: 'Πολύ καλό'
  },
  {
    id: '3',
    lastName: 'Kryeziu',
    firstName: 'Elton',
    section: 'A1',
    projectName: 'Χρόνος και διαχρονικές συσκευές',
    aTerm: 'Μέτρια συμμετοχή, χρειάζεται υποστήριξη.',
    aPresence: 'Μέτριο',
    aParticipation: 'Επαρκές',
    bTerm: 'Βελτίωση στην παρουσία και συμμετοχή.',
    bPresence: 'Καλό',
    bParticipation: 'Καλό'
  },
  {
    id: '4',
    lastName: 'Brashica',
    firstName: 'Adelina',
    section: 'B1',
    projectName: 'Περιοδικό',
    aTerm: 'Εξαιρετική δημιουργικότητα στη συγγραφή άρθρων.',
    aPresence: 'Άριστο',
    aParticipation: 'Άριστο',
    bTerm: 'Συνέχισε με το ίδιο ενδιαφέρον. Συντονίστρια της ομάδας.',
    bPresence: 'Άριστο',
    bParticipation: 'Άριστο'
  },
  {
    id: '5',
    lastName: 'Brashica',
    firstName: 'Arben',
    section: 'B1',
    projectName: 'Περιοδικό',
    aTerm: 'Καλή συνεισφορά στο περιοδικό.',
    aPresence: 'Καλό',
    aParticipation: 'Καλό',
    bTerm: 'Ολοκλήρωσε τα άρθρα του με επιτυχία.',
    bPresence: 'Πολύ καλό',
    bParticipation: 'Καλό'
  },
  {
    id: '6',
    lastName: 'Lusman',
    firstName: 'Ali',
    section: 'B1',
    projectName: 'Ανακύκλωση και οργάνωση της Ευρώπης',
    aTerm: 'Εξαιρετικό ενδιαφέρον για περιβαλλοντικά θέματα.',
    aPresence: 'Πολύ καλό',
    aParticipation: 'Πολύ καλό',
    bTerm: 'Παρουσίασε εξαιρετική εργασία για την ανακύκλωση.',
    bPresence: 'Άριστο',
    bParticipation: 'Άριστο'
  }
];

export function TeacherProjectAssessment({
  user,
  onLogout,
  onNavigateToDashboard,
}: TeacherProjectAssessmentProps) {
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterSection, setFilterSection] = useState<string>('all');
  const [students, setStudents] = useState<ProjectStudent[]>(mockProjectStudents);
  const [selectedStudent, setSelectedStudent] = useState<ProjectStudent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Λίστα projects που διδάσκει ο εκπαιδευτικός
  const teacherProjects = Array.from(new Set(mockProjectStudents.map(s => s.projectName)));

  const handleEditStudent = (student: ProjectStudent) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleSaveStudent = (updatedStudent: ProjectStudent) => {
    setStudents(
      students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const filteredStudents = students.filter((student) => {
    if (filterProject !== 'all' && student.projectName !== filterProject) {
      return false;
    }
    if (filterSection !== 'all' && student.section !== filterSection) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Αξιολόγηση Projects / Εργαστηρίων</h2>
          <p className="text-gray-500 mt-1">
            Αξιολογήστε την πρόοδο των εκπαιδευόμενων στα projects που διδάσκετε
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
            Εξαγωγή σε Word για το Α΄ Τετράμηνο
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
            Εξαγωγή σε Word για το Β΄ Τετράμηνο
          </span>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <span>Project</span>
          <Select value={filterProject} onValueChange={setFilterProject}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Όλα τα Projects</SelectItem>
              {teacherProjects.map((project) => (
                <SelectItem key={project} value={project}>
                  {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span>Τμήμα</span>
          <Select value={filterSection} onValueChange={setFilterSection}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Όλες</SelectItem>
              <SelectItem value="A1">A1</SelectItem>
              <SelectItem value="A2">A2</SelectItem>
              <SelectItem value="B1">B1</SelectItem>
              <SelectItem value="B2">B2</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <FileDown className="w-4 h-4 mr-2" />
            Εξαγωγή
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gradient-to-r from-indigo-50 to-violet-50">
              <TableRow>
                <TableHead className="text-gray-900">Επίθετο</TableHead>
                <TableHead className="text-gray-900">Όνομα</TableHead>
                <TableHead className="text-gray-900">Τμήμα</TableHead>
                <TableHead className="text-gray-900">Project</TableHead>
                <TableHead className="text-gray-900">Α Τετρ.</TableHead>
                <TableHead className="text-gray-900">Α-Ενδιαφ.</TableHead>
                <TableHead className="text-gray-900">Α-Ανταπόκ.</TableHead>
                <TableHead className="text-gray-900">Β Τετρ.</TableHead>
                <TableHead className="text-gray-900">Β-Ενδιαφ.</TableHead>
                <TableHead className="text-gray-900">Β-Ανταπόκ.</TableHead>
                <TableHead className="text-gray-900"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow
                  key={student.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.section}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm">{student.projectName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm line-clamp-2">{student.aTerm}</div>
                  </TableCell>
                  <TableCell>{student.aPresence}</TableCell>
                  <TableCell>{student.aParticipation}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm line-clamp-2">{student.bTerm}</div>
                  </TableCell>
                  <TableCell>{student.bPresence}</TableCell>
                  <TableCell>{student.bParticipation}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                      className="hover:text-indigo-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditTeacherProjectAssessmentDialog
        student={selectedStudent}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveStudent}
      />
    </div>
  );
}
