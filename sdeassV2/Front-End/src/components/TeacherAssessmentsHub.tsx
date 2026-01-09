import { User } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BookOpen, GraduationCap, Users, TrendingUp } from 'lucide-react';

type TeacherAssessmentsHubProps = {
  user: User;
  onNavigateToLiteracyAssessment: () => void;
  onNavigateToProjectAssessment: () => void;
};

export function TeacherAssessmentsHub({
  user,
  onNavigateToLiteracyAssessment,
  onNavigateToProjectAssessment,
}: TeacherAssessmentsHubProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Αξιολογήσεις</h2>
        <p className="text-gray-500 mt-1">
          Επιλέξτε τον τύπο αξιολόγησης που θέλετε να πραγματοποιήσετε
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Εκπαιδευόμενοι</p>
                <p className="text-2xl mt-1 text-gray-900">156</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Γραμματισμοί</p>
                <p className="text-2xl mt-1 text-gray-900">8</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Projects</p>
                <p className="text-2xl mt-1 text-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Πρόοδος</p>
                <p className="text-2xl mt-1 text-gray-900">78%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-violet-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Literacy Assessment */}
        <Card 
          className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          onClick={onNavigateToLiteracyAssessment}
        >
          <CardHeader className="border-b bg-gradient-to-r from-indigo-50 to-violet-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Αξιολόγηση Γραμματισμών</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Αξιολογήστε τους εκπαιδευόμενους ανά γραμματισμό
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ολοκληρωμένες</span>
                <span className="text-sm text-gray-900">45/60</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 h-2 rounded-full transition-all"
                  style={{ width: '75%' }}
                />
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Αξιολόγηση ανά επίπεδο (A1, A2, B1, B2) με βάση το γραμματισμό που διδάσκετε
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Assessment */}
        <Card 
          className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          onClick={onNavigateToProjectAssessment}
        >
          <CardHeader className="border-b bg-gradient-to-r from-amber-50 to-orange-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Αξιολόγηση Projects/Εργαστηρίων</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Αξιολογήστε τους εκπαιδευόμενους στα projects
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ολοκληρωμένες</span>
                <span className="text-sm text-gray-900">30/45</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-amber-600 to-orange-600 h-2 rounded-full transition-all"
                  style={{ width: '67%' }}
                />
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Αξιολόγηση εκπαιδευόμενων στα εργαστήρια και projects που συντονίζετε
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-slate-50">
          <CardTitle className="text-gray-900">Πρόσφατη Δραστηριότητα</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">Ενημέρωση αξιολόγησης Πληροφορικής - Τμήμα A1</p>
                <p className="text-xs text-gray-500 mt-1">Πριν 2 ώρες</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-600 rounded-full mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">Ολοκλήρωση αξιολόγησης Project "Περιοδικό"</p>
                <p className="text-xs text-gray-500 mt-1">Πριν 5 ώρες</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">Εξαγωγή αναφορών Α' Τετραμήνου</p>
                <p className="text-xs text-gray-500 mt-1">Χθες</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
