'use strict';
let  defaultURL = "http://localhost:3001"
    //  defaultURL = "https://api.tzuru.com"
function logout(){
  localStorage.removeItem("auth_token")
  localStorage.removeItem("user")
  localStorage.removeItem("store")
  window.location.replace("#/login")
}

function userData(){
  return JSON.parse(localStorage.getItem("user"))
}

function userStore(){
  return JSON.parse(localStorage.getItem("store"))
}

const conf = {
  defaultURL,
  logout,
  userData,
  userStore
}

export default conf;