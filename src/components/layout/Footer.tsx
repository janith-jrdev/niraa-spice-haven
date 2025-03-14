
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-niraa-50 border-t">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold text-niraa-600">Niraa</span>
              <span className="ml-1 text-sm font-medium text-spice-600">
                Dryfruits & Spices
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium quality dry fruits and authentic spices sourced directly from farms.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-niraa-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-niraa-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-niraa-600 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-medium text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/dryfruits" className="text-muted-foreground hover:text-niraa-600 transition-colors">
                  Dry Fruits
                </Link>
              </li>
              <li>
                <Link to="/category/spices" className="text-muted-foreground hover:text-niraa-600 transition-colors">
                  Spices
                </Link>
              </li>
              <li>
                <Link to="/category/wholesale" className="text-muted-foreground hover:text-niraa-600 transition-colors">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-niraa-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-niraa-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif font-medium text-lg">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5 text-niraa-600" />
                <span className="text-muted-foreground">
                  123 Spice Market, Niraa Street<br />Delhi, India - 110001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-niraa-600" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-niraa-600" />
                <span className="text-muted-foreground">info@niraaspices.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif font-medium text-lg">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for offers and updates.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-white" 
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-muted/30 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Niraa Dryfruits & Spices. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
