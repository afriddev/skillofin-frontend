import { useAppContext } from "@/utiles/AppContext";
import { BicepsFlexed } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // Adjust the import path to match your setup

function Courses() {
  const { userRole } = useAppContext();

  return (
    <div className="w-full h-[43vh] text-white border rounded-xl overflow-hidden shadow-md transition-all hover:shadow-purple-600/50 overflow-auto relative">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-orange-100 to-yellow-100 flex items-center gap-3 text-black rounded-t-xl text-xl font-semibold px-6 py-3">
        <BicepsFlexed className="text-2xl" />
        {userRole === "FREELANCER" ? "Courses for you" : "Recent courses"}
      </div>

      {/* Body */}
      <div className="text-foreground px-6 py-4">
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="course-1">
            <AccordionTrigger className="font-medium">
              Next.js for Beginners
            </AccordionTrigger>
            <AccordionContent className="text-foreground/60">
              Learn the basics of Next.js, a popular React framework for
              server-side rendering and static site generation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="course-2">
            <AccordionTrigger className="font-medium">
              Advanced Tailwind CSS
            </AccordionTrigger>
            <AccordionContent className="text-foreground/60">
              Dive deeper into Tailwind CSS to build complex, responsive designs
              quickly and efficiently.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="course-3">
            <AccordionTrigger className="font-medium">
              TypeScript Fundamentals
            </AccordionTrigger>
            <AccordionContent className="text-foreground/60">
              Understand the fundamentals of TypeScript, a typed superset of
              JavaScript, to build more robust applications.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-2 right-4 text-gray-400 text-sm font-semibold opacity-80">
        Coming Soon...
      </div>
    </div>
  );
}

export default Courses;
