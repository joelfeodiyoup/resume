const thumbnails = {
  ...import.meta.glob('../assets/images/about_images/*.png', {
    query: { format: 'webp', w: 250 },
    import: 'default',
    eager: true,
  }),
  ...import.meta.glob('../assets/images/about_images/*.jpg', {
    query: { format: 'webp', w: 250 },
    import: 'default',
    eager: true,
  }),
}

const fullImages = {
  ...import.meta.glob('../assets/images/about_images/*.png', {
    query: { format: 'webp' },
    import: 'default',
    eager: true,
  }),
  ...import.meta.glob('../assets/images/about_images/*.jpg', {
    query: { format: 'webp' },
    import: 'default',
    eager: true,
  }),
}

export const about_images = Object.entries(thumbnails).reduce(
  (acc, [path, thumbnail]) => {
    const key =
      path
        .split('/')
        .pop()
        ?.replace(/\.(png|jpg)$/, '') || ''

    acc[key] = {
      thumbnail: thumbnail as string,
      src: fullImages[path] as string,
      alt: key.replace(/_/g, ' '),
    }
    return acc
  },
  {} as Record<string, { thumbnail: string; src: string; alt: string }>,
)

export const aboutImagesByKeys = (keys: string[]) =>
  keys.map((key) => about_images[key]).filter(Boolean)
