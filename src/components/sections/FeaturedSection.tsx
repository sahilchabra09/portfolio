"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const { scrollYProgress: contentScroll } = useScroll({
    target: contentRef,
    offset: ["start start", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [200, -200])
  const imageScale = useTransform(contentScroll, [0, 0.5, 1], [1, 1.15, 1.3])
  const imageY = useTransform(contentScroll, [0, 1], [0, -150])
  const contentY = useTransform(contentScroll, [0, 1], [0, -100])
  const opacity = useTransform(contentScroll, [0, 0.5, 1], [1, 1, 0.3])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-radial from-[#00ff88]/10 via-transparent to-transparent"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#00ff88] text-sm font-mono mb-4 block">// Spotlight</span>
          <h2 className="section-title">
            Featured{' '}
            <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        <div ref={contentRef} className="relative min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* Image Side - with extreme parallax */}
            <motion.div 
              style={{ y: imageY, opacity }}
              className="relative"
            >
              <motion.div
                style={{ scale: imageScale }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/30 to-[#00ff88]/10" />
                <div className="absolute inset-0 grid-bg opacity-40" />
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 glass-strong backdrop-blur-xl flex items-center justify-center"
                >
                  <div className="text-center p-8">
                    <Star className="w-16 h-16 text-[#00ff88] mx-auto mb-4 glow-text" />
                    <p className="text-gray-400 font-mono">Featured Project Showcase</p>
                  </div>
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Floating tech badges */}
              {["React", "TypeScript", "Next.js", "Framer"].map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ 
                    y: useTransform(scrollYProgress, [0, 1], [0, -50 - i * 20]),
                    top: `${20 + i * 20}%`,
                    right: i % 2 === 0 ? '-10%' : 'auto',
                    left: i % 2 !== 0 ? '-10%' : 'auto',
                  }}
                  className="absolute glass px-4 py-2 rounded-full text-xs font-mono text-[#00ff88]"
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>

            {/* Content Side - sticky with parallax */}
            <motion.div 
              style={{ y: contentY }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Full-Stack SaaS Platform
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  A comprehensive SaaS solution built with modern technologies. Features include
                  user authentication, subscription management, real-time analytics, and a beautiful
                  admin dashboard.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass rounded-xl p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
                  <span className="text-sm text-gray-400">Key Features</span>
                </div>
                
                <ul className="space-y-3 text-gray-300">
                  {[
                    "Authentication with NextAuth.js",
                    "Stripe payment integration",
                    "Real-time database with Supabase",
                    "Responsive design system",
                    "Advanced analytics dashboard"
                  ].map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-[#00ff88]">→</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex gap-4"
              >
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,136,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 glass rounded-xl px-8 py-4 flex items-center justify-center gap-2 text-white hover:text-[#00ff88] transition-colors"
                >
                  <Github className="w-5 h-5" />
                  Source Code
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex gap-3 pt-4"
              >
                {["10k+ Users", "99.9% Uptime", "5-Star Reviews"].map((stat, i) => (
                  <div key={i} className="flex-1 text-center glass rounded-lg py-3">
                    <div className="text-[#00ff88] font-bold text-lg">{stat.split(' ')[0]}</div>
                    <div className="text-gray-500 text-xs mt-1">{stat.split(' ').slice(1).join(' ')}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
