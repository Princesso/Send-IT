const basePath = "../../resources/pages";

const getUserToken = () => {
  let tokenStr = window.localStorage.getItem('user_token')
  if(tokenStr) {
    return tokenStr
  } else {
    return "No token Found"
  }
}

async function createParcel(e, d) {
  e.preventDefault()
  const newParcel = {
    item_name: document.getElementById('item-name').value,
    weight: document.getElementById("weight").value,
    fromAddress: document.getElementById("from-address").value,
    toAddress: document.getElementById("to-address").value
  }
 await fetch('https://sendit-it.herokuapp.com/api/v1/parcels', {
    method: "POST",
    body: JSON.stringify(newParcel),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getUserToken()}`
    }
  })
  .then(function(response) {
      return response.json();
    })
  .then((res) => {
    if (res.status == 200 ) {
      document.getElementById('created').innerText = "Your parcel delivery order has been created"
    window.location.href = `${basePath}/dashboard.html` 
    }  
  })
  .catch(error => {
    console.log(error)
  })
}

document.getElementById("send-parcel-button").addEventListener("click", createParcel);
