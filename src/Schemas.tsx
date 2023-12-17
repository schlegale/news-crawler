export interface New {
  order: number
  title: string
  comments: number
  points: number
  url: string
}

export interface CrawlieProps {
  onFetchNewNews: () => void
}

export interface ListProps {
  items: New[]
}

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  value: string
  options: SelectOption[]
}