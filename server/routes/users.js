import express from 'express'
import bodyParser from 'body-parser'


let router = express.Router();

let users = [
  {
    id: 1, 
    email: 'boobae@gmail.com', 
    phone: 0906387999, 
    parcels: [
      {
        id: 1, 
        item_name: 'Shoes', 
        weigth: 3
      },
      {
        id: 6, 
        item_name: 'Bags', 
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
    email: 'princess@gmail.com', 
    phone: 09088888888, 
    parcels: [
      {
        id: 3, 
        item_name: 'Bag', 
        weigth: 3
      },
      {
        id: 7, 
        item_name: 'Shoes', 
        weigth: 1.5
      },
      {
        id: 12, 
        item_name: 'Shirt', 
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

router.get('/:id', (req,res) => {
  let user = users.find(u => u.id === parseInt(req.params.id))
  if(!user){
    res.status(400).send('No such User please check the ID again')
  } else {
    res.send(user);
  }
});

router.get('/:id/parcels', (req,res) => {
  let user = users.find(u => u.id === parseInt(req.params.id))
  if(!user){
    res.status(400).send('No such User please check the ID again')
  } else if(user.parcels.length==0){
    res.send("user has no parcel delivery orders");
  }
  else {
    res.send(user.parcels);
  }
});

export default router;