import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { config } from '../config.js'
import Berry from './Berry.jsx'

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const buildDays = ({ startOffset, days }) => {
  const now = new Date()
  return Array.from({ length: days }, (_, i) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + startOffset + i))
}

const buildTimes = ({ from, to, step }) => {
  const toMin = (t) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }
  const pad = (n) => String(n).padStart(2, '0')
  const times = []
  for (let m = toMin(from); m <= toMin(to); m += step) times.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`)
  return times
}

const formatDate = (d) => d.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })
const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString()

// Экран 5: она сама выбирает день и время
export default function DateTime({ choice, setChoice, onNext }) {
  const days = useMemo(() => buildDays(config.dateRange), [])
  const times = useMemo(() => buildTimes(config.timeRange), [])
  const leading = (days[0].getDay() + 6) % 7
  const months = [...new Set(days.map((d) => d.toLocaleDateString('ru-RU', { month: 'long' })))]
    .map((m) => m[0].toUpperCase() + m.slice(1))
    .join(' — ')
  const ready = choice.date && choice.time

  return (
    <div className="center page">
      <Berry id="date" style={{ bottom: 12, right: 14 }} />
      <span className="tape tape-right" />

      <p className="eyebrow">Последний ингредиент</p>
      <h2 className="subtitle">Выбери день и час встречи</h2>

      <div className="calendar">
        <div className="calendar-month">{months}</div>
        <div className="calendar-grid">
          {WEEKDAYS.map((w) => (
            <span key={w} className="calendar-weekday">
              {w}
            </span>
          ))}
          {Array.from({ length: leading }, (_, i) => (
            <span key={`e${i}`} />
          ))}
          {days.map((d) => (
            <motion.button
              key={d.toISOString()}
              whileTap={{ scale: 0.9 }}
              className={`calendar-day ${sameDay(d, choice.date) ? 'selected' : ''} ${d.getDay() % 6 === 0 ? 'weekend' : ''}`}
              onClick={() => setChoice({ ...choice, date: d, dateLabel: formatDate(d) })}
            >
              {d.getDate()}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="times">
        {times.map((t) => (
          <motion.button
            key={t}
            whileTap={{ scale: 0.9 }}
            className={`time-chip ${choice.time === t ? 'selected' : ''}`}
            onClick={() => setChoice({ ...choice, time: t })}
          >
            {t}
          </motion.button>
        ))}
      </div>

      <p className="hint">
        {ready ? `${choice.dateLabel}, ${choice.time}` : choice.date ? `${choice.dateLabel} — а во сколько?` : 'Выбери день и время'}
      </p>

      <button className="btn btn-primary" disabled={!ready} onClick={onNext}>
        Записать в гримуар ✍️
      </button>
    </div>
  )
}
