import { useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { config } from './config.js'
import { BerryContext } from './components/Berry.jsx'
import Sky from './components/Sky.jsx'
import Seal from './components/Seal.jsx'
import Quiz from './components/Quiz.jsx'
import Question from './components/Question.jsx'
import Potion from './components/Potion.jsx'
import DateTime from './components/DateTime.jsx'
import Scratch from './components/Scratch.jsx'
import Final from './components/Final.jsx'

const TOTAL = 7
const BERRY_COUNT = Object.keys(config.berries).length

export default function App() {
  const [step, setStep] = useState(0)
  const [choice, setChoice] = useState({ activity: null, date: null, dateLabel: '', time: null })
  const [found, setFound] = useState([])
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)
  const next = () => setStep((s) => Math.min(s + 1, TOTAL - 1))

  const find = (id) => {
    if (found.includes(id)) return
    setFound([...found, id])
    setToast({ id, text: config.berries[id], count: found.length + 1 })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2800)
  }

  const screens = [
    <Seal onNext={next} />,
    <Quiz onNext={next} />,
    <Question onYes={next} />,
    <Potion choice={choice} setChoice={setChoice} onNext={next} />,
    <DateTime choice={choice} setChoice={setChoice} onNext={next} />,
    <Scratch choice={choice} onNext={next} />,
    <Final choice={choice} allBerries={found.length === BERRY_COUNT} berries={found.length} total={BERRY_COUNT} onBack={() => setStep(3)} />,
  ]

  return (
    <MotionConfig reducedMotion="user">
      <BerryContext.Provider value={{ found, find }}>
        <Sky />
        <main className="stage">
          <div className="progress" aria-hidden="true">
            {Array.from({ length: TOTAL }, (_, i) => (
              <span key={i} className={i <= step ? 'dot on' : 'dot'} />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.section
              key={step}
              className="screen"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {screens[step]}
            </motion.section>
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              className="toast"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <b>
                🍓 {toast.count}/{BERRY_COUNT}
              </b>{' '}
              {toast.text}
            </motion.div>
          )}
        </AnimatePresence>
      </BerryContext.Provider>
    </MotionConfig>
  )
}
