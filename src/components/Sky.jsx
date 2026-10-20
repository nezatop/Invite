import { useMemo } from 'react'

const GLYPHS = ['✦', '✧', '♡', '·', '✦', '·']

// Пастельный фон: мягкие облака розового и голубого, мерцающие искорки
export default function Sky() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        glyph: GLYPHS[i % GLYPHS.length],
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 10 + 8,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 3,
      })),
    [],
  )

  return (
    <div className="sky" aria-hidden="true">
      <div className="blob blob-pink" />
      <div className="blob blob-blue" />
      <div className="blob blob-lavender" />
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          {s.glyph}
        </span>
      ))}
    </div>
  )
}
