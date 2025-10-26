const addRecipeBtn = document.getElementById("addRecipeBtn");
const recipesContainer = document.getElementById("recipesContainer");
const backHome = document.getElementById("backHome");

const nameInput = document.getElementById("recipeName");
const byInput = document.getElementById("recipeBy");
const ingredientsInput = document.getElementById("ingredients");
const instructionsInput = document.getElementById("instructions");
const imageUrlInput = document.getElementById("imageUrl");
const ratingInput = document.getElementById("rating");

const searchInput = document.getElementById("searchInput");
const filterRating = document.getElementById("filterRating");

function loadRecipes() {
  return JSON.parse(localStorage.getItem("familyRecipes") || "[]");
}

function saveRecipes(recipes) {
  localStorage.setItem("familyRecipes", JSON.stringify(recipes));
}

function renderRecipes() {
  const recipes = loadRecipes();
  const search = searchInput.value.toLowerCase();
  const minRating = parseInt(filterRating.value || "0");

  recipesContainer.innerHTML = "";

  recipes
    .filter(r => r.name.toLowerCase().includes(search) && r.rating >= minRating)
    .forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <img src="${recipe.imageUrl || 'https://via.placeholder.com/300x160?text=No+Image'}" alt="${recipe.name}" />
        <h3>${recipe.name}</h3>
        <div class="rating">${"⭐".repeat(recipe.rating)}</div>
        <p><strong>מאת:</strong> ${recipe.by}</p>
        <p><strong>מצרכים:</strong></p>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        <p><strong>שלבים:</strong></p>
        <ul>${recipe.instructions.map(s => `<li>${s}</li>`).join("")}</ul>
      `;

      recipesContainer.appendChild(card);
    });
}

addRecipeBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (!name) return alert("יש להזין שם מתכון");

  const recipe = {
    name,
    by: byInput.value.trim() || "אנונימי",
    ingredients: ingredientsInput.value.split("\n").filter(Boolean),
    instructions: instructionsInput.value.split("\n").filter(Boolean),
    imageUrl: imageUrlInput.value.trim(),
    rating: parseInt(ratingInput.value),
  };

  const recipes = loadRecipes();
  recipes.push(recipe);
  saveRecipes(recipes);

  nameInput.value = "";
  byInput.value = "";
  ingredientsInput.value = "";
  instructionsInput.value = "";
  imageUrlInput.value = "";
  ratingInput.value = "1";

  renderRecipes();
});

searchInput.addEventListener("input", renderRecipes);
filterRating.addEventListener("change", renderRecipes);
backHome.addEventListener("click", () => {
  window.location.href = "home.html";
});

renderRecipes();
