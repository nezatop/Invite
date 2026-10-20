import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const BRUSH = 38
const REVEAL_AT = 0.5

// Экран 5: карта Таро под слоем звёздной пыли — стирается пальцем
export default function Scratch({ choice, onNext }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const last = useRef(null)
  const moves = useRef(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const { width, height } = wrapRef.current.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    ctx.scale(dpr, dpr)

    const draw = () => {
      ctx.globalCompositeOperation = 'source-over'
      const g = ctx.createLinearGradient(0, 0, width, height)
      g.addColorStop(0, '#f6c6d4')
      g.addColorStop(1, '#b9dbf3')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)
      for (let i = 0; i < 160; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.2})`
        ctx.beginPath()
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.6 + 0.4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = '#5b4374'
      ctx.textAlign = 'center'
      ctx.font = '24px Forum, serif'
      ctx.fillText('Сотри', width / 2, height / 2 - 14)
      ctx.fillText('волшебную пыльцу', width / 2, height / 2 + 16)
      ctx.font = '22px serif'
      ctx.fillText('✦', width / 2, height / 2 + 52)
    }
    document.fonts.ready.then(draw)
  }, [])

  const point = (e) => {
    const r = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  const checkProgress = () => {
    const canvas = canvasRef.current
    const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 16) {
      total++
      if (data[i] < 128) clear++
    }
    if (clear / total > REVEAL_AT) setRevealed(true)
  }

  const scratch = (from, to) => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth = BRUSH
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
  }

  const onDown = (e) => {
    canvasRef.current.setPointerCapture(e.pointerId)
    last.current = point(e)
    scratch(last.current, last.current)
  }

  const onMove = (e) => {
    if (!last.current) return
    const p = point(e)
    scratch(last.current, p)
    last.current = p
    if (++moves.current % 12 === 0) checkProgress()
  }

  const onUp = () => {
    last.current = null
    checkProgress()
  }

  return (
    <div className="center page">
      <p className="eyebrow">Карты уже знают ответ</p>
      <h2 className="subtitle">Узнай, что тебе выпало</h2>

      <div className="tarot" ref={wrapRef}>
        <div className="tarot-face">
          <span className="tarot-num">XVII</span>
          <span className="tarot-icon">🌟</span>
          <span className="tarot-name">Звезда</span>
          <span className="tarot-text">
            {choice.dateLabel}, {choice.time}
            <br />
            {choice.activity?.emoji} {choice.activity?.label}
          </span>
          <span className="tarot-foot">Вместе. Это судьба.</span>
        </div>
        <canvas
          ref={canvasRef}
          className={`tarot-cover ${revealed ? 'gone' : ''}`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
      </div>

      {revealed ? (
        <motion.button className="btn btn-primary" onClick={onNext} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          Принять судьбу ✨
        </motion.button>
      ) : (
        <p className="hint">Води пальцем по карте</p>
      )}
    </div>
  )
}
