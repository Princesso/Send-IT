//refactor this
const getUserToken = () => {
  let tokenStr = window.localStorage.getItem('user_token')
  if(tokenStr) {
    return tokenStr
  } else {
    return "No token Found"
  }
}

//need to get parcel id from dashboard when button is clicked
window.onload = function(e) {
  async function orderDetail() {
    const pricePerKg = 250;
    const parcelId = window.location.search.split('=').pop()
    await fetch(`https://sendit-it.herokuapp.com/api/v1/parcels/${parcelId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getUserToken()}`
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      document.getElementById('order-id-detail').innerText = res.data.id
      document.getElementById('placed-at-detail').innerText = res.data.fromaddress
      document.getElementById('current-location-detail').innerText = res.data.currentlocation 
      document.getElementById('destination-detail').innerText = res.data.toaddress 
      document.getElementById('item-weight-detail').innerText = res.data.weight
      document.getElementById('order-status-detail').innerText = res.data.status
      const price = res.data.weight * pricePerKg
      document.getElementById('price-detail').innerText = price
    })
    .catch(error => console.error('Error:', error))

  }

  orderDetail()

  const changeDestination = () => {
    const basePath = "../../resources/pages";
    const parcelId = window.location.search.split('=').pop()
    window.location.href = `${basePath}/change-location.html?parcelId=${parcelId}`
  }
  document.getElementById("change-destination-button").addEventListener('click', changeDestination);

  const cancelOrder = () => {
    const basePath = "../../resources/pages";
    const parcelId = window.location.search.split('=').pop()

    fetch(`https://sendit-it.herokuapp.com/api/v1/parcels/${parcelId}/cancel`, {
      method: "PATCH",
      headers: {
        "Authorization": `${getUserToken()}`
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      if(res.status == 200) window.location.href = `${basePath}/dashboard.html` 
    })
  }
  
  document.getElementById("cancel-order-button").addEventListener('click', cancelOrder);
}

