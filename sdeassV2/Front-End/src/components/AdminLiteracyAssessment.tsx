import { useState, Fragment } from 'react';
import { User } from '../App';
import { Header } from './Header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { EditLiteracyAssessmentDialog } from './EditLiteracyAssessmentDialog';
import { toast } from 'sonner';

type AdminLiteracyAssessmentProps = {
  user: User;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

type LiteracyRow = {
  id: string;
  literacy: string;
  aTerm: string;
  aEnthusiasm: string;
  aResponse: string;
  bTerm: string;
  bEnthusiasm: string;
  bResponse: string;
  grade: string;
};

type StudentLiteracy = {
  id: string;
  lastName: string;
  firstName: string;
  literacies: LiteracyRow[];
};

const mockStudents: StudentLiteracy[] = [
  {
    id: '1',
    lastName: 'Athanit',
    firstName: 'Flutur',
    literacies: [
      {
        id: '1-1',
        literacy: 'Γλώσσα',
        aTerm: '',
        aEnthusiasm: '',
        aResponse: '',
        bTerm: '',
        bEnthusiasm: '',
        bResponse: '',
        grade: '0'
      },
      {
        id: '1-2',
        literacy: 'Αγγλικά',
        aTerm: '',
        aEnthusiasm: '',
        aResponse: '',
        bTerm: '',
        bEnthusiasm: '',
        bResponse: '',
        grade: '0'
      },
      {
        id: '1-3',
        literacy: 'Πληροφορική',
        aTerm: '',
        aEnthusiasm: '',
        aResponse: '',
        bTerm: '',
        bEnthusiasm: '',
        bResponse: '',
        grade: '0'
      },
      {
        id: '1-4',
        literacy: 'Μαθηματικά',
        aTerm: '',
        aEnthusiasm: '',
        aResponse: '',
        bTerm: '',
        bEnthusiasm: '',
        bResponse: '',
        grade: '0'
      },
      {
        id: '1-5',
        literacy: 'Φυσικές Επιστήμες',
        aTerm: '',
        aEnthusiasm: '',
        aResponse: '',
        bTerm: '',
        bEnthusiasm: '',
        bResponse: '',
        grade: '0'
      },
      {
        id: '1-6',
        literacy: 'Περιβάλλοντες εκπαίδευση',
        aTerm: '',
        aEnthusiasm: '',
        aResponse: '',
        bTerm: '',
        bEnthusiasm: '',
        bResponse: '',
        grade: '0'
      },
      {
        id: '1-7',
        literacy: 'Κοινωνική Εκπαίδευση',
        aTerm: '',
        aEnthusiasm: '',
        aResponse: '',
        bTerm: '',
        bEnthusiasm: '',
        bResponse: '',
        grade: '0'
      },
      {
        id: '1-8',
        literacy: 'Διατροφή Αγωγή',
        aTerm: '',
        aEnthusiasm: '',
        aResponse: '',
        bTerm: '',
        bEnthusiasm: '',
        bResponse: '',
        grade: '0'
      },
      {
        id: '1-9',
        literacy: 'Σύδοξη διδ/κιης',
        aTerm: '',
        aEnthusiasm: '',
        aResponse: '',
        bTerm: '',
        bEnthusiasm: '',
        bResponse: '',
        grade: '0'
      },
      {
        id: '1-10',
        literacy: 'Τεχνολογία',
        aTerm: '',
        aEnthusiasm: '',
        aResponse: '',
        bTerm: '',
        bEnthusiasm: '',
        bResponse: '',
        grade: '0'
      }
    ]
  },
  {
    id: '2',
    lastName: 'Cekaj',
    firstName: 'Hertila',
    literacies: []
  },
  {
    id: '3',
    lastName: 'Kica',
    firstName: 'Pranvera',
    literacies: []
  },
  {
    id: '4',
    lastName: 'Kryeziu',
    firstName: 'Edie',
    literacies: []
  },
  {
    id: '5',
    lastName: 'Kryeziu',
    firstName: 'Elton',
    literacies: []
  },
  {
    id: '6',
    lastName: 'Lika',
    firstName: 'Xhulian',
    literacies: []
  }
];

export function AdminLiteracyAssessment({
  user,
  onLogout,
  onNavigateToDashboard,
}: AdminLiteracyAssessmentProps) {
  const [students, setStudents] = useState<StudentLiteracy[]>(mockStudents);
  const [expandedStudents, setExpandedStudents] = useState<Set<string>>(new Set(['1']));
  const [filterSection, setFilterSection] = useState<string>('all');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [selectedLiteracy, setSelectedLiteracy] = useState<LiteracyRow | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedStudentName, setSelectedStudentName] = useState<string>('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const toggleStudent = (studentId: string) => {
    const newExpanded = new Set(expandedStudents);
    if (newExpanded.has(studentId)) {
      newExpanded.delete(studentId);
    } else {
      newExpanded.add(studentId);
    }
    setExpandedStudents(newExpanded);
  };

  const handleEdit = (studentId: string, studentName: string, literacy: LiteracyRow) => {
    setSelectedStudentId(studentId);
    setSelectedStudentName(studentName);
    setSelectedLiteracy(literacy);
    setIsEditDialogOpen(true);
  };

  const handleSaveLiteracy = (updatedLiteracy: LiteracyRow) => {
    setStudents(students.map(student => {
      if (student.id === selectedStudentId) {
        return {
          ...student,
          literacies: student.literacies.map(lit =>
            lit.id === updatedLiteracy.id ? updatedLiteracy : lit
          )
        };
      }
      return student;
    }));
    toast.success('Η αξιολόγηση γραμματισμού ενημερώθηκε επιτυχώς!');
  };

  return (
    <div className="space-y-6">
        <div className="mb-4 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
              Εξαγωγή σε Word για το Α΄ Τετράμηνο
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
              Εξαγωγή σε Word για το Β΄ Τετράμηνο
            </a>
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
          </div>

          <div className="bg-orange-500 text-white px-4 py-2 rounded">
            Αξιολόγηση ανά γραμματισμούς
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader className="bg-orange-500">
              <TableRow>
                <TableHead className="text-white"></TableHead>
                <TableHead className="text-white">Επίθετο</TableHead>
                <TableHead className="text-white">Όνομα</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <Fragment key={student.id}>
                  <TableRow className="cursor-pointer hover:bg-gray-100">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStudent(student.id)}
                      >
                        {expandedStudents.has(student.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>{student.firstName}</TableCell>
                  </TableRow>
                  
                  {expandedStudents.has(student.id) && student.literacies.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="p-0">
                        <div className="bg-yellow-50 p-4">
                          <div className="mb-2 px-3 py-1 bg-orange-400 text-white inline-block rounded">
                            Μαθητής: {student.firstName}
                          </div>
                          <Table>
                            <TableHeader className="bg-orange-400">
                              <TableRow>
                                <TableHead className="text-white">Α/Α</TableHead>
                                <TableHead className="text-white">Γραμματισμός</TableHead>
                                <TableHead className="text-white">Α Τετρ.</TableHead>
                                <TableHead className="text-white">Α-Ενδιαφ.</TableHead>
                                <TableHead className="text-white">Α-Ανταπόκ.</TableHead>
                                <TableHead className="text-white">Β Τετρ.</TableHead>
                                <TableHead className="text-white">Β-Ενδιαφ.</TableHead>
                                <TableHead className="text-white">Β-Ανταπόκ.</TableHead>
                                <TableHead className="text-white">Τελ. Βαθμός</TableHead>
                                <TableHead className="text-white"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {student.literacies.map((literacy, idx) => (
                                <TableRow key={literacy.id} className="bg-white">
                                  <TableCell>{idx + 1}</TableCell>
                                  <TableCell>{literacy.literacy}</TableCell>
                                  <TableCell>{literacy.aTerm}</TableCell>
                                  <TableCell>{literacy.aEnthusiasm}</TableCell>
                                  <TableCell>{literacy.aResponse}</TableCell>
                                  <TableCell>{literacy.bTerm}</TableCell>
                                  <TableCell>{literacy.bEnthusiasm}</TableCell>
                                  <TableCell>{literacy.bResponse}</TableCell>
                                  <TableCell>{literacy.grade}</TableCell>
                                  <TableCell>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleEdit(student.id, student.firstName, literacy)}
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
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>

        <EditLiteracyAssessmentDialog
          literacy={selectedLiteracy}
          studentName={selectedStudentName}
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedLiteracy(null);
            setSelectedStudentId('');
            setSelectedStudentName('');
          }}
          onSave={handleSaveLiteracy}
        />
    </div>
  );
}
