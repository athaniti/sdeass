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
import { Edit, Trash2, Plus, Users, GraduationCap } from 'lucide-react';
import { EditProjectDialog } from './EditProjectDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { ManageProjectMembersDialog } from './ManageProjectMembersDialog';
import { toast } from 'sonner';

type ManageProjectsProps = {
  user: User;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  academicYear: string;
  teachers: string[];
  students: string[];
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'planned';
};

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Χρόνος και διαχρονικές συσκευές',
    description: 'Εργαστήριο για την κατανόηση της έννοιας του χρόνου και των μετρητικών συσκευών',
    academicYear: '2024-2025',
    teachers: ['Ανδρέας Αθανίτης', 'Μαρία Παπαδοπούλου'],
    students: ['Athanit Flutur', 'Cekaj Hertila', 'Kica Pranvera', 'Kryeziu Edie', 'Kryeziu Elton', 'Lika Xhulian'],
    startDate: '2024-09-15',
    endDate: '2025-01-20',
    status: 'active'
  },
  {
    id: '2',
    name: 'Περιοδικό',
    description: 'Δημιουργία σχολικού περιοδικού με συλλογή και επεξεργασία άρθρων',
    academicYear: '2024-2025',
    teachers: ['Ανδρέας Αθανίτης'],
    students: ['Brashica Adelina', 'Brashica Arben', 'Lusman Ali'],
    startDate: '2024-10-01',
    endDate: '2025-05-30',
    status: 'active'
  },
  {
    id: '3',
    name: 'Ανακύκλωση και οργάνωση της Ευρώπης',
    description: 'Περιβαλλοντική εκπαίδευση και γνωριμία με τις χώρες της Ευρώπης',
    academicYear: '2024-2025',
    teachers: ['Μαρία Παπαδοπούλου'],
    students: ['Lusman Ali'],
    startDate: '2024-11-01',
    endDate: '2025-03-15',
    status: 'active'
  },
  {
    id: '4',
    name: 'Ψηφιακή Φωτογραφία',
    description: 'Εισαγωγή στην ψηφιακή φωτογραφία και επεξεργασία εικόνας',
    academicYear: '2024-2025',
    teachers: [],
    students: [],
    startDate: '2025-02-01',
    endDate: '2025-06-30',
    status: 'planned'
  }
];

export function ManageProjects({
  user,
  onLogout,
  onNavigateToDashboard,
}: ManageProjectsProps) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleAddNew = () => {
    const newProject: Project = {
      id: `temp-${Date.now()}`,
      name: '',
      description: '',
      academicYear: '2024-2025',
      teachers: [],
      students: [],
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'planned'
    };
    setSelectedProject(newProject);
    setIsEditDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };

  const handleManageMembers = (project: Project) => {
    setSelectedProject(project);
    setIsMembersDialogOpen(true);
  };

  const handleSaveProject = (updatedProject: Project) => {
    if (projects.find(p => p.id === updatedProject.id)) {
      setProjects(projects.map(p =>
        p.id === updatedProject.id ? updatedProject : p
      ));
      toast.success('Το Project ενημερώθηκε επιτυχώς!');
    } else {
      const projectWithId = {
        ...updatedProject,
        id: `proj-${Date.now()}`
      };
      setProjects([...projects, projectWithId]);
      toast.success('Το Project δημιουργήθηκε επιτυχώς!');
    }
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      toast.success('Το Project διαγράφηκε επιτυχώς!');
      setProjectToDelete(null);
    }
  };

  const getStatusBadge = (status: Project['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      planned: 'bg-yellow-100 text-yellow-700'
    };
    const labels = {
      active: 'Ενεργό',
      completed: 'Ολοκληρωμένο',
      planned: 'Προγραμματισμένο'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Διαχείριση Projects / Εργαστηρίων</h2>
          <p className="text-gray-500 mt-1">
            Ακαδημαϊκό Έτος 2024-2025
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Νέο Project
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-indigo-50 to-violet-50">
                <TableHead className="text-gray-900">Όνομα Project</TableHead>
                <TableHead className="text-gray-900">Περιγραφή</TableHead>
                <TableHead className="text-gray-900">Κατάσταση</TableHead>
                <TableHead className="text-gray-900">Εκπαιδευτικοί</TableHead>
                <TableHead className="text-gray-900">Εκπαιδευόμενοι</TableHead>
                <TableHead className="text-gray-900">Ημερομηνίες</TableHead>
                <TableHead className="text-gray-900 text-right">Ενέργειες</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow
                  key={project.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <TableCell>
                    <div>
                      <div className="text-gray-900">{project.name}</div>
                      <div className="text-xs text-gray-500">{project.academicYear}</div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {project.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(project.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm">{project.teachers.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-violet-600" />
                      <span className="text-sm">{project.students.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-gray-600">
                        {new Date(project.startDate).toLocaleDateString('el-GR')}
                      </div>
                      <div className="text-gray-400 text-xs">
                        έως {project.endDate ? new Date(project.endDate).toLocaleDateString('el-GR') : '-'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleManageMembers(project)}
                        className="hover:text-indigo-600"
                        title="Διαχείριση Μελών"
                      >
                        <Users className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(project)}
                        className="hover:text-indigo-600"
                        title="Επεξεργασία"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(project)}
                        className="hover:text-red-600"
                        title="Διαγραφή"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditProjectDialog
        project={selectedProject}
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedProject(null);
        }}
        onSave={handleSaveProject}
      />

      <ManageProjectMembersDialog
        project={selectedProject}
        open={isMembersDialogOpen}
        onClose={() => {
          setIsMembersDialogOpen(false);
          setSelectedProject(null);
        }}
        onSave={handleSaveProject}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Διαγραφή Project"
        description={`Είστε σίγουροι ότι θέλετε να διαγράψετε το project "${projectToDelete?.name}";`}
      />
    </div>
  );
}
