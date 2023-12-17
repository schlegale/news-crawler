import { useState, useEffect } from 'react'
import List from './components/list/List'
import Crawlie from './components/crawlie/Crawlie'
import Select from './components/select/Select'
import { New } from './Schemas'
import { fetchNews, getRandomColor } from './Utils'

export default function App() {
  const [news, setNews] = useState<New[]>([])
  const [filteredNews, setFilteredNews] = useState<New[]>([])
  const [filter, setFilter] = useState<string>('all')

  const [titleColor, setTitleColor] = useState<string>('var(--color-purple)')
  const [crawlieColor, setCrawlieColor] = useState<string>('var(--color-green)')

  const handleH1Click = () => {
    setTitleColor(getRandomColor(titleColor))
  }

  const handleCrawlieClick = () => {
    setCrawlieColor(getRandomColor(crawlieColor))
  }

  useEffect(() => {
    const initialFetch = async () => {
      const fetchedNews = await fetchNews()
      setNews(fetchedNews)
    }

    initialFetch()
  }, [])

  useEffect(() => {
    setFilteredNews(applyFilter(news, filter))
  }, [filter, news])

  const applyFilter = (newsArray: New[], filterType: string): New[] => {
    switch (filterType) {
      case 'short news':
        return newsArray.filter(item => item.title.split(' ').length <= 5)
      case 'long titles':
        return newsArray.filter(item => item.title.split(' ').length > 5)
      default:
        return newsArray
    }
  }

  const selectOptions = [
    { value: 'all', label: 'All News' },
    { value: 'short news', label: 'Short Titles' },
    { value: 'long titles', label: 'Long Titles' },
  ]

  return <div>
    <Crawlie onFetchNewNews={async () => {
        const newNews = await fetchNews()
        setNews(newNews)
      }} />
    <h1 style={{color: titleColor}} onClick={handleH1Click} className='clickable'>News Crawler</h1>
    <p>
      In the ever-evolving world of information, staying updated with the latest news can be a challenge. That's where 
      <span style={{ fontWeight: 800, color: crawlieColor }} onClick={handleCrawlieClick} className='clickable'> Crawlie</span>,
      my trusty tech spider pet, comes into play! Just like a skilled crawler, Crawlie scurries across the vast web, weaving through 
      threads of data to bring you the most current and relevant news. So, if you're eager to catch up with the latest happenings or curious 
      about trending stories, just give Crawlie a click. It's ready to fetch the freshest news from the corners of the digital world, 
      right to your screen. Dive into the sea of information with Crawlie – your reliable guide to the pulse of the planet!
    </p>
    <Select 
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)} 
      value={filter} 
      options={selectOptions}
    />
    <List items={filteredNews}/>
  </div>
}