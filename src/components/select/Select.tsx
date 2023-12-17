import { useEffect, useState } from 'react'
import { getRandomColor } from '../../Utils'
import styles from './Select.module.css'
import { SelectProps } from '../../Schemas'

export default function Select({ value, onChange, options }: SelectProps) {
  const [backgroundColor, setBackgroundColor] = useState('')

  useEffect(() => {
    setBackgroundColor(getRandomColor(backgroundColor))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <select 
      onChange={onChange} 
      value={value} 
      className={styles.container}
      style={{ backgroundColor: backgroundColor }}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
