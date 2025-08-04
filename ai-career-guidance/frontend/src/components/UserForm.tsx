import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, Target } from "lucide-react";
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
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Target className="w-6 h-6 text-primary" />
          Tell Us About Yourself
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <SkillsInput
            skills={formData.skills}
            onSkillsChange={(skills) => setFormData({ ...formData, skills })}
          />

          <InterestsSelect
            interests={formData.interests}
            onInterestsChange={(interests) => setFormData({ ...formData, interests })}
          />

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
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

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              What's your current goal?
            </label>
            <RadioGroup 
              value={formData.goal} 
              onValueChange={(goal) => setFormData({ ...formData, goal })}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="internship" id="internship" />
                <Label htmlFor="internship">Internship</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="job" id="job" />
                <Label htmlFor="job">Job</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="higher-studies" id="higher-studies" />
                <Label htmlFor="higher-studies">Higher Studies</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-sure" id="not-sure" />
                <Label htmlFor="not-sure">Not Sure</Label>
              </div>
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