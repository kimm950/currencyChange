import nodemailer from 'nodemailer'


export default async function sendEmail(message: string) { 
  const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  })
const email = {
  from: 'noreply@domain.com',
  to: 'hyunsung217@gmail.com',
  subject: 'Confirm Email',
  text: 'Please confirm your email',
};
  
  const res = transporter.sendMail(email, (error, info) => { 
    console.error(error)
  })
  console.log(res);
  
}