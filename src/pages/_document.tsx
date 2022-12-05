import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import loader from '../../styles/loader';

type Props = {}

class MyDocument extends Document<Props> {
  render() {
    return (
      <Html>
        <Head>
          <head>
            <style>
              {loader}
            </style>
          </head>
          <link
            rel="preload"
            href="/public/fonts/Modernist-Three-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@200;400;700&display=swap"
          />
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=Playfair+Display&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <div id={'globalLoader'}>
            <div className="loader">
              <div />
              <div />
            </div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument