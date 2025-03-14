
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Leaf, ShieldCheck } from "lucide-react";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading) {
      console.log("AdminRoute check - User:", user?.id, "IsAdmin:", isAdmin);
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/login", { state: { from: "/admin" } });
      } else if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You do not have permission to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [user, isAdmin, isLoading, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-herbal-green animate-pulse mr-2" />
            <ShieldCheck className="h-10 w-10 text-herbal-green animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return user && isAdmin ? <>{children}</> : null;
};

export default AdminRoute;
