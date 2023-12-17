import styles from './Crawlie.module.css'
import { CrawlieProps } from '../../Schemas'

export default function Crawlie({ onFetchNewNews }: CrawlieProps) {
  return (
    <div className={`${styles.container} clickable`} onClick={onFetchNewNews}>
      Crawlie
    </div>
  )
}
