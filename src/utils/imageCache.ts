const cache: { [key: string]: string } = {}

export const read = (src: string) => {
  console.log(cache)
  if (!cache[src]) {
    const promise = new Promise<string>((resolve) => {
      const img = document.createElement('img')
      img.onload = () => resolve(src)
      img.src = src
    }).then((src) => {
      cache[src] = src
    })
    throw promise
  }
  return cache[src]
}
