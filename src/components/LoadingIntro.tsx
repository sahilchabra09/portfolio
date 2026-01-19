"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MatrixRain from './ui/matrix-code'

interface LoadingIntroProps {
  onComplete?: () => void
}

const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
  const [showLoader, setShowLoader] = useState(true)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [canSkip, setCanSkip] = useState(true)

  const terminalLines = [
    { text: '> sahil@dev:~$ bun create next-app', delay: 80, pauseAfter: 800 },
    { text: '✓ Creating project...', delay: 70, pauseAfter: 600 },
    { text: '✓ Installing dependencies...', delay: 70, pauseAfter: 700 },
    { text: '✓ Project ready!', delay: 70, pauseAfter: 500 },
    { text: '$ bun run dev', delay: 90, pauseAfter: 900 }
  ]

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Typing animation logic
  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      setIsTypingComplete(true)
      return
    }

    const currentLine = terminalLines[currentLineIndex]
    
    if (currentCharIndex < currentLine.text.length) {
      // Add random variation to typing speed for realism
      const variation = Math.random() * 40 - 20
      const typingDelay = currentLine.delay + variation

      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          if (newLines[currentLineIndex] === undefined) {
            newLines[currentLineIndex] = ''
          }
          newLines[currentLineIndex] = currentLine.text.substring(0, currentCharIndex + 1)
          return newLines
        })
        setCurrentCharIndex(currentCharIndex + 1)
      }, typingDelay)

      return () => clearTimeout(timeout)
    } else {
      // Line complete, wait before next line
      const pauseDuration = currentLine.pauseAfter || 500
      const timeout = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1)
        setCurrentCharIndex(0)
      }, pauseDuration)

      return () => clearTimeout(timeout)
    }
  }, [currentCharIndex, currentLineIndex])

  // Handle typing completion and fade out
  useEffect(() => {
    if (isTypingComplete) {
      const timeout = setTimeout(() => {
        setShowLoader(false)
        setTimeout(() => {
          onComplete?.()
        }, 800) // Wait for exit animation to complete
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [isTypingComplete, onComplete])

  // Skip loader on click or key press
  useEffect(() => {
    const handleSkip = () => {
      if (canSkip) {
        setShowLoader(false)
        setTimeout(() => {
          onComplete?.()
        }, 800)
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        handleSkip()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('click', handleSkip)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('click', handleSkip)
    }
  }, [canSkip, onComplete])

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(to bottom, #000000, #0a0a0a)',
            willChange: 'transform, opacity, filter'
          }}
        >
          {/* Matrix Background */}
          <div className="absolute inset-0 opacity-20">
            <MatrixRain 
            />
          </div>

          {/* Terminal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative z-10 w-[90vw] max-w-[600px] rounded-xl overflow-hidden"
            style={{
              background: 'rgba(10, 10, 10, 0.8)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 255, 65, 0.2)',
              boxShadow: '0 0 30px rgba(0, 255, 65, 0.15), 0 20px 60px rgba(0, 0, 0, 0.5)',
              willChange: 'transform'
            }}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-b border-gray-700/50">
              {/* Control Buttons */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
              </div>
              {/* Terminal Title */}
              <div className="flex-1 text-center">
                <span className="text-sm font-mono text-gray-400">
                  sahil@dev:~
                </span>
              </div>
              <div className="w-16" /> {/* Spacer for centering */}
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm md:text-base space-y-2 min-h-[300px]">
              {displayedLines.map((line, index) => (
                <div key={index} className="flex items-center">
                  <span className={`
                    ${line.startsWith('>') ? 'text-cyan-400' : ''}
                    ${line.startsWith('✓') ? 'text-green-400' : ''}
                    ${line.startsWith('$') ? 'text-purple-400' : ''}
                  `}>
                    {line}
                  </span>
                  {index === currentLineIndex && !isTypingComplete && (
                    <span 
                      className={`ml-1 inline-block w-2 h-4 bg-green-400 transition-opacity duration-100 ${
                        showCursor ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ animation: 'none' }}
                    >
                      █
                    </span>
                  )}
                </div>
              ))}
              
              {/* Success indicator after completion */}
              {isTypingComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400 flex items-center gap-2 mt-4"
                >
                  <span className="text-xl">✓</span>
                  <span>Ready to launch...</span>
                </motion.div>
              )}
            </div>

            {/* Skip hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono"
            >
              Press any key to skip
            </motion.div>
          </motion.div>

          {/* Ambient glow effect */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[100px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,65,0.3) 0%, transparent 70%)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingIntro
