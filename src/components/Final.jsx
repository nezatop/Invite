import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { config } from '../config.js'

const COLORS = ['#f4a7b9', '#a9d2f0', '#c9b6e8', '#f3d58a', '#ffffff']

// Экран 7: салют из искр и отправка ответа в Telegram
export default function Final({ choice, allBerries, berries, total, onBack }) {
  const [copied, setCopied] = useState(false)
  const message = config.replyMessage(choice, allBerries)
  const link = `https://t.me/${config.telegramUsername}?text=${encodeURIComponent(message)}`

  useEffect(() => {
    const burst = (x) =>
      confetti({ particleCount: 70, spread: 75, startVelocity: 45, origin: { x, y: 0.7 }, colors: COLORS, shapes: ['star', 'circle'], scalar: 1.1 })
    burst(0.2)
    burst(0.8)
    const t = setTimeout(() => burst(0.5), 500)
    return () => clearTimeout(t)
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="center page">
      <span className="tape tape-left" />
      <span className="tape tape-right" />

      <p className="eyebrow">Заклинание сработало</p>
      <h1 className="title">Это свидание, {config.nickname}! 🔮</h1>

      <div className="summary">
        <div>
          {choice.activity?.emoji} {choice.activity?.label}
        </div>
        <div>📅 {choice.dateLabel}</div>
        <div>🕰️ {choice.time}</div>
      </div>

      {allBerries ? (
        <p className="secret">{config.berriesSecret}</p>
      ) : (
        <p className="hint">
          Клубничек найдено: {berries}/{total}. Остальные где-то прячутся 🍓
        </p>
      )}

      <p className="text">Осталось отправить мне ответ — гримуар доставит его в Telegram</p>

      <a className="btn btn-primary" href={link} target="_blank" rel="noreferrer">
        Отправить ответ ✈️
      </a>
      <div className="row">
        <button className="btn-link" onClick={copy}>
          {copied ? 'Скопировано ✓' : 'Скопировать текст'}
        </button>
        <button className="btn-link" onClick={onBack}>
          Изменить выбор
        </button>
      </div>
    </div>
  )
}
