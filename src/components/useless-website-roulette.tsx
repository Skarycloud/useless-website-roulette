"use client"

import { useState, useEffect } from "react"

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}
import { Moon, Sun, ExternalLink, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { uselessWebsites } from "@/lib/useless-websites"
import { cn } from "@/lib/utils"

export default function UselessWebsiteRoulette() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [randomWebsite, setRandomWebsite] = useState<{ name: string; description: string; url: string } | null>(null)

  useEffect(() => {
    // Check user preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkTheme(true)
      document.documentElement.classList.add("dark")
    }

    // Initialize with a random website
    const initialRandomIndex = Math.floor(Math.random() * uselessWebsites.length)
    setRandomWebsite(uselessWebsites[initialRandomIndex])

    // Create initial particles
    createParticles()
  }, [])

  const createParticles = () => {
    const newParticles = []
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })
    }
    setParticles(newParticles)
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    document.documentElement.classList.toggle("dark")
  }

  const redirectToRandomWebsite = () => {
    setIsAnimating(true)

    // Create new particles on click
    createParticles()

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * uselessWebsites.length)
      const website = uselessWebsites[randomIndex]
      setRandomWebsite(website)

      setTimeout(() => {
        window.open(website.url, "_blank")
        setIsAnimating(false)
      }, 50)
    }, 80)
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full min-h-screen transition-colors duration-500",
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900",
      )}
    >
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={cn(
            "absolute rounded-full pointer-events-none opacity-30 animate-float",
            isDarkTheme ? "bg-primary/30" : "bg-primary/20",
          )}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={cn(
            "rounded-full transition-transform hover:scale-110 hover:rotate-12",
            isDarkTheme ? "text-yellow-300 hover:text-yellow-200" : "text-indigo-600 hover:text-indigo-500",
          )}
          aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDarkTheme ? <Sun className="h-5 w-5 animate-spin-slow" /> : <Moon className="h-5 w-5 animate-pulse" />}
        </Button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl gap-8 p-6">
        <div
          className={cn("text-center space-y-4 transition-all duration-500", isAnimating ? "scale-105" : "scale-100")}
        >
          <h1
            className={cn(
              "text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-500",
              isDarkTheme ? "text-white" : "text-gray-900",
              "animate-bounce-slow",
            )}
          >
            Useless Website Roulette
          </h1>
          <p
            className={cn(
              "max-w-md mx-auto transition-colors duration-500",
              isDarkTheme ? "text-gray-300" : "text-gray-600",
            )}
          >
            Click the button to be transported to the most ridiculous, random, and pointless (but funny) corner of the
            internet.
          </p>
        </div>

        <div className="relative my-8">
          {/* Animated glow effect */}
          <div
            className={cn(
              "absolute inset-0 rounded-full blur-xl opacity-70 transition-all duration-300",
              isHovering ? "scale-125 bg-primary/50" : "scale-100 bg-primary/30",
              isAnimating && "animate-ping",
            )}
          />

          {/* Animated rings */}
          <div
            className={cn(
              "absolute inset-0 rounded-full border-4 border-primary/30 -m-4 transition-all duration-300",
              isHovering ? "scale-110 animate-pulse" : "scale-100",
              isAnimating && "animate-ping",
            )}
          />

          <Button
            size="lg"
            className={cn(
              "relative text-lg px-8 py-6 rounded-full transition-all duration-300 shadow-lg",
              isHovering ? "scale-110 shadow-primary/50" : "scale-100",
              isAnimating && "animate-pulse",
              isDarkTheme ? "bg-primary hover:bg-primary/90 text-black" : "bg-primary hover:bg-primary/90 text-white",
            )}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={redirectToRandomWebsite}
          >
            <ExternalLink className={cn("mr-2 h-5 w-5 transition-all", isHovering && "animate-bounce")} />
            Take Me Somewhere Useless
            <Sparkles className={cn("ml-2 h-5 w-5 transition-all", isHovering && "animate-spin-slow")} />
          </Button>
        </div>

        {randomWebsite && (
          <div
            className={cn(
              "text-center p-4 rounded-lg transition-all duration-500 max-w-md animate-fade-in",
              isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-800",
              "shadow-lg border",
              isDarkTheme ? "border-gray-700" : "border-gray-200",
            )}
          >
            <h3 className="font-medium mb-1">Next destination could be:</h3>
            <p className="text-lg font-bold">{randomWebsite.name}</p>
            <p className={cn("text-sm mt-1", isDarkTheme ? "text-gray-400" : "text-gray-500")}>
              {randomWebsite.description}
            </p>
          </div>
        )}

        <div
          className={cn(
            "text-center text-sm mt-8 transition-colors duration-500",
            isDarkTheme ? "text-gray-400" : "text-gray-500",
          )}
        >
          <div
  className={cn(
    "text-center text-sm mt-8 transition-colors duration-500",
    isDarkTheme ? "text-gray-400" : "text-gray-500",
  )}
>
 <p className="animate-pulse">Discover {uselessWebsites.length} pointless but entertaining websites</p>
  <p className="mt-4 font-medium">by Sumanth Kumar</p>
  
  <div className="flex justify-center gap-4 mt-4">
    <a 
      href="https://github.com/Skarycloud" 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-1 hover:scale-110 transition-transform", 
        isDarkTheme ? "hover:text-white" : "hover:text-gray-900"
      )}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <span>GitHub</span>
    </a>
    
    <a 
      href="https://www.linkedin.com/in/sumanth-kumar-230194294" 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-1 hover:scale-110 transition-transform", 
        isDarkTheme ? "hover:text-white" : "hover:text-gray-900"
      )}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
      </svg>
      <span>LinkedIn</span>
    </a>
    
    <a 
      href="mailto:sumanth.k.0202@gmail.com" 
      className={cn(
        "flex items-center gap-1 hover:scale-110 transition-transform", 
        isDarkTheme ? "hover:text-white" : "hover:text-gray-900"
      )}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
      </svg>
      <span>Email</span>
    </a>
    
    <a 
      href="https://sumanth-kumar-portfolio.vercel.app/" 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-1 hover:scale-110 transition-transform", 
        isDarkTheme ? "hover:text-white" : "hover:text-gray-900"
      )}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/>
  <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z"/>
</svg>
      <span>Portfolio</span>
    </a>
  </div>
</div>
        </div>
      </div>
    </div>
  )
}

