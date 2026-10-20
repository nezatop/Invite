import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { config } from '../config.js'
import Berry from './Berry.jsx'

// Экран 3: главный вопрос. «Нет» убегает, «Да» растёт
export default function Question({ onYes }) {
  const [tries, setTries] = useState(0)
  const [pos, setPos] = useState(null)
  const noRef = useRef(null)
  const yesRef = useRef(null)

  const dodge = (e) => {
    e?.preventDefault()
    const el = noRef.current
    const w = (el?.offsetWidth ?? 120) + 40
    const h = (el?.offsetHeight ?? 50) + 10
    const m = 16
    const yes = yesRef.current.getBoundingClientRect()
    const overlapsYes = (x, y) =>
      x < yes.right + m && x + w > yes.left - m && y < yes.bottom + m && y + h > yes.top - m

    // Ищем случайное место, где кнопка не закроет «Да»
    let next
    for (let i = 0; i < 30; i++) {
      next = {
        x: m + Math.random() * Math.max(window.innerWidth - w - m * 2, 0),
        y: m + Math.random() * Math.max(window.innerHeight - h - m * 2, 0),
      }
      if (!overlapsYes(next.x, next.y)) break
    }
    setPos(next)
    setTries((t) => t + 1)
  }

  const yesScale = Math.min(1 + tries * 0.12, 1.9)
  const noScale = Math.max(1 - tries * 0.05, 0.6)
  const noLabel = tries === 0 ? 'Нет' : config.noTexts[(tries - 1) % config.noTexts.length]

  const noButton = (
    <motion.button
      ref={noRef}
      className="btn btn-ghost no-btn"
      onPointerEnter={(e) => e.pointerType === 'mouse' && dodge()}
      onPointerDown={dodge}
      onClick={dodge}
      initial={false}
      animate={pos ? { scale: noScale, left: pos.x, top: pos.y } : { scale: noScale }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={pos ? { position: 'fixed', zIndex: 50 } : undefined}
    >
      {noLabel}
    </motion.button>
  )

  return (
    <div className="center page">
      <Berry id="question" style={{ bottom: 12, left: 14 }} />
      <span className="tape tape-left" />
      <span className="tape tape-right" />
      <p className="eyebrow">Главное предсказание</p>
      <h1 className="title">{config.nickname}, пойдёшь со мной на встречу?</h1>

      <div className="question-buttons">
        <motion.button
          ref={yesRef}
          className="btn btn-primary yes-btn"
          animate={{ scale: yesScale }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          onClick={onYes}
        >
          Да ✨
        </motion.button>
        {pos ? createPortal(noButton, document.body) : noButton}
      </div>

      <p className="hint">{tries >= 3 ? 'Кажется, на кнопку «Нет» наложено заклятие 🔮' : ' '}</p>
    </div>
  )
}
