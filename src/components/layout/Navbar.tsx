
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { categories } from "@/lib/data";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = 0; // This will be dynamic in the future

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-serif text-2xl font-bold text-niraa-600">Niraa</span>
            <span className="ml-1 text-sm font-medium text-spice-600">
              Dryfruits & Spices
            </span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative w-64">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Categories</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link to={`/category/${category.slug}`} className="w-full">
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-niraa-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Account */}
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Categories</h3>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="py-2 px-2 hover:bg-accent rounded-md text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="flex space-x-2">
              <Link to="/cart" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
              </Link>
              <Link to="/login" className="flex-1">
                <Button className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
