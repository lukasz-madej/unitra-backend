const button = document.getElementById('test');

button.addEventListener('click', event => {
  event.preventDefault();

  window.fetch('/createEquipment', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'TEST',
      productionDate: '1985'
    })
  })
});