//Definição das variaveis globais
let tabUsers = null;
let headresultusers = null;
let headresultumetrics = null;

let allUsers = [];
let resultUsers = [];


window.addEventListener('load', start);

function start() {
  tabUsers = document.querySelector('#tabUsers');
  tabMetrics = document.querySelector('#tabMetrics');
  headresultusers = document.querySelector('#headresultusers');
  headresultumetrics = document.querySelector('#headresultumetrics');
  contentmetrics = document.querySelector('#contentmetrics');

  fetchUsers();
  handlerFindUsersButton();

}

async function fetchUsers(){
  const res = await fetch('https://projectseao.free.beeceptor.com/users');
  const json = await res.json(); 
  allUsers = json.map(users => 
    {
      const {gender, picture, dob,  name } =  users;
      {
        return {
          gender: gender,
          picture: picture,
          dob: dob,
          name: name,
          fullname: `${name.first} ${name.last}`
        }
      }
    });   
}

function handlerFindUsersButton(){
  btnfindusers = document.querySelector("#btnfindusers");
  inputfinduser = document.querySelector("#inputfinduser");  
  btnfindusers.addEventListener('click', () => findUserFromAllUsers(inputfinduser));
  btnfindusers.addEventListener('keyup', function(e){
     console.log(e);
     findUserFromAllUsers(inputfinduser)
    });
  btnfindusers.addEventListener('keypress', function(e){
      if(e.key==='Enter'){
      findUserFromAllUsers(inputfinduser)
      }
    });
  }

function findUserFromAllUsers(inputfinduser) {
 
  const targetUser = inputfinduser.value.toLowerCase();
  const usersToAdd = allUsers.filter (user => user.fullname.toLowerCase().indexOf(targetUser) > -1);
  resultUsers =  usersToAdd; 
  render();
}

function render(){
  console.log(resultUsers);
  renderResultUsersList();
  renderMetricsList();
}

function renderResultUsersList(){ 

  let usersHTML = `<div> 
  <h4> ${ resultUsers.length } usuário(s) encontrado(s)</h4>
`;

  if (resultUsers.length == 0) {
     usersHTML = '<h4>Nenhum usuário filtrado!</h4>';
    return tabUsers.innerHTML = usersHTML;
  }
 
  resultUsers.forEach(user => {     
    const userHTML = `
    <div class='challenge'>
     <div>
     <img class='img' src="${user.picture.thumbnail}" alt="${user.fullname}">   
     </div>
     <div >
          <span>${user.fullname} </span>,
     </div>
     <div> 
      ${user.dob.age}      
     </div>
    </div>`; 
 
    usersHTML +=  userHTML;
 }); 
 tabUsers.innerHTML = usersHTML;
}

function renderMetricsList(){  

  let usersHTML = `<div> 
  <h4> Estatísticas </h4>
`; 
  
  if (resultUsers.length == 0) {
    usersHTML = '<h4>Nada a ser exibido!</h4>';
   return tabMetrics.innerHTML = usersHTML;
 }

  let sumages = resultUsers.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  let summen = resultUsers.filter(u => u.gender == 'male').length;

  let sumwomen = resultUsers.filter(u => u.gender == 'female').length;

  let avarege = (sumages / resultUsers.length).toFixed(2);
      
  const userHTML = `
    <div class='challenge'>
    <ul>
        <li>Sexo masculino: ${summen}</li>
        <li>Sexo feminino : ${sumwomen}</li>
        <li>Soma das idades : ${sumages}</li>
        <li>Média das idades : ${avarege}</li>
      </ul>
  </div>`; 
 
   usersHTML +=  userHTML;
 
 tabMetrics.innerHTML = usersHTML;
}