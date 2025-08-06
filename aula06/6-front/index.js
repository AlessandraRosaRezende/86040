const peticion = () => {
  console.log('Olá, servidor!');

  fetch('http://localhost:8080/teste', {
    headers: { 'X-Test': 'abc' } 
  })
    .then(response => response.json())
    .then(data => console.log(data));
};