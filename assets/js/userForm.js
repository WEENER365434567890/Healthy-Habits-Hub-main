const modalOverlay = document.getElementById('modalOverlay');
const modalCloseButton = document.getElementById('modalCloseButton');
const modalContinueButton = document.getElementById('modalContinueButton');
const userFormSubmit = document.getElementById('user-form-button');
const userFormEl = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const genderInput = document.getElementById('gender');
const goalButtons = document.getElementsByName('fit_goal');
const goalValEl = document.getElementById('goal-val');

const kilogramPerPound = 0.453592;
const centimeterPerFoot = 30.48;

const userData = {
  name: "",
  gender: "",
  weight: 0,
  height: 0,
  age: 0,
  goal: ["", 0],
  BMR: 0,
  dietCal: 0,
  exerciseCal: 300,
  deficit: 0,
  goalTime: 0,
};

function addGoalValue() {
  for (let i = 0; i < goalButtons.length; i++) {
    if (goalButtons[i].checked && goalButtons[i].value !== 'maintain') {
      const goalVal = document.createElement('input');
      goalVal.setAttribute('placeholder', 'How many kg?');
      goalVal.setAttribute('type', 'number');
      goalVal.classList.add('input-border', 'rounded');
      goalValEl.innerHTML = '';
      goalValEl.appendChild(goalVal);
    } else {
      goalValEl.innerHTML = '';
    }
  }
}

function updateUserObject(e) {
  e.preventDefault();
  displayModal();

  localStorage.clear();

  const userGoal = getUserGoal();

  userData.name = nameInput.value.trim();
  userData.gender = genderInput.value;
  userData.weight = weightInput.value;
  userData.height = heightInput.value;
  userData.age = ageInput.value;
  userData.goal[0] = userGoal;
  userData.goal[1] = parseInt(goalValEl.firstChild.value);

  const userBMRInfo = getBMR();
  const dietCal = getDietCal(userBMRInfo);
  let deficit = 0;

  if (userData.goal[0] === 'lose') {
    deficit = userBMRInfo - dietCal + userData.exerciseCal;
  } else if (userData.goal[0] === 'gain') {
    deficit = userBMRInfo - dietCal - userData.exerciseCal;
  }

  const goalTime = calcGoalTime(deficit);

  userData.BMR = userBMRInfo;
  userData.dietCal = dietCal;
  userData.deficit = deficit;
  userData.goalTime = goalTime;

  commitToStorage();

  nameInput.value = '';
  genderInput.value = '';
  weightInput.value = '';
  heightInput.value = '';
  ageInput.value = '';
  goalValEl.firstChild.value = '';
  for (let i = 0; i < goalButtons.length; i++) {
    goalButtons[i].checked = false;
  }
}

function displayModal() {
  modalOverlay.classList.toggle('hidden');
  modalOverlay.classList.toggle('flex');
}

function getUserGoal() {
  for (let i = 0; i < goalButtons.length; i++) {
    if (goalButtons[i].checked) {
      return goalButtons[i].value;
    }
  }
}

function getBMR() {
  let BMR;
  if (userData.gender === 'male') {
    BMR = Math.round(
      88.362 +
        13.397 * userData.weight +
        4.799 * userData.height -
        5.677 * userData.age
    );
  } else {
    BMR = Math.round(
      447.593 +
        9.247 * userData.weight +
        3.098 * userData.height -
        4.33 * userData.age
    );
  }
  return BMR;
}

function toKilograms(pounds) {
  return pounds * kilogramPerPound;
}

function toCentimeters(feet) {
  return feet * centimeterPerFoot;
}

function getDietCal(userBMR) {
  let dietCal;
  if (userData.goal[0] === 'lose') {
    dietCal = userBMR - 200;
  } else if (userData.goal[0] === 'gain') {
    dietCal = userBMR - 800;
  } else {
    dietCal = userBMR + 300;
  }
  return dietCal;
}

function calcGoalTime(deficit) {
  if (userData.goal[0] === 'maintain') {
    return 0;
  } else {
    const totalCal = 3500 * userData.goal[1];
    const totalDays = totalCal / deficit;
    const totalWeeks = totalDays / 7;
    const totalMonths = totalWeeks / 4;
    return totalMonths;
  }
}

function commitToStorage() {
  localStorage.setItem('localUser', JSON.stringify(userData));
}

goalButtons.forEach((item) => {
  item.addEventListener('click', addGoalValue);
});
userFormEl.addEventListener('submit', updateUserObject);

modalCloseButton.addEventListener('click', function () {
  modalOverlay.classList.toggle('flex');
  modalOverlay.classList.toggle('hidden');
});

modalContinueButton.onclick = function () {
  location.href = 'mealForm.html';
};
