import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, Target, Briefcase, GraduationCap, Star, Lightbulb, Code, School } from "lucide-react";
import SkillsInput from "./SkillsInput";
import InterestsSelect from "./InterestsSelect";
import { useToast } from "@/hooks/use-toast";

export interface UserFormData {
  skills: string[];
  interests: string[];
  education: string;
  goal: string;
}

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  isLoading: boolean;
}

const UserForm = ({ onSubmit, isLoading }: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    skills: [],
    interests: [],
    education: "",
    goal: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.skills.length === 0) {
      toast({
        title: "Skills Required",
        description: "Please add at least one skill.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.interests.length === 0) {
      toast({
        title: "Interests Required", 
        description: "Please select at least one career interest.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.education) {
      toast({
        title: "Education Required",
        description: "Please select your education level.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.goal) {
      toast({
        title: "Goal Required",
        description: "Please select your career goal.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card animate-fade-up">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Target className="w-6 h-6 text-primary" />
          Tell Us About Yourself
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <SkillsInput
              skills={formData.skills}
              onSkillsChange={(skills) => setFormData({ ...formData, skills })}
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <InterestsSelect
              interests={formData.interests}
              onInterestsChange={(interests) => setFormData({ ...formData, interests })}
            />
          </div>

          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Your education level
            </label>
            <Select value={formData.education} onValueChange={(education) => setFormData({ ...formData, education })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="btech">B.Tech / Bachelor's</SelectItem>
                <SelectItem value="mtech">M.Tech / Master's</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Star className="w-4 h-4" />
              What's your current goal?
            </label>
            <RadioGroup 
              value={formData.goal} 
              onValueChange={(goal) => setFormData({ ...formData, goal })}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <Label htmlFor="internship" className="cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all">
                <RadioGroupItem value="internship" id="internship" className="sr-only" />
                <Briefcase className="w-6 h-6 mb-2 text-primary" />
                <span className="font-semibold">Internship</span>
              </Label>
              <Label htmlFor="job" className="cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all">
                <RadioGroupItem value="job" id="job" className="sr-only" />
                <Code className="w-6 h-6 mb-2 text-primary" />
                <span className="font-semibold">Job</span>
              </Label>
              <Label htmlFor="higher-studies" className="cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all">
                <RadioGroupItem value="higher-studies" id="higher-studies" className="sr-only" />
                <School className="w-6 h-6 mb-2 text-primary" />
                <span className="font-semibold">Higher Studies</span>
              </Label>
              <Label htmlFor="not-sure" className="cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all">
                <RadioGroupItem value="not-sure" id="not-sure" className="sr-only" />
                <Lightbulb className="w-6 h-6 mb-2 text-primary" />
                <span className="font-semibold">Not Sure</span>
              </Label>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full"
            variant="gradient"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Generating AI Suggestions...
              </>
            ) : (
              "Get AI Suggestions"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;