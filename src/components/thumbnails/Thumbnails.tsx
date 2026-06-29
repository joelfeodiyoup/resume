import { useState } from 'react'
import styles from './Thumbnails.module.scss'

export const Thumbnails = ({
  imgs,
}: {
  imgs: { src: string; thumbnail: string; alt: string }[]
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  )
  return (
    <div className={styles.thumbnails}>
      <div
        onClick={() => setSelectedImageIndex(null)}
        className={[
          styles.expanded,
          ...(selectedImageIndex !== null ? [styles.open] : []),
        ].join(' ')}
      >
        {selectedImageIndex !== null && (
          <img
            src={imgs[selectedImageIndex].src}
            alt={imgs[selectedImageIndex].alt}
          ></img>
        )}
      </div>
      {imgs.map((img, i) => (
        <div key={img.alt}>
          <img
            onClick={() => setSelectedImageIndex(i)}
            src={img.thumbnail}
            alt={img.alt}
            className={styles['thumbnails-img']}
          ></img>
        </div>
      ))}
    </div>
  )
}
