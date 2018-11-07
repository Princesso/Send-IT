import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

let app = express();

import parcelRoute from './routes/parcels'
import userRoute from './routes/users'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/v1/parcels', parcelRoute)
app.use('/api/v1/users',userRoute)

app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'Welcome to Send-It API'});
});

process.env.NODE_ENV = 'development';
const port = process.env.NODE_ENV.PORT || 8000;

app.listen(port, () => console.log(`app Running on ${port}`));

export default app;