"use client"

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: "AI Dashboard",
    description: "Real-time analytics platform with AI-powered insights and data visualization.",
    image: "/placeholder-project1.jpg",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "OpenAI"],
    github: "#",
    demo: "#"
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack shopping experience with cart management and payment integration.",
    image: "/placeholder-project2.jpg",
    tech: ["React", "Node.js", "Stripe", "MongoDB"],
    github: "#",
    demo: "#"
  },
  {
    title: "Social Media App",
    description: "Modern social networking platform with real-time messaging and notifications.",
    image: "/placeholder-project3.jpg",
    tech: ["Next.js", "Socket.io", "PostgreSQL", "Redis"],
    github: "#",
    demo: "#"
  },
  {
    title: "Task Manager",
    description: "Collaborative project management tool with kanban boards and team features.",
    image: "/placeholder-project4.jpg",
    tech: ["React", "Firebase", "DnD Kit", "Zustand"],
    github: "#",
    demo: "#"
  },
  {
    title: "Weather Dashboard",
    description: "Beautiful weather app with forecasts, maps, and location-based alerts.",
    image: "/placeholder-project5.jpg",
    tech: ["Next.js", "Weather API", "Mapbox", "Chart.js"],
    github: "#",
    demo: "#"
  },
  {
    title: "Portfolio Builder",
    description: "No-code portfolio generator with templates and customization options.",
    image: "/placeholder-project6.jpg",
    tech: ["React", "DraftJS", "AWS S3", "Vercel"],
    github: "#",
    demo: "#"
  }
]

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  isInView: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isInView }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  
  const cardY = useTransform(scrollYProgress, [0, 1], [50 + index * 10, -50 - index * 10])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    setRotateY(((x - centerX) / centerX) * 15)
    setRotateX(((centerY - y) / centerY) * 15)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ y: cardY }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ duration: 0.3 }}
        className="group relative glass rounded-2xl overflow-hidden card-lift cursor-pointer"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(0)" }}
      >
        <div className="relative h-64 bg-gradient-to-br from-[#00ff88]/20 to-transparent overflow-hidden">
          <motion.div style={{ scale: imageScale }} className="w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
            <div className="absolute inset-0 grid-bg opacity-30" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-[#00ff88]/10 z-20 flex items-center justify-center gap-4"
          >
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center text-[#00ff88] hover:bg-[#00ff88] hover:text-black"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href={project.demo}
              whileHover={{ scale: 1.2, rotate: -360 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center text-[#00ff88] hover:bg-[#00ff88] hover:text-black"
            >
              <ExternalLink className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ff88] transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="px-3 py-1 text-xs rounded-full bg-[#00ff88]/10 text-[#00ff88] font-mono border border-[#00ff88]/20"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [150, -150])

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#00ff88] text-sm font-mono mb-4 block">// My Work</span>
          <h2 className="section-title">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
