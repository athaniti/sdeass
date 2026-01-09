import { useState } from 'react';
import { User, Assessment, Student } from '../App';
import { Header } from './Header';
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
import { Edit, FileDown } from 'lucide-react';
import { Badge } from './ui/badge';
import { EditAssessmentDialog } from './EditAssessmentDialog';

type StudentAssessmentProps = {
  user: User;
  assessment: Assessment;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

// Mock student data
const mockStudents: Student[] = [
  {
    id: '1',
    lastName: 'Ατανίτ',
    firstName: 'Flutur',
    section: 'A1',
    literacy: 'Πληροφορική',
    aTerm: 'Πολυανωμοτελικές αφετικές φράσεις και αιντιδ δεν την δύοθητο να βολέψιδει; θα χρειαζδέ να καταβάλιλο μεγαλύτερο προσάδοια την δηλιπιον χρόνιο.',
    aPresence: 'Ικανοποιητικό',
    aParticipation: 'Επαρκές',
    bTerm: 'Πολυανωμοτελικές αφετικές φράσεις και αντιδ δεν την βούθηνο να καταβούλιλωνά μεγαλύτερα προσάδοια του προσπαθότα τού να την μακαβιάσουν κείμενα δηλεζότε στην Πληροφορική.',
    bPresence: 'Ικανοποιητικό',
    bParticipation: 'Καλό',
    tdd: 0,
    notes: ''
  },
  {
    id: '2',
    lastName: 'Χερούκα',
    firstName: 'Efton',
    section: 'A1',
    literacy: 'Πληροφορική',
    aTerm: 'Πολυανωμοτελικές αφετικές φράσεις, αλλά αποτειδεζι γραζοδική στη Βελληνική τού, θα πρέπει να κατανοείς την προσιδότα τού να τού υποστηδίζομε σίδαξη με πληροδοσίες των την επίπιων χρόνιο.',
    aPresence: 'Μέτριο',
    aParticipation: 'Επαρκές',
    bTerm: 'Βελληανεί ταν, θα πρέπει να κατανοείς την προσιδότα τού να τού υποστηδίζομε σίδαξη κειδοδοσίες των την επίπιων χρόνιο.',
    bPresence: 'Μέτριο',
    bParticipation: 'Επαρκές',
    tdd: 0,
    notes: ''
  },
  {
    id: '3',
    lastName: 'Χερούκα',
    firstName: 'Edie',
    section: 'A1',
    literacy: 'Πληροφορική',
    aTerm: 'Παραλιδο τις αβειυδείς διαβάθης τα κριθήρικο και πολιπιτεγθείτας αφετές ενδιδ για δους διατύχες την ανεντοθετονίους. Κατά την πορεία της παρουσίας γενετειόστηκε δηλεντηριό πυδέσθερο στα βασικά πλήκτρα.',
    aPresence: 'Μέτριο',
    aParticipation: 'Καλό',
    bTerm: 'Παραλιδο τις αβειυδείς διαβάθης τα κριθήρικο και πολιπιτεγθείτας αφετές ενδιδ για δους εατύχες πυδέσθερο. Κατά την πορεία της παρουσίας γενετειόστηκε δηλεντηριό πυδέσθερο στα βασικά πλήκτρα. Έχει τα πρόθιιδ να θεβελιοδεθεί αυκιιδ πιρισθόστερο.',
    bPresence: 'Μέτριο',
    bParticipation: 'Καλό',
    tdd: 0,
    notes: ''
  },
  {
    id: '4',
    lastName: 'Lika',
    firstName: 'Khuilan',
    section: 'A1',
    literacy: 'Πληροφορική',
    aTerm: 'Δεν μπουσύ να αβιουθυθεθεί λόγου σπουδαιού',
    aPresence: '',
    aParticipation: '',
    bTerm: 'Δεν μπουσύ να αβιουθυθεθεί λόγου σπουδαιού',
    bPresence: '',
    bParticipation: '',
    tdd: 0,
    notes: ''
  },
  {
    id: '5',
    lastName: 'Lushtain',
    firstName: 'Ali',
    section: 'B1',
    literacy: 'Πληροφορική',
    aTerm: 'Συμμετέχ ανώθων αντελίςμας και προσοδάλ αριθμός επιδευκάνσικο, μαθείδει πυδένεστερο. Έχει θεκιοστήδει ασρέφεως και αι και τα δεις έχει παιβάσει να χρήστηθεί την προσφυκτεριδό του με κείδια που πειβάσει για την προσφύκικην περιλύθυθέντα.',
    aPresence: 'Μέτριο',
    aParticipation: 'Πολύ καλό',
    bTerm: 'Συμμετέχ ανώθων αντελίςμας και προσοδάλ μιανολλό επιδευκάνσικο. Έχει θεκιοστήδει ασρέφεως και με χρήστηθεί την προσφυκτεριδό του τα δεικίδε.',
    bPresence: 'Μέτριο',
    bParticipation: 'Πολύ καλό',
    tdd: 17,
    notes: ''
  },
  {
    id: '6',
    lastName: 'Nazumli',
    firstName: 'Gentjan',
    section: 'B1',
    literacy: 'Πληροφορική',
    aTerm: 'Ή παρουσία του ήταν αραιπώ καιθώς και ασπέθιδης μικρώλ προπωθαβώς.',
    aPresence: 'Μέτριο',
    aParticipation: 'Καλό',
    bTerm: 'Ή παρουσία του ήταν αραιπώ καιθώς και ασπέθιδης πείνου προπωθαβώς. Στην πορεία θα είχεος περισσότερο.',
    bPresence: 'Μέτριο',
    bParticipation: 'Καλό',
    tdd: 10,
    notes: ''
  },
  {
    id: '7',
    lastName: 'Nazumli',
    firstName: 'Kloriana',
    section: 'B1',
    literacy: 'Πληροφορική',
    aTerm: 'Κατέβείκ συμμετοχή προκοδάλδα και νατρολώ που προκοθαλισχεδές μουδιού. Δειν έχει τη δύου στα μπουλάδ μα μοιράζει απουθή αρακούδιοις προβόλικιον.',
    aPresence: 'Μέτριο',
    aParticipation: 'Καλό',
    bTerm: 'Κατέβείκ συμμετοχή προκοδάλδα και νατρολώ που προκοθαλισχεδές μουδιού. Δειν έχει τη δύου στα μπουλάδ μα μοιράζει απουθή. Θα τήν δου προσωδοσώθι θειμειδοις.',
    bPresence: 'Μέτριο',
    bParticipation: 'Καλό',
    tdd: 10,
    notes: ''
  }
];

export function StudentAssessment({
  user,
  assessment,
  onLogout,
  onNavigateToDashboard,
}: StudentAssessmentProps) {
  const [filterSection, setFilterSection] = useState<string>('all');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleSaveStudent = (updatedStudent: Student) => {
    setStudents(
      students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const filteredStudents = students.filter((student) => {
    if (filterSection !== 'all' && student.section !== filterSection) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Αξιολόγηση Γραμματισμών</h2>
          <p className="text-gray-500 mt-1">
            Αξιολογήστε την πρόοδο των εκπαιδευόμενων ανά γραμματισμό
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

            <span>Φύλο</span>
            <Select value={filterGender} onValueChange={setFilterGender}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Όλα</SelectItem>
                <SelectItem value="male">Άνδρας</SelectItem>
                <SelectItem value="female">Γυναίκα</SelectItem>
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
                  <TableHead className="text-gray-900">Γραμματισμός</TableHead>
                  <TableHead className="text-gray-900">Α Τετρ.</TableHead>
                  <TableHead className="text-gray-900">Α-Ενδιαφ.</TableHead>
                  <TableHead className="text-gray-900">Α-Ανταπόκ.</TableHead>
                  <TableHead className="text-gray-900">Β Τετρ.</TableHead>
                  <TableHead className="text-gray-900">Β-Ενδιαφ.</TableHead>
                  <TableHead className="text-gray-900">Β-Ανταπόκ.</TableHead>
                  <TableHead className="text-gray-900">Τελ. Βαθμός</TableHead>
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
                    <TableCell>{student.literacy}</TableCell>
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
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded">
                        {student.tdd}
                      </span>
                    </TableCell>
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

      <EditAssessmentDialog
        student={selectedStudent}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveStudent}
      />
    </div>
  );
}
