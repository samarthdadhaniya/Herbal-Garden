
import { Link } from "react-router-dom";
import { Leaf, Github, Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-herbal-leaf" />
              <span className="font-playfair text-lg font-bold">AYUSH Herbal Garden</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              An interactive virtual garden showcasing medicinal plants from the ancient AYUSH systems of medicine.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/samarthdadhaniya/" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="mailto:samarthdadhaniya7@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/garden" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  3D Garden
                </Link>
              </li>
              <li>
                <Link to="/plants" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Plant Database
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Virtual Tours
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About AYUSH
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">AYUSH Systems</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/plants?system=ayurveda" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Ayurveda
                </Link>
              </li>
              <li>
                <Link to="/plants?system=yoga" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Yoga & Naturopathy
                </Link>
              </li>
              <li>
                <Link to="/plants?system=unani" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Unani
                </Link>
              </li>
              <li>
                <Link to="/plants?system=siddha" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Siddha
                </Link>
              </li>
              <li>
                <Link to="/plants?system=homeopathy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Homeopathy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Bookmarked Plants
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AYUSH Herbal Garden. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
