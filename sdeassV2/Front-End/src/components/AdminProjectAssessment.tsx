import { useState, useMemo } from 'react';
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
import { Edit, ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { EditProjectAssessmentDialog } from './EditProjectAssessmentDialog';
import { toast } from 'sonner';

type AdminProjectAssessmentProps = {
  user: User;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

type ProjectRecord = {
  id: string;
  lastName: string;
  firstName: string;
  project: string;
  aTerm: string;
  bTerm: string;
};

const mockProjects: ProjectRecord[] = [
  {
    id: '1',
    lastName: 'Athanit',
    firstName: 'Flutur',
    project: 'Χρόνος και διαχρονικές συσκευές',
    aTerm: '',
    bTerm: 'Η εκπαιδευόμενη υλικοχείμησε με αυτόκρα το project, επιδεικνύοντας ανθόκλιση, καλή κατανόηση του αντικειμένου και ικανότητα εφαρμογής των γνώσεων στην πράξη. Αναλυτικόλησε στις απαριθίες ή αυξολόθησε το αντιθετόλησε για διάκες θεως καθήκοντα και συλιαθούσα τος επιλόθους πτως τους κόμπορεντα. Η συνολθεία της επίδοσης πτως τούκε κόμπορεντα, όθησα και η δεκαμηζάσε τού με την ομάδα.'
  },
  {
    id: '2',
    lastName: 'Brashica',
    firstName: 'Adelina',
    project: 'Περιοδικό',
    aTerm: '',
    bTerm: ''
  },
  {
    id: '3',
    lastName: 'Brashica',
    firstName: 'Arben',
    project: 'Περιοδικό',
    aTerm: '',
    bTerm: 'Η εκπαιδευόμενη υλικοχείμησε με αυτόκρα το project, επιδεικνύοντας ανθόκλιση, καλή κατανόηση του αντικειμένου και ικανότητα εφαρμογής των γνώσεων στην πράξη. Αναλυτικόλησε στις απαριθίες ή αυξολόθησε το αντιθετόλησε για διάκες θεως καθήκοντα και συλιαθούσα τος επιλόθους πτως τους κόμπορεντα. Η συνολθεία της επίδοσης πτως τούκε κόμπορεντα, όθησα και η δεκαμηζάσε τού με την ομάδα.'
  },
  {
    id: '4',
    lastName: 'Cekaj',
    firstName: 'Hertila',
    project: 'Χρόνος και διαχρονικές συσκευές',
    aTerm: '',
    bTerm: ''
  },
  {
    id: '5',
    lastName: 'Kica',
    firstName: 'Pranvera',
    project: 'Χρόνος και διαχρονικές συσκευές',
    aTerm: '',
    bTerm: ''
  },
  {
    id: '6',
    lastName: 'Kryeziu',
    firstName: 'Edie',
    project: 'Χρόνος και διαχρονικές συσκευές',
    aTerm: '',
    bTerm: 'Ο εκπαιδευόμενος συγκουήμησε με επιτυχία το project, επιδεικνύοντας ανθόκλιση, καλή κατανόηση του αντικειμένου και ικανότητα εφαρμογής των γνώσεων στην πράξη. Αναλυτικόλησε στις απαριθίες ή αυξολόθησε θα διακες θεως καθήκοντα και συλιαθούσα τος επιλόθους πτως τους συναδοξη. Θα μπορούσε τα θιμίε προσωδαθίως εκφεύη. Η συνολθεία τού, όθησα και η συνεργάσε τού με τους ομάδα.'
  },
  {
    id: '7',
    lastName: 'Kryeziu',
    firstName: 'Elton',
    project: 'Χρόνος και διαχρονικές συσκευές',
    aTerm: '',
    bTerm: ''
  },
  {
    id: '8',
    lastName: 'Lika',
    firstName: 'Xhulian',
    project: 'Χρόνος και διαχρονικές συσκευές',
    aTerm: '',
    bTerm: ''
  },
  {
    id: '9',
    lastName: 'Lusman',
    firstName: 'Ali',
    project: 'Περιοδικό',
    aTerm: '',
    bTerm: 'Η Βαθόγε του είπτε σημαριθός και η συμμετοχή του ήταν το δυο κολορθατώκο στι την αρχή του σχολείου. Κατάγραψε ονου η πυδή συμμετοχή στι το σχολείο έκρων ήταν πολύ συχθή διεπόλωση να αυτόθεά το ομάδα. Όντας όμου ο συναδοξος παρουσιάςει της αποθειδύνι.'
  },
  {
    id: '10',
    lastName: 'Lusman',
    firstName: 'Ali',
    project: 'Ανακύκλωση και οργάνωση της Ευρώπης',
    aTerm: '',
    bTerm: 'Η αρχή παρουσία του στο σχολείο δίθεση ή του διεβάθεχε στη συναδόποια μέχθυν της αποδεχτεί να ενταχθεί. Στην πορεία μέσα στα παδιά της ομάδας σαιμιεχεύνι να συμμετέχει με αποτέλεσμα να αποκταήσει τι συναδοξο των προφίνα και μέσα στι ομαδική τετραγωνία συναδόποια στην ομάδος.'
  }
];

export function AdminProjectAssessment({
  user,
  onLogout,
  onNavigateToDashboard,
}: AdminProjectAssessmentProps) {
  const [projects, setProjects] = useState<ProjectRecord[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterProject, setFilterProject] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'project'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get unique project names for filtering
  const uniqueProjects = useMemo(() => {
    const projectNames = [...new Set(projects.map(p => p.project))];
    return projectNames.sort();
  }, [projects]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;
    
    // Apply project filter
    if (filterProject !== 'all') {
      filtered = filtered.filter(p => p.project === filterProject);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let compareValue = 0;
      
      if (sortBy === 'name') {
        const nameA = `${a.lastName} ${a.firstName}`;
        const nameB = `${b.lastName} ${b.firstName}`;
        compareValue = nameA.localeCompare(nameB, 'el');
      } else if (sortBy === 'project') {
        compareValue = a.project.localeCompare(b.project, 'el');
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return sorted;
  }, [projects, filterProject, sortBy, sortOrder]);

  const toggleSort = (column: 'name' | 'project') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEdit = (project: ProjectRecord) => {
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };

  const handleSaveProject = (updatedProject: ProjectRecord) => {
    setProjects(projects.map(p =>
      p.id === updatedProject.id ? updatedProject : p
    ));
    toast.success('Η αξιολόγηση project ενημερώθηκε επιτυχώς!');
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
            <span>Project</span>
            <Select value={filterProject} onValueChange={setFilterProject}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Όλα τα Projects</SelectItem>
                {uniqueProjects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-orange-500 text-white px-4 py-2 rounded">
            Αξιολόγηση project - εργαστηρίων
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader className="bg-orange-500">
              <TableRow>
                <TableHead className="text-white">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort('name')}
                    className="text-white hover:text-white hover:bg-orange-600 -ml-3"
                  >
                    Επίθετο / Όνομα
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-white">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort('project')}
                    className="text-white hover:text-white hover:bg-orange-600 -ml-3"
                  >
                    Project / Εργαστήριο
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-white">Α Τετρ.</TableHead>
                <TableHead className="text-white">Β Τετρ.</TableHead>
                <TableHead className="text-white"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedProjects.map((project, index) => (
                <TableRow
                  key={project.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <TableCell>
                    {project.lastName} {project.firstName}
                  </TableCell>
                  <TableCell className="max-w-xs">{project.project}</TableCell>
                  <TableCell className="max-w-md">
                    <div className="text-sm line-clamp-3">{project.aTerm}</div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="text-sm line-clamp-3">{project.bTerm}</div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(project)}
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

        <EditProjectAssessmentDialog
          record={selectedProject}
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedProject(null);
          }}
          onSave={handleSaveProject}
        />
    </div>
  );
}
