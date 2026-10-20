import { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const BerryContext = createContext({ found: [], find: () => {} })

// Спрятанная клубничка: тап — исчезает и засчитывается
export default function Berry({ id, style }) {
  const { found, find } = useContext(BerryContext)
  const [popping, setPopping] = useState(false)
  const done = found.includes(id)

  return (
    <AnimatePresence>
      {!done && (
        <motion.button
          className="berry"
          style={style}
          aria-label="Клубничка"
          onClick={() => {
            if (popping) return
            setPopping(true)
            find(id)
          }}
          exit={{ scale: 2, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.35 }}
        >
          🍓
        </motion.button>
      )}
    </AnimatePresence>
  )
}
