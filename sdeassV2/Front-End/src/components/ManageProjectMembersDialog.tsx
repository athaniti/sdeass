import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { useState, useEffect } from 'react';
import { Project } from './ManageProjects';
import { Users, GraduationCap, Search } from 'lucide-react';
import { Input } from './ui/input';

type ManageProjectMembersDialogProps = {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
};

// Mock data για διαθέσιμους εκπαιδευτικούς
const availableTeachers = [
  'Ανδρέας Αθανίτης',
  'Μαρία Παπαδοπούλου',
  'Γιώργος Νικολάου',
  'Ελένη Κωνσταντίνου',
  'Δημήτρης Παπαδάκης'
];

// Mock data για διαθέσιμους εκπαιδευόμενους
const availableStudents = [
  'Athanit Flutur',
  'Brashica Adelina',
  'Brashica Arben',
  'Cekaj Hertila',
  'Kica Pranvera',
  'Kryeziu Edie',
  'Kryeziu Elton',
  'Lika Xhulian',
  'Lusman Ali',
  'Papadopoulos Nikos',
  'Georgiou Maria',
  'Konstantinou Andreas'
];

export function ManageProjectMembersDialog({
  project,
  open,
  onClose,
  onSave,
}: ManageProjectMembersDialogProps) {
  const [formData, setFormData] = useState<Project | null>(null);
  const [teacherSearch, setTeacherSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({ ...project });
    }
  }, [project]);

  if (!formData) return null;

  const handleToggleTeacher = (teacher: string) => {
    const teachers = formData.teachers.includes(teacher)
      ? formData.teachers.filter(t => t !== teacher)
      : [...formData.teachers, teacher];
    setFormData({ ...formData, teachers });
  };

  const handleToggleStudent = (student: string) => {
    const students = formData.students.includes(student)
      ? formData.students.filter(s => s !== student)
      : [...formData.students, student];
    setFormData({ ...formData, students });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const filteredTeachers = availableTeachers.filter(teacher =>
    teacher.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const filteredStudents = availableStudents.filter(student =>
    student.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Διαχείριση Μελών Project
          </DialogTitle>
          <DialogDescription>
            {formData.name}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="teachers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Εκπαιδευτικοί ({formData.teachers.length})
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Εκπαιδευόμενοι ({formData.students.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teachers" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Αναζήτηση εκπαιδευτικού..."
                value={teacherSearch}
                onChange={(e) => setTeacherSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <ScrollArea className="h-[400px] border rounded-lg p-4">
              <div className="space-y-3">
                {filteredTeachers.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Δεν βρέθηκαν εκπαιδευτικοί
                  </p>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <div
                      key={teacher}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      <Checkbox
                        id={`teacher-${teacher}`}
                        checked={formData.teachers.includes(teacher)}
                        onCheckedChange={() => handleToggleTeacher(teacher)}
                      />
                      <Label
                        htmlFor={`teacher-${teacher}`}
                        className="flex-1 cursor-pointer"
                      >
                        {teacher}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {formData.teachers.length > 0 && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                <p className="text-sm text-indigo-900">
                  <strong>Επιλεγμένοι:</strong> {formData.teachers.join(', ')}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Αναζήτηση εκπαιδευόμενου..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <ScrollArea className="h-[400px] border rounded-lg p-4">
              <div className="space-y-3">
                {filteredStudents.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Δεν βρέθηκαν εκπαιδευόμενοι
                  </p>
                ) : (
                  filteredStudents.map((student) => (
                    <div
                      key={student}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-violet-50 transition-colors"
                    >
                      <Checkbox
                        id={`student-${student}`}
                        checked={formData.students.includes(student)}
                        onCheckedChange={() => handleToggleStudent(student)}
                      />
                      <Label
                        htmlFor={`student-${student}`}
                        className="flex-1 cursor-pointer"
                      >
                        {student}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {formData.students.length > 0 && (
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
                <p className="text-sm text-violet-900">
                  <strong>Επιλεγμένοι:</strong> {formData.students.join(', ')}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Ακύρωση
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
          >
            Αποθήκευση
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
