"use client"

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [150, -150])
  const cardY = useTransform(scrollYProgress, [0, 1], [100, -50])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute inset-0 grid-bg opacity-10"
        style={{ y: backgroundY }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#00ff88] text-sm font-mono mb-4 block">// Get In Touch</span>
          <h2 className="section-title">
            Let&apos;s{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Contact Info */}
          <motion.div
            style={{ y: cardY }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "sahil@example.com" },
              { icon: MapPin, label: "Location", value: "San Francisco, CA" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="glass rounded-xl p-6 flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#00ff88]/10 text-[#00ff88]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-white font-semibold mb-4">Quick Response</h3>
              <p className="text-gray-400 text-sm">
                I typically respond within 24 hours. Looking forward to hearing from you!
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <motion.div
              className="glass-strong rounded-2xl p-8 card-lift relative overflow-hidden"
              style={{
                boxShadow: "0 20px 60px rgba(0,255,136,0.1)"
              }}
            >
              {/* Magnetic glow effect */}
              <motion.div
                className="absolute w-32 h-32 bg-[#00ff88]/20 rounded-full blur-3xl pointer-events-none"
                animate={{
                  x: mousePosition.x - 64,
                  y: mousePosition.y - 64,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
              />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-mono">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/50 border border-[#00ff88]/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#00ff88] focus:outline-none focus:ring-2 focus:ring-[#00ff88]/20 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-mono">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/50 border border-[#00ff88]/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#00ff88] focus:outline-none focus:ring-2 focus:ring-[#00ff88]/20 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-mono">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full bg-black/50 border border-[#00ff88]/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#00ff88] focus:outline-none focus:ring-2 focus:ring-[#00ff88]/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,255,136,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center gap-2 group"
                >
                  <span>Send Message</span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
