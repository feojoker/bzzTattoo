import type { NextApiRequest, NextApiResponse } from 'next'

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);

  const message = `
    Имя: ${body.name}\r\n
    Email: ${body.email}\r\n
    Сообщение: ${body.message}\r\n
    Номер телефона: ${body.phone}
  `;

  const data = {
    to: process.env.SENDGRID_EMAIL_TO,
    from: process.env.SENDGRID_EMAIL_FROM,
    subject: `${body.subject}`,
    text: message,
    html: message.replace(/\r\n/g, '<br />'),
  };

  await sgMail
    .send(data)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error: Error) => {
      console.error(`Smth went wrong, check error description`, error)
    })

  res.status(200).json({ status: 'OK' });
};