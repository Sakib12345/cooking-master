document.getElementById('search-button').addEventListener(
    'click', () => {
        const mealName = document.getElementById('meal-name').value
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => alert('No meals found'))
    }
)

const displayMeals = (meals) => {
    const allMeals = document.getElementById('allFood')
    allMeals.innerHTML = ''
    meals.forEach(meal => {
        
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal'
        const mealName = meal.strMeal
        const mealImage = meal.strMealThumb
        const mealInfo = `
        <img class = "meal-img" src="${mealImage}">
        <h4 class="meal-name">${mealName}</h4>
        `
        mealDiv.innerHTML = mealInfo
        allMeals.appendChild(mealDiv)
        const mealId = meal.idMeal
        mealDiv.addEventListener(
            'click', () => displayDetailsTogglePopUp(mealId)
        )
    });
    // element.map((meal) => console.log(meal.strMeal))
    
}

const displayDetailsTogglePopUp = (mealId) =>{
    document.getElementById("popup-1").classList.toggle("active");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => console.log(data))
}