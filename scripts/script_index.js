// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzpj24TBU8zpQMQvP5DEO4a3ewcsTwIrg",
  authDomain: "kryptos2-aa481.firebaseapp.com",
  databaseURL: "https://kryptos2-aa481-default-rtdb.firebaseio.com",
  projectId: "kryptos2-aa481",
  storageBucket: "kryptos2-aa481.appspot.com",
  messagingSenderId: "939322006122",
  appId: "1:939322006122:web:feb515d9c7051775fc0813"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get the database reference
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

// write to the database
function writeData(i, name, tName, insta) {
  console.log("in write data");
  const db = getDatabase();
  set(ref(db, 'badges/' + tName + "/" + i), {
    Name: name,
    InstaID: insta
  })
  .then(() => {
    // Data saved successfully!
    console.log("Data Saved successfully!");
  })
  .catch((error) => {
    // The write failed...
    console.log("Write Failed");
  });

  console.log("out write data");
}

// onchange of number of team members
const filter = document.getElementById("teamMembers")
filter.addEventListener('change', update);

// Function to remove child nodes
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Function to update on change of number of team members
function update(){
  
  var select = document.getElementById('teamMembers');
  var option = select.options[select.selectedIndex];
  var number = option.value;

  console.log(number);
  var formElem = document.getElementById("form");

  const formElemrem = document.querySelector('#form');
  removeAllChildNodes(formElemrem);

  var teamName = document.createElement("input");
  teamName.type = "text";
  teamName.id = "TeamName"
  formElem.appendChild(document.createTextNode(`>> ` + 'Team Name *'));
  formElem.appendChild(document.createElement("br"));
  formElem.appendChild(teamName);

  var submit = document.createElement("button");
  submit.classList.add("Submit-Btn");
  // submit.classList.add("btn");
  // submit.classList.add("btn-secondary");
  submit.type = "button";
  submit.innerHTML = "SUBMIT";

  for (let i = 0; i < number; i++) {
    let personDetail = document.createElement("div");
    personDetail.classList.add("person");        
    personDetail.appendChild(document.createTextNode(`>> ` + "Member #" + `${i+1}` + " details *"));
    personDetail.appendChild(document.createElement("br"));
    let name = document.createElement("input");
    name.classList.add("person-name");
    name.type = "text";
    name.placeholder = "Name";
    name.setAttribute("required","");
    personDetail.appendChild(name);
    personDetail.appendChild(document.createElement("br"));

    let insta = document.createElement("input");
    insta.classList.add("person-id");
    insta.type = "text";
    insta.placeholder = "Instagram ID";
    insta.setAttribute("required","");
    personDetail.appendChild(insta);

    console.log(personDetail);
    formElem.appendChild(personDetail);
  }

  formElem.appendChild(submit);
  console.log(formElem);
  console.log(submit);
  
  // onclick of SUBMIT
  submit.addEventListener("click", function () {   

    localStorage.setItem("number", number);
    var insta = document.querySelectorAll(".person-id");
    var name = document.querySelectorAll(".person-name");
    var tName = document.getElementById("TeamName").value;
    localStorage.setItem("TeamName", tName);

    for (let i = 0; i < number; i++) {
      localStorage.setItem(`${i}`, name[i].value);
      console.log(name[i].value);
      writeData(i, name[i].value, tName, insta[i].value);
    }
    // https://example.com/?product=shirt&color=blue&newuser&size=m
    setTimeout(() => { 
      if(number==1){
        window.location.href = "./badges.html?number="+number+"&TeamName="+tName+"&m0="+name[0].value;
      }
      else if(number==2){
        window.location.href = "./badges.html?number="+number+"&TeamName="+tName+"&m0="+name[0].value+"&m1="+name[1].value;
      }
      else if(number==3){
        window.location.href = "./badges.html?number="+number+"&TeamName="+tName+"&m0="+name[0].value+"&m1="+name[1].value+"&m2="+name[2].value;
      }
    }, 1000);
  });
}

update();