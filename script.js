document.getElementById('search-button').addEventListener(
    'click', () => {
        const mealName = document.getElementById('meal-name').value
        if(mealName === ''){
            document.getElementById('allFood').innerHTML = '';
            errorTogglePopUp();
        }
        else{fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => errorTogglePopUp())}
    }
)

//function for display meals according to search...
const displayMeals = (meals) => {
    const allMeals = document.getElementById('allFood')
    allMeals.innerHTML = ''
    meals.forEach(meal => {
        
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal';
        const mealName = meal.strMeal;
        const mealImage = meal.strMealThumb;
        const mealInfo = `
        <img class = "meal-img" src="${mealImage}">
        <h4 class="meal-name">${mealName}</h4>
        `;
        mealDiv.innerHTML = mealInfo;
        allMeals.appendChild(mealDiv);

        const mealId = meal.idMeal;
        mealDiv.addEventListener(
            'click', () => displayDetailsTogglePopUp(mealId)
        )
    });
}

//pop up function
const displayDetailsTogglePopUp = (mealId) =>{
    document.getElementById("popup-1").classList.toggle("active");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals))
}

//function for display meal's details
const displayMealDetails = (meals) => {
    const allMeals = document.getElementById('mealDetailInfo');
    allMeals.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'mealDetail';
        const mealName = meal.strMeal;
        const mealImage = meal.strMealThumb;
        document.getElementById('unOrderList').innerHTML = ''
            let count = 1;
            let mealList = '';
            for(const key of Object.keys(meal)){
            if(key === 'strIngredient' + count){
                mealList = (`${meal[key]}`);
                document.getElementById('unOrderList').innerHTML += `<li class="list-item">${mealList}</li>`;
                count++;
                }    
            }
        
        const mealInfo = `
        <h1 class="meal-details">Meal Details</h1>
        <img class = "meal-detail-img" src="${mealImage}">
        <h2 class="meal-name">${mealName}</h2>
        <h4>Ingredients</h4>
        `;
        
        mealDiv.innerHTML = mealInfo;
        allMeals.appendChild(mealDiv);
    });
}

//function for pop up when user's input can not match with the meal's database.
const errorTogglePopUp = () => {
    document.getElementById("popup-2").classList.toggle("active");
    const errorInfo = `
        <img class="sorry-img" src="images/sorry.png">
        <h1 class="error-message">Sorry, No Meals Found</h1>
        `;
    document.getElementById('errorMessage').innerHTML = errorInfo;    
}