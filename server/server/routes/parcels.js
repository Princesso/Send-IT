import express from 'express'
import bodyParser from 'body-parser'


let router = express.Router();

let parcels = [
  {id: 1, item_name: 'Shoes', weigth: 4},
  {id: 2, item_name: 'Shoes', weigth: 3},
  {id: 3, item_name: 'Shoes', weigth: 7},
  {id: 4, item_name: 'Shoes', weigth: 2},
  {id: 5, item_name: 'Shoes', weigth: 1},
  {id: 6, item_name: 'Shoes', weigth: 1.5},
  {id: 7, item_name: 'Shoes', weigth: 2.3},
  {id: 8, item_name: 'Shoes', weigth: 8},
  {id: 9, item_name: 'Shoes', weigth: 4},
  {id: 10, item_name: 'Shoes', weigth: 10},
]

/* GET home page. */
router.get('/', (req,res) => {
  res.send(parcels);
  //res.render('index', { title: 'Express' });
});

export default router;