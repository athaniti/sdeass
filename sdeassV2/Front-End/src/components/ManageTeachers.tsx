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
import { Edit, Trash2, UserPlus } from 'lucide-react';
import { EditTeacherDialog } from './EditTeacherDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { toast } from 'sonner';

type ManageTeachersProps = {
  user: User;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

type Teacher = {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  specialtyCode: string;
  username: string;
  literacyLevel: string;
  a1: string;
  a2: string;
  a3: string;
  b1: string;
  b2: string;
  b3: string;
  b4: string;
  b5: string;
  role: string;
  address: string;
  email: string;
  phone: string;
};

const mockTeachers: Teacher[] = [
  {
    id: '1',
    firstName: 'Αθώνης',
    lastName: 'Αλέσης',
    specialty: 'Πληροφορική',
    specialtyCode: 'ΠΕ19',
    username: 'ada',
    literacyLevel: 'Πληροφορική',
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    b4: '',
    b5: '',
    role: 'Εκπαιδευτικός',
    address: 'Γραμματικός Οδός',
    email: 'aathanitis@sch.gr',
    phone: '2494326696'
  },
  {
    id: '2',
    firstName: 'Λάζαρη',
    lastName: 'Ζωή',
    specialty: 'Φιλόλογος',
    specialtyCode: 'ΠΕ02',
    username: 'zlazari',
    literacyLevel: 'Γλώσσα',
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    b4: '',
    b5: '',
    role: 'Εκπαιδευτικός',
    address: 'z.lazari@hotmail.gr',
    email: 'z.lazari@hotmail.gr',
    phone: '6946925941'
  },
  {
    id: '3',
    firstName: 'Σαμαντά',
    lastName: 'Νεολία',
    specialty: 'Κοινωνιολόγος',
    specialtyCode: 'ΠΕ78',
    username: 'm_statisa',
    literacyLevel: 'Κοινωνιολογία',
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    b4: '',
    b5: '',
    role: 'Εκπαιδευτικός',
    address: 'm_statisa@yahoo.gr',
    email: 'm_statisa@yahoo.gr',
    phone: '6945737349'
  },
  {
    id: '4',
    firstName: 'Λαοπής',
    lastName: 'Θωμίτησης',
    specialty: 'Πληροφορική',
    specialtyCode: 'ΠΕ19',
    username: 'jimilaras',
    literacyLevel: 'Πληροφορική',
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    b4: '',
    b5: '',
    role: 'Εκπαιδευτικός',
    address: 'jimilaras@gmail.com',
    email: 'jimilaras@gmail.com',
    phone: '6972557081'
  },
  {
    id: '5',
    firstName: 'Αντωνιάδελου',
    lastName: 'Θωμίτησης',
    specialty: 'Γεωπολίος',
    specialtyCode: 'ΠΕ88-01',
    username: 'andani75',
    literacyLevel: 'Περι- Αυλοβαλλόσιν',
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    b4: '',
    b5: '',
    role: 'Εκπαιδευτικός',
    address: 'andani75@gmail.com',
    email: 'andani75@gmail.com',
    phone: '6972623308'
  }
];

type TeacherRecord = {
  id: string;
  am: string;
  lastName: string;
  firstName: string;
  department: string;
  specialization: string;
  phone: string;
  email: string;
  active: string;
};

export function ManageTeachers({
  user,
  onLogout,
  onNavigateToDashboard,
}: ManageTeachersProps) {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherRecord | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

  const handleEdit = (teacher: Teacher) => {
    const teacherRecord: TeacherRecord = {
      id: teacher.id,
      am: teacher.id,
      lastName: teacher.lastName,
      firstName: teacher.firstName,
      department: `${teacher.a1}${teacher.a2}${teacher.a3}${teacher.b1}${teacher.b2}${teacher.b3}${teacher.b4}${teacher.b5}`,
      specialization: teacher.specialty,
      phone: teacher.phone,
      email: teacher.email,
      active: 'ΝΑΙ'
    };
    setSelectedTeacher(teacherRecord);
    setIsEditDialogOpen(true);
  };

  const handleSaveTeacher = (updatedTeacher: TeacherRecord) => {
    setTeachers(teachers.map(t =>
      t.id === updatedTeacher.id
        ? { ...t, firstName: updatedTeacher.firstName, lastName: updatedTeacher.lastName, specialty: updatedTeacher.specialization, phone: updatedTeacher.phone, email: updatedTeacher.email }
        : t
    ));
    toast.success('Ο εκπαιδευτικός ενημερώθηκε επιτυχώς!');
  };

  const handleDeleteClick = (teacher: Teacher) => {
    setTeacherToDelete(teacher);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (teacherToDelete) {
      setTeachers(teachers.filter(t => t.id !== teacherToDelete.id));
      toast.success('Ο εκπαιδευτικός διαγράφηκε επιτυχώς!');
      setIsDeleteDialogOpen(false);
      setTeacherToDelete(null);
    }
  };

  const handleAddNew = () => {
    const newTeacher: TeacherRecord = {
      id: Date.now().toString(),
      am: '',
      lastName: '',
      firstName: '',
      department: '',
      specialization: '',
      phone: '',
      email: '',
      active: 'ΝΑΙ'
    };
    setSelectedTeacher(newTeacher);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Διαχείριση Εκπαιδευτικών</h1>
          <p className="text-gray-500 mt-1">Προβολή και επεξεργασία όλων των εκπαιδευτικών</p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Νέος Εκπαιδευτικός
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow" style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}>
        <div className="overflow-auto h-full">
          <Table>
            <TableHeader className="bg-orange-500">
              <TableRow>
                <TableHead className="text-white">Όνομα</TableHead>
                <TableHead className="text-white">Επίθετο</TableHead>
                <TableHead className="text-white">Ειδικότητα</TableHead>
                <TableHead className="text-white">Κωδ. Ειδ.</TableHead>
                <TableHead className="text-white">username</TableHead>
                <TableHead className="text-white">Γραμματισμός</TableHead>
                <TableHead className="text-white">A1</TableHead>
                <TableHead className="text-white">A2</TableHead>
                <TableHead className="text-white">A3</TableHead>
                <TableHead className="text-white">B1</TableHead>
                <TableHead className="text-white">B2</TableHead>
                <TableHead className="text-white">B3</TableHead>
                <TableHead className="text-white">B4</TableHead>
                <TableHead className="text-white">B5</TableHead>
                <TableHead className="text-white">Ρόλος</TableHead>
                <TableHead className="text-white">Διεύθυνση</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Τηλέφωνο</TableHead>
                <TableHead className="text-white">Reset Pwd</TableHead>
                <TableHead className="text-white">Επαξεργασία</TableHead>
                <TableHead className="text-white">Διαγραφή</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow
                  key={teacher.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <TableCell>{teacher.firstName}</TableCell>
                  <TableCell>{teacher.lastName}</TableCell>
                  <TableCell>{teacher.specialty}</TableCell>
                  <TableCell>{teacher.specialtyCode}</TableCell>
                  <TableCell>{teacher.username}</TableCell>
                  <TableCell>{teacher.literacyLevel}</TableCell>
                  <TableCell>{teacher.a1}</TableCell>
                  <TableCell>{teacher.a2}</TableCell>
                  <TableCell>{teacher.a3}</TableCell>
                  <TableCell>{teacher.b1}</TableCell>
                  <TableCell>{teacher.b2}</TableCell>
                  <TableCell>{teacher.b3}</TableCell>
                  <TableCell>{teacher.b4}</TableCell>
                  <TableCell>{teacher.b5}</TableCell>
                  <TableCell>{teacher.role}</TableCell>
                  <TableCell>{teacher.address}</TableCell>
                  <TableCell>
                    <a href={`mailto:${teacher.email}`} className="text-blue-600 hover:underline">
                      {teacher.email}
                    </a>
                  </TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>
                    <Button 
                      variant="link" 
                      size="sm"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => toast.info('Η λειτουργία επαναφοράς κωδικού θα είναι διαθέσιμη σύντομα')}
                    >
                      Επανφορά Κωδικού
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(teacher)}
                      className="hover:text-indigo-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteClick(teacher)}
                      className="hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditTeacherDialog
        teacher={selectedTeacher}
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedTeacher(null);
        }}
        onSave={handleSaveTeacher}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setTeacherToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Διαγραφή Εκπαιδευτικού"
        description={
          teacherToDelete
            ? `Είστε βέβαιοι ότι θέλετε να διαγράψετε τον/την ${teacherToDelete.firstName} ${teacherToDelete.lastName}; Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.`
            : ''
        }
      />
    </div>
  );
}
