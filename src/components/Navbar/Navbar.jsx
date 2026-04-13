import { useState } from 'react'
import Logo from '../Logo/Logo'
import Search from '../Search/Search'
import Button from '../Button/Button'
import Feedback from '../Feedback/Feedback'
import styles from './Navbar.module.css'

function Navbar({ albums, onSearch, onSelectAlbum }) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  return (
    <>
      <nav className={styles.navbar}>
        <Logo />
        <div className={styles.searchWrap}>
          <Search albums={albums} onSearch={onSearch} onSelectAlbum={onSelectAlbum} />
        </div>
        <Button onClick={() => setIsFeedbackOpen(true)}>Give Feedback</Button>
      </nav>
      <Feedback isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  )
}

export default Navbar
