import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface ApplicationStep {
  id: string;
  description: string;
  status: "completed" | "error" | "pending";
  timestamp: string;
  details?: string;
  requiresAction?: boolean;
}

interface Application {
  id: string;
  companyName: string;
  position: string;
  status: "pending" | "applied" | "interview" | "rejected" | "offer";
  date: string;
  url: string;
  steps: ApplicationStep[];
  progress: number;
}

const ApplicationLog = () => {
  const [expandedApplication, setExpandedApplication] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data for applications
  const applications: Application[] = [
    {
      id: "1",
      companyName: "Tech Innovations Inc.",
      position: "Senior Frontend Developer",
      status: "applied",
      date: "2023-06-15",
      url: "https://techinnovations.com/careers/senior-frontend-developer",
      progress: 100,
      steps: [
        {
          id: "s1",
          description: "Account creation",
          status: "completed",
          timestamp: "2023-06-15 10:30 AM",
          details: "Successfully created account on company career portal",
        },
        {
          id: "s2",
          description: "Resume upload",
          status: "completed",
          timestamp: "2023-06-15 10:32 AM",
          details: "Uploaded resume and cover letter",
        },
        {
          id: "s3",
          description: "Personal information",
          status: "completed",
          timestamp: "2023-06-15 10:35 AM",
          details: "Filled in contact details and personal information",
        },
        {
          id: "s4",
          description: "Work history",
          status: "completed",
          timestamp: "2023-06-15 10:38 AM",
          details: "Added work experience from profile",
        },
        {
          id: "s5",
          description: "Application submission",
          status: "completed",
          timestamp: "2023-06-15 10:42 AM",
          details: "Successfully submitted application",
        },
      ],
    },
    {
      id: "2",
      companyName: "Global Software Solutions",
      position: "Full Stack Developer",
      status: "pending",
      date: "2023-06-16",
      url: "https://globalsoftware.com/jobs/full-stack-developer",
      progress: 60,
      steps: [
        {
          id: "s1",
          description: "Account creation",
          status: "completed",
          timestamp: "2023-06-16 09:15 AM",
          details: "Successfully created account on company career portal",
        },
        {
          id: "s2",
          description: "Resume upload",
          status: "completed",
          timestamp: "2023-06-16 09:18 AM",
          details: "Uploaded resume and cover letter",
        },
        {
          id: "s3",
          description: "Personal information",
          status: "completed",
          timestamp: "2023-06-16 09:22 AM",
          details: "Filled in contact details and personal information",
        },
        {
          id: "s4",
          description: "Custom questions",
          status: "error",
          timestamp: "2023-06-16 09:25 AM",
          details:
            'Encountered questions not in profile: "Describe your experience with GraphQL"',
          requiresAction: true,
        },
        {
          id: "s5",
          description: "Application submission",
          status: "pending",
          timestamp: "2023-06-16 09:25 AM",
          details: "Waiting for custom questions to be answered",
        },
      ],
    },
    {
      id: "3",
      companyName: "Innovative Startups Co.",
      position: "UI/UX Developer",
      status: "interview",
      date: "2023-06-10",
      url: "https://innovativestartups.com/careers/ui-ux-developer",
      progress: 100,
      steps: [
        {
          id: "s1",
          description: "Account creation",
          status: "completed",
          timestamp: "2023-06-10 14:20 PM",
          details: "Successfully created account on company career portal",
        },
        {
          id: "s2",
          description: "Resume upload",
          status: "completed",
          timestamp: "2023-06-10 14:23 PM",
          details: "Uploaded resume and cover letter",
        },
        {
          id: "s3",
          description: "Personal information",
          status: "completed",
          timestamp: "2023-06-10 14:26 PM",
          details: "Filled in contact details and personal information",
        },
        {
          id: "s4",
          description: "Work history",
          status: "completed",
          timestamp: "2023-06-10 14:30 PM",
          details: "Added work experience from profile",
        },
        {
          id: "s5",
          description: "Application submission",
          status: "completed",
          timestamp: "2023-06-10 14:35 PM",
          details: "Successfully submitted application",
        },
      ],
    },
    {
      id: "4",
      companyName: "Enterprise Solutions Ltd.",
      position: "React Developer",
      status: "rejected",
      date: "2023-06-05",
      url: "https://enterprisesolutions.com/careers/react-developer",
      progress: 100,
      steps: [
        {
          id: "s1",
          description: "Account creation",
          status: "completed",
          timestamp: "2023-06-05 11:10 AM",
          details: "Successfully created account on company career portal",
        },
        {
          id: "s2",
          description: "Resume upload",
          status: "completed",
          timestamp: "2023-06-05 11:13 AM",
          details: "Uploaded resume and cover letter",
        },
        {
          id: "s3",
          description: "Personal information",
          status: "completed",
          timestamp: "2023-06-05 11:16 AM",
          details: "Filled in contact details and personal information",
        },
        {
          id: "s4",
          description: "Work history",
          status: "completed",
          timestamp: "2023-06-05 11:20 AM",
          details: "Added work experience from profile",
        },
        {
          id: "s5",
          description: "Application submission",
          status: "completed",
          timestamp: "2023-06-05 11:25 AM",
          details: "Successfully submitted application",
        },
      ],
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedApplication(expandedApplication === id ? null : id);
  };

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            Pending
          </Badge>
        );
      case "applied":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Applied
          </Badge>
        );
      case "interview":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Interview
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            Rejected
          </Badge>
        );
      case "offer":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-800 border-purple-300"
          >
            Offer
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStepIcon = (status: ApplicationStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const filteredApplications = applications
    .filter((app) => {
      const matchesSearch =
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Application Log</h2>
          <p className="text-muted-foreground">
            Track the progress of your automated job applications
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company or position..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                  <Card key={application.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {application.position}
                          </CardTitle>
                          <div className="text-sm text-muted-foreground mt-1">
                            {application.companyName}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(application.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleExpand(application.id)}
                          >
                            {expandedApplication === application.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">
                          Applied:{" "}
                          {new Date(application.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Progress
                            value={application.progress}
                            className="h-2 w-24"
                          />
                          <span className="text-xs ml-2">
                            {application.progress}%
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    {expandedApplication === application.id && (
                      <CardContent className="p-4 pt-0 border-t mt-2">
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-sm font-medium">
                              Application Steps
                            </h4>
                            <a
                              href={application.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs flex items-center text-blue-600 hover:underline"
                            >
                              View Job Posting{" "}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                          <div className="space-y-3">
                            {application.steps.map((step) => (
                              <div key={step.id} className="flex items-start">
                                <div className="mr-3 mt-0.5">
                                  {getStepIcon(step.status)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <div className="font-medium text-sm">
                                      {step.description}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {step.timestamp}
                                    </div>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {step.details}
                                  </p>
                                  {step.requiresAction && (
                                    <div className="mt-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 text-xs"
                                      >
                                        Complete Required Action
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                    <X className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No applications found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Other tab contents would be similar but filtered by status */}
          <TabsContent value="pending" className="mt-4">
            <div className="space-y-4">
              {filteredApplications.filter((app) => app.status === "pending")
                .length > 0 ? (
                filteredApplications
                  .filter((app) => app.status === "pending")
                  .map((application) => (
                    // Same card structure as above
                    <Card key={application.id} className="overflow-hidden">
                      {/* Card content same as above */}
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {application.position}
                            </CardTitle>
                            <div className="text-sm text-muted-foreground mt-1">
                              {application.companyName}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(application.status)}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => toggleExpand(application.id)}
                            >
                              {expandedApplication === application.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-muted-foreground">
                            Applied:{" "}
                            {new Date(application.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Progress
                              value={application.progress}
                              className="h-2 w-24"
                            />
                            <span className="text-xs ml-2">
                              {application.progress}%
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                    <X className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">
                    No pending applications
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    All your applications are in other stages
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Similar structure for other tabs */}
          <TabsContent value="applied" className="mt-4">
            {/* Similar content for applied applications */}
          </TabsContent>
          <TabsContent value="interview" className="mt-4">
            {/* Similar content for interview applications */}
          </TabsContent>
          <TabsContent value="rejected" className="mt-4">
            {/* Similar content for rejected applications */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApplicationLog;
