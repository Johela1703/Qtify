import styles from './Player.module.css'

function formatDuration(durationInMs = 0) {
  const totalSeconds = Math.floor(durationInMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function Player({ song, albumTitle }) {
  const songName = song?.title || 'Song name'
  const subtitle = albumTitle || song?.artists?.join(', ') || 'Album name'
  const endTime = formatDuration(song?.durationInMs || 0)

  return (
    <div className={styles.player}>
      <div className={styles.albumArt}>
        <img
          src={song?.image || 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'}
          alt={songName}
        />
      </div>

      <div className={styles.songInfo}>
        <p className={styles.songName}>{songName}</p>
        <p className={styles.albumName}>{subtitle}</p>
      </div>

      <button className={styles.playButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

      <div className={styles.progressContainer}>
        <span className={styles.time}>0:00</span>
        <div className={styles.progressBar}>
          <div className={styles.progress} />
        </div>
        <span className={styles.time}>{endTime}</span>
      </div>

      <button className={styles.volumeButton}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2C5.6 2 2 5.6 2 10s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
        </svg>
      </button>
    </div>
  )
}

export default Player
