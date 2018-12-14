let status = document.getElementsByName('status');
let status_value;
const basePath = "../../resources/pages";

for(let i = 0; i < status.length; i++){
    if(status[i].checked){
       status_value = status[i].value;
       break;
    }
}

const parcelid

const changeStatus = () => {
  fetch(`https://sendit-it.herokuapp.com/api/v1/parcels/${parcelid}/status`, {
    method: "PATCH",
    body: JSON.stringify(status_value),
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

document.getElementById("change-status-button").addEventListener('click', changeStatus);