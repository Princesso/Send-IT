import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

let app = express();

app.use(express.json())

import parcelRoute from './routes/parcels'
import userRoute from './routes/users'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/v1/parcels', parcelRoute)
app.use('/api/v1/users',userRoute)

app.use(express.static(path.join(__dirname, '..', 'UI')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..','UI','index.html'));
});

const port = process.env.PORT || 8080;

const server = app.listen(port, () => console.log(`app Running on ${port}`));

process.on('exit', () => server.close())
process.on('SIGTERM', () => server.close())
process.on('uncaughtException', () => server.close())

export default app;