import { useState } from 'react';
import { User } from '../App';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AdminLiteracyAssessment } from './AdminLiteracyAssessment';
import { AdminGeneralAssessment } from './AdminGeneralAssessment';
import { AdminProjectAssessment } from './AdminProjectAssessment';

type AssessmentsHubProps = {
  user: User;
  onLogout: () => void;
  onNavigateToDashboard: () => void;
};

export function AssessmentsHub({
  user,
  onLogout,
  onNavigateToDashboard,
}: AssessmentsHubProps) {
  const [activeTab, setActiveTab] = useState('literacy');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-indigo-900">Αξιολογήσεις</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6 bg-indigo-100">
          <TabsTrigger 
            value="literacy" 
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            Αξιολόγηση ανά γραμματισμό
          </TabsTrigger>
          <TabsTrigger 
            value="general"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            Γενική Αξιολόγηση
          </TabsTrigger>
          <TabsTrigger 
            value="project"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            Αξιολόγηση Project
          </TabsTrigger>
        </TabsList>

        <TabsContent value="literacy" className="mt-0">
          <AdminLiteracyAssessment
            user={user}
            onLogout={onLogout}
            onNavigateToDashboard={onNavigateToDashboard}
          />
        </TabsContent>

        <TabsContent value="general" className="mt-0">
          <AdminGeneralAssessment
            user={user}
            onLogout={onLogout}
            onNavigateToDashboard={onNavigateToDashboard}
          />
        </TabsContent>

        <TabsContent value="project" className="mt-0">
          <AdminProjectAssessment
            user={user}
            onLogout={onLogout}
            onNavigateToDashboard={onNavigateToDashboard}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
