import express from 'express'
import bodyParser from 'body-parser'


let router = express.Router();

let parcels = [
  {id: 1, item_name: 'Shoes', weigth: 4, from: 'Yaba', destination: 'Ojuelegba'},
  {id: 2, item_name: 'Shoes', weigth: 3, from: 'Yaba', destination: 'Ojuelegba'},
  {id: 3, item_name: 'Shoes', weigth: 7, from: 'Yaba', destination: 'Ojuelegba'},
  {id: 4, item_name: 'Shoes', weigth: 2, from: 'Yaba', destination: 'Ojuelegba'},
  {id: 5, item_name: 'Shoes', weigth: 1, from: 'Yaba', destination: 'Ojuelegba'},
  {id: 6, item_name: 'Shoes', weigth: 1.5, from: 'Yaba', destination: 'Ojuelegba'},
  {id: 7, item_name: 'Shoes', weigth: 2.3, from: 'Yaba', destination: 'Ojuelegba'},
  {id: 8, item_name: 'Shoes', weigth: 8, from: 'Yaba', destination: 'Ojuelegba'},
  {id: 9, item_name: 'Shoes', weigth: 4, from: 'Yaba', destination: 'Ojuelegba'},
  {id: 10, item_name: 'Shoes', weigth: 10, from: 'Yaba', destination: 'Ojuelegba'},
  {id: 11, item_name: 'Shoes', weigth: 2, from: 'Yaba', destination: 'Ojuelegba'},
]

router.get('/', (req,res) => {
  res.send(parcels);
  //res.render('index', { title: 'Express' });
});

router.get('/:id', (req,res) => {
  let parcel = parcels.find(p => p.id === parseInt(req.params.id))
  if(!parcel){
    res.status(400).send('No such Parcel please check the ID again')
  } else {
    res.send(parcel);
  }
});

router.post('/', (req, res) => {
  if(!req.body.item_name && req.body.weigth){
    res.status(400).send('error saving new parcel delivery order')
  } else {
    const newOrder = {
      id: parcels.length +1,
      item_name: req.body.item_name,
      weigth: req.body.weigth,
      from: req.body.from,
      destination: req.body.destination
    };
    parcels.push(newOrder);
    res.send(newOrder);
  }
});

router.delete('/:id/cancel', (req,res) => {
  const deleteOrder= parcels.find(p => p.id ===parseInt(req.params.id))
  if (!deleteOrder){
    res.status(400).send('The order you are trying to cancel does not exist');
  } else {
    const deleteindex = parcels.indexOf(deleteOrder);
    parcels.splice(deleteindex,1)
    res.send(deleteOrder);
  }
})

export default router;