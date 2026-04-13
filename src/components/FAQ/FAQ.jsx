import { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  {
    id: 1,
    question: 'Is Qtify free to use?',
    answer: 'Yes! It is 100% free, and has 0% ads!'
  },
  {
    id: 2,
    question: 'Can I download and listen to songs offline?',
    answer: 'Sorry, unfortunately we don\'t provide the service to download any songs.'
  }
]

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={styles.faqItem}>
      <button className={styles.faqHeader} onClick={onToggle} type="button">
        <span className={styles.question}>{question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.open : ''}`} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d={isOpen ? 'M6 14L12 8L18 14' : 'M6 10L12 16L18 10'}
              stroke="#34C94B"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {isOpen && <div className={styles.answer}>{answer}</div>}
    </div>
  )
}

function FAQ() {
  const [openId, setOpenId] = useState(1)

  return (
    <section className={styles.faqSection}>
      <div className={styles.header}>
        <h2>FAQs</h2>
      </div>
      <div className={styles.faqList}>
        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openId === faq.id}
            onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default FAQ
