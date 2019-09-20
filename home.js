//classes instatiation
class UI {

  displayMessage(message, classname) {
    const div = document.createElement('div');
    div.innerHTML = ` 
    <div class="alert alert-${classname} alert-dismissible fade show" role="alert">
    <strong>${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
    `;
    const reference = document.querySelector('#ref');
    const parentNode = reference.parentElement;

    parentNode.insertBefore(div, ref);

    setTimeout(()=>{
      document.querySelector('.alert').remove();
    },3000)
  }  

}
const ui = new UI();

//eventListeners
eventListeners();

function eventListeners(){
    const addbutton = document.querySelector('.modalbtn');
    addbutton.addEventListener('click', addPatients);   
    window.addEventListener('DOMContentLoaded', dataDisplay);
}

function addPatients(element){
    element.preventDefault();
    let name = document.querySelector('#client-name').value;
    let address = document.querySelector('#address').value;
    let age = document.querySelector("#client-age").value;
    let PhoneNumber = document.querySelector("#phone-number").value;
    let diagnosisDescription = document.querySelector('#diagnosis-description').value;

    let data = {
    name: name,
    address: address,
    age: age,
    PhoneNumber: PhoneNumber,
    diagnosisDescription: diagnosisDescription,
 };

 if (name.length <  3) {
  alert("Name must be 3 characters long");
} else if (address === '') {
  alert("Address field is required");
} else if (Number(age) > 150 ) {
  alert("Please enter the a valid age bracket");
} else if ( PhoneNumber.match(/\d/g).length !== 11 || '') {
  alert("PhoneNumber must be a valid 11 digits");
} else {
   let URL = 'http://localhost:3000/patients';
   fetch(URL, {
       method: 'POST',
       headers:{
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(data),
         })
         .then(res => res.json())
         .then(ui.displayMessage("Patient Added Succesfully", "success"));
         element.preventDefault();
  }       
}


function dataDisplay(){
  let url = 'http://localhost:3000/patients';
  fetch(url)
  .then(res => res.json())
  .then(data => {
    data.forEach(patient => {
    document.querySelector('.append').innerHTML +=
    `<th scope="row">${parseInt(data.indexOf(patient) + 1)}</th>
    <td><a class="clientName" data-toggle="modal" data-target="#dataModal" href="#" onclick="displayPatient(${patient.id})">${patient.name}</a></td>
    <td>${patient.address}</td>
    <td>${patient.age}</td>
    <td>${patient.PhoneNumber}</td>
    <td>${patient.diagnosisDescription}</td>
    <td class="text-center"><button id="" class="d-none d-sm-inline btn btn-sm btn-warning shadow-sm update main-color-bg" onclick="updatePatient(${patient.id})">Update</button></td>
    <td class="text-center"><button  class="d-none d-sm-inline btn btn-sm btn-danger shadow-sm remove main-color-bg tableWist type="button" data-target="#deleteModal" data-toggle="modal" onclick="deletePatient(${patient.id})">Delete</button></td>
    </tr>
   `
   });
  });
}

function deletePatient(id){
  if(id){
    let url = `http://localhost:3000/patients/${id}`;
  fetch(url,  {
    method: 'DELETE',
    headers:{
      'Accept': 'application/json',
    }, 
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
  } 
}

function displayPatient(id){
  let url = `http://localhost:3000/patients/${id}`
  fetch(url)
  .then(res => res.json())
  .then(patient=> {    
    document.querySelector('.disModal').innerHTML =
    `<div class="display-data">
      <div>
        <span class="data-key">Name:</span> <span>${patient.name}</span>
      </div>
      <div>
        <span class="data-key">Address:</span> <span>${patient.address}</span>
      </div>
      <div>
        <span class="data-key">Age:</span> <span>${patient.age}</span>
      </div>
      <div>
        <span class="data-key">Phone-number:</span> <span>${patient.PhoneNumber}</span>
      </div>
      <div>
        <span class="data-key">Diagnosis-description:</span> <span>${patient.diagnosisDescription}</span>
      </div>
    </div>`
  });
}

function updatePatient(e, id){
  e.preventDefault();
  let url = `http://localhost:3000/patients/${id}`
  fetch(url, {
    method: 'PUT',
    headers:{
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(ui.displayMessage("Patient Added Succesfully", "success"));
      element.preventDefault();
 }       
