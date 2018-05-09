// DON'T FORGET TO CHANGE your_garage VALUES BY YOUR GARAGE NAME
const form = document.querySelector('#new_car');

const fetchAllCars = () => {
  fetch('https://wagon-garage-api.herokuapp.com/your_garage/cars')
    .then(response => response.json())
    .then((data) => {
      addCarsToDom(data);
    });
};

const addCarsToDom = (cars) => {
  const carsTable = document.querySelector('#cars tbody');
  carsTable.innerHTML = '';
  cars.forEach((car) => {
    const row = `<tr>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.plate}</td>
        <td>${car.owner}</td>
      </tr>`;
    carsTable.insertAdjacentHTML('beforeend', row);
  });
};

const createNewCar = (form) => {
  const newCar = {};
  newCar['brand'] = form.querySelector('#brand').value;
  newCar['model'] = form.querySelector('#model').value;
  newCar['plate'] = form.querySelector('#plate').value;
  newCar['owner'] = form.querySelector('#owner').value;
  return newCar;
};

const sendAjaxRequest = (car) => {
  fetch('https://wagon-garage-api.herokuapp.com/your_garage/cars', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  });
};

const refreshForm = (form) => {
  form.reset();
};

const formCallback = (event) => {
  event.preventDefault();
  const newCar = createNewCar(event.target);
  sendAjaxRequest(newCar);
  fetchAllCars();
  refreshForm(event.target);
};

fetchAllCars();
form.addEventListener('submit', formCallback);
