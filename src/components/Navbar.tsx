
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Menu, X, Search, LogIn, LogOut, ChevronDown, ShieldCheck, User, ScanFace, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Use the auth context
  const { user, isAdmin, signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/plants?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Main navigation items - limited to 3 + Others dropdown
  const mainNavLinks = [
    { name: "Home", path: "/" },
    { name: "Plants", path: "/plants" },
    { name: "Virtual Garden", path: "/garden", requiresAuth: true },
  ];

  // Items for the "Others" dropdown
  const otherNavLinks = [
    { name: "Virtual Tours", path: "/tours" },
    { name: "About AYUSH", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Effect to redirect admin users to the admin panel on login
  useEffect(() => {
    if (isAdmin && window.location.pathname === "/") {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  const NavItems = () => (
    <>
      {mainNavLinks.map((link) => (
        <li key={link.name}>
          <Link
            to={link.path}
            className="text-foreground hover:text-primary transition-colors duration-200"
            onClick={(e) => {
              if (link.requiresAuth && !user) {
                e.preventDefault();
                toast({
                  title: "Authentication Required",
                  description: "Please log in to access this feature.",
                  variant: "destructive",
                });
                navigate("/login");
              }
            }}
          >
            {link.name}
          </Link>
        </li>
      ))}
      <li>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 h-auto font-normal hover:bg-transparent">
              <span className="text-foreground hover:text-primary transition-colors duration-200 flex items-center">
                Others <ChevronDown className="ml-1 h-4 w-4" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background border border-border">
            {otherNavLinks.map((link) => (
              <DropdownMenuItem key={link.name} asChild>
                <Link to={link.path} className="cursor-pointer">
                  {link.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    </>
  );

  return (
    <>
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
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin" className="flex items-center">
                      <ShieldCheck className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/profile">
                      <Flower2 className="h-4 w-4" />
                        My Garden
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/login">
                  <ScanFace className="h-4 w-4 mr-1" />
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
                        {mainNavLinks.map((link) => (
                          <li key={link.name}>
                            <Link
                              to={link.path}
                              className="text-foreground hover:text-primary transition-colors duration-200"
                              onClick={(e) => {
                                if (link.requiresAuth && !user) {
                                  e.preventDefault();
                                  toast({
                                    title: "Authentication Required",
                                    description: "Please log in to access this feature.",
                                    variant: "destructive",
                                  });
                                  navigate("/login");
                                }
                              }}
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                        {otherNavLinks.map((link) => (
                          <li key={link.name}>
                            <Link
                              to={link.path}
                              className="text-foreground hover:text-primary transition-colors duration-200"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <div className="border-t pt-4">
                      {!user ? (
                        <Button className="w-full" asChild>
                          <Link to="/login">
                            <LogIn className="h-4 w-4 mr-2" />
                            Log In
                          </Link>
                        </Button>
                      ) : isAdmin ? (
                        <Button className="w-full" asChild>
                          <Link to="/admin" className="flex items-center justify-center">
                            <ShieldCheck className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        </Button>
                      ) : (
                        <Button className="w-full" variant="destructive" onClick={handleLogout}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
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

      {/* Overlay Search */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-lg p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Search Plants</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for plants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsSearchOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Search</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
