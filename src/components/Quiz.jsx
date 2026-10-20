import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../config.js'
import Berry from './Berry.jsx'

// Экран 2: квиз «Магический шар» — правильных ответов нет, есть предсказания
export default function Quiz({ onNext }) {
  const [index, setIndex] = useState(0)
  const [reply, setReply] = useState(null)
  const q = config.quiz[index]
  const isLast = index === config.quiz.length - 1

  const proceed = () => {
    if (isLast) return onNext()
    setIndex(index + 1)
    setReply(null)
  }

  return (
    <div className="center page">
      <Berry id="quiz" style={{ top: 12, left: 14 }} />
      <span className="tape tape-right" />
      <p className="eyebrow">
        Магический шар · {index + 1} / {config.quiz.length}
      </p>

      <motion.div
        key={reply ?? `q${index}`}
        className="ball"
        initial={{ rotate: 0 }}
        animate={reply ? { rotate: [0, -8, 8, -5, 5, 0] } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="ball-window">
          <AnimatePresence mode="wait">
            <motion.span
              key={reply ?? 'idle'}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={reply ? 'ball-text' : 'ball-idle'}
            >
              {reply ?? '?'}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      <h2 className="subtitle">{q.question}</h2>

      {reply ? (
        <motion.button className="btn btn-primary" onClick={proceed} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {isLast ? 'Шар всё понял →' : 'Дальше →'}
        </motion.button>
      ) : (
        <div className="options">
          {q.answers.map((a) => (
            <button key={a.text} className="btn btn-ghost" onClick={() => setReply(a.reply)}>
              {a.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
