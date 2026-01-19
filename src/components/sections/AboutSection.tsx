"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Code2, Sparkles, Zap } from 'lucide-react'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Multi-layer parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const cardsY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const highlights = [
    { icon: Code2, title: "Clean Code", description: "Writing maintainable, scalable solutions" },
    { icon: Sparkles, title: "UI/UX Focus", description: "Crafting delightful user experiences" },
    { icon: Zap, title: "Performance", description: "Building lightning-fast applications" },
  ]

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden">
      {/* Parallax Background Layers */}
      <motion.div style={{ y: backgroundY, opacity }} className="absolute inset-0 grid-bg opacity-20" />
      
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div style={{ y: contentY }} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#00ff88] text-sm font-mono mb-4 block">// About Me</span>
              <h2 className="section-title">
                Passionate about{' '}
                <span className="gradient-text">frontend engineering</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 text-gray-400 leading-relaxed"
            >
              <p>
                I&apos;m a frontend-focused full stack developer with a deep passion for 
                creating beautiful, performant, and accessible web applications.
              </p>
              <p>
                I believe great software isn&apos;t just about functionality—it&apos;s about 
                creating experiences that feel intuitive and delightful.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, 
                contributing to open source, or experimenting with creative projects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-8 pt-4"
            >
              {[
                { value: "3+", label: "Years Experience" },
                { value: "50+", label: "Projects Completed" },
                { value: "∞", label: "Lines of Code" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[#00ff88] glow-text">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Highlight Cards */}
          <motion.div style={{ y: cardsY }} className="space-y-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                className="group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="glass rounded-xl p-6 card-lift hover:glow-border-subtle transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#00ff88]/10 text-[#00ff88] group-hover:bg-[#00ff88]/20 transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="glass rounded-xl p-4 font-mono text-sm"
            >
              <div className="text-gray-500">// My approach</div>
              <div className="mt-2">
                <span className="text-[#ff79c6]">const</span>{' '}
                <span className="text-[#50fa7b]">developer</span>{' '}
                <span className="text-white">=</span>{' '}
                <span className="text-[#f1fa8c]">{'{'}</span>
              </div>
              <div className="pl-4">
                <span className="text-[#8be9fd]">passion</span>
                <span className="text-white">:</span>{' '}
                <span className="text-[#f1fa8c]">&apos;frontend&apos;</span>
                <span className="text-white">,</span>
              </div>
              <div className="pl-4">
                <span className="text-[#8be9fd]">focus</span>
                <span className="text-white">:</span>{' '}
                <span className="text-[#f1fa8c]">&apos;user experience&apos;</span>
                <span className="text-white">,</span>
              </div>
              <div className="pl-4">
                <span className="text-[#8be9fd]">coffee</span>
                <span className="text-white">:</span>{' '}
                <span className="text-[#bd93f9]">Infinity</span>
              </div>
              <div>
                <span className="text-[#f1fa8c]">{'}'}</span>
                <span className="text-white">;</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
