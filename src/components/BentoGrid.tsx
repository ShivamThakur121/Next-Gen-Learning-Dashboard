"use client";

import { motion, Variants } from "framer-motion";
import { Course } from "@/lib/supabase";
import HeroTile from "./HeroTile";
import CourseCard from "./CourseCard";
import ActivityTile from "./ActivityTile";

interface BentoGridProps {
  courses: Course[];
}

export default function BentoGrid({ courses }: BentoGridProps) {
  // Staggered entry animation settings
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Stagger delays automatically
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
    >
      {/* 1. HERO TILE - Spans 2 columns on large displays, 2 columns on tablet, 1 on mobile */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
        <HeroTile />
      </motion.div>

      {/* 2. DYNAMIC COURSE CARD 1 - Spans 1 column. Occupies row 1 column 3 on desktop */}
      {courses.length > 0 && (
        <CourseCard course={courses[0]} index={0} />
      )}

      {/* 3. DYNAMIC COURSE CARD 2 - Spans 1 column */}
      {courses.length > 1 && (
        <CourseCard course={courses[1]} index={1} />
      )}

      {/* 4. DYNAMIC COURSE CARD 3 - Spans 1 column */}
      {courses.length > 2 && (
        <CourseCard course={courses[2]} index={2} />
      )}

      {/* 5. DYNAMIC COURSE CARD 4 - Spans 1 column */}
      {courses.length > 3 && (
        <CourseCard course={courses[3]} index={3} />
      )}

      {/* Render any additional courses dynamic grid fallback */}
      {courses.slice(4).map((course, idx) => (
        <CourseCard key={course.id} course={course} index={idx + 4} />
      ))}

      {/* 6. ACTIVITY CONTRIBUTION TILE - Spans full grid width (3 columns on desktop, 2 on tablet, 1 on mobile) */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-3">
        <ActivityTile />
      </motion.div>
    </motion.main>
  );
}
