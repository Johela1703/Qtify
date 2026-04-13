import Chip from '@mui/material/Chip'
import styles from './Card.module.css'

function Card({ image, title, statType = 'follows', statValue = 0 }) {
  const chipLabel = `${Number(statValue).toLocaleString()} ${statType}`

  return (
    <article className={styles.card}>
      <div className={styles.mediaWrap}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.chipWrap}>
          <Chip
            label={chipLabel}
            sx={{
              backgroundColor: '#121212',
              color: '#ffffff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '10px',
              height: '23px',
              borderRadius: '999px',
              '& .MuiChip-label': { paddingInline: '10px' }
            }}
          />
        </div>
      </div>
      <p className={styles.title}>{title}</p>
    </article>
  )
}

export default Card
