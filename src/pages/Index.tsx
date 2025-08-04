import { useState } from "react";
import Header from "@/components/Header";
import UserForm, { UserFormData } from "@/components/UserForm";
import AIResults, { AIResultsData } from "@/components/AIResults";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Mock AI function to generate results
const generateAIResults = (data: UserFormData): AIResultsData => {
  const { skills, interests, education, goal } = data;
  
  // Simple logic to generate realistic results based on input
  const jobRoles: string[] = [];
  const resumeTips: string[] = [];
  const nextSteps: string[] = [];

  // Generate job roles based on interests and skills
  if (interests.includes("Web Development") || skills.some(s => s.toLowerCase().includes("web"))) {
    jobRoles.push("Frontend Developer", "Full Stack Developer", "Web Designer");
  }
  if (interests.includes("Data Science") || skills.some(s => s.toLowerCase().includes("python") || s.toLowerCase().includes("data"))) {
    jobRoles.push("Data Analyst", "Data Scientist", "Machine Learning Engineer");
  }
  if (interests.includes("Cybersecurity")) {
    jobRoles.push("Security Analyst", "Penetration Tester", "Security Consultant");
  }
  if (interests.includes("Artificial Intelligence") || skills.some(s => s.toLowerCase().includes("ai") || s.toLowerCase().includes("machine learning"))) {
    jobRoles.push("AI Engineer", "ML Research Scientist", "AI Product Manager");
  }
  
  // Default fallback roles
  if (jobRoles.length === 0) {
    jobRoles.push("Software Developer", "Technical Analyst", "IT Consultant");
  }

  // Generate resume tips
  resumeTips.push(
    `Highlight your ${skills.slice(0, 3).join(", ")} skills prominently in your skills section`,
    "Include quantifiable achievements and project outcomes",
    "Tailor your resume to match job descriptions in your target field",
    "Add relevant certifications and continuous learning initiatives"
  );

  if (goal === "internship") {
    resumeTips.push("Emphasize your academic projects and any practical experience");
  } else if (goal === "job") {
    resumeTips.push("Focus on professional experience and measurable results");
  }

  // Generate next steps
  if (education === "high-school" || education === "diploma") {
    nextSteps.push("Consider pursuing relevant certifications or a degree program");
  }
  
  nextSteps.push(
    "Build a portfolio showcasing your projects and skills",
    "Network with professionals in your field of interest",
    "Apply for relevant positions on job portals and company websites",
    "Continuously update your skills through online courses and practice"
  );

  if (goal === "higher-studies") {
    nextSteps.push("Research graduate programs aligned with your interests", "Prepare for entrance exams if required");
  }

  return { jobRoles, resumeTips, nextSteps };
};

const Index = () => {
  const [results, setResults] = useState<AIResultsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const aiResults = generateAIResults(data);
      setResults(aiResults);
      
      toast({
        title: "Success!",
        description: "Your AI career suggestions have been generated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="py-12 px-6">
        {!results ? (
          <UserForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        ) : (
          <div className="space-y-8">
            <AIResults results={results} />
            <div className="text-center">
              <button
                onClick={handleNewAnalysis}
                className="text-primary hover:underline font-medium"
              >
                ← Start New Analysis
              </button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
