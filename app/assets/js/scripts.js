(function(window, document){
  const $form = document.querySelector('.form');
  const $formServicesList = document.querySelector('.form-services');
  const $formServicesItem = document.querySelector('.form-services__item');
  const $btnAddService = document.querySelector('.btn-new-service');
  const $selectServicesType = document.getElementById('selectServicesType');

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean']
  ];

  function makeEditor(elId) {
    return new Quill(elId, {
      modules: { toolbar: toolbarOptions },
      placeholder: 'Full Description...',
      theme: 'snow'
    })
  }

  const editorProposalIntroduction = makeEditor('#editorProposalIntroduction');
  const editorProjectScope = makeEditor('#editorProjectScope');
  const editorAditionalInformation = makeEditor('#editorAditionalInformation');

  function createPdf(
    senderLogo,
    senderSignature,
    senderName,
    senderCompany,
    senderSlogan,
    senderTel,
    senderSite,
    senderEmail,
    senderLocation,
    clientName,
    clientCompany,
    proposalShortDescription,
    proposalDate,
    proposalNumber,
    proposalIntroduction,
    projectScope,
    servicesList,
    aditionalInformation,
  ){

    isLoading(true);

    fetch('http://localhost:3333/create-pdf', {
      method: 'POST',
      headers: new Headers({
        'Accept': '*/*',
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({
        senderLogo: senderLogo || ' ',
        senderSignature: senderSignature || ' ',
        senderName: senderName || ' ',
        senderCompany: senderCompany || ' ',
        senderSlogan: senderSlogan || ' ',
        senderTel: senderTel || ' ',
        senderSite: senderSite || ' ',
        senderEmail: senderEmail || ' ',
        senderLocation: senderLocation || ' ',
        clientName: clientName || ' ',
        clientCompany: clientCompany || ' ',
        proposalShortDescription: proposalShortDescription || ' ',
        proposalDate: proposalDate || ' ',
        proposalNumber: proposalNumber || ' ',
        proposalIntroduction: proposalIntroduction || ' ',
        projectScope: projectScope || ' ',
        servicesList: servicesList || ' ',
        aditionalInformation: aditionalInformation || ' ',
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

    let senderLogo = await uploadImage(document.getElementById('senderLogo'));
    let senderSignature = await uploadImage(document.getElementById('senderSignature'));
    let senderName = document.getElementById('senderName').value;
    let senderCompany = document.getElementById('senderCompany').value;
    let senderSlogan = document.getElementById('senderSlogan').value;
    let senderTel = document.getElementById('senderTel').value;
    let senderSite = document.getElementById('senderSite').value;
    let senderEmail = document.getElementById('senderEmail').value;
    let senderLocation = document.getElementById('senderLocation').value;
    let clientName = document.getElementById('clientName').value;
    let clientCompany = document.getElementById('clientCompany').value;
    let proposalShortDescription = document.getElementById('proposalShortDescription').value;
    let proposalDate = document.getElementById('proposalDate').value;
    let proposalNumber = document.getElementById('proposalNumber').value;
    let proposalIntroduction = editorProposalIntroduction.root.innerHTML;
    let projectScope = editorProjectScope.root.innerHTML;
    let servicesList = await makeServiceList();
    let aditionalInformation = editorAditionalInformation.root.innerHTML;    

    createPdf(
      senderLogo,
      senderSignature,
      senderName,
      senderCompany,
      senderSlogan,
      senderTel,
      senderSite,
      senderEmail,
      senderLocation,
      clientName,
      clientCompany,
      proposalShortDescription,
      proposalDate,
      proposalNumber,
      proposalIntroduction,
      projectScope,
      servicesList,
      aditionalInformation,
    );
  }

  async function makeServiceList() {
    let servicesList = [];
    const servicesType = $selectServicesType.value;
    const $servicesListEl = document.querySelectorAll('.form-services__item');

    servicesList.push({ type: servicesType });    
    let data= [];
    Array.from($servicesListEl).map(item => {
      let row = {};
      const $fields = item.querySelectorAll('.field');
      Array.from($fields).map(field => { 
        const $input = field.querySelector('input'); 
        if($input) {
          row[$input.dataset.name] = $input.value;
        }      
      });
      data.push(row);
    });
    servicesList.push({data});

    return servicesList;
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

  function handleSelectServicesType(e) {
    const targetValue = e.target.value;
    if(targetValue === 'hour') {
      document.getElementById('serviceHours').setAttribute('placeholder', 'Hours');
      document.getElementById('serviceCostHour').setAttribute('placeholder', 'Cost per Hour');
    }  
    if(targetValue === 'quantity') {
      document.getElementById('serviceHours').setAttribute('placeholder', 'Quantity');
      document.getElementById('serviceCostHour').setAttribute('placeholder', 'Unity Price');
    }  
  }

  $form.addEventListener('submit', handleSubmit);
  $btnAddService.addEventListener('click', handleAddService);
  $formServicesList.addEventListener('click', handleRemoveService);
  $selectServicesType.addEventListener('change', handleSelectServicesType)
})(window, document);

