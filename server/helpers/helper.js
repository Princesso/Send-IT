import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import nodeMailer from 'nodemailer'

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
   const API_KEY = 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
  }
}

export default Helper;