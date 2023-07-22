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
  locale?: string,
  shareImage?: shareMedia,
  localization?: {
    data: Seo[]
  }
}

export type DefaultSeo = {
  id: number,
  attributes: {
    siteName: string,
    defaultSeo: Seo,
    logo: shareMedia,
  }
}

export type CombinedGlobalData = {
  leftNavs: Navs[],
  rightNavs: Navs[],
  langs: Lang[],
  footer: Footer,
}

export type MediaBanner = {
  id: number,
  title?: string,
  smallText?: string,
  media: shareMedia,
  poster?: shareMedia,
}

export type BannerText = {
  id: number,
  title?: string,
  smallText?: string,
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

export type Footer = {
  id: number,
  attributes: {
    addressTitle: string,
    addressStreet: string,
    addressCity: string,
    phoneNumber: string,
    email: string,
    buttonText: string,
    copyright: string,
    name: string,
    aboutArtist: string,
    createdAt: string,
    updatedAt: string,
    locale: string,
    localizations?: {
      data: Footer[]
    }
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

export type AboutDetail = {
  id: number,
  title: string,
  longText: string,
  subTitle: string,
  image: shareMedia,
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

export type PhotoAndText = {
  id: number,
  title: string,
  longText: string,
  subTitle: string,
  image: shareMedia,
}

export type InstagramPostType = {
  caption: string,
  createdAt: string,
  id: number,
  instagramId: string,
  mediaId: number | null,
  originalUrl: string,
  publishedAt: string,
  timestamp: string,
  updatedAt: string,
}

export type InstagramFeedType = {
  results: InstagramPostType[],
  pagination: { page: number, pageSize: number, pageCount: number, total: number }
}



export type CloudinaryInstagramImageType = {
  access_control: boolean,
  access_mode: string,
  aspect_ratio: number,
  asset_id: string,
  backup_bytes: number,
  bytes: number,
  context: {
    caption: string;
    link: string;
  }
  created_at: string,
  created_by: {
    access_key: string,
  }
  etag: string,
  filename: string,
  folder: string,
  format: string,
  height: number,
  pixels: number,
  public_id: string,
  resource_type: string,
  secure_url: string,
  status: string,
  tags: string[],
  type: string,
  uploaded_at: string,
  uploaded_by: {
    access_key: string,
  }
  url: string,
  version: number,
  width: number,
}