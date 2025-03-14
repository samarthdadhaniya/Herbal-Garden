import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Edit,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Users,
  Leaf,
  Route,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Plant form schema
const plantFormSchema = z.object({
  name: z.string().min(2, { message: "Plant name must be at least 2 characters." }),
  scientificName: z.string().min(2, { message: "Scientific name is required." }),
  system: z.string().min(1, { message: "AYUSH system is required." }),
  category: z.string().optional(),
  description: z.string().optional(),
  uses: z.string().optional(),
  growthInfo: z.string().optional(),
  imageUrl: z.string().optional(),
  benefits: z.string().optional(),
  history: z.string().optional(),
  precautions: z.string().optional(),
  modelUrl: z.string().optional(),
});

// Tour form schema
const tourFormSchema = z.object({
  name: z.string().min(2, { message: "Tour name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  duration: z.string().min(1, { message: "Duration is required." }),
  imageUrl: z.string().optional(),
});

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, user } = useAuth();
  const queryClient = useQueryClient();

  const [activePlantId, setActivePlantId] = useState<string | null>(null);
  const [activeTourId, setActiveTourId] = useState<string | null>(null);
  const [plants, setPlants] = useState<any[]>([]);
  const [tours, setTours] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPlantDialogOpen, setIsAddPlantDialogOpen] = useState(true);
  const [isAddTourDialogOpen, setIsAddTourDialogOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'plant' | 'tour' } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    plantCount: 0,
    tourCount: 0,
    userCount: 0,
  });

  // Plant form
  const plantForm = useForm<z.infer<typeof plantFormSchema>>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: {
      name: "",
      scientificName: "",
      system: "",
      category: "",
      description: "",
      uses: "",
      growthInfo: "",
      imageUrl: "",
      benefits: "",
      history: "",
      precautions: "",
      modelUrl: "",
    },
  });

  // Tour form
  const tourForm = useForm<z.infer<typeof tourFormSchema>>({
    resolver: zodResolver(tourFormSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: "",
      imageUrl: "",
    },
  });

  // Fetch data from Supabase
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch plants
      const { data: plantsData, error: plantsError } = await supabase
        .from('plants')
        .select('*')
        .order('name');
      
      if (plantsError) throw plantsError;
      setPlants(plantsData || []);
      
      // Fetch tours
      const { data: toursData, error: toursError } = await supabase
        .from('tours')
        .select('*')
        .order('name');
      
      if (toursError) throw toursError;
      setTours(toursData || []);
      
      // Fetch users (for admin only)
      if (isAdmin) {
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (usersError) throw usersError;
        setUsers(usersData || []);
      }

      // Update stats
      setStats({
        plantCount: plantsData?.length || 0,
        tourCount: toursData?.length || 0,
        userCount: users.length || 0,
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error fetching data",
        description: "There was a problem loading the admin dashboard data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  // Reset forms when opening add dialogs
  useEffect(() => {
    if (!isAddPlantDialogOpen) {
      setTimeout(() => {
        plantForm.reset();
        setActivePlantId(null);
      }, 300);
    }
  }, [isAddPlantDialogOpen, plantForm]);

  useEffect(() => {
    if (!isAddTourDialogOpen) {
      setTimeout(() => {
        tourForm.reset();
        setActiveTourId(null);
      }, 300);
    }
  }, [isAddTourDialogOpen, tourForm]);

  // Set form values when editing a plant
  const handleEditPlant = async (plant: any) => {
    setActivePlantId(plant.id);
    plantForm.reset({
      name: plant.name,
      scientificName: plant.scientific_name,
      system: plant.system,
      category: plant.category || "",
      description: plant.description || "",
      uses: plant.uses || "",
      growthInfo: plant.growth_info || "",
      imageUrl: plant.image_url || "",
      benefits: plant.benefits || "",
      history: plant.history || "",
      precautions: plant.precautions || "",
      modelUrl: plant.model_url || "",
    });
    setIsAddPlantDialogOpen(true);
  };

  // Set form values when editing a tour
  const handleEditTour = async (tour: any) => {
    setActiveTourId(tour.id);
    tourForm.reset({
      name: tour.name,
      description: tour.description,
      duration: tour.duration,
      imageUrl: tour.image_url || "",
    });
    setIsAddTourDialogOpen(true);
  };

  // Handle plant form submission (create or update)
  const onSubmitPlant = async (values: z.infer<typeof plantFormSchema>) => {
    try {
      if (activePlantId) {
        // Update existing plant
        const { error } = await supabase
          .from('plants')
          .update({
            name: values.name,
            scientific_name: values.scientificName,
            system: values.system,
            category: values.category,
            description: values.description,
            uses: values.uses,
            growth_info: values.growthInfo,
            image_url: values.imageUrl,
            benefits: values.benefits,
            history: values.history,
            precautions: values.precautions,
            model_url: values.modelUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', activePlantId);

        if (error) throw error;
        
        toast({
          title: "Plant Updated",
          description: `${values.name} has been updated successfully.`,
        });
      } else {
        // Create new plant
        const { error } = await supabase
          .from('plants')
          .insert({
            name: values.name,
            scientific_name: values.scientificName,
            system: values.system,
            category: values.category,
            description: values.description,
            uses: values.uses,
            growth_info: values.growthInfo,
            image_url: values.imageUrl,
            benefits: values.benefits,
            history: values.history,
            precautions: values.precautions,
            model_url: values.modelUrl,
          });

        if (error) throw error;
        
        toast({
          title: "Plant Added",
          description: `${values.name} has been added to the database.`,
        });
      }

      // Refresh data and close dialog
      setIsAddPlantDialogOpen(false);
      fetchData();
      queryClient.invalidateQueries({ queryKey: ['plants'] });
    } catch (error) {
      console.error('Error submitting plant:', error);
      toast({
        title: "Error",
        description: "There was a problem saving the plant. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle tour form submission (create or update)
  const onSubmitTour = async (values: z.infer<typeof tourFormSchema>) => {
    try {
      if (activeTourId) {
        // Update existing tour
        const { error } = await supabase
          .from('tours')
          .update({
            name: values.name,
            description: values.description,
            duration: values.duration,
            image_url: values.imageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', activeTourId);

        if (error) throw error;
        
        toast({
          title: "Tour Updated",
          description: `${values.name} has been updated successfully.`,
        });
      } else {
        // Create new tour
        const { error } = await supabase
          .from('tours')
          .insert({
            name: values.name,
            description: values.description,
            duration: values.duration,
            image_url: values.imageUrl,
          });

        if (error) throw error;
        
        toast({
          title: "Tour Added",
          description: `${values.name} has been added to the database.`,
        });
      }

      // Refresh data and close dialog
      setIsAddTourDialogOpen(false);
      fetchData();
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    } catch (error) {
      console.error('Error submitting tour:', error);
      toast({
        title: "Error",
        description: "There was a problem saving the tour. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Confirm delete dialog
  const openConfirmDelete = (id: string, type: 'plant' | 'tour') => {
    setItemToDelete({ id, type });
    setIsConfirmDeleteOpen(true);
  };

  // Handle deletion after confirmation
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      const { id, type } = itemToDelete;
      const table = type === 'plant' ? 'plants' : 'tours';
      
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: `${type === 'plant' ? 'Plant' : 'Tour'} Deleted`,
        description: `The ${type} has been removed successfully.`,
      });
      
      fetchData();
      
      // Invalidate relevant query
      if (type === 'plant') {
        queryClient.invalidateQueries({ queryKey: ['plants'] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['tours'] });
      }
    } catch (error) {
      console.error(`Error deleting ${itemToDelete.type}:`, error);
      toast({
        title: "Error",
        description: `There was a problem deleting the ${itemToDelete.type}.`,
        variant: "destructive"
      });
    } finally {
      setIsConfirmDeleteOpen(false);
      setItemToDelete(null);
    }
  };

  // Filter plants based on search term
  const filteredPlants = plants.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter tours based on search term
  const filteredTours = tours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Stats cards for dashboard
  const statCards = [
    {
      title: "Total Plants",
      value: stats.plantCount,
      icon: Leaf,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Virtual Tours",
      value: stats.tourCount,
      icon: Route,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Registered Users",
      value: stats.userCount,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-6">
              You do not have permission to access this page.
            </p>
            <Button onClick={() => navigate("/")}>
              Return to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-herbal-cream/30">
      <Navbar />
      <main className="flex-grow">
        <section className="py-10">
          <div className="container max-w-7xl">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage AYUSH Herbal Garden content</p>
              </div>
              <div className="hidden sm:block">
                <Button variant="outline" onClick={() => navigate("/home")} className="mr-2">
                  View Website
                </Button>
              </div>
            </div>

            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <Card key={index} className={`hover:shadow-md transition-shadow border-l-4 border-l-${stat.color.split('-')[1]}-500`}>
                  <CardHeader className={`pb-2 ${stat.bgColor}`}>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                      <div className={`rounded-full p-2 ${stat.bgColor}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl font-semibold">Manage AYUSH Garden</h2>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search plants, tours, or users..."
                    className="pl-10 w-full sm:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="plants">
                <TabsList className="mb-6 w-full sm:w-auto">
                  <TabsTrigger value="plants" className="flex items-center">
                    <Leaf className="mr-2 h-4 w-4" />
                    Plants
                  </TabsTrigger>
                  <TabsTrigger value="tours" className="flex items-center">
                    <Route className="mr-2 h-4 w-4" />
                    Virtual Tours
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Users
                  </TabsTrigger>
                </TabsList>

                {isLoading ? (
                  <div className="flex justify-center items-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-herbal-green" />
                    <span className="ml-2 text-muted-foreground">Loading data...</span>
                  </div>
                ) : (
                  <>
                    {/* Plants Tab */}
                    <TabsContent value="plants">
                      <div className="flex justify-end mb-4">
                        <Dialog open={isAddPlantDialogOpen} onOpenChange={setIsAddPlantDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              onClick={() => {
                                plantForm.reset();
                                setActivePlantId(null);
                              }}
                              className="bg-herbal-green-dark hover:bg-herbal-green-dark/80"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add New Plant
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                {activePlantId ? "Edit Plant" : "Add New Plant"}
                              </DialogTitle>
                              <DialogDescription>
                                Fill in the details for the medicinal plant. All fields marked with * are required.
                              </DialogDescription>
                            </DialogHeader>

                            <Form {...plantForm}>
                              <form onSubmit={plantForm.handleSubmit(onSubmitPlant)} className="space-y-4 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={plantForm.control}
                                    name="name"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Name *</FormLabel>
                                        <FormControl>
                                          <Input placeholder="e.g. Ashwagandha" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={plantForm.control}
                                    name="scientificName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Scientific Name *</FormLabel>
                                        <FormControl>
                                          <Input placeholder="e.g. Withania somnifera" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={plantForm.control}
                                    name="system"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>AYUSH System *</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select system" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="ayurveda">Ayurveda</SelectItem>
                                            <SelectItem value="yoga">Yoga & Naturopathy</SelectItem>
                                            <SelectItem value="unani">Unani</SelectItem>
                                            <SelectItem value="siddha">Siddha</SelectItem>
                                            <SelectItem value="homeopathy">Homeopathy</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={plantForm.control}
                                    name="category"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                          <Input placeholder="e.g. Herb, Shrub, Tree" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <FormField
                                  control={plantForm.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Description</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Describe the plant..."
                                          className="min-h-[100px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={plantForm.control}
                                  name="benefits"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Benefits</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Describe the benefits of this plant..."
                                          className="min-h-[80px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={plantForm.control}
                                  name="uses"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Medicinal Uses</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="List the medicinal uses..."
                                          className="min-h-[80px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={plantForm.control}
                                  name="growthInfo"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Growth Information</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Information about growing conditions..."
                                          className="min-h-[80px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={plantForm.control}
                                  name="history"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Historical Background</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Historical background and traditional usage..."
                                          className="min-h-[80px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={plantForm.control}
                                  name="precautions"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Precautions</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Safety precautions and contraindications..."
                                          className="min-h-[80px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={plantForm.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                          <Input placeholder="https://example.com/image.jpg" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={plantForm.control}
                                    name="modelUrl"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>3D Model URL</FormLabel>
                                        <FormControl>
                                          <Input placeholder="https://example.com/model.glb" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <DialogFooter>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAddPlantDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    type="submit"
                                    className="bg-herbal-green-dark hover:bg-herbal-green/80"
                                  >
                                    {plantForm.formState.isSubmitting ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                      </>
                                    ) : (
                                      activePlantId ? "Update Plant" : "Add Plant"
                                    )}
                                  </Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {filteredPlants.length > 0 ? (
                        <div className="border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Scientific Name</TableHead>
                                <TableHead>System</TableHead>
                                <TableHead className="hidden md:table-cell">Category</TableHead>
                                <TableHead className="hidden md:table-cell">Added On</TableHead>
                                <TableHead className="w-[80px]">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredPlants.map((plant) => (
                                <TableRow key={plant.id}>
                                  <TableCell className="font-medium">{plant.name}</TableCell>
                                  <TableCell className="italic hidden md:table-cell">
                                    {plant.scientific_name}
                                  </TableCell>
                                  <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-herbal-green/10 text-herbal-green">
                                      {plant.system.charAt(0).toUpperCase() + plant.system.slice(1)}
                                    </span>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {plant.category ? plant.category.charAt(0).toUpperCase() + plant.category.slice(1) : '-'}
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {formatDate(plant.created_at)}
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={() => handleEditPlant(plant)}
                                        >
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => openConfirmDelete(plant.id, 'plant')}
                                          className="text-red-600"
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center p-8 border rounded-md bg-muted/10">
                          <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">
                            No plants found matching your search.
                          </p>
                          <Button 
                            variant="outline"
                            onClick={() => setSearchTerm("")}
                            className="mt-2"
                          >
                            Clear search
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    {/* Tours Tab */}
                    <TabsContent value="tours">
                      <div className="flex justify-end mb-4">
                        <Dialog open={isAddTourDialogOpen} onOpenChange={setIsAddTourDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              onClick={() => {
                                tourForm.reset();
                                setActiveTourId(null);
                              }}
                              className="bg-herbal-green-dark hover:bg-herbal-green-dark/80"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add New Tour
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>
                                {activeTourId ? "Edit Tour" : "Add New Tour"}
                              </DialogTitle>
                              <DialogDescription>
                                Fill in the details for the virtual garden tour. All fields marked with * are required.
                              </DialogDescription>
                            </DialogHeader>

                            <Form {...tourForm}>
                              <form onSubmit={tourForm.handleSubmit(onSubmitTour)} className="space-y-4 py-4">
                                <FormField
                                  control={tourForm.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Name *</FormLabel>
                                      <FormControl>
                                        <Input placeholder="e.g. Ayurvedic Plants Tour" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={tourForm.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="text-muted-foreground">Description</span>
                                      </FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Describe the tour..."
                                          className="min-h-[100px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={tourForm.control}
                                  name="duration"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="text-muted-foreground">Duration</span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="e.g. 2 hours" 
                                          className="min-h-[40px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <DialogFooter>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAddTourDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    type="submit"
                                    className="bg-herbal-green-dark hover:bg-herbal-green/80"
                                  >
                                    {tourForm.formState.isSubmitting ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                      </>
                                    ) : (
                                      activeTourId ? "Update Tour" : "Add Tour"
                                    )}
                                  </Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      {filteredTours.length > 0 ? (
                        <div className="border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Description</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead className="hidden md:table-cell">Added On</TableHead>
                                <TableHead className="w-[80px]">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredTours.map((tour) => (
                                <TableRow key={tour.id}>
                                  <TableCell className="font-medium">{tour.name}</TableCell>
                                  <TableCell className="italic hidden md:table-cell">
                                    {tour.description}
                                  </TableCell>
                                  <TableCell>
                                    {tour.duration}
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {formatDate(tour.created_at)}
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={() => handleEditTour(tour)}
                                        >
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => openConfirmDelete(tour.id, 'tour')}
                                          className="text-red-600"
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center p-8 border rounded-md bg-muted/10">
                          <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">
                            No tours found matching your search.
                          </p>
                          <Button 
                            variant="outline"
                            onClick={() => setSearchTerm("")}
                            className="mt-2"
                          >
                            Clear search
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    {/* Users Tab */}
                    <TabsContent value="users">
                      {filteredUsers.length > 0 ? (
                        <div className="border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="hidden md:table-cell">Created At</TableHead>
                                <TableHead className="w-[80px]">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                  <TableCell className="font-medium">
                                    {user.full_name || user.username}
                                  </TableCell>
                                  <TableCell>
                                    {user.username}
                                  </TableCell>
                                  <TableCell>
                                    {user.role}
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {formatDate(user.created_at)}
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={() => navigate(`/admin/users/${user.id}`)}
                                        >
                                          <Users className="mr-2 h-4 w-4" />
                                          View Profile
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center p-8 border rounded-md bg-muted/10">
                          <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">
                            No users found matching your search.
                          </p>
                          <Button 
                            variant="outline"
                            onClick={() => setSearchTerm("")}
                            className="mt-2"
                          >
                            Clear search
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </>
                )}
              </Tabs>
            </div>

            {/* Confirmation Dialog for Delete */}
            <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsConfirmDeleteOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;