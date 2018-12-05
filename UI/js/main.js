const basePath = 'file:///Users/Princess/Documents/Projects/Send-IT/UI/resources/pages';

const getUserToken = () => {
  let tokenStr = document.cookie.split(';')
    .find(c => c.split('=')[0] == ' user_token')
  if(tokenStr) {
    return tokenStr.split('=').pop()
  }
}

function submitRegistrationForm(e, d) {
  e.preventDefault()
  const registrationInfo = {
    email: document.getElementById('email').value,
    password: document.getElementById("password").value,
    username: document.getElementById("username").value,
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
  }
  fetch('https://sendit-it.herokuapp.com/api/v1/auth/signup', {
    method: "POST",
    body: JSON.stringify(registrationInfo),
  })
  .then(function(response) {
      return response.json();
    })
  .then((res) => {
    if(res.status==200) window.location.href = `${basePath}/login.html`  
    else {
      debugger
      let newParagraph = document.createElement("p")
      let textNode = document.createTextNode("An error occurred while trying to register you")
      newParagraph.appendChild(textNode)

      let div = document.getElementById("register")
      div.insertBefore(newParagraph, div.childNodes[0])
      newParagraph.style.color('red')
    }
  })
  .catch(error => {
    console.log(error)
  })
}


function submitLoginForm(e, d) {
  e.preventDefault()
  const loginInfo = {
    email: document.getElementById('email').value,
    password: document.getElementById("password").value
  }
  fetch('https://sendit-it.herokuapp.com/api/v1/auth/login', {
    method: "POST",
    body: JSON.stringify(loginInfo),
  })
  .then(function(response) {
      return response.json();
    })
  .then((res) => {
    if(!res.token) throw('no token in response')
    document.cookie = `user_token=${res.token}`
    window.location.href = `${basePath}/dashboard.html` 
  })
  .catch(error => {
    console.log(error)
  })
}


document.getElementById("submitBtn").addEventListener("click", submitLoginForm);
document.getElementById("registerBtn").addEventListener("click", submitRegistrationForm);
