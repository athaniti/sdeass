import { User, Assessment } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Users, 
  GraduationCap, 
  ClipboardCheck, 
  TrendingUp,
  BookOpen,
  Calendar,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../ui/button';

type ModernDashboardProps = {
  user: User;
  onOpenAssessment: (assessment: Assessment) => void;
  onNavigateToProjects: () => void;
  onNavigateToManageStudents?: () => void;
  onNavigateToManageTeachers?: () => void;
  onNavigateToManageProjects?: () => void;
  onNavigateToTeacherProjectAssessment?: () => void;
  onNavigateToAssessments?: () => void;
};

const stats = [
  {
    title: 'Συνολικοί Εκπαιδευόμενοι',
    value: '156',
    change: '+12%',
    icon: GraduationCap,
    color: 'bg-blue-500'
  },
  {
    title: 'Ενεργοί Εκπαιδευτικοί',
    value: '18',
    change: '+2',
    icon: Users,
    color: 'bg-violet-500'
  },
  {
    title: 'Ολοκληρωμένες Αξιολογήσεις',
    value: '243',
    change: '+18%',
    icon: ClipboardCheck,
    color: 'bg-emerald-500'
  },
  {
    title: 'Ενεργά Projects',
    value: '12',
    change: '+3',
    icon: BookOpen,
    color: 'bg-orange-500'
  }
];

const recentActivities = [
  {
    id: '1',
    title: 'Νέα αξιολόγηση Α Τετραμήνου',
    description: 'Ολοκληρώθηκε για τμήμα Α1',
    time: 'Πριν 2 ώρες',
    icon: ClipboardCheck
  },
  {
    id: '2',
    title: 'Νέοι εκπαιδευόμενοι',
    description: '5 νέες εγγραφές στο σύστημα',
    time: 'Πριν 4 ώρες',
    icon: GraduationCap
  },
  {
    id: '3',
    title: 'Ενημέρωση Project',
    description: 'Περιοδικό - Νέο περιεχόμενο',
    time: 'Χθες',
    icon: BookOpen
  }
];

const upcomingTasks = [
  {
    id: '1',
    title: 'Αξιολόγηση Β Τετραμήνου',
    dueDate: '15 Μαΐου 2025',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Εξαγωγή Τίτλων Σπουδών',
    dueDate: '20 Μαΐου 2025',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Ενημέρωση Στοιχείων Εκπαιδευόμενων',
    dueDate: '25 Μαΐου 2025',
    priority: 'low'
  }
];

const myAssessments = [
  {
    id: '1',
    title: 'Αξιολόγηση Εκπαιδευόμενων ανά Γραμματισμό',
    type: 'literacy',
    level: 'A1',
    completed: 45,
    total: 60
  },
  {
    id: '2',
    title: 'Αξιολόγηση Projects - Εργαστήρια',
    type: 'project',
    level: 'A1',
    completed: 30,
    total: 45
  }
];

export function ModernDashboard({ 
  user, 
  onOpenAssessment, 
  onNavigateToProjects,
  onNavigateToManageStudents,
  onNavigateToManageTeachers,
  onNavigateToManageProjects,
  onNavigateToTeacherProjectAssessment,
  onNavigateToAssessments
}: ModernDashboardProps) {
  const isAdmin = user.role === 'admin';

  const handleNewAssessment = () => {
    if (onNavigateToAssessments) {
      onNavigateToAssessments();
    }
  };

  const handleManageStudents = () => {
    if (isAdmin && onNavigateToManageStudents) {
      onNavigateToManageStudents();
    }
  };

  const handleProjects = () => {
    if (isAdmin && onNavigateToManageProjects) {
      onNavigateToManageProjects();
    } else if (!isAdmin && onNavigateToTeacherProjectAssessment) {
      onNavigateToTeacherProjectAssessment();
    }
  };

  const handleReports = () => {
    if (onNavigateToAssessments) {
      onNavigateToAssessments();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">
          Καλώς ήρθατε, {user.fullName.split(' ')[0]}!
        </h1>
        <p className="text-gray-500 mt-1">
          Ακαδημαϊκό Έτος 2024-2025 • {new Date().toLocaleDateString('el-GR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl mb-2">{stat.value}</p>
                    <div className="flex items-center gap-1 text-sm text-emerald-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Assessments */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-indigo-50 to-violet-50">
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-indigo-600" />
              Οι Αξιολογήσεις μου
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {myAssessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => {
                    if (onNavigateToAssessments) {
                      onNavigateToAssessments();
                    }
                  }}
                >
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{assessment.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Επίπεδο: {assessment.level}</span>
                      <span>•</span>
                      <span>{assessment.completed}/{assessment.total} ολοκληρώθηκαν</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${(assessment.completed / assessment.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 ml-4" />
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => {
                  if (onNavigateToAssessments) {
                    onNavigateToAssessments();
                  }
                }}
              >
                Προβολή Όλων
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-teal-50">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Πρόσφατη Δραστηριότητα
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-amber-50">
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600" />
              Προσεχείς Εργασίες
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{task.dueDate}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {task.priority === 'high' ? 'Υψηλή' : task.priority === 'medium' ? 'Μέτρια' : 'Χαμηλή'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-violet-50 to-purple-50">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-600" />
              Γρήγορες Ενέργειες
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                onClick={handleNewAssessment}
              >
                <ClipboardCheck className="w-6 h-6" />
                <span className="text-sm">Νέα Αξιολόγηση</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                onClick={handleManageStudents}
              >
                <GraduationCap className="w-6 h-6" />
                <span className="text-sm">Εκπαιδευόμενοι</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                onClick={handleProjects}
              >
                <BookOpen className="w-6 h-6" />
                <span className="text-sm">Projects</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                onClick={handleReports}
              >
                <Award className="w-6 h-6" />
                <span className="text-sm">Εκθέσεις</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
