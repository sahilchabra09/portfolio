"use client"

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const skills = [
  { name: "React", level: 95, color: "#61DAFB" },
  { name: "Next.js", level: 90, color: "#ffffff" },
  { name: "TypeScript", level: 88, color: "#3178C6" },
  { name: "Tailwind CSS", level: 92, color: "#06B6D4" },
  { name: "Framer Motion", level: 85, color: "#FF0066" },
  { name: "Node.js", level: 80, color: "#339933" },
  { name: "GraphQL", level: 75, color: "#E535AB" },
  { name: "AI Tools", level: 82, color: "#00ff88" },
]

interface SkillCardProps {
  skill: typeof skills[0]
  index: number
  isInView: boolean
  cardY: any
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, isInView, cardY }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      style={{ y: cardY }}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, y: -10 }}
        className="glass rounded-xl p-6 cursor-pointer transition-all duration-300"
        style={{
          boxShadow: isHovered 
            ? `0 0 30px ${skill.color}40, 0 20px 40px rgba(0,0,0,0.3)`
            : '0 10px 20px rgba(0,0,0,0.2)'
        }}
      >
        <div 
          className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl font-bold"
          style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
        >
          {skill.name.charAt(0)}
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>

        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: skill.color }}
          />
        </div>

        <div className="mt-2 text-sm text-gray-400">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 + index * 0.1 }}
          >
            {skill.level}%
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const cardsY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const timelineY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent" 
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#00ff88] text-sm font-mono mb-4 block">// Experience & Skills</span>
          <h2 className="section-title">
            Technologies I{' '}
            <span className="gradient-text">work with</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            I&apos;m constantly learning and expanding my toolkit.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index}
              isInView={isInView}
              cardY={cardsY}
            />
          ))}
        </div>

        <motion.div
          style={{ y: timelineY }}
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Experience</h3>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#00ff88] via-[#00ff88]/50 to-transparent" />

            {[
              { 
                year: "2023 - Present", 
                title: "Senior Frontend Developer", 
                company: "Tech Company",
                description: "Leading frontend architecture and mentoring junior developers."
              },
              { 
                year: "2022 - 2023", 
                title: "Frontend Developer", 
                company: "Startup",
                description: "Built multiple React applications with focus on performance."
              },
              { 
                year: "2021 - 2022", 
                title: "Junior Developer", 
                company: "Agency",
                description: "Started my journey building websites and web applications."
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -45 : 45 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 + index * 0.2, type: "spring" }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-end md:pr-[52%]' : 'justify-start md:pl-[52%]'}`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#00ff88] rounded-full glow-border z-10" />
                
                <motion.div 
                  whileHover={{ scale: 1.05, rotateY: index % 2 === 0 ? 5 : -5 }}
                  className="glass rounded-xl p-6 max-w-md card-lift"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span className="text-[#00ff88] text-sm font-mono">{item.year}</span>
                  <h4 className="text-lg font-semibold text-white mt-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.company}</p>
                  <p className="text-gray-500 mt-2 text-sm">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
