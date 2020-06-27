var $form = document.querySelector('.form');

function getPdf(firstName, lastName) {
  fetch('http://localhost:3333/create-pdf', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

function handleSubmit(e) {
  e.preventDefault();

  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;

  getPdf(firstName, lastName);
}

$form.addEventListener('submit', handleSubmit);