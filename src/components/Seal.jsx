import { useState } from 'react'
import { motion } from 'framer-motion'
import { config } from '../config.js'
import Berry from './Berry.jsx'

// Экран 1: гримуар с сургучной печатью — тап ломает печать и открывает обложку
export default function Seal({ onNext }) {
  const [broken, setBroken] = useState(false)

  const breakSeal = () => {
    if (broken) return
    setBroken(true)
    setTimeout(onNext, 1300)
  }

  return (
    <div className="center page">
      <Berry id="seal" style={{ bottom: 14, left: 14 }} />
      <span className="tape tape-left" />
      <span className="tape tape-right" />

      <p className="eyebrow">Тебе послание</p>
      <h1 className="title">{config.nickname}, гримуар кое-что тебе предсказал…</h1>

      <div className="book">
        <div className="book-pages" />
        <motion.div
          className="book-cover"
          animate={broken ? { rotateY: -115 } : { y: [0, -5, 0] }}
          transition={broken ? { duration: 1, ease: 'easeInOut', delay: 0.3 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="book-title">
            Гримуар
            <br />
            Ведьмочки
          </span>
          <button className="seal" onClick={breakSeal} aria-label="Сломать печать">
            <motion.span
              className="seal-half left"
              animate={broken ? { x: -50, y: 40, rotate: -40, opacity: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeIn' }}
            />
            <motion.span
              className="seal-half right"
              animate={broken ? { x: 50, y: 40, rotate: 40, opacity: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeIn' }}
            />
            <motion.span className="seal-mark" animate={broken ? { opacity: 0, scale: 1.6 } : {}}>
              ✦
            </motion.span>
          </button>
        </motion.div>
      </div>

      <p className="hint">{broken ? 'Печать сломана…' : 'Коснись печати, чтобы открыть'}</p>
    </div>
  )
}
