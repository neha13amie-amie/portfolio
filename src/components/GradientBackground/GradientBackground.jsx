import { motion } from 'framer-motion'
import styles from './GradientBackground.module.css'

// Plum-range gradients — dark enough that light text stays readable across the whole cycle
const DEFAULT_GRADIENTS = [
  'linear-gradient(135deg, #2f2235 0%, #60495a 100%)',
  'linear-gradient(135deg, #3f3244 0%, #2f2235 100%)',
  'linear-gradient(135deg, #60495a 0%, #3f3244 100%)',
  'linear-gradient(135deg, #2f2235 0%, #4a3a48 100%)',
  'linear-gradient(135deg, #2f2235 0%, #60495a 100%)',
]

export function GradientBackground({
  gradients = DEFAULT_GRADIENTS,
  animationDuration = 14,
  animationDelay = 0.5,
}) {
  return (
    <motion.div
      className={styles.bg}
      aria-hidden="true"
      style={{ background: gradients[0] }}
      animate={{ background: gradients }}
      transition={{
        delay: animationDelay,
        duration: animationDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
