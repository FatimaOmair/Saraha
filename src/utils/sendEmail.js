import nodemailer from "nodemailer";

async function sendEmail(dest, subject, html) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USEREMAIL,
          pass: process.env.PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
    });

    const info = await transporter.sendMail({
        from: `Infinity Light <${process.env.USEREMAIL}>`, // sender address
        to:dest, 
        subject, 
        html, 
    });
}

export default sendEmail;
