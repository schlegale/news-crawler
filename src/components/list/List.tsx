import { useState, useEffect } from 'react'
import styles from './List.module.css'
import { getRandomColor } from '../../Utils'
import { ListProps } from '../../Schemas'

export default function List({ items }: ListProps) {
  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    const initialColors = items.map(() => getRandomColor())
    setColors(initialColors)
  }, [items])

  const handleColorChange = (index: number) => {
    const newColors = [...colors]
    newColors[index] = getRandomColor(colors[index])
    setColors(newColors)
  }

  return (
    <ul className={styles.container}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          <span
            className={`${styles.orderNumber} clickable`}
            style={{ color: colors[index] }}
            onClick={() => handleColorChange(index)}
          >
            {item.order}.
          </span>
          <a href={item.url} target='blank' className={styles.link}> {item.title} - Points: {item.points}, Comments: {item.comments}</a>
        </li>
      ))}
    </ul>
  )
}
