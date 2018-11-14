let users = [
  {
    id: 4563, 
    email: 'boobae@gmail.com', 
    phone: '0906387999', 
    password: '56eys',
    parcels: [
      {
        id: 1, 
        ownerid: 4563, 
        item_name: 'Shoes', 
        weigth: 4, 
        description: "Non edible", 
        from: 'Yaba', 
        status: "pending", 
        destination: 'Ojuelegba'
      },
      {
        id: 2, 
        ownerid: 4563, 
        item_name: 'Sjito', 
        weigth: 4, 
        description: "edible", 
        from: 'Yaba', 
        status: "delivered", 
        destination: 'Enugu'
      }
    ]
  },
  {
    id: 2126, 
    email: 'princess@gmail.com', 
    phone: '09088888888', 
    password: 'hhfb5',
    parcels: [
      {
        id: 1, 
        ownerid: 2126, 
        item_name: 'Bag', 
        weigth: 3, 
        description: "Non edible", 
        from: 'Yaba', 
        status: "pending", 
        destination: 'Calabar'
      },
    ]
  },
]

export default users