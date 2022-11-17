import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

type Props = {}

class MyDocument extends Document<Props> {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@200;400;700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument