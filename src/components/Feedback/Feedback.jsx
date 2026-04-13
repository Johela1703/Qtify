import { useState } from 'react'
import Modal from '../Modal/Modal'
import Toast from '../Toast/Toast'
import styles from './Feedback.module.css'

function Feedback({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    description: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Feedback submitted:', formData)
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      description: ''
    })
    setShowSuccess(true)
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.feedbackForm}>
          <div className={styles.header}>
            <h2>Feedback</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
            ></textarea>

            <button type="submit" className={styles.submitBtn}>
              Submit Feedback
            </button>
          </form>
        </div>
      </Modal>
      <Toast isOpen={showSuccess} message="Feedback submitted successfully" onClose={() => setShowSuccess(false)} />
    </>
  )
}

export default Feedback
