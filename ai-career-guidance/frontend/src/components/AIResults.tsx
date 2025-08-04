import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, TrendingUp } from "lucide-react";

export interface AIResultsData {
  jobRoles: string[];
  resumeTips: string[];
  nextSteps: string[];
}

interface AIResultsProps {
  results: AIResultsData;
}

const AIResults = ({ results }: AIResultsProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8 animate-fade-up">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your AI-Generated Career Guide
        </h2>
        <p className="text-muted-foreground mt-2">
          Personalized recommendations based on your profile
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <div className="space-y-8">
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-primary" />
                Recommended Job Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {results.jobRoles.map((role, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="p-3 text-sm transition-transform hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-5 h-5 text-primary" />
                Resume Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {results.resumeTips.map((tip, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 text-sm animate-fade-in-stagger"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-up lg:col-span-1" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
              Your Action Plan: Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-primary/20 space-y-6">
              {results.nextSteps.map((step, index) => (
                <li 
                  key={index} 
                  className="ml-6 animate-fade-in-stagger"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-background text-primary">
                    {index + 1}
                  </span>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm font-medium text-foreground">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIResults;