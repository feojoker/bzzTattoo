
type Props = {
  src: string,
  width?: number,
  quality?: number,
}


export function getLocalLoader({ src, width, quality = 75 }: Props): string {
  return `${process.env.PROJECT_PUBLIC_URL || "http://localhost:3000"
    }${src}?w=${width}&q=${quality}`;
}



export function getExternalLoader({ src }: { src: string }): string {
  return `${src}`
}