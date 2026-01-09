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
  ArrowUpDown, 
  FileText, 
  X, 
  Edit, 
  UserPlus
} from 'lucide-react';
import { EditStudentDialog } from './EditStudentDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { toast } from 'sonner';

type ManageStudentsProps = {
  user: User;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

type StudentRecord = {
  id: string;
  am: string;
  lastName: string;
  firstName: string;
  year: number;
  gender: string;
  level: string;
  fatherName: string;
  fatherNameGen: string;
  motherName: string;
  address: string;
  phone: string;
  oik: string;
  employer: string;
  unemploymentMonths: number;
  roma: string;
  axiol: string;
  children: number;
  active: string;
  trechon: string;
  pdf: string;
};

const mockStudentRecords: StudentRecord[] = [
  {
    id: '1',
    am: '106',
    lastName: 'Ιλίκης',
    firstName: 'Μπούχι',
    year: 1982,
    gender: 'Α',
    level: 'Β2',
    fatherName: 'Χρήστος',
    fatherNameGen: 'Χρήστου',
    motherName: 'Χρίστο',
    address: 'Μπολολίμη',
    phone: '6931151829',
    oik: 'D',
    employer: 'Οικοδομικά',
    unemploymentMonths: 0,
    roma: 'ΟΧΙ',
    axiol: 'ΟΧΙ',
    children: 0,
    active: 'ΟΧΙ',
    trechon: 'ΟΧΙ',
    pdf: ''
  },
  {
    id: '2',
    am: '153',
    lastName: 'Γεσσόλα',
    firstName: 'Κωνσταντίνα',
    year: 1953,
    gender: 'Γ',
    level: 'Β1',
    fatherName: 'Στουδιόλα',
    fatherNameGen: 'Στουδιόλα',
    motherName: 'Στουδιόλα',
    address: 'Καλεντζή',
    phone: '6944637339',
    oik: 'D',
    employer: 'Νοικοκυρά',
    unemploymentMonths: 0,
    roma: 'ΟΧΙ',
    axiol: 'ΟΧΙ',
    children: 2,
    active: 'ΟΧΙ',
    trechon: 'ΝΑΙ',
    pdf: ''
  },
  {
    id: '3',
    am: '174',
    lastName: 'Μπόρικο',
    firstName: 'Αφρεδινή',
    year: 1992,
    gender: 'Α',
    level: 'Β2',
    fatherName: 'Γιουσουφάκι',
    fatherNameGen: 'Γιουσουφάκι',
    motherName: 'Γιουσουφάκι',
    address: 'Εφολιάδαυ',
    phone: '6946948566',
    oik: 'D',
    employer: 'Άνεργη',
    unemploymentMonths: 12,
    roma: 'ΝΑΙ',
    axiol: 'ΝΑΙ',
    children: 3,
    active: 'ΝΑΙ',
    trechon: 'ΝΑΙ',
    pdf: ''
  },
  {
    id: '4',
    am: '175',
    lastName: 'Μπλατζούλιας',
    firstName: 'Στόφανος',
    year: 1949,
    gender: 'Α',
    level: 'Α2',
    fatherName: 'Ποστολής',
    fatherNameGen: 'Ποστολή',
    motherName: 'Ποστολή',
    address: 'Νιζήρ 12',
    phone: '6973090954',
    oik: 'D',
    employer: 'Συνταξιούχος',
    unemploymentMonths: 0,
    roma: 'ΝΑΙ',
    axiol: 'ΝΑΙ',
    children: 1,
    active: 'ΝΑΙ',
    trechon: 'ΝΑΙ',
    pdf: ''
  },
  {
    id: '5',
    am: '186',
    lastName: 'Αζμανόλι',
    firstName: 'Αντιζελή',
    year: 1968,
    gender: 'Γ',
    level: 'Β2',
    fatherName: 'Χιωμός',
    fatherNameGen: 'Χιωμού',
    motherName: 'Χιωμός',
    address: 'Νεούερη',
    phone: '6944044448',
    oik: 'D',
    employer: 'Υπάλληλος',
    unemploymentMonths: 0,
    roma: 'ΟΧΙ',
    axiol: 'ΝΑΙ',
    children: 2,
    active: 'ΝΑΙ',
    trechon: 'ΟΧΙ',
    pdf: ''
  },
  {
    id: '6',
    am: '195',
    lastName: 'Βούριντς',
    firstName: 'Πουνσουλόμ',
    year: 1985,
    gender: 'Α',
    level: 'Β1',
    fatherName: 'Μόριστα',
    fatherNameGen: 'Μόριστα',
    motherName: 'Μόριστα',
    address: 'Νούριγη',
    phone: '6969593538',
    oik: 'D',
    employer: 'Άνεργος',
    unemploymentMonths: 6,
    roma: 'ΟΧΙ',
    axiol: 'ΝΑΙ',
    children: 0,
    active: 'ΝΑΙ',
    trechon: 'ΝΑΙ',
    pdf: ''
  }
];

type SortField = 'am' | 'lastName' | 'level';
type SortDirection = 'asc' | 'desc';

export function ManageStudents({
  user,
  onLogout,
  onNavigateToDashboard,
}: ManageStudentsProps) {
  const [students, setStudents] = useState<StudentRecord[]>(mockStudentRecords);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<StudentRecord | null>(null);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleEdit = (student: StudentRecord) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  const handleSaveStudent = (updatedStudent: StudentRecord) => {
    setStudents(students.map(s => 
      s.id === updatedStudent.id ? updatedStudent : s
    ));
    toast.success('Ο εκπαιδευόμενος ενημερώθηκε επιτυχώς!');
  };

  const handleDeleteClick = (student: StudentRecord) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      toast.success('Ο εκπαιδευόμενος διαγράφηκε επιτυχώς!');
      setIsDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleAddNew = () => {
    const newStudent: StudentRecord = {
      id: Date.now().toString(),
      am: '',
      lastName: '',
      firstName: '',
      year: new Date().getFullYear() - 30,
      gender: 'Α',
      level: 'A1',
      fatherName: '',
      fatherNameGen: '',
      motherName: '',
      address: '',
      phone: '',
      oik: '',
      employer: '',
      unemploymentMonths: 0,
      roma: 'ΟΧΙ',
      axiol: 'ΟΧΙ',
      children: 0,
      active: 'ΝΑΙ',
      trechon: 'ΟΧΙ',
      pdf: ''
    };
    setSelectedStudent(newStudent);
    setIsEditDialogOpen(true);
  };

  const handlePdfView = (student: StudentRecord) => {
    toast.info(`Προβολή PDF για ${student.firstName} ${student.lastName}`);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = (bVal as string).toLowerCase();
    }
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Διαχείριση Εκπαιδευόμενων</h1>
          <p className="text-gray-500 mt-1">Προβολή και επεξεργασία όλων των εκπαιδευόμενων</p>
        </div>
        <Button 
          onClick={handleAddNew}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Νέος Εκπαιδευόμενος
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow" style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}>
        <div className="overflow-auto h-full">
          <Table>
            <TableHeader className="bg-gray-700">
              <TableRow>
                <TableHead className="text-white">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:text-white"
                    onClick={() => handleSort('am')}
                  >
                    Α.Μ.
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  </Button>
                </TableHead>
                <TableHead className="text-white">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:text-white"
                    onClick={() => handleSort('lastName')}
                  >
                    Επίθετο
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  </Button>
                </TableHead>
                <TableHead className="text-white">Όνομα</TableHead>
                <TableHead className="text-white">Έτος Γέν.</TableHead>
                <TableHead className="text-white">Φύλο</TableHead>
                <TableHead className="text-white">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:text-white"
                    onClick={() => handleSort('level')}
                  >
                    Τάξη
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  </Button>
                </TableHead>
                <TableHead className="text-white">Πατρώνυμο</TableHead>
                <TableHead className="text-white">Πατρώνυμο (Γεν)</TableHead>
                <TableHead className="text-white">Μητρώνυμο</TableHead>
                <TableHead className="text-white">Διεύθυνση</TableHead>
                <TableHead className="text-white">Τηλέφωνο</TableHead>
                <TableHead className="text-white">Οικ. Κατοικ</TableHead>
                <TableHead className="text-white">Εργασία</TableHead>
                <TableHead className="text-white">Μήνες Ανεργίας</TableHead>
                <TableHead className="text-white">ROMA</TableHead>
                <TableHead className="text-white">Αξιολ.</TableHead>
                <TableHead className="text-white">Αρ. Τέκνων</TableHead>
                <TableHead className="text-white">Ενεργός</TableHead>
                <TableHead className="text-white">Τρέχων</TableHead>
                <TableHead className="text-white">Pdf</TableHead>
                <TableHead className="text-white">Remove</TableHead>
                <TableHead className="text-white">Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStudents.map((student, index) => (
                <TableRow
                  key={student.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <TableCell>{student.am}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.level}</TableCell>
                  <TableCell>{student.fatherName}</TableCell>
                  <TableCell>{student.fatherNameGen}</TableCell>
                  <TableCell>{student.motherName}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.oik}</TableCell>
                  <TableCell>{student.employer}</TableCell>
                  <TableCell>{student.unemploymentMonths}</TableCell>
                  <TableCell>{student.roma}</TableCell>
                  <TableCell>{student.axiol}</TableCell>
                  <TableCell>{student.children}</TableCell>
                  <TableCell>{student.active}</TableCell>
                  <TableCell>{student.trechon}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePdfView(student)}
                      className="hover:text-blue-600"
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteClick(student)}
                      className="hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(student)}
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

      <EditStudentDialog
        student={selectedStudent}
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedStudent(null);
        }}
        onSave={handleSaveStudent}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setStudentToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Διαγραφή Εκπαιδευόμενου"
        description={
          studentToDelete
            ? `Είστε βέβαιοι ότι θέλετε να διαγράψετε τον/την ${studentToDelete.firstName} ${studentToDelete.lastName}; Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.`
            : ''
        }
      />
    </div>
  );
}
