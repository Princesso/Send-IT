import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'

dotenv.config();

const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  generateToken(payload) {
    const token = jwt.sign(
      payload,
      process.env.SECRET, { expiresIn: '20d' }
    );
    return token;
  },
  sendEmail() {
     sgMail.setApiKey(process.env.sendGridKey);
     const mail = {
       to: "sannimicheal.se@gmail.com",
       from: 'Send-IT <egbunaoluebube@gmail.com',
       subject: `Dear customer`,
       html: "Your PDO has been updated",
     };
     sgMail.send(mail);
  }
}

export default Helper;