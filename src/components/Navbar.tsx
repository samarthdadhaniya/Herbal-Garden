
import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Menu, X, Search, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // This is just a placeholder. We'll implement actual authentication later
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Plants", path: "/plants" },
    { name: "Virtual Garden", path: "/garden" },
    { name: "Virtual Tours", path: "/tours" },
    { name: "About AYUSH", path: "/about" },
  ];

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            to={link.path}
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-herbal-leaf animate-leaf-sway" />
            <span className="font-playfair text-xl font-bold">AYUSH Herbal Garden</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-6">
              <NavItems />
            </ul>
          </nav>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {isLoggedIn ? (
            <Button variant="ghost" size="icon" aria-label="Profile">
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Log In
              </Link>
            </Button>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <Link to="/" className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-herbal-leaf" />
                      <span className="font-playfair text-lg font-bold">AYUSH Garden</span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close navigation menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="flex-grow py-8">
                    <ul className="flex flex-col gap-6">
                      <NavItems />
                    </ul>
                  </nav>
                  <div className="border-t pt-4">
                    {!isLoggedIn && (
                      <Button className="w-full" asChild>
                        <Link to="/login">
                          <LogIn className="h-4 w-4 mr-2" />
                          Log In
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
