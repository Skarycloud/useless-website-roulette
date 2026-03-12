"use client"

import { useState, useEffect } from "react"
import { uselessWebsites } from "@/lib/useless-websites"

interface UselessWebsite {
  name: string;
  description: string;
  url: string;
}

function getRandomSample(arr: UselessWebsite[], n: number): UselessWebsite[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

// ── Design tokens ────────────────────────────────────────────
const C = {
  bg:            "#0e1a20",
  card:          "#131f24",
  textPrimary:   "#f0f6fa",
  textSecondary: "#52656e",
  borderDefault: "#37464f",
  borderHover:   "#52656e",
  yellow:        "#48c0f7",
  yellowDark:    "#2a8ab5",
  yellowHover:   "#6dcffa",
  yellowText:    "#051824",
  navBorder:     "#1c2d36",
}

// ── Helpers ──────────────────────────────────────────────────
function cardStyle(selected: boolean): React.CSSProperties {
  return {
    width: "100%",
    textAlign: "left",
    background: C.card,
    borderTopWidth: "2px",
    borderLeftWidth: "2px",
    borderRightWidth: "2px",
    borderBottomWidth: "4px",
    borderStyle: "solid",
    borderColor: selected ? C.yellow : C.borderDefault,
    borderBottomColor: selected ? C.yellowDark : C.borderDefault,
    borderRadius: "16px",
    padding: "14px 18px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    outline: "none",
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
    fontFamily: "inherit",
  }
}

function primaryBtn(disabled: boolean): React.CSSProperties {
  return {
    flex: 1,
    height: "50px",
    borderRadius: "12px",
    borderTopWidth: "2px",
    borderLeftWidth: "2px",
    borderRightWidth: "2px",
    borderBottomWidth: "4px",
    borderStyle: "solid",
    borderColor: disabled ? "transparent" : C.yellow,
    borderBottomColor: disabled ? "transparent" : C.yellowDark,
    background: disabled ? "rgba(88,95,106,0.5)" : C.yellow,
    color: disabled ? "rgba(255,255,255,0.4)" : C.yellowText,
    fontSize: "0.9rem",
    fontWeight: 800,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.01em",
    transition: "all 0.1s ease",
    boxShadow: disabled ? "0 4px 0 rgba(60,65,74,0.5)" : `0 4px 0 ${C.yellowDark}`,
  }
}

function ghostBtn(): React.CSSProperties {
  return {
    flex: "0 0 auto",
    padding: "0 20px",
    height: "50px",
    borderRadius: "12px",
    borderTopWidth: "2px",
    borderLeftWidth: "2px",
    borderRightWidth: "2px",
    borderBottomWidth: "4px",
    borderStyle: "solid",
    borderColor: "rgba(75,85,99,0.6)",
    borderBottomColor: "rgba(30,35,42,0.9)",
    background: "rgba(35,40,48,0.8)",
    color: "rgba(156,163,175,0.9)",
    fontSize: "0.9rem",
    fontWeight: 800,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.1s ease",
    boxShadow: "0 4px 0 rgba(30,35,42,0.9)",
  }
}

export default function UselessWebsiteRoulette() {
  const [options, setOptions] = useState<UselessWebsite[]>([])
  const [selected, setSelected] = useState<UselessWebsite | null>(null)
  const [launched, setLaunched] = useState(false)

  useEffect(() => {
    setOptions(getRandomSample(uselessWebsites as UselessWebsite[], 6))
  }, [])

  const handleSelect = (site: UselessWebsite) => {
    setSelected(site)
    setLaunched(false)
  }

  const handleLaunch = () => {
    if (!selected) return
    setLaunched(true)
    window.open(selected.url, "_blank")
  }

  const handleShuffle = () => {
    setOptions(getRandomSample(uselessWebsites as UselessWebsite[], 6))
    setSelected(null)
    setLaunched(false)
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: '"Nunito", sans-serif' }}>

      {/* ── NAVBAR ──────────────────────────────────── */}
      <nav style={{
        borderBottom: `1px solid ${C.navBorder}`,
        background: C.bg,
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "0 1.75rem",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "1rem", fontWeight: 800, color: C.textPrimary, letterSpacing: "-0.01em" }}>
          🎰 Web Roulette
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "999px",
            background: "rgba(255,200,61,0.1)",
            color: C.yellow,
            border: `1px solid rgba(255,200,61,0.2)`,
          }}>
            {uselessWebsites.length} sites
          </span>
          <a
            href="https://github.com/Skarycloud/useless-website-roulette"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.82rem", fontWeight: 800, color: C.textSecondary, textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = C.textPrimary)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = C.textSecondary)}
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* ── MAIN ────────────────────────────────────── */}
      <main style={{
        flex: 1,
        width: "100%",
        maxWidth: "640px",
        margin: "0 auto",
        padding: "3rem 1.25rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
      }}>

        {/* Header */}
        <div>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 1.875rem)", fontWeight: 800, color: C.textPrimary, margin: "0 0 0.5rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Pick a useless website 🌐
          </h1>
          <p style={{ fontSize: "0.9rem", fontWeight: 400, color: C.textSecondary, margin: 0, lineHeight: 1.6 }}>
            Choose one and discover a perfectly pointless corner of the internet.
          </p>
        </div>

        {/* ── SELECTION GRID ──────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
          {options.map(site => {
            const isSelected = selected?.url === site.url
            return (
              <button
                key={site.url}
                onClick={() => handleSelect(site)}
                style={cardStyle(isSelected)}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  if (!isSelected) {
                    el.style.borderColor = C.borderHover
                    el.style.borderBottomColor = C.borderHover
                  }
                  el.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  if (!isSelected) {
                    el.style.borderColor = C.borderDefault
                    el.style.borderBottomColor = C.borderDefault
                  }
                  el.style.transform = "translateY(0)"
                }}
              >
                <p style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: isSelected ? C.yellow : C.textPrimary,
                  margin: 0,
                  lineHeight: 1.3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {site.name}
                </p>
                <p style={{
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  color: C.textSecondary,
                  margin: 0,
                  lineHeight: 1.45,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                }}>
                  {site.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* ── ACTIONS ─────────────────────────────── */}
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Shuffle — ghost */}
          <button
            onClick={handleShuffle}
            style={ghostBtn()}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = "rgba(45,50,58,0.9)"
              el.style.color = C.textPrimary
              el.style.transform = "translateY(2px)"
              el.style.boxShadow = "0 2px 0 rgba(30,35,42,0.9)"
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = "rgba(35,40,48,0.8)"
              el.style.color = "rgba(156,163,175,0.9)"
              el.style.transform = "translateY(0)"
              el.style.boxShadow = "0 4px 0 rgba(30,35,42,0.9)"
            }}
            onMouseDown={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = "translateY(4px)"
              el.style.boxShadow = "none"
            }}
            onMouseUp={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = "translateY(0)"
              el.style.boxShadow = "0 4px 0 rgba(30,35,42,0.9)"
            }}
          >
            🔀 Shuffle
          </button>

          {/* Launch — primary yellow */}
          <button
            onClick={handleLaunch}
            disabled={!selected}
            style={primaryBtn(!selected)}
            onMouseEnter={e => {
              if (!selected) return
              const el = e.currentTarget as HTMLElement
              el.style.background = C.yellowHover
              el.style.transform = "translateY(2px)"
              el.style.boxShadow = `0 2px 0 ${C.yellowDark}`
            }}
            onMouseLeave={e => {
              if (!selected) return
              const el = e.currentTarget as HTMLElement
              el.style.background = C.yellow
              el.style.transform = "translateY(0)"
              el.style.boxShadow = `0 4px 0 ${C.yellowDark}`
            }}
            onMouseDown={e => {
              if (!selected) return
              const el = e.currentTarget as HTMLElement
              el.style.transform = "translateY(4px)"
              el.style.boxShadow = "none"
            }}
            onMouseUp={e => {
              if (!selected) return
              const el = e.currentTarget as HTMLElement
              el.style.transform = "translateY(0)"
              el.style.boxShadow = `0 4px 0 ${C.yellowDark}`
            }}
          >
            {launched ? "✓ Launched!" : "LAUNCH →"}
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.78rem", fontWeight: 700, color: C.borderDefault, margin: 0 }}>
          {uselessWebsites.length} pointless websites and counting
        </p>
      </main>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${C.navBorder}`, padding: "1.5rem 1.75rem" }}>
        <div style={{
          maxWidth: "640px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: C.textSecondary, margin: 0 }}>
            🎰 Built by Sumanth Kumar · Open source
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {[
              { label: "GitHub",    href: "https://github.com/Skarycloud" },
              { label: "LinkedIn",  href: "https://www.linkedin.com/in/sumanth-kumar-230194294" },
              { label: "Portfolio", href: "https://sumanth-kumar-portfolio.vercel.app/" },
              { label: "Email",     href: "mailto:sumanth.k.0202@gmail.com" },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{ fontSize: "0.78rem", fontWeight: 700, color: C.textSecondary, textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = C.textPrimary)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = C.textSecondary)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}