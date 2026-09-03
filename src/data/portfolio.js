const igrejaFiles = import.meta.glob('../assets/portfolio/igreja/*', {
  eager: true,
  query: '?url',
  import: 'default',
})
const trabalhosFiles = import.meta.glob('../assets/portfolio/trabalhos/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

function toItems(files, category) {
  return Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => {
      const name = path.split('/').pop().replace(/^\d+-/, '').replace(/\.[^.]+$/, '')
      const title = name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      return { src, title, category }
    })
}

export const portfolio = [
  ...toItems(trabalhosFiles, 'Trabalhos'),
  ...toItems(igrejaFiles, 'Igreja'),
]

export const categories = ['Todos', 'Trabalhos', 'Igreja']
