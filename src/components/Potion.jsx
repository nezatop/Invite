import { motion } from 'framer-motion'
import { config } from '../config.js'
import Berry from './Berry.jsx'

// Экран 4: выбор «зелья» — чем займёмся
export default function Potion({ choice, setChoice, onNext }) {
  return (
    <div className="center page">
      <Berry id="potion" style={{ top: 12, right: 14 }} />
      <span className="tape tape-left" />

      <p className="eyebrow">Ура! Теперь сварим зелье</p>
      <h2 className="subtitle">Выбери зелье для встречи</h2>

      <div className="potions">
        {config.activities.map((a) => (
          <motion.button
            key={a.id}
            whileTap={{ scale: 0.96 }}
            className={`potion-card ${choice.activity?.id === a.id ? 'selected' : ''}`}
            onClick={() => setChoice({ ...choice, activity: a })}
          >
            <span className="potion-emoji">{a.emoji}</span>
            <span className="potion-info">
              <span className="card-label">{a.label}</span>
              <span className="card-sub">{a.potion}</span>
              <span className="potion-note">{a.note}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <button className="btn btn-primary" disabled={!choice.activity} onClick={onNext}>
        {choice.activity ? 'Сварить зелье 🧪' : 'Выбери зелье'}
      </button>
    </div>
  )
}
