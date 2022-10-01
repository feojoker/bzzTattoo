type shareImage = {
  data: {
    id: number,
    attributes: {
      name: string,
      alternativeText: string,
      caption: string,
      width: number,
      height: number,
      formats?: {
        thumbnail: {
          name: string,
          hash: string,
          ext: string,
          mime: string,
          path: null,
          width: number,
          height: number,
          size: number,
          url: string
        },
        small: {
          name: string,
          hash: string,
          ext: string,
          mime: string,
          path: string | null,
          width: number,
          height: number,
          size: number,
          url: string
        },
        medium: {
          name: string,
          hash: string,
          ext: string,
          mime: string,
          path: string | null,
          width: number,
          height: number,
          size: number,
          url: string
        },
        large: {
          name: string,
          hash: string,
          ext: string,
          mime: string,
          path: string | null,
          width: number,
          height: number,
          size: number,
          url: string
        }
      },
      hash: string,
      ext: string,
      mime: string,
      size: number,
      url: string,
      previewUrl: string | null,
      provider: string,
      provider_metadata: string | null,
      createdAt: string,
      updatedAt: string
    }
  }
}

export type Seo = {
  id: number,
  metaTitle: string,
  metaDescription: string,
  shareImage?: shareImage
}

export type Global = {
  id: number,
  attributes: {
    siteName: string,
    createdAt: string,
    updatedAt: string,
    favicon: {
      data: {
        id: number,
        attributes: {
          name: string,
          alternativeText: string,
          caption: string,
          width: number,
          height: number,
          formats: {
            thumbnail: {
              name: string,
              hash: string,
              ext: string,
              mime: string,
              path: string | null,
              width: number,
              height: number,
              size: number,
              url: string
            },
            small: {
              name: string,
              hash: string,
              ext: string,
              mime: string,
              path: string | null,
              width: number,
              height: number,
              size: number,
              url: string
            }
          },
          hash: string,
          ext: string,
          mime: string,
          size: number,
          url: string,
          previewUrl: string | null,
          provider: string,
          provider_metadata: string | null,
          createdAt: string,
          updatedAt: string
        }
      }
    },
    defaultSeo: Seo
  }
}


export type Homepage = {
  id: number,
  attributes: {
    createdAt: string,
    updatedAt: string,
    hero: {
      id: number,
      title: string
    },
    seo: Seo
  }
}


export type Navs = {
  id: number,
  attributes: {
    name: string,
    slug: string,
    createdAt: string,
    updatedAt: string,
    locale: string
  }
}

export type Lang = {
  id: number,
  attributes: {
    name: string,
    slug: string,
    createdAt: string,
    updatedAt: string,
    icon: shareImage
  }
}