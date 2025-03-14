import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const CTA: React.FC = () => {
  return (
    <section className="bg-muted/30 py-16 px-8 mb-10 rounded-2xl shadow-md text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900">Have any questions?</h2>
      <p className="text-muted-foreground mt-3 text-lg">
        We're here to help! Reach out to us anytime.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="default" className="flex items-center gap-2 px-6 py-3 text-lg">
          <Mail className="h-4 w-4" /> Email Us
        </Button>
      </div>
    </section>
  );
};

export default CTA;
