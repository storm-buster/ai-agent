import { useState } from "react";
import Header from "@/components/Header";
import UserForm, { UserFormData } from "@/components/UserForm";
import AIResults, { AIResultsData } from "@/components/AIResults";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [results, setResults] = useState<AIResultsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/generate-guidance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const aiResults = await response.json();
      setResults(aiResults);

      toast({
        title: "Success!",
        description: "Your AI career suggestions have been generated.",
      });
    } catch (error) {
      console.error("Failed to fetch AI results:", error);
      toast({
        title: "Error",
        description: "Failed to generate suggestions. Please check the backend server and try again.",
        variant: "destructive",
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
        <div className="animate-fade-in">
          {!results ? (
            <UserForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          ) : (
            <div className="space-y-8 animate-fade-up">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
