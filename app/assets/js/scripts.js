const $form = document.querySelector('.form');

const $formServicesList = document.querySelector('.form-services');
const $formServicesItem = document.querySelector('.form-services__item');

const $btnAddService = document.querySelector('.btn-new-service');
const $btnRemoveService = document.querySelector('.btn-remove-service');

function getPdf(
    sender,
    clientName,
    shortDescription,
    proposalDate,
    fullDescription,
    servicesList
  ) {

  isLoading(true);

  fetch('http://localhost:3333/create-pdf', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: sender,
      clientName: clientName,
      shortDescription: shortDescription,
      proposalDate: proposalDate,
      fullDescription: fullDescription,
      servicesList: servicesList,
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    isLoading(false);
  })
}

function isLoading(isLoading) {
  const $buttonSubmit = document.querySelector('.form button[type="submit"]');

  if(isLoading) {
    const loadingContent = '<div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div> Loading...';
    $buttonSubmit.setAttribute('disabled', true);
    $buttonSubmit.innerHTML = loadingContent;
    return
  }  
  
  $buttonSubmit.removeAttribute('disabled'); 
  $buttonSubmit.innerHTML = $buttonSubmit.dataset.label; 
}

function handleSubmit(e) {
  e.preventDefault(); 
  let sender = document.getElementById('sender').value;
  let clientName = document.getElementById('clientName').value;
  let proposalDate = document.getElementById('proposalDate').value;
  let shortDescription = document.getElementById('shortDescription').value;
  let fullDescription = editor.root.innerHTML;
  let servicesList = [];

  const $servicesListEl = document.querySelectorAll('.form-services__item');
  Array.from($servicesListEl).map(item => {
    let data = {};
    const $fields = item.querySelectorAll('.form-group');
    Array.from($fields).map(field => { 
      const $input = field.querySelector('input'); 
      const $label = field.querySelector('label');
      if($input && $label) {
        data[$label.dataset.name] = $input.value;
      }      
    });
    servicesList.push(data);
  });

  getPdf(
    sender,
    clientName,
    proposalDate,
    shortDescription,
    fullDescription,
    servicesList
  );
}

function handleAddService(e) {
  e.preventDefault();

  const $cloneService = $formServicesItem.cloneNode(true);
  const $fields = $cloneService.querySelectorAll('.form-group');
  const $delButton = document.createElement('div');
  const formServicesItemLength = document.querySelectorAll('.form-services__item').length;

  Array.from($fields).map(item => { 
    const $input = item.querySelector('input'); 
    const $label = item.querySelector('label');
    const inputName = $input.getAttribute('id');

    $input.value = '';
    $input.setAttribute('id', `${inputName}${formServicesItemLength + 1}`);
    $label.setAttribute('for', `${inputName}${formServicesItemLength + 1}`);
  });

  $delButton.setAttribute('class', 'form-group col-md-2 d-flex align-items-end');
  $delButton.innerHTML = '<button type="button" class="btn btn-danger btn-remove-service">Remove</button>';
  $cloneService.appendChild($delButton);

  $formServicesList.append($cloneService);
}

function handleRemoveService(e) {
  if(e.target.tagName === 'BUTTON'){
    const $button = e.target;
    const $parentEl = $button.parentElement.parentElement;
    if($button.classList.contains('btn-remove-service')){
      $parentEl.remove();
    }
  }
}

$form.addEventListener('submit', handleSubmit);
$btnAddService.addEventListener('click', handleAddService);
$formServicesList.addEventListener('click', handleRemoveService);