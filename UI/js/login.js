const basePath = "../../resources/pages";

async function submitLoginForm(e, d) {
  e.preventDefault()
  const loginInfo = {
    email: document.getElementById('email').value,
    password: document.getElementById("password").value
  }
 await fetch('https://sendit-it.herokuapp.com/api/v1/auth/login', {
    method: "POST",
    body: JSON.stringify(loginInfo),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function(response) {
      return response.json();
    })
  .then((res) => {
    if(!res.token) throw('no token in response')
    window.localStorage.setItem('user_token', res.token)
    const decoded =  JSON.parse(atob(res.token.split('.')[1]));
    if(!decoded.isAdmin) {
      window.location.href = `${basePath}/dashboard.html` 
    } else {
      window.location.href = `${basePath}/admin.html` 
    }
    
  })
  .catch(error => {
    console.log(error)
  })
}

document.getElementById("submitBtn").addEventListener("click", submitLoginForm);