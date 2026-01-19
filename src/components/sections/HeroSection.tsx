"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Mail, ChevronDown } from 'lucide-react'

// Multi-layer Parallax Background
const ParallaxBackground = () => {
  const { scrollY } = useScroll()
  
  const layer1Y = useTransform(scrollY, [0, 1000], [0, -100])
  const layer2Y = useTransform(scrollY, [0, 1000], [0, -200])
  const layer3Y = useTransform(scrollY, [0, 1000], [0, -350])
  
  return (
    <>
      <motion.div style={{ y: layer1Y }} className="absolute inset-0 grid-bg opacity-30" />
      <motion.div style={{ y: layer2Y }} className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />
      </motion.div>
      <motion.div style={{ y: layer3Y }} className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00ff88]/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>
    </>
  )
}

// 3D Terminal
const Terminal3D = () => {
  const { scrollY } = useScroll()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  
  const cardY = useTransform(scrollY, [0, 500], [0, 150])
  const cardRotate = useTransform(scrollY, [0, 500], [0, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / 20
      const y = (e.clientY - rect.top - rect.height / 2) / 20
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      style={{ y: cardY, rotateZ: cardRotate }}
      className="relative w-full max-w-md"
    >
      <motion.div
        animate={{ rotateY: mouse.x, rotateX: -mouse.y }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-[#00ff88]/20 blur-3xl rounded-full scale-75" />
        <div className="relative glass rounded-xl overflow-hidden glow-border animate-float-slow shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a]/90 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs text-gray-400 font-mono">sahil@dev: ~</span>
            <div className="w-16" />
          </div>
          <div className="p-6 font-mono text-sm space-y-3 bg-black/40">
            <div className="flex gap-2">
              <span className="text-[#00ff88]">❯</span>
              <span className="text-gray-300">sahil@dev:~$</span>
              <span className="text-white">whoami</span>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="pl-4 text-[#00ff88] glow-text"
            >
              Frontend Specialist
            </motion.div>
            <div className="flex gap-2">
              <span className="text-[#00ff88]">❯</span>
              <span className="text-gray-300">sahil@dev:~$</span>
              <span className="text-white">cat skills.json</span>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="pl-4 text-gray-400 text-xs"
            >
              <div className="text-[#00ff88]">{'{'}</div>
              <div className="pl-4">
                <span className="text-[#ffbd2e]">&quot;frontend&quot;</span>: <span className="text-[#27c93f]">&quot;React, Next.js&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#ffbd2e]">&quot;animations&quot;</span>: <span className="text-[#27c93f]">&quot;Framer Motion&quot;</span>
              </div>
              <div className="text-[#00ff88]">{'}'}</div>
            </motion.div>
            <div className="flex gap-2">
              <span className="text-[#00ff88]">❯</span>
              <span className="text-gray-300">sahil@dev:~$</span>
              <span className="w-2 h-4 bg-[#00ff88] animate-blink" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  const textY = useTransform(scrollY, [0, 500], [0, 200])
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const terminalY = useTransform(scrollY, [0, 500], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParallaxBackground />
      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.15)_0%,transparent_70%)]" 
      />
      
      <motion.div style={{ scale }} className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y: textY, opacity: textOpacity }} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[#00ff88] border border-[#00ff88]/30 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                Frontend Specialist
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
                Hi, I&apos;m{' '}
                <span className="gradient-text glow-text block mt-2">Sahil</span>
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-4xl text-gray-400 font-light"
            >
              I build <span className="text-white font-normal">immersive</span>
              <br />
              <span className="text-white font-normal">web experiences</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-500 max-w-lg leading-relaxed"
            >
              Frontend-focused full stack developer specializing in React, Next.js, 
              animations and modern UI systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 px-8 py-4 bg-[#00ff88] text-black font-semibold rounded-xl hover:bg-[#00cc6a] transition-all duration-300 animate-pulse-glow shadow-2xl hover:scale-105"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-[#00ff88]/50 backdrop-blur-xl shadow-xl"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: terminalY }} className="hidden lg:flex justify-center items-center">
            <Terminal3D />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: textOpacity }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3 text-gray-500 cursor-pointer"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-xs tracking-widest uppercase font-mono">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#00ff88] rounded-full"
            />
          </div>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  )
}
