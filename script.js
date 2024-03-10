const searchBox = document.querySelector(".searchBox");                             
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const closeBtn = document.querySelector(".close-btn");

// Function to fetch recipe 

const fetchRecipe = async (query) =>{

    recipeContainer.innerHTML = "<h2>Please wait...</h2>";

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);              //fetching data from API in form of Array.
    const responce = await data.json();                                                            //step 2: data recipt and convert to json from data to responce element

    recipeContainer.innerHTML = "";
    responce.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');                                        //this variable help to create HTML code in js through createElement function.
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML =`

    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea}</p>
    <p>${meal.strCategory}</p>

    `
    const button = document.createElement('button');                //create button below the container for details
    button.textContent = 'View Recipe';
    recipeDiv.appendChild(button);

    // Creating POP-UP window for recipe button

    button.addEventListener('click', () => {
        openRecipePopup(meal);
    });
    recipeContainer.appendChild(recipeDiv);
   });
}

// function for fetching ingredients in popup window

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i = 1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }else{
            break;
        }
    }
    return ingredientsList;
};

const openRecipePopup = (meal) =>{                                                                        //create popup and passing value
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3 class="IngH3">Ingredents:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = 'block';
};

closeBtn.addEventListener('click', () => {

    recipeDetailsContent.parentElement.style.display = "none";

});

searchBtn.addEventListener('click', (e)=>{                          //Step1:Pass the value through search button to fetchrecipe function by making serachinput variable
    e.preventDefault();                                                                    // to cancel the reload sitution use prevent default to disable it.
    const searchInput = searchBox.value.trim();
    fetchRecipe(searchInput);
    // console.log("button is clicked");
});




