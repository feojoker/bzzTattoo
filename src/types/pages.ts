import { AboutDetail, FormEmail, Seo, MediaBanner, BannerText } from "."

export type HomePage = {
  id: number,
  attributes: {
    createdAt: string,
    updatedAt: string,
    seo: Seo,
    bannerText: BannerText,
  }
}

export type ContactPage = {
  id: number,
  attributes: {
    createdAt: string,
    updatedAt: string,
    locale: string,
    seo?: Seo,
    mediaBanner: MediaBanner,
    formEmail: FormEmail,
    localization?: {
      data: ContactPage[]
    }
  }
}

export type AboutPage = {
  id: number,
  attributes: {
    createdAt: string,
    updatedAt: string,
    locale: string,
    seo?: Seo,
    bannerText: BannerText,
    aboutDetail: AboutDetail,
    localization?: {
      data: AboutPage[]
    }
  }
}

export type ProjectsPage = {
  id: number,
  attributes: {
    title: string,
    subtitle: string,
    createdAt: string,
    updatedAt: string,
    locale: string,
    seo?: Seo,
    mediaBanner: MediaBanner,
    localization?: {
      data: ProjectsPage[]
    }
  }
}

export type NotFound = {
  id: number,
  attributes: {
    title: string,
    description: string,
    buttonText: string,
    createdAt: string,
    updatedAt: string,
    locale: string,
    localizations?: {
      data: NotFound[]
    }
  }
}