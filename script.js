const main = document.getElementById('main');
const btnAddUser = document.getElementById('add-user');
const btnSort = document.getElementById('sort');
const btnDouble = document.getElementById('double');
const btnShowMillionaires = document.getElementById('show-millionaires');
const btnCalculateWealth = document.getElementById('calculate-wealth');

let data = [];

// Update DOM
const updateDom = function (providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong>$${formatMoney(
      item.money
    )}`;

    main.appendChild(element);
  });
};

// Format number as money
const formatMoney = function (num) {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Add new object to data array
const addData = function (obj) {
  data.push(obj);

  updateDom();
};

// fetch random user and add money
const getRandomUser = async function () {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results;
  const newUser = {
    name: `${user[0].name.first} ${user[0].name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

// Double everyone's money
const doubleMoney = function () {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
};

// Sort users by ricehst
const sortByRichest = function () {
  data = data.sort((a, b) => b.money - a.money);

  updateDom();
};

// Show only millionaires
const showMillionaires = function () {
  data = data.filter((item) => item.money > 1000000);

  updateDom();
};

// Calculate entire wealth
const calculateWealth = function () {
  const totalWealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    totalWealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
};

// Add Event listener
btnAddUser.addEventListener('click', getRandomUser);
btnDouble.addEventListener('click', doubleMoney);
btnSort.addEventListener('click', sortByRichest);
btnShowMillionaires.addEventListener('click', showMillionaires);
btnCalculateWealth.addEventListener('click', calculateWealth);
getRandomUser();
getRandomUser();
getRandomUser();
