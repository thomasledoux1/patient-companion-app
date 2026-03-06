export type TipForList = {
  id: number
  title: string
  teaser: string
  category: 'weather' | 'food' | 'stress'
  picture: { url?: string | null; alt?: string | null } | number | null
}

export function toTipForList(t: {
  id: number
  title: string
  teaser: string
  category: 'weather' | 'food' | 'stress'
  picture?: unknown
}): TipForList {
  const pic = t.picture
  return {
    id: t.id,
    title: t.title,
    teaser: t.teaser,
    category: t.category,
    picture:
      pic == null
        ? null
        : typeof pic === 'object' && 'url' in pic
          ? {
              url: (pic as { url?: string | null }).url ?? null,
              alt: (pic as { alt?: string | null }).alt ?? null,
            }
          : (pic as number),
  }
}
