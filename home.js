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

    window.addEventListener('DOMContentLoaded', displayData);
  
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


function dataDisplay(){
  let url = 'http://localhost:3000/patients';
  fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    data.forEach(patient => {
    document.querySelector('.append').innerHTML +=
    `<tr id="${patient.id}">
    <td><a class="clientName" data-toggle="modal" data-target="#dataModal" href="#">${patient.name}</a></td>
    <td>${patient.name}</td>
    <td>${patient.address}</td>
    <td>${patient.age}</td>
    <td>${patient.PhoneNumber}</td>
    <td>${patient.diagnosisDescription}</td>
    <td class="text-center"><button id="" class="d-none d-sm-inline btn btn-sm btn-warning shadow-sm update" disabled>Update</button></td>
    <td class="text-center"><button id="deletebtn" class="d-none d-sm-inline btn btn-sm btn-danger shadow-sm remove" disabled>delete</button></td>
    </tr>
   `
   });
   
  });
}



