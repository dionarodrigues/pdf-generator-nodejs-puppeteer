var $form = document.querySelector('.form');

function getPdf(
    sender,
    clientName,
    shortDescription,
    proposalDate,
    services
  ) {
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
      services: services,
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

function handleSubmit(e) {
  e.preventDefault();

  let sender = document.getElementById('sender').value;
  let clientName = document.getElementById('clientName').value;
  let shortDescription = document.getElementById('shortDescription').value;
  let proposalDate = document.getElementById('proposalDate').value;
  let services = document.getElementById('services').value;

  getPdf(
    sender,
    clientName,
    shortDescription,
    proposalDate,
    services
  );
}

$form.addEventListener('submit', handleSubmit);