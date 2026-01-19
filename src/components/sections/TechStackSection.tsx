"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const technologies = [
  { name: "React", icon: "⚛️", color: "#61DAFB", orbit: 180, speed: 20 },
  { name: "Next.js", icon: "▲", color: "#ffffff", orbit: 150, speed: 25 },
  { name: "TypeScript", icon: "TS", color: "#3178C6", orbit: 200, speed: 18 },
  { name: "Tailwind", icon: "🎨", color: "#06B6D4", orbit: 170, speed: 22 },
  { name: "Node.js", icon: "🟢", color: "#339933", orbit: 190, speed: 19 },
  { name: "GraphQL", icon: "◇", color: "#E535AB", orbit: 160, speed: 24 },
  { name: "MongoDB", icon: "🍃", color: "#47A248", orbit: 180, speed: 21 },
  { name: "Docker", icon: "🐋", color: "#2496ED", orbit: 195, speed: 17 },
  { name: "AWS", icon: "☁️", color: "#FF9900", orbit: 165, speed: 23 },
  { name: "Git", icon: "🌿", color: "#F05032", orbit: 185, speed: 20 },
]

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section ref={sectionRef} id="tech-stack" className="relative py-32 overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 via-transparent to-[#00ff88]/5"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#00ff88] text-sm font-mono mb-4 block">// Tech Stack</span>
          <h2 className="section-title">
            Technologies I{' '}
            <span className="gradient-text">master</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A constantly evolving arsenal of modern tools and frameworks.
          </p>
        </motion.div>

        <div className="relative min-h-[600px] flex items-center justify-center">
          {/* Central Hub */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            style={{ rotate: rotation }}
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00ff88]/50 flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-[#00ff88] animate-ping opacity-20" />
            <div className="relative text-4xl">👨‍💻</div>
          </motion.div>

          {/* Orbiting Technologies */}
          {technologies.map((tech, index) => {
            const angle = (index / technologies.length) * Math.PI * 2
            const x = Math.cos(angle) * tech.orbit
            const y = Math.sin(angle) * tech.orbit

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, scale: 1, x, y }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 80
                }}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%)`,
                }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.3, 
                    rotate: 360,
                    zIndex: 50
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer"
                  style={{ 
                    animation: `float ${tech.speed}s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`
                  }}
                >
                  <div 
                    className="w-20 h-20 rounded-2xl glass-strong backdrop-blur-xl flex flex-col items-center justify-center gap-1 card-lift"
                    style={{
                      boxShadow: `0 0 30px ${tech.color}30`
                    }}
                  >
                    <div className="text-2xl">{tech.icon}</div>
                    <div className="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors">
                      {tech.name}
                    </div>
                  </div>

                  {/* Connection Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="absolute top-1/2 left-1/2 h-px origin-left"
                    style={{
                      width: tech.orbit,
                      background: `linear-gradient(to left, ${tech.color}80, transparent)`,
                      transform: `rotate(${-angle}rad) translateY(-50%)`,
                    }}
                  />

                  {/* Hover Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <div 
                      className="glass rounded-lg px-3 py-1 text-xs font-mono"
                      style={{ color: tech.color }}
                    >
                      {tech.name}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}

          {/* Orbital Rings */}
          {[150, 180, 210].map((radius, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00ff88]/20"
              style={{
                width: radius * 2,
                height: radius * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {["Frontend", "Backend", "Database", "DevOps", "Tools"].map((category, i) => (
            <motion.div
              key={category}
              whileHover={{ y: -5 }}
              className="glass rounded-xl p-4 text-center"
            >
              <div className="text-[#00ff88] font-bold mb-1">{i + 1}</div>
              <div className="text-sm text-gray-400">{category}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
