import { useMemo, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Card from '../Card/Card'
import Carousel from '../Carousel/Carousel'
import styles from './Section.module.css'

function Section({
  title,
  data,
  isSongSection = false,
  genres = [],
  enableToggle = true,
  idPrefix
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState('all')

  const filteredData = useMemo(() => {
    if (!isSongSection || selectedGenre === 'all') {
      return data
    }

    return data.filter((song) => song.genre?.key === selectedGenre)
  }, [data, isSongSection, selectedGenre])

  const renderCard = (item) => {
    const statType = isSongSection ? 'Likes' : 'Follows'
    const statValue = isSongSection ? item.likes : item.follows

    return (
      <Card
        image={item.image}
        title={item.title}
        statType={statType}
        statValue={statValue}
      />
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2>{title}</h2>
        {enableToggle && (
          <button
            className={styles.toggleButton}
            onClick={() => setCollapsed((prev) => !prev)}
            type="button"
          >
            {collapsed ? 'Show all' : 'Collapse'}
          </button>
        )}
      </div>

      {isSongSection && (
        <div className={styles.tabsWrap}>
          <Tabs
            value={selectedGenre}
            onChange={(_, value) => setSelectedGenre(value)}
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: '#34C94B', height: 3 } }}
          >
            <Tab className={styles.tab} value="all" label="All" disableRipple />
            {genres.map((genre) => (
              <Tab
                key={genre.key}
                className={styles.tab}
                value={genre.key}
                label={genre.label}
                disableRipple
              />
            ))}
          </Tabs>
        </div>
      )}

      {enableToggle && !collapsed ? (
        <div className={styles.grid}>
          {filteredData.map((item) => (
            <div key={item.id}>{renderCard(item)}</div>
          ))}
        </div>
      ) : (
        <Carousel data={filteredData} renderItem={renderCard} idPrefix={idPrefix} />
      )}
    </section>
  )
}

export default Section
