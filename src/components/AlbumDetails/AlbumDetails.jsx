import { useEffect, useState } from 'react'
import styles from './AlbumDetails.module.css'

const SONGS_PER_PAGE = 10

function formatDuration(durationInMs) {
  const totalSeconds = Math.floor(durationInMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function formatTotalDuration(songs = []) {
  const totalMs = songs.reduce((sum, song) => sum + (song.durationInMs || 0), 0)
  const totalMinutes = Math.floor(totalMs / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours > 0) {
    return `${hours} hr ${minutes} min`
  }

  return `${minutes} min`
}

function shuffleArray(items = []) {
  const copy = [...items]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]]
  }

  return copy
}

function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages]
}

function AlbumDetails({ album, onBack, onSongSelect }) {
  const [displaySongs, setDisplaySongs] = useState(album?.songs || [])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setDisplaySongs(album?.songs || [])
    setCurrentPage(1)
  }, [album])

  if (!album) {
    return null
  }

  const handleShuffle = () => {
    setDisplaySongs((currentSongs) => shuffleArray(currentSongs))
    setCurrentPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(displaySongs.length / SONGS_PER_PAGE))
  const visibleSongs = displaySongs.slice(
    (currentPage - 1) * SONGS_PER_PAGE,
    currentPage * SONGS_PER_PAGE
  )
  const pageItems = getPageItems(currentPage, totalPages)

  const handleSongSelect = (song) => {
    if (onSongSelect) {
      onSongSelect(song)
    }
  }

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages))
  }

  return (
    <section className={styles.detailsPage}>
      <button className={styles.backButton} onClick={onBack} type="button" aria-label="go back">
        ←
      </button>

      <div className={styles.heroRow}>
        <img src={album.image} alt={album.title} className={styles.coverImage} />

        <div className={styles.infoBlock}>
          <h1>{album.title}</h1>
          <p className={styles.description}>{album.description}</p>
          <p className={styles.meta}>
            {displaySongs.length} songs • {formatTotalDuration(displaySongs)} • {album.follows?.toLocaleString()} Follows
          </p>
          <div className={styles.actions}>
            <button className={styles.shuffleButton} type="button" onClick={handleShuffle}>
              Shuffle
            </button>
            <button className={styles.libraryButton} type="button">Add to library</button>
          </div>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <span>Title</span>
          <span>Artist</span>
          <span>Duration</span>
        </div>

        {visibleSongs.map((song) => (
          <button
            key={song.id}
            type="button"
            className={styles.songRow}
            onClick={() => handleSongSelect(song)}
          >
            <div className={styles.titleCell}>
              <img src={song.image} alt={song.title} className={styles.songThumb} />
              <span>{song.title}</span>
            </div>
            <span className={styles.artistCell}>{song.artists?.join(', ')}</span>
            <span className={styles.durationCell}>{formatDuration(song.durationInMs || 0)}</span>
          </button>
        ))}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.pageArrow}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>

            {pageItems.map((item, index) =>
              item === 'ellipsis' ? (
                <span key={`ellipsis-${index}`} className={styles.pageEllipsis}>
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  className={`${styles.pageButton} ${item === currentPage ? styles.activePage : ''}`}
                  onClick={() => goToPage(item)}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              className={styles.pageArrow}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default AlbumDetails
