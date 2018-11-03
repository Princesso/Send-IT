import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

let app = express();

import parcelRoute from './routes/parcels'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/v1/parcels', parcelRoute)

app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'Welcome to Send-It API'});
});

app.listen(8080, () => console.log('app Running on port 8080'));

export default app;