import type { NextApiRequest, NextApiResponse } from "next";

const pages = new Map([
  ['about-page', '/about'],
  ['contact-page', '/contact'],
  ['homepage', '/'],
  ['projects-page', '/projects'],
  ['store-page', '/store'],
])


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { model, entry } = req.body;
  const { slug, locale } = entry;
  const pageLink = `/${locale}${pages.get(model)}${slug ? `/${slug}` : ""}`

  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    if (model !== "not-found") {
      console.log('validated', pageLink)
      await res.revalidate(pageLink)
      return res.json({ revalidated: true })
    }
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}