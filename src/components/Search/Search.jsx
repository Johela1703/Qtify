import { useMemo, useState } from 'react'
import styles from './Search.module.css'

function Search({ albums = [], onSearch, onSelectAlbum }) {
  const [query, setQuery] = useState('')

  const filteredAlbums = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) {
      return []
    }

    return albums.filter((album) => {
      const title = album.title?.toLowerCase() || ''
      const slug = album.slug?.toLowerCase() || ''
      const artistText = album.artists?.join(' ').toLowerCase() || ''

      return title.includes(normalized) || slug.includes(normalized) || artistText.includes(normalized)
    })
  }, [albums, query])

  const handleSubmit = (e) => {
    e.preventDefault()

    const value = query.trim()
    if (!value) {
      return
    }

    onSearch?.(value)

    if (filteredAlbums.length > 0) {
      onSelectAlbum?.(filteredAlbums[0])
    }
  }

  const handleSelect = (album) => {
    setQuery(album.title)
    onSelectAlbum?.(album)
  }

  const handleBlur = () => {
    setTimeout(() => {
      if (!query.trim()) {
        setQuery('')
      }
    }, 150)
  }

  return (
    <div className={styles.searchWrap}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Search a album of your choice"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleBlur}
          aria-label="search albums"
        />
        <button className={styles.searchButton} type="submit" aria-label="search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1666 14.1667L18.3333 18.3334" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
            <circle cx="8.75" cy="8.75" r="6.25" stroke="#121212" strokeWidth="2" />
          </svg>
        </button>
      </form>

      {filteredAlbums.length > 0 && (
        <div className={styles.dropdown}>
          {filteredAlbums.slice(0, 6).map((album) => (
            <button
              key={album.id}
              type="button"
              className={styles.resultItem}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(album)}
            >
              <img src={album.image} alt={album.title} className={styles.resultImage} />
              <div className={styles.resultText}>
                <span className={styles.resultTitle}>{album.title}</span>
                <span className={styles.resultMeta}>{album.description || 'Album name'}</span>
              </div>
              <span className={styles.resultFollowers}>{album.follows?.toLocaleString()} Follows</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
