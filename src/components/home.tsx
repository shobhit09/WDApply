import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  BarChart2,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Settings,
} from "lucide-react";
import JobUrlInput from "./JobUrlInput";
import ProfileManager from "./ProfileManager";
import ApplicationLog from "./ApplicationLog";

const Home = () => {
  // Mock data for UI scaffolding
  const applicationStats = {
    total: 42,
    pending: 15,
    applied: 18,
    interview: 6,
    rejected: 3,
    successRate: 68,
  };

  const recentApplications = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      date: "2023-06-15",
      status: "applied",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp",
    },
    {
      id: 2,
      company: "DataSystems",
      position: "Full Stack Engineer",
      date: "2023-06-12",
      status: "interview",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=DataSystems",
    },
    {
      id: 3,
      company: "InnovateTech",
      position: "UI/UX Developer",
      date: "2023-06-10",
      status: "rejected",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=InnovateTech",
    },
    {
      id: 4,
      company: "CloudNine Solutions",
      position: "React Developer",
      date: "2023-06-08",
      status: "pending",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=CloudNine",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "applied":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Applied
          </Badge>
        );
      case "interview":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Interview
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card p-4">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase className="h-6 w-6" />
          <h1 className="text-xl font-bold">JobApply.ai</h1>
        </div>

        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BarChart2 className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Briefcase className="h-4 w-4" />
            Applications
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </nav>

        <div className="mt-auto pt-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">
                john.doe@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold md:hidden">JobApply.ai</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" /> Account
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track and manage your job applications in one place.
            </p>
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="apply">Apply to Jobs</TabsTrigger>
              <TabsTrigger value="profile">Profile Manager</TabsTrigger>
              <TabsTrigger value="logs">Application Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {applicationStats.total}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Applied
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {applicationStats.applied}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Interviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {applicationStats.interview}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Success Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold">
                        {applicationStats.successRate}%
                      </div>
                      <Progress
                        value={applicationStats.successRate}
                        className="h-2 w-20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>
                    Your most recent job applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={app.logo} />
                            <AvatarFallback>
                              {app.company.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{app.position}</p>
                            <p className="text-sm text-muted-foreground">
                              {app.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(app.status)}
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Applications
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="apply" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apply to a New Job</CardTitle>
                  <CardDescription>
                    Paste a job URL to start the automated application process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <JobUrlInput />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Manager</CardTitle>
                  <CardDescription>
                    Manage your personal information, resume, work history, and
                    application answers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Logs</CardTitle>
                  <CardDescription>
                    View detailed logs of your automated job applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationLog />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Home;
