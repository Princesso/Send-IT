import express from 'express'
import bodyParser from 'body-parser'


let router = express.Router();

let users = [
  {
    id: 1, 
    email: 'Shoes', 
    phone: 4, 
    parcels: [
      {
        id: 2, 
        item_name: 'Shoes', 
        weigth: 3
      },
      {
        id: 6, 
        item_name: 'Shoes', 
        weigth: 1.5
      },
      {
        id: 10, 
        item_name: 'Shoes', 
        weigth: 10
      }
    ]
  },
  {
    id: 2, 
    email: 'Shoes', 
    phone: 4, 
    parcels: [
      {
        id: 2, 
        item_name: 'Shoes', 
        weigth: 3
      },
      {
        id: 6, 
        item_name: 'Shoes', 
        weigth: 1.5
      },
      {
        id: 10, 
        item_name: 'Shoes', 
        weigth: 10
      }
    ]
  },
]

/* GET home page. */
router.get('/', (req,res) => {
  res.send(users);
  //res.render('index', { title: 'Express' });
});

export default router;