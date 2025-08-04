import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-primary text-primary-foreground py-8 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-primary-glow" />
          <h1 className="text-4xl font-bold">AI Resume Guide</h1>
        </div>
        <p className="text-lg opacity-90">
          Get smart resume tips and job suggestions with AI
        </p>
      </div>
    </header>
  );
};

export default Header;