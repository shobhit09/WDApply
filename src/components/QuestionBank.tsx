import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  isNew: boolean;
  dateAdded: string;
}

const QuestionBank = ({
  questions = defaultQuestions,
}: {
  questions?: Question[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Filter questions based on search query and active tab
  React.useEffect(() => {
    let filtered = questions;

    // Filter by tab
    if (activeTab !== "all") {
      if (activeTab === "new") {
        filtered = filtered.filter((q) => q.isNew);
      } else {
        filtered = filtered.filter((q) => q.category === activeTab);
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredQuestions(filtered);
  }, [searchQuery, activeTab, questions]);

  const handleAddQuestion = () => {
    setSelectedQuestion({
      id: `q-${Date.now()}`,
      question: "",
      answer: "",
      category: "general",
      isNew: false,
      dateAdded: new Date().toISOString(),
    });
    setEditMode(true);
    setIsDialogOpen(true);
  };

  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setEditMode(true);
    setIsDialogOpen(true);
  };

  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setEditMode(false);
    setIsDialogOpen(true);
  };

  const categories = [
    "general",
    "experience",
    "skills",
    "education",
    "personal",
  ];

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Question Bank</CardTitle>
            <CardDescription>
              Manage your application questions and answers
            </CardDescription>
          </div>
          <Button onClick={handleAddQuestion}>
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions or answers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
              <SelectItem value="new">New Questions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">
              New
              <Badge variant="secondary" className="ml-1">
                {questions.filter((q) => q.isNew).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No questions found. Add a question to get started.
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onEdit={handleEditQuestion}
                  onView={handleViewQuestion}
                />
              ))
            )}
          </TabsContent>

          {[
            "new",
            "general",
            "experience",
            "skills",
            "education",
            "personal",
          ].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No {tab} questions found.
                </div>
              ) : (
                filteredQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onEdit={handleEditQuestion}
                    onView={handleViewQuestion}
                  />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editMode ? (selectedQuestion?.id ? "Edit" : "Add") : "View"}{" "}
              Question
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? "Provide a clear question and comprehensive answer for job applications."
                : "Review the question and answer details."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="question" className="text-sm font-medium">
                Question
              </label>
              <Input
                id="question"
                value={selectedQuestion?.question || ""}
                onChange={(e) =>
                  selectedQuestion &&
                  setSelectedQuestion({
                    ...selectedQuestion,
                    question: e.target.value,
                  })
                }
                disabled={!editMode}
                placeholder="Enter the application question"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="answer" className="text-sm font-medium">
                Answer
              </label>
              <Textarea
                id="answer"
                rows={5}
                value={selectedQuestion?.answer || ""}
                onChange={(e) =>
                  selectedQuestion &&
                  setSelectedQuestion({
                    ...selectedQuestion,
                    answer: e.target.value,
                  })
                }
                disabled={!editMode}
                placeholder="Enter your answer to this question"
              />
            </div>
            {editMode && (
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select
                  value={selectedQuestion?.category}
                  onValueChange={(value) =>
                    selectedQuestion &&
                    setSelectedQuestion({
                      ...selectedQuestion,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            {editMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Save</Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  Edit
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const QuestionCard = ({
  question,
  onEdit,
  onView,
}: {
  question: Question;
  onEdit: (question: Question) => void;
  onView: (question: Question) => void;
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-lg mb-1 flex items-center">
              {question.question}
              {question.isNew && (
                <Badge className="ml-2" variant="destructive">
                  New
                </Badge>
              )}
            </h3>
            <p className="text-muted-foreground line-clamp-2">
              {question.answer}
            </p>
          </div>
          <div className="flex space-x-2 ml-4">
            <Button variant="ghost" size="sm" onClick={() => onView(question)}>
              View
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(question)}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Badge variant="outline">{question.category}</Badge>
          <span className="text-xs text-muted-foreground">
            Added {new Date(question.dateAdded).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

// Sample data
const defaultQuestions: Question[] = [
  {
    id: "q1",
    question: "What are your greatest strengths?",
    answer:
      "My greatest strengths include my analytical thinking, problem-solving abilities, and strong communication skills. I excel at breaking down complex problems and finding efficient solutions.",
    category: "general",
    isNew: false,
    dateAdded: "2023-05-15T10:30:00Z",
  },
  {
    id: "q2",
    question:
      "Describe a challenging project you worked on and how you overcame obstacles.",
    answer:
      "In my previous role, I led a team that was tasked with implementing a new CRM system with a tight deadline. We faced significant resistance to change and technical integration issues. I addressed this by creating a comprehensive training program and establishing a feedback loop with end-users.",
    category: "experience",
    isNew: false,
    dateAdded: "2023-06-20T14:45:00Z",
  },
  {
    id: "q3",
    question: "How do you handle working under pressure?",
    answer:
      "I thrive under pressure by maintaining organization, prioritizing tasks, and focusing on one thing at a time. I use time management techniques like the Pomodoro method to maintain productivity during high-stress periods.",
    category: "general",
    isNew: false,
    dateAdded: "2023-07-05T09:15:00Z",
  },
  {
    id: "q4",
    question: "What programming languages are you proficient in?",
    answer:
      "I am proficient in JavaScript/TypeScript, Python, and Java. I have extensive experience with React, Node.js, and various AWS services for building scalable web applications.",
    category: "skills",
    isNew: false,
    dateAdded: "2023-08-12T16:20:00Z",
  },
  {
    id: "q5",
    question: "Where do you see yourself in 5 years?",
    answer:
      "In five years, I aim to have deepened my expertise in my field, taken on leadership responsibilities, and contributed significantly to company growth. I'm passionate about continuous learning and hope to mentor others in my area of expertise.",
    category: "general",
    isNew: true,
    dateAdded: "2023-09-30T11:10:00Z",
  },
  {
    id: "q6",
    question: "Describe your experience with agile development methodologies.",
    answer:
      "I have worked in Scrum teams for over 4 years, serving as both a team member and Scrum Master. I'm experienced with sprint planning, daily stand-ups, retrospectives, and continuous integration practices.",
    category: "experience",
    isNew: true,
    dateAdded: "2023-10-05T13:25:00Z",
  },
];

export default QuestionBank;
