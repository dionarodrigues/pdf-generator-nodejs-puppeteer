(function(window, document){
  const $form = document.querySelector('.form');
  const $formServicesList = document.querySelector('.form-services');
  const $formServicesItem = document.querySelector('.form-services__item');
  const $btnAddService = document.querySelector('.btn-new-service');
  const $btnRemoveService = document.querySelector('.btn-remove-service');

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean']
  ];

  var editor = new Quill('#editor', {
    modules: { toolbar: toolbarOptions },
    placeholder: 'Full Description...',
    theme: 'snow'
  });

  function createPdf(
      sender,
      clientName,
      shortDescription,
      proposalDate,
      fullDescription,
      servicesList,
      image
    ) {

    isLoading(true);

    fetch('http://localhost:3333/create-pdf', {
      method: 'POST',
      headers: new Headers({
        'Accept': '*/*',
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({
        sender: sender,
        clientName: clientName,
        shortDescription: shortDescription,
        proposalDate: proposalDate,
        fullDescription: fullDescription,
        servicesList: servicesList,
        image: image
      })
    })
    .then(res => res.blob())
    .then(data => {
      const date = new Date();
      const pdfName = clientName
        .toLocaleLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '-')
        .replace(/\/|\(|\)/g, '');
        isLoading(false);
      return download(data, pdfName + '-' + date.getDate() + date.getMonth() + date.getFullYear(), 'text/plain' );
    })
  }

  async function uploadImage($el) {
    const formData = new FormData();
    formData.append('logo', $el.files[0]);
    return fetch('http://localhost:3333/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => data.path)
    .catch(e => console.log(e));
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

  async function handleSubmit(e) {
    e.preventDefault(); 
    let sender = document.getElementById('sender').value;
    let clientName = document.getElementById('clientName').value;
    let proposalDate = document.getElementById('proposalDate').value;
    let shortDescription = document.getElementById('shortDescription').value;
    let fullDescription = editor.root.innerHTML;  
    let servicesList = [];
    let image = await uploadImage(document.getElementById('logo'));

    const $servicesListEl = document.querySelectorAll('.form-services__item');
    Array.from($servicesListEl).map(item => {
      let data = {};
      const $fields = item.querySelectorAll('.field');
      Array.from($fields).map(field => { 
        const $input = field.querySelector('input'); 
        if($input) {
          data[$input.dataset.name] = $input.value;
        }      
      });
      servicesList.push(data);
    });  

    createPdf(
      sender,
      clientName,
      shortDescription,
      proposalDate,
      fullDescription,
      servicesList,
      image
    );
  }

  function handleAddService(e) {
    e.preventDefault();

    const $cloneService = $formServicesItem.cloneNode(true);
    const $fields = $cloneService.querySelectorAll('.field');
    const $delButton = document.createElement('div');
    const formServicesItemLength = document.querySelectorAll('.form-services__item').length;

    Array.from($fields).map(item => { 
      const $input = item.querySelector('input'); 
      const inputName = $input.getAttribute('id');

      $input.value = '';
      $input.setAttribute('id', `${inputName}${formServicesItemLength + 1}`);
    });

    $delButton.setAttribute('class', 'form-group col-md-2 d-flex align-items-end');
    $delButton.innerHTML = '<button type="button" class="delete btn-remove-service">Remove</button>';
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
})(window, document);