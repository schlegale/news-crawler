import { describe, expect, it } from 'vitest'
import { getRandomColor } from './Utils'

describe('getRandomColor', () => {
  it('returns a color from default colors', () => {
    const color = getRandomColor()
    expect(['var(--color-red)', 'var(--color-blue)', 'var(--color-green)', 'var(--color-purple)']).toContain(color)
  })

  it('does not repeat the previous color if it is sent by param', () => {
    const currentColor = 'var(--color-red)'
    const color = getRandomColor(currentColor)
    expect(color).not.toBe(currentColor)
  })
})