
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isWholesale, setIsWholesale] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully");
      navigate("/");
    }, 1500);
  };

  const handleSocialRegister = (provider: string) => {
    setIsLoading(true);
    
    // In a real app, this would redirect to social login
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Registered with ${provider}`);
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="py-12">
        <div className="container-custom max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground mt-2">
              Join Niraa to enjoy exclusive offers and faster checkout
            </p>
          </div>

          <div className="bg-white p-8 border rounded-lg shadow-sm">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="wholesale" 
                  checked={isWholesale} 
                  onCheckedChange={(checked) => setIsWholesale(checked as boolean)} 
                />
                <label 
                  htmlFor="wholesale" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Register as a wholesale customer
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms} 
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
                  required
                />
                <label 
                  htmlFor="terms" 
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-niraa-600 hover:text-niraa-700">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-niraa-600 hover:text-niraa-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-niraa-600 hover:bg-niraa-700"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialRegister("Google")}
                  disabled={isLoading}
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialRegister("WhatsApp")}
                  disabled={isLoading}
                >
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-niraa-600 hover:text-niraa-700 font-medium"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
