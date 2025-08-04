import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, TrendingUp, BookOpen } from "lucide-react";

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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your AI-Generated Career Guide
        </h2>
        <p className="text-muted-foreground mt-2">
          Personalized recommendations based on your profile
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              Recommended Job Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.jobRoles.map((role, index) => (
                <Badge key={index} variant="secondary" className="w-full justify-start p-3 text-sm">
                  {role}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5 text-primary" />
              Resume Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.resumeTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  {step}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIResults;