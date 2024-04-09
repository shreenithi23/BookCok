const searchbox = document.querySelector('.searchBox')
const searchBtn = document.querySelector('.searchBtn')
const recipeContainer = document.querySelector('.recipe-container')
const recipeDetailsContent = document.querySelector('.recipe-details-content')
const recipeCloseBtn = document.querySelector('.recipe-closebtn')


const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML="<h2>Fetching recipes.....</h2>";


    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    // console.log(response.meals[0]);
    recipeContainer.innerHTML="";
    response.meals.forEach(meal=>{
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML=`<img src="${meal.strMealThumb}">
                            <h3>${meal.strMeal}</h3>
                            <p><span>${meal.strArea}</span> Dish</p>
                            <p>Belongs to <span>${meal.strCategory}</span> Category </p>
        
        
        `;
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipediv.appendChild(button);
        recipeContainer.appendChild(recipediv);


        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipediv);
    })
}

// const fetchIngredients=(meal)=>{
//     let ingredients = "";
//     for(let i=0;i<=20;i++){
//         const ingre = meal[`strIngredient${i}`];
//         if(ingre){
//             const measure = meal[`strMeasure${i}`];
//             ingredients+=`<li>${measure} ${ingre}</li>`;
//         }
//         else{
//             break;
//         }
//     }
//     return ingredients;
// }

const fetchIngredients = (meal) => {
    let ingredients = "";
    let i = 1;
    while (meal[`strIngredient${i}`]) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        ingredients += `<li>${measure} ${ingredient}</li>`;
        i++;
    }
    return ingredients;
};

const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions: </h3>
            <p class="recipeInstructions">${meal.strInstructions}</p>
        </div>
    `;
    // const contentHeight = recipeDetailsContent.scrollHeight;

    // recipeDetailsContent.parentElement.style.height = `${contentHeight}px`;

    recipeDetailsContent.parentElement.style.display="block";

    recipeCloseBtn.addEventListener('click',()=>{
        console.log("close button clicked");
        recipeDetailsContent.parentElement.style.display="none";
    })
   
};
console.log(recipeCloseBtn);

searchBtn.addEventListener('click',(e)=>{

    e.preventDefault();

    const searchInput = searchbox.value.trim();
    fetchRecipes(searchInput);
    console.log('button clicked');
})



