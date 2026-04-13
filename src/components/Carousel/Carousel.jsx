import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './Carousel.module.css'
import leftArrow from '../../assets/left-arrow.svg'
import rightArrow from '../../assets/right-arrow.svg'

function LeftArrow({ className }) {
  return (
    <button className={`${styles.navButton} ${styles.left} ${className || ''}`.trim()}>
      <img src={leftArrow} alt="left" />
    </button>
  )
}

function RightArrow({ className }) {
  return (
    <button className={`${styles.navButton} ${styles.right} ${className || ''}`.trim()}>
      <img src={rightArrow} alt="right" />
    </button>
  )
}

function Carousel({ data, renderItem, idPrefix }) {
  const prevClass = `${idPrefix}-prev`
  const nextClass = `${idPrefix}-next`

  return (
    <div className={styles.carouselWrap}>
      <LeftArrow className={prevClass} />
      <RightArrow className={nextClass} />
      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 2.2 },
          600: { slidesPerView: 3.2 },
          900: { slidesPerView: 5.2 },
          1200: { slidesPerView: 7 }
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel
