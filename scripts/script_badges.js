const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const number = urlParams.get('number')
const teamName = urlParams.get('TeamName')

var name = [];
for(let i=0; i<number;i++){
  name[i] = urlParams.get('m'+i);
}

var badges = document.querySelector(".badges");

for (let i = 0; i < number; i++) {
  console.log(i);
  console.log(name[i])

  var personBadge = document.createElement("div");
  personBadge.classList.add("person-badge");

  // PersonMain
  var personMain = document.createElement("div");
  personMain.classList.add("person-main");

  var personName = document.createElement("div");
  personName.classList.add("person-name");
  personName.innerHTML = name[i];

  var personTeam = document.createElement("div");
  personTeam.classList.add("person-team");
  personTeam.innerHTML = teamName;

  personMain.appendChild(personName);
  personMain.appendChild(personTeam);

  personBadge.appendChild(personMain);

  // PersonBtn
  let personBtn = document.createElement("div");
  personBtn.classList.add("person-btn");
  personBtn.style.cursor = "pointer";

  let btn = document.createElement("a");
  btn.classList.add("btn-p");
  btn.innerHTML = "DOWNLOAD BADGE";
  personBtn.appendChild(btn);

  personBadge.appendChild(personBtn);

  badges.appendChild(personBadge);
}

// Button on click it converts to canvas and downloads
var personbtns = document.querySelectorAll(".person-btn");
personbtns.forEach((personbtn) => {
  personbtn.addEventListener("click", function () {
    console.log("Clicked");

    domtoimage.toBlob(personbtn.previousSibling).then(function (blob) {
      window.saveAs(blob, "Badge.png");
    });
  });
});