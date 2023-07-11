const restrictionBTN = document.querySelectorAll('input[name="restrictions"]');
const restrictionList = document.getElementById("restrictions");
const allergyBTN = document.querySelectorAll('input[name="allergies"]');
const allergyList = document.getElementById("allergies");

const mealSxn = document.getElementById("meal-suggestions");
const mealVal = document.querySelector('input[id="meal-amt"]');
const mealBtn = document.getElementById("mealBtn");

const key = "876e9a6c95694284b7cb6107cd846ea5";

// Restriction radio button click
function restrictionDisplay() {
  restrictionList.style.display = document.getElementById("yesR").checked ? "block" : "none";
}

restrictionBTN.forEach((radio) => {
  radio.addEventListener("click", restrictionDisplay);
});

// Allergy radio button click
function allergyDisplay() {
  allergyList.style.display = document.getElementById("yesA").checked ? "block" : "none";
}

allergyBTN.forEach((radio) => {
  radio.addEventListener("click", allergyDisplay);
});

// Meal display
function mealDisplay() {
  if (mealVal.value <= 0) {
    document.getElementById("meal-amt").focus();
  } else {
    mealSxn.style.display = "flex";
  }
}

mealBtn.addEventListener("click", mealDisplay);

function getAllergies() {
  const allergyParameters = Array.from(allergyList.querySelectorAll("input"))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value)
    .join(",");

  return allergyParameters;
}

function getDiets() {
  const dietParameters = Array.from(restrictionList.querySelectorAll("input"))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value)
    .join(",");

  return dietParameters;
}

function getCals() {
  const userInfo = JSON.parse(localStorage.getItem("localUser"));
  const dietCal = userInfo.dietCal;
  const maxMealCal = Math.round(dietCal / mealVal.value);

  return maxMealCal;
}

function randomMeal() {
  return Math.floor(Math.random() * 10) + 1;
}

function renderMeals(data) {
  const suggestionBox = document.getElementById("meal-suggestions");
  suggestionBox.innerHTML = "";

  const limit = mealVal.value < 7 ? mealVal.value : 6;
  for (let i = 0; i < limit; i++) {
    const recipe = data.results[i];

    const div = document.createElement("div");
    div.classList.add("w-full", "h-48", "shadow-lg", "flex", "p-4");
    suggestionBox.appendChild(div);

    const divImg = document.createElement("div");
    divImg.classList.add("w-1/3", "h-48");
    div.appendChild(divImg);

    const divContent = document.createElement("div");
    divContent.classList.add("w-2/3", "h-48");
    div.appendChild(divContent);

    const img = document.createElement("img");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");

    h1.textContent = recipe.title;
    p.textContent = "Calories: " + data.results[i].nutrition.nutrients[0].amount + " kcal";
    img.src = recipe.image;

    img.classList.add("w-36", "h-36", "rounded-lg");
    h1.classList.add("pl-4", "pt-4", "text-lg", "font-bold", "header-font");
    p.classList.add("pl-4", "pt-4", "body-font");

    divImg.appendChild(img);
    divContent.appendChild(h1);
    divContent.appendChild(p);
  }
}

function mealSearch() {
  const allergies = getAllergies();
  const diets = getDiets();
  const cals = getCals();
  const random = randomMeal();

  const queryURL =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    key +
    "&intolerances=" +
    allergies +
    "&diet=" +
    diets +
    "&maxCalories=" +
    cals +
    "&offset=" +
    random;

  fetch(queryURL, {
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderMeals(data);
    });
}

// Meal button click handler
function submitMealHandler() {
  if (!localStorage.getItem("localUser")) {
    displayModalMeal();
  } else {
    mealSearch();
  }
}

function displayModalMeal() {
  const mealModalOverlay = document.getElementById("mealModalOverlay");
  mealModalOverlay.classList.toggle("hidden");
  mealModalOverlay.classList.toggle("flex");
}

// Event listeners
document.getElementById("activityNxBtn").addEventListener("click", function () {
  location.href = "activityForm.html";
});

document.getElementById("modalOkButton").onclick = function () {
  location.href = "userForm.html";
};

mealBtn.addEventListener("click", submitMealHandler);
