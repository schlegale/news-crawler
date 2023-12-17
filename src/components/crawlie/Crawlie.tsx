import { CrawlieProps } from '../../Schemas'

export default function Crawlie({ onFetchNewNews }: CrawlieProps) {
  return (
    <div onClick={onFetchNewNews}>
      Crawlie
    </div>
  )
}
