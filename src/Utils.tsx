import { New } from "./Schemas"

export function getRandomColor(currentColor?: string, customColors?: string[]): string {
  const defaultColors = ['--color-red', '--color-blue', '--color-green', '--color-purple']
  const colors = customColors || defaultColors
  const availableColors = currentColor
    ? colors.filter(color => `var(${color})` !== currentColor)
    : colors

  const randomIndex = Math.floor(Math.random() * availableColors.length)
  return `var(${availableColors[randomIndex]})`
}

export async function fetchNews(page: number): Promise<{formattedNews: New[], page: number}> {
  try {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    const storyIds = await response.json()

    const start = (page - 1) * 30
    const end = start + 30
    const topStoryIds = storyIds.slice(start, end)

    const newsPromises = topStoryIds.map(async (id: number) => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      return await storyResponse.json()
    })

    const newsItems = await Promise.all(newsPromises)
    const formattedNews = newsItems.map((item, index) => ({
      order: index + 1 + start,
      title: item.title,
      comments: item.descendants,
      points: item.score,
      url: item.url
    }))

    const nextPage = (page === 5) ? 1 : page + 1;

    return { formattedNews, page: nextPage }
  } catch (error) {
    console.error("Error fetching news:", error)
    return { formattedNews: [], page }
  }
}