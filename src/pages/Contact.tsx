
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond shortly.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 bg-herbal-cream">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contact Us</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-herbal-green-light/20 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-herbal-green-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Address</h3>
                      <p className="text-muted-foreground">
                        Ministry of AYUSH<br />
                        AYUSH Bhawan, B-Block, GPO Complex<br />
                        New Delhi - 110001, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-herbal-green-light/20 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-herbal-green-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Email</h3>
                      <p className="text-muted-foreground">
                        info@virtualherbalgarden.org<br />
                        support@virtualherbalgarden.org
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-herbal-green-light/20 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-herbal-green-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Phone</h3>
                      <p className="text-muted-foreground">
                        +91-11-2462 2222<br />
                        +91-11-2462 2233
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-herbal-green-light/10 rounded-lg">
                  <h3 className="font-medium mb-2">Visiting Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9:00 AM - 5:30 PM<br />
                    Saturday: 9:00 AM - 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-herbal-green-dark hover:bg-herbal-green-dark/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="bg-herbal-cream p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">What is the Virtual Herbal Garden?</h3>
                  <p className="text-muted-foreground">
                    The Virtual Herbal Garden is an educational platform that showcases medicinal plants from the AYUSH systems of medicine - Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy.
                  </p>
                </div>
                
                <div className="bg-herbal-cream p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">How can I participate or contribute?</h3>
                  <p className="text-muted-foreground">
                    We welcome contributions from herbal medicine practitioners, researchers, and enthusiasts. Please contact us with your expertise and how you'd like to contribute.
                  </p>
                </div>
                
                <div className="bg-herbal-cream p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Are the plants in the virtual garden real?</h3>
                  <p className="text-muted-foreground">
                    The plants are digital representations of real medicinal plants, with accurate information about their properties, uses, and growing conditions.
                  </p>
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="bg-herbal-cream p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">How do I access the full features of the garden?</h3>
                  <p className="text-muted-foreground">
                    Create a free account to access all features including virtual tours, bookmarking plants, and personal notes functionality.
                  </p>
                </div>
                
                <div className="bg-herbal-cream p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Can I grow these plants at home?</h3>
                  <p className="text-muted-foreground">
                    Many of the plants featured in our garden can be grown at home. Check the "Growing" section of each plant for specific cultivation information.
                  </p>
                </div>
                
                <div className="bg-herbal-cream p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Is the plant information medically verified?</h3>
                  <p className="text-muted-foreground">
                    All information is based on traditional AYUSH systems and relevant research literature. However, it's not meant to replace professional medical advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
