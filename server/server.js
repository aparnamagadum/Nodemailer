import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config();
const PORT=process.env.port || 4000;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"*"
}));
//console.log(process.env.My_USERNAME);
//console.log(process.env.My_PASSWORD);
app.post('/sendMail' ,(req,res)=>{
    const {name , email , text}=req.body;
    const transporter=nodemailer.createTransport({
       service:"gmail",
       auth:{
        user:process.env.My_USERNAME,
        pass:process.env.My_PASSWORD
       }
    });
let message={
    from:process.env.My_USERNAME,
    to:process.env.My_USERNAME,
    subject: `Contact Message from ${name}`,  // Email subject
    html: `
    <html>
      <body>
        <p>Hello,</p>
        <p>You have received a new contact message.</p>
        <p><strong>From:</strong> ${name}<br>
           <strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${text}</p>
        <p>Best regards,<br>Your Website</p>
      </body>
    </html>`
}
transporter.sendMail(message)
.then((info)=>console.log("email sent"))
.catch((err)=>console.log(err)
)
res.send(message)
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));