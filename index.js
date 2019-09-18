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