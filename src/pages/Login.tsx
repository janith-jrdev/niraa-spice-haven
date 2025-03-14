
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Logged in successfully");
      navigate("/");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // In a real app, this would redirect to social login
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Logged in with ${provider}`);
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="py-12">
        <div className="container-custom max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Login to your account to continue shopping
            </p>
          </div>

          <div className="bg-white p-8 border rounded-lg shadow-sm">
            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-niraa-600 hover:text-niraa-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-niraa-600 hover:bg-niraa-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("Google")}
                  disabled={isLoading}
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("WhatsApp")}
                  disabled={isLoading}
                >
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="text-niraa-600 hover:text-niraa-700 font-medium"
                >
                  Sign Up
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

export default Login;
