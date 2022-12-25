import type { NextApiRequest, NextApiResponse } from 'next'

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);

  const message = `
    Имя: ${body.name}\r\n
    Email: ${body.email}\r\n
    Сообщение: ${body.message}\r\n
    Номер телефона: ${body.phone}
  `;

  const data = {
    to: 'feojoker@gmail.com',
    from: 'feojoker@gmail.com',
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