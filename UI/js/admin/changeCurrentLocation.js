const parcelid
const basePath = "../../resources/pages";

const currentLocation = {
  toAddress: document.getElementById('new-destination').value
}

const changeCurrentLocation = () => {
  fetch(`https://sendit-it.herokuapp.com/api/v1/parcels/${parcelid}/cancel`, {
    method: "PATCH",
    body: JSON.stringify(currentLocation),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${getUserToken()}`
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((res) =>{
    if(res.status == 200) window.location.href = `${basePath}/dashboard.html` 
  })
}

document.getElementById("change-current-location").addEventListener('click', changeCurrentLocation);