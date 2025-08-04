import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface InterestsSelectProps {
  interests: string[];
  onInterestsChange: (interests: string[]) => void;
}

const interestOptions = [
  "Artificial Intelligence",
  "Web Development",
  "Data Science",
  "Cybersecurity",
  "Mobile Development",
  "Cloud Computing",
  "Machine Learning",
  "UI/UX Design",
  "DevOps",
  "Blockchain",
  "Game Development",
  "Digital Marketing",
  "Project Management",
  "Software Testing",
  "Network Administration"
];

const InterestsSelect = ({ interests, onInterestsChange }: InterestsSelectProps) => {
  const [open, setOpen] = useState(false);

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      onInterestsChange(interests.filter(i => i !== interest));
    } else {
      onInterestsChange([...interests, interest]);
    }
  };

  const removeInterest = (interest: string) => {
    onInterestsChange(interests.filter(i => i !== interest));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Select your career interests
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {interests.length === 0 ? "Select interests..." : `${interests.length} interest(s) selected`}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search interests..." />
            <CommandList>
              <CommandEmpty>No interests found.</CommandEmpty>
              <CommandGroup>
                {interestOptions.map((interest) => (
                  <CommandItem
                    key={interest}
                    value={interest}
                    onSelect={() => toggleInterest(interest)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        interests.includes(interest) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {interest}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {interests.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <Badge 
              key={interest} 
              variant="secondary" 
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => removeInterest(interest)}
            >
              {interest} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterestsSelect;