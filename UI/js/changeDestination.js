const basePath = "../../resources/pages";

const parcelid

const newDestination = {
  toAddress: document.getElementById('new-destination').value
}

const changeDestination = () => {
  fetch(`https://sendit-it.herokuapp.com/api/v1/parcels/${parcelid}/cancel`, {
    method: "PATCH",
    body: JSON.stringify(newDestination),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${getUserToken()}`
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((res) =>{

  })
}

document.getElementById("change-destination-button").addEventListener('click', changeDestination);