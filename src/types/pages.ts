import { FormEmail, Seo, shareMedia, VideoBanner } from "."

export type HomePage = {
  id: number,
  attributes: {
    createdAt: string,
    updatedAt: string,
    seo: Seo,
    videoBanner: VideoBanner,
  }
}

export type ContactPage = {
  id: number,
  attributes: {
    createdAt: string,
    updatedAt: string,
    locale: string,
    // seo: Seo,
    imageBanner: shareMedia,
    formEmail: FormEmail,
    localization?: {
      data: ContactPage[]
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