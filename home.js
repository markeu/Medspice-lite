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
  
    const  deleteBtn = document.querySelector('tbody');
    deleteBtn.addEventListener('click', deletePatient);
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
  .then(res => res.json())
  .then(data => {
    data.forEach(patient => {
    document.querySelector('.append').innerHTML +=
    `<th scope="row">${parseInt(data.indexOf(patient) + 1)}</th>
    <td><a class="clientName" data-toggle="modal" data-target="#dataModal" href="#">${patient.name}</a></td>
    <td>${patient.address}</td>
    <td>${patient.age}</td>
    <td>${patient.PhoneNumber}</td>
    <td>${patient.diagnosisDescription}</td>
    <td class="text-center"><button id="" class="d-none d-sm-inline btn btn-sm btn-warning shadow-sm update main-color-bg" data=${data.indexOf(patient)}>Update</button></td>
    <td class="text-center"><button  class="d-none d-sm-inline btn btn-sm btn-danger shadow-sm remove main-color-bg tableWist type="button" data-target="#deleteModal" data-toggle="modal">Delete</button></td>
    </tr>
   `
   });
  });
}

function deletePatient(element){
  if(element.target){
    let id = element.target.parentElement.dataset.id;
    console.log(id)
      fetch(`http://localhost:3000/patients/${id}`,{
        method: 'DELETE',
        headers: 'application/json'

      }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch(err => {
        console.log(err)
      })
    }
  }
  // element.preventDefault();
  // let deleteBtnn = document.querySelector('.deleteBtn');
  // console.log(deleteBtnn)
  // deleteBtnn.addEventListener('click', e => {
  //   if(e.target.classList.contains('remove')){
  //     let id = e.target.parentElement.parentElement.Id;
  //     console.log(id)
  //     let url = 'http://localhost:3000/patients/'
  //     fetch(url+id,{
  //       method: 'DELETE'
  //     }).then(() => {
  //       console.log('Succesfully Deleted')
  //     }).catch(err => {
  //       console.log('err')
  //     })
  //   }
  // })


