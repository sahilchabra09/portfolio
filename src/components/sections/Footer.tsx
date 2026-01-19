"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:sahil@example.com", label: "Email" },
  ]

  return (
    <footer ref={footerRef} className="relative py-20 overflow-hidden border-t border-[#00ff88]/10">
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 bg-gradient-to-t from-[#00ff88]/5 to-transparent"
      />

      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 grid-bg opacity-5"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">Sahil Chabra</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Frontend-focused full stack developer crafting beautiful, performant web experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Skills", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 5, color: "#00ff88" }}
                    className="text-gray-400 text-sm hover:text-[#00ff88] transition-colors inline-block"
                  >
                    → {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center hover:bg-[#00ff88] hover:text-black transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-[#00ff88]/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-mono flex items-center gap-2">
              © {new Date().getFullYear()} Sahil Chabra. Built with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                <Heart className="w-4 h-4 text-[#00ff88] inline fill-[#00ff88]" />
              </motion.span>
              {' '}and Next.js
            </p>
            
            <motion.div
              className="flex gap-4 text-xs text-gray-500 font-mono"
            >
              <motion.a href="#" whileHover={{ color: "#00ff88" }} className="transition-colors">
                Privacy Policy
              </motion.a>
              <span>•</span>
              <motion.a href="#" whileHover={{ color: "#00ff88" }} className="transition-colors">
                Terms of Service
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating "Back to Top" */}
        <motion.a
          href="#hero"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, boxShadow: "0 0 20px rgba(0,255,136,0.3)" }}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#00ff88] text-black flex items-center justify-center font-bold text-xl z-50 shadow-lg"
          aria-label="Back to top"
        >
          ↑
        </motion.a>
      </div>
    </footer>
  )
}
