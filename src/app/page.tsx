"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingIntro from "@/components/LoadingIntro"
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  FeaturedSection,
  TechStackSection,
  ContactSection,
  Footer
} from "@/components/sections"

export default function Home() {
  const [showContent, setShowContent] = useState(false)

  return (
    <>
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {!showContent && <LoadingIntro onComplete={() => setShowContent(true)} />}
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="min-h-screen bg-[#050505]"
          >
            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <FeaturedSection />
              <TechStackSection />
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
