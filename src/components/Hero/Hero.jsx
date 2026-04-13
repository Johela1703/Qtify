import heroImage from '../../assets/hero-headphones.svg'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <img src={heroImage} alt="Headphones illustration" className={styles.image} />
    </section>
  )
}

export default Hero
