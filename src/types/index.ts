export type shareMedia = {
  data: {
    id: number,
    attributes: {
      name: string,
      alternativeText: string,
      caption: string,
      width: number | null,
      height: number | null,
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
      updatedAt: string,
    }
  }
}

export type Seo = {
  id?: number,
  metaTitle: string,
  metaDescription: string,
  shareImage?: shareMedia,
}

export type GlobalData = {
  id: number,
  attributes: {
    siteName: string,
    createdAt: string,
    updatedAt: string,
    favicon: shareMedia,
    defaultSeo: Seo,
    logo: shareMedia,
  }
}

export type CombinedGlobalData = {
  global: GlobalData,
  leftNavs: Navs[],
  rightNavs: Navs[],
  langs: Lang[],
}

export type VideoBanner = {
  id: number,
  title?: string,
  smallText?: string,
  video: shareMedia,
}

export type Navs = {
  id: number,
  attributes: {
    name: string,
    slug: string,
    link: string,
    createdAt: string,
    updatedAt: string,
    locale: string,
    localizations?: {
      data: Navs[]
    }
  }
}

export type Lang = {
  id: number,
  attributes: {
    name: string,
    slug: string,
    createdAt: string,
    updatedAt: string,
    icon: shareMedia,
  }
}

export type BriefInfo = {
  id: number,
  attributes: {
    title: string,
    subTitle: string,
    createdAt: string,
    updatedAt: string,
    locale: string,
    slug: string,
    linkTitle: string,
    link: string,
    longText: string,
    localizations?: {
      data: BriefInfo[]
    }
  }
}

export type FormEmail = {
  id: number,
  title: string,
  subTitle: string,
  namePlaceholder: string,
  emailPlaceholder: string,
  phonePlaceholder: string,
  subjectPlaceholder: string,
  messagePlaceholder: string,
  requiredError: string,
  emailError: string,
  buttonText: string,
  phoneError: string,
}