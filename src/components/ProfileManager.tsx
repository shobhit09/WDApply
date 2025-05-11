import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2, Upload, Save, FileText } from "lucide-react";
import QuestionBank from "./QuestionBank";

interface ProfileData {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  resume: {
    url: string;
    filename: string;
  };
  workHistory: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: Array<string>;
}

const ProfileManager = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState<ProfileData>({
    personal: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.com",
    },
    resume: {
      url: "",
      filename: "resume.pdf",
    },
    workHistory: [
      {
        id: "1",
        title: "Software Engineer",
        company: "Tech Company Inc.",
        location: "San Francisco, CA",
        startDate: "2020-01",
        endDate: "2023-01",
        description:
          "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software products.",
      },
      {
        id: "2",
        title: "Junior Developer",
        company: "Startup XYZ",
        location: "San Francisco, CA",
        startDate: "2018-06",
        endDate: "2019-12",
        description:
          "Assisted in the development of web applications and fixed bugs in existing codebase.",
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "HTML/CSS",
      "Git",
      "Agile Methodology",
    ],
  });

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      personal: {
        ...profileData.personal,
        [name]: value,
      },
    });
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileData({
        ...profileData,
        resume: {
          url: URL.createObjectURL(file),
          filename: file.name,
        },
      });
    }
  };

  const addWorkHistory = () => {
    const newId = Date.now().toString();
    setProfileData({
      ...profileData,
      workHistory: [
        ...profileData.workHistory,
        {
          id: newId,
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const updateWorkHistory = (id: string, field: string, value: string) => {
    setProfileData({
      ...profileData,
      workHistory: profileData.workHistory.map((job) =>
        job.id === id ? { ...job, [field]: value } : job,
      ),
    });
  };

  const removeWorkHistory = (id: string) => {
    setProfileData({
      ...profileData,
      workHistory: profileData.workHistory.filter((job) => job.id !== id),
    });
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !profileData.skills.includes(skill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skill.trim()],
      });
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((s) => s !== skill),
    });
  };

  const saveProfile = () => {
    // In a real app, this would save to a backend
    console.log("Saving profile:", profileData);
    // Show success message
    alert("Profile saved successfully!");
  };

  return (
    <div className="bg-background w-full max-w-4xl mx-auto p-4 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Profile Manager</h1>
          <p className="text-muted-foreground">
            Complete your profile to enable automated job applications
          </p>
        </div>
        <Button onClick={saveProfile} className="flex items-center gap-2">
          <Save size={16} />
          Save Profile
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="work">Work History</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Enter your personal details that will be used in job
                applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
                    alt="Profile"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="mb-2">
                    <Upload size={14} className="mr-2" /> Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Recommended: 400x400px JPG or PNG
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={profileData.personal.firstName}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={profileData.personal.lastName}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.personal.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.personal.phone}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State"
                  value={profileData.personal.location}
                  onChange={handlePersonalInfoChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={profileData.personal.linkedin}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={profileData.personal.website}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resume" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resume Management</CardTitle>
              <CardDescription>
                Upload your resume that will be used for job applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                {profileData.resume.url ? (
                  <div className="flex flex-col items-center">
                    <FileText size={48} className="text-primary mb-2" />
                    <p className="font-medium">{profileData.resume.filename}</p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={profileData.resume.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Preview
                        </a>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          setProfileData({
                            ...profileData,
                            resume: { url: "", filename: "" },
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload size={48} className="text-muted-foreground mb-2" />
                    <p className="text-lg font-medium mb-2">
                      Drag and drop your resume here
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">or</p>
                    <Button variant="secondary" className="relative">
                      Browse Files
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                      />
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">
                      Supported formats: PDF, DOC, DOCX
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Resume Tips</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Keep your resume to 1-2 pages</li>
                  <li>Use bullet points to highlight achievements</li>
                  <li>Tailor your resume to each job application</li>
                  <li>Include relevant keywords from the job description</li>
                  <li>Proofread carefully for errors</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Work History</CardTitle>
              <CardDescription>
                Add your work experience to be included in job applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-6">
                  {profileData.workHistory.map((job, index) => (
                    <div key={job.id} className="space-y-4 pb-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">
                          Position {index + 1}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkHistory(job.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`title-${job.id}`}>Job Title</Label>
                          <Input
                            id={`title-${job.id}`}
                            value={job.title}
                            onChange={(e) =>
                              updateWorkHistory(job.id, "title", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`company-${job.id}`}>Company</Label>
                          <Input
                            id={`company-${job.id}`}
                            value={job.company}
                            onChange={(e) =>
                              updateWorkHistory(
                                job.id,
                                "company",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`location-${job.id}`}>Location</Label>
                        <Input
                          id={`location-${job.id}`}
                          value={job.location}
                          onChange={(e) =>
                            updateWorkHistory(
                              job.id,
                              "location",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${job.id}`}>
                            Start Date
                          </Label>
                          <Input
                            id={`startDate-${job.id}`}
                            type="month"
                            value={job.startDate}
                            onChange={(e) =>
                              updateWorkHistory(
                                job.id,
                                "startDate",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${job.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${job.id}`}
                            type="month"
                            value={job.endDate}
                            onChange={(e) =>
                              updateWorkHistory(
                                job.id,
                                "endDate",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${job.id}`}>
                          Description
                        </Label>
                        <Textarea
                          id={`description-${job.id}`}
                          rows={4}
                          value={job.description}
                          onChange={(e) =>
                            updateWorkHistory(
                              job.id,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>

                      {index < profileData.workHistory.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full mt-4 flex items-center justify-center gap-2"
                    onClick={addWorkHistory}
                  >
                    <PlusCircle size={16} />
                    Add Work Experience
                  </Button>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>
                Add your technical and professional skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    id="newSkill"
                    placeholder="Add a new skill..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addSkill((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      const input = document.getElementById(
                        "newSkill",
                      ) as HTMLInputElement;
                      addSkill(input.value);
                      input.value = "";
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {profileData.skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-secondary-foreground/70 hover:text-secondary-foreground"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recommended Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "SQL",
                    "AWS",
                    "Docker",
                    "UI/UX Design",
                    "Project Management",
                    "Communication",
                  ].map(
                    (skill) =>
                      !profileData.skills.includes(skill) && (
                        <Button
                          key={skill}
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => addSkill(skill)}
                        >
                          + {skill}
                        </Button>
                      ),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Skills Tips</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Include both technical and soft skills</li>
                  <li>Prioritize skills mentioned in job descriptions</li>
                  <li>Be honest about your proficiency level</li>
                  <li>Update your skills regularly as you learn new ones</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          <QuestionBank />
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={saveProfile} className="flex items-center gap-2">
          <Save size={16} />
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileManager;
