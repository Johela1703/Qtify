import { useEffect } from 'react'
import styles from './Toast.module.css'

function Toast({ isOpen, message, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return <div className={styles.toast}>{message}</div>
}

export default Toast
