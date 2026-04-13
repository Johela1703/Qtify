import styles from './Button.module.css'

function Button({ children, onClick, type = 'button', className = '' }) {
  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${className}`.trim()}>
      {children}
    </button>
  )
}

export default Button
