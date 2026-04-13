import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Section from './components/Section/Section'
import FAQ from './components/FAQ/FAQ'
import AlbumDetails from './components/AlbumDetails/AlbumDetails'
import Player from './components/Player/Player'
import {
  fetchTopAlbums,
  fetchNewAlbums,
  fetchSongs,
  fetchGenres
} from './helpers/helpers'

function App() {
  const [topAlbums, setTopAlbums] = useState([])
  const [newAlbums, setNewAlbums] = useState([])
  const [songs, setSongs] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [selectedSong, setSelectedSong] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [topAlbumsData, newAlbumsData, songsData, genresData] = await Promise.all([
          fetchTopAlbums(),
          fetchNewAlbums(),
          fetchSongs(),
          fetchGenres()
        ])

        setTopAlbums(topAlbumsData)
        setNewAlbums(newAlbumsData)
        setSongs(songsData)
        setGenres(genresData)
      } catch (error) {
        console.error('Failed to load QTify data', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const searchableAlbums = useMemo(() => {
    const unique = []
    const seen = new Set()

    ;[...topAlbums, ...newAlbums].forEach((album) => {
      if (!seen.has(album.id)) {
        seen.add(album.id)
        unique.push(album)
      }
    })

    return unique
  }, [topAlbums, newAlbums])

  const handleSearch = (query) => {
    const normalized = query.toLowerCase().trim()
    const dashed = normalized.replace(/\s+/g, '-')

    const matchedAlbum = searchableAlbums.find((album) => {
      const title = album.title?.toLowerCase() || ''
      const slug = album.slug?.toLowerCase() || ''

      return title.includes(normalized) || slug.includes(normalized) || slug.includes(dashed)
    })

    if (matchedAlbum) {
      setSelectedAlbum(matchedAlbum)
    }
  }

  const handleSelectAlbum = (album) => {
    setSelectedAlbum(album)
  }

  useEffect(() => {
    setSelectedSong(selectedAlbum?.songs?.[0] || null)
  }, [selectedAlbum])

  return (
    <div className="app">
      <Navbar albums={searchableAlbums} onSearch={handleSearch} onSelectAlbum={handleSelectAlbum} />

      {selectedAlbum ? (
        <AlbumDetails
          album={selectedAlbum}
          onBack={() => setSelectedAlbum(null)}
          onSongSelect={setSelectedSong}
        />
      ) : (
        <>
          <Hero />
          {loading ? (
            <p className="loading">Loading albums and songs...</p>
          ) : (
            <main>
              <Section title="Top Albums" data={topAlbums} enableToggle idPrefix="top-albums" />
              <Section title="New Albums" data={newAlbums} enableToggle idPrefix="new-albums" />
              <Section
                title="Songs"
                data={songs}
                isSongSection
                genres={genres}
                enableToggle={false}
                idPrefix="songs"
              />
            </main>
          )}
          <FAQ />
        </>
      )}
      <Player song={selectedSong} albumTitle={selectedAlbum?.title} />
    </div>
  )
}

export default App
