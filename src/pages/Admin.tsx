
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

// Sample plant data for the admin dashboard
const initialPlants = [
  {
    id: 1,
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    system: "ayurveda",
    category: "herb",
    addedOn: "2023-05-15",
  },
  {
    id: 2,
    name: "Tulsi",
    scientificName: "Ocimum sanctum",
    system: "ayurveda",
    category: "herb",
    addedOn: "2023-06-20",
  },
  {
    id: 3,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    system: "ayurveda",
    category: "succulent",
    addedOn: "2023-07-10",
  },
];

// Sample tour data
const initialTours = [
  {
    id: 1,
    name: "Ayurvedic Plants Tour",
    description: "Explore the healing plants of Ayurveda tradition",
    duration: "30 min",
    plantCount: 8,
    createdOn: "2023-08-05",
  },
  {
    id: 2,
    name: "Stress Relief Plants",
    description: "Discover plants that help reduce anxiety and stress",
    duration: "20 min",
    plantCount: 5,
    createdOn: "2023-09-12",
  },
];

// Sample user data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    joinedOn: "2023-05-05",
    role: "user",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    joinedOn: "2023-06-15",
    role: "user",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    joinedOn: "2023-01-01",
    role: "admin",
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [plants, setPlants] = useState(initialPlants);
  const [tours, setTours] = useState(initialTours);
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isAddPlantDialogOpen, setIsAddPlantDialogOpen] = useState(false);
  const [isAddTourDialogOpen, setIsAddTourDialogOpen] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: "",
    scientificName: "",
    system: "",
    category: "",
    description: "",
  });
  const [newTour, setNewTour] = useState({
    name: "",
    description: "",
    duration: "",
  });

  useEffect(() => {
    // Check if user is an admin
    const userRole = localStorage.getItem("user_role");
    const isUserAdmin = userRole === "admin";
    setIsAdmin(isUserAdmin);

    if (!isUserAdmin) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the admin dashboard.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [navigate, toast]);

  const handleAddPlant = () => {
    if (!newPlant.name || !newPlant.scientificName || !newPlant.system) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const plant = {
      id: plants.length > 0 ? Math.max(...plants.map((p) => p.id)) + 1 : 1,
      ...newPlant,
      addedOn: new Date().toISOString().split("T")[0],
    };

    setPlants([...plants, plant]);
    setNewPlant({
      name: "",
      scientificName: "",
      system: "",
      category: "",
      description: "",
    });
    setIsAddPlantDialogOpen(false);

    toast({
      title: "Plant Added",
      description: `${plant.name} has been added to the database.`,
    });
  };

  const handleAddTour = () => {
    if (!newTour.name || !newTour.description) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const tour = {
      id: tours.length > 0 ? Math.max(...tours.map((t) => t.id)) + 1 : 1,
      ...newTour,
      plantCount: 0, // Would be set when adding plants to the tour
      createdOn: new Date().toISOString().split("T")[0],
    };

    setTours([...tours, tour]);
    setNewTour({
      name: "",
      description: "",
      duration: "",
    });
    setIsAddTourDialogOpen(false);

    toast({
      title: "Tour Added",
      description: `${tour.name} has been added to the virtual tours.`,
    });
  };

  const handleDeletePlant = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
    toast({
      title: "Plant Deleted",
      description: "The plant has been removed from the database.",
    });
  };

  const handleDeleteTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
    toast({
      title: "Tour Deleted",
      description: "The tour has been removed from the system.",
    });
  };

  const handleEditPlant = (plant) => {
    setSelectedPlant(plant);
    setNewPlant({ ...plant });
    setIsAddPlantDialogOpen(true);
  };

  const handleEditTour = (tour) => {
    setSelectedTour(tour);
    setNewTour({ ...tour });
    setIsAddTourDialogOpen(true);
  };

  const handleUpdatePlant = () => {
    setPlants(
      plants.map((p) => (p.id === selectedPlant.id ? { ...newPlant, addedOn: p.addedOn } : p))
    );
    setIsAddPlantDialogOpen(false);
    setSelectedPlant(null);
    toast({
      title: "Plant Updated",
      description: `${newPlant.name} has been updated.`,
    });
  };

  const handleUpdateTour = () => {
    setTours(
      tours.map((t) =>
        t.id === selectedTour.id
          ? { ...newTour, plantCount: t.plantCount, createdOn: t.createdOn }
          : t
      )
    );
    setIsAddTourDialogOpen(false);
    setSelectedTour(null);
    toast({
      title: "Tour Updated",
      description: `${newTour.name} has been updated.`,
    });
  };

  // Filter plants based on search term
  const filteredPlants = plants.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter tours based on search term
  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              You do not have permission to access this page.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-10">
          <div className="container">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl font-semibold">Manage AYUSH Garden</h2>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="plants">
                <TabsList className="mb-6">
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

                {/* Plants Tab */}
                <TabsContent value="plants">
                  <div className="flex justify-end mb-4">
                    <Dialog open={isAddPlantDialogOpen} onOpenChange={setIsAddPlantDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedPlant(null)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Plant
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>
                            {selectedPlant ? "Edit Plant" : "Add New Plant"}
                          </DialogTitle>
                          <DialogDescription>
                            Fill in the details for the medicinal plant.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={newPlant.name}
                              onChange={(e) =>
                                setNewPlant({ ...newPlant, name: e.target.value })
                              }
                              className="col-span-3"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="scientificName" className="text-right">
                              Scientific Name
                            </Label>
                            <Input
                              id="scientificName"
                              value={newPlant.scientificName}
                              onChange={(e) =>
                                setNewPlant({ ...newPlant, scientificName: e.target.value })
                              }
                              className="col-span-3"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="system" className="text-right">
                              AYUSH System
                            </Label>
                            <Select
                              value={newPlant.system}
                              onValueChange={(value) =>
                                setNewPlant({ ...newPlant, system: value })
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select system" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ayurveda">Ayurveda</SelectItem>
                                <SelectItem value="yoga">Yoga & Naturopathy</SelectItem>
                                <SelectItem value="unani">Unani</SelectItem>
                                <SelectItem value="siddha">Siddha</SelectItem>
                                <SelectItem value="homeopathy">Homeopathy</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                              Category
                            </Label>
                            <Input
                              id="category"
                              value={newPlant.category}
                              onChange={(e) =>
                                setNewPlant({ ...newPlant, category: e.target.value })
                              }
                              className="col-span-3"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              value={newPlant.description}
                              onChange={(e) =>
                                setNewPlant({ ...newPlant, description: e.target.value })
                              }
                              className="col-span-3"
                              rows={4}
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsAddPlantDialogOpen(false);
                              setSelectedPlant(null);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={selectedPlant ? handleUpdatePlant : handleAddPlant}
                          >
                            {selectedPlant ? "Update Plant" : "Add Plant"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {filteredPlants.length > 0 ? (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Scientific Name</TableHead>
                            <TableHead>System</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Added On</TableHead>
                            <TableHead className="w-[80px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredPlants.map((plant) => (
                            <TableRow key={plant.id}>
                              <TableCell className="font-medium">{plant.name}</TableCell>
                              <TableCell className="italic">
                                {plant.scientificName}
                              </TableCell>
                              <TableCell>
                                {plant.system.charAt(0).toUpperCase() +
                                  plant.system.slice(1)}
                              </TableCell>
                              <TableCell>
                                {plant.category.charAt(0).toUpperCase() +
                                  plant.category.slice(1)}
                              </TableCell>
                              <TableCell>{plant.addedOn}</TableCell>
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
                                      onClick={() => handleDeletePlant(plant.id)}
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
                    <div className="text-center p-8 border rounded-md">
                      <p className="text-muted-foreground">
                        No plants found matching your search.
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Tours Tab */}
                <TabsContent value="tours">
                  <div className="flex justify-end mb-4">
                    <Dialog open={isAddTourDialogOpen} onOpenChange={setIsAddTourDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedTour(null)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Tour
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>
                            {selectedTour ? "Edit Tour" : "Add New Tour"}
                          </DialogTitle>
                          <DialogDescription>
                            Fill in the details for the virtual garden tour.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tourName" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="tourName"
                              value={newTour.name}
                              onChange={(e) =>
                                setNewTour({ ...newTour, name: e.target.value })
                              }
                              className="col-span-3"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="tourDescription" className="text-right pt-2">
                              Description
                            </Label>
                            <Textarea
                              id="tourDescription"
                              value={newTour.description}
                              onChange={(e) =>
                                setNewTour({ ...newTour, description: e.target.value })
                              }
                              className="col-span-3"
                              rows={4}
                            />
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duration" className="text-right">
                              Duration
                            </Label>
                            <Input
                              id="duration"
                              value={newTour.duration}
                              onChange={(e) =>
                                setNewTour({ ...newTour, duration: e.target.value })
                              }
                              placeholder="e.g. 30 min"
                              className="col-span-3"
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsAddTourDialogOpen(false);
                              setSelectedTour(null);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button onClick={selectedTour ? handleUpdateTour : handleAddTour}>
                            {selectedTour ? "Update Tour" : "Add Tour"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {filteredTours.length > 0 ? (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Plants</TableHead>
                            <TableHead>Created On</TableHead>
                            <TableHead className="w-[80px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTours.map((tour) => (
                            <TableRow key={tour.id}>
                              <TableCell className="font-medium">{tour.name}</TableCell>
                              <TableCell className="max-w-[300px] truncate">
                                {tour.description}
                              </TableCell>
                              <TableCell>{tour.duration}</TableCell>
                              <TableCell>{tour.plantCount}</TableCell>
                              <TableCell>{tour.createdOn}</TableCell>
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
                                      onClick={() => handleDeleteTour(tour.id)}
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
                    <div className="text-center p-8 border rounded-md">
                      <p className="text-muted-foreground">
                        No tours found matching your search.
                      </p>
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
                            <TableHead>Joined On</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    user.role === "admin"
                                      ? "bg-primary/10 text-primary"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                              </TableCell>
                              <TableCell>{user.joinedOn}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center p-8 border rounded-md">
                      <p className="text-muted-foreground">
                        No users found matching your search.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
