import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.APP_EMAIL}`,
    pass: `${process.env.GMAIL_APP_PW}`,
  },
});

export const readHtmlFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};
async function getHtmlContentWithUrl(url: any): Promise<string> {
  const filePath = path.join(__dirname, './forgotPasswordEmail.html'); // Adjust the path to your HTML file
  let htmlContent = await readHtmlFile(filePath);

  htmlContent = htmlContent.replace('{{url}}', url);

  return htmlContent;
}
export const sendEmail = async (email: string, url: string) => {
  const htmlContent = await getHtmlContentWithUrl(url);

  const mailOptions = {
    from: 'christine.dev.projects@gmail.com',
    to: email,
    subject: 'Forgotten Password Request',
    html: htmlContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};
