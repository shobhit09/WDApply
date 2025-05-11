import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

interface JobUrlInputProps {
  onSubmit?: (url: string) => void;
  isProfileComplete?: boolean;
}

const JobUrlInput = ({
  onSubmit = () => {},
  isProfileComplete = true,
}: JobUrlInputProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobAnalyzed, setJobAnalyzed] = useState(false);

  const validateUrl = (input: string) => {
    try {
      new URL(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    setIsValid(null);
    setError(null);
    setJobAnalyzed(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a job posting URL");
      setIsValid(false);
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate job posting analysis
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsValid(true);
      setJobAnalyzed(true);
      onSubmit(url);
    } catch (err) {
      setError("Failed to analyze job posting. Please try again.");
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-background">
      <Card>
        <CardHeader>
          <CardTitle>Add Job Posting</CardTitle>
          <CardDescription>
            Paste a job posting URL to start the automated application process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="https://example.com/job-posting"
                  value={url}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${isValid === false ? "border-red-500" : ""}`}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isValid && jobAnalyzed && (
              <Alert
                className={isProfileComplete ? "bg-green-50" : "bg-amber-50"}
              >
                {isProfileComplete ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle>Job posting analyzed successfully</AlertTitle>
                    <AlertDescription>
                      Your profile is complete for this job. The system will now
                      begin the automated application process.
                    </AlertDescription>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <AlertTitle>Profile incomplete</AlertTitle>
                    <AlertDescription>
                      Some information is missing from your profile that is
                      required for this job application. Please update your
                      profile before proceeding.
                    </AlertDescription>
                  </>
                )}
              </Alert>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            The system will automatically create an account, upload your resume,
            and fill in application details.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            View Guide
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobUrlInput;
