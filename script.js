async function getRandomMeal() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        return data.meals[0];
    } catch (error) {
        console.error('Error fetching random meal:', error);
        return null;
    }
}
async function updatemeal() {
    const lambPilafLink = document.querySelector('.lamb-pilaf');
    const randomMeal = await getRandomMeal();

    if (randomMeal) {
        
        const randomMealImage = document.querySelector('.randommeal');
        randomMealImage.src = randomMeal.strMealThumb;

       
        lambPilafLink.href = randomMeal.strSource;

        
        lambPilafLink.textContent = randomMeal.strMeal;

        randomMealImage.addEventListener('click', () => showModal(randomMeal));
    }
}
function showModal(meal) {
    const modalContainer = document.querySelector('.modal-container');
    const ingredientsList = document.querySelector('.ingredients-list');
   
    ingredientsList.innerHTML = '';
   
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient} - ${meal[`strMeasure${i}`]}`;
            ingredientsList.appendChild(listItem);
        } else {
            break;
        }
    }

    modalContainer.style.display = 'block';
}
function closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.style.display = 'none';
}
function closeModalOutside(event) {
    const modalContainer = document.querySelector('.modal-container');
    if (!modalContainer.contains(event.target)) {
        closeModal();
    }
}
async function searchMeals(searchTerm) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error('Error fetching meals:', error);
        return null;
    }
}
async function updateSearchResults() {
    const searchInput = document.getElementById('Search');
    const searchTerm = searchInput.value;

    if (searchTerm.trim() !== '') {
        const meals = await searchMeals(searchTerm);
        displaySearchResults(meals);
    }
}
function displaySearchResults(meals) {
    
    const searchResultsContainer = document.querySelector('.search-results');
    searchResultsContainer.innerHTML = '';

    
    meals.forEach((meal) => {
        const mealItem = document.createElement('div');
        mealItem.classList.add('search-result-item');

        const mealImage = document.createElement('img');
        mealImage.src = meal.strMealThumb;
        mealItem.appendChild(mealImage);

        const mealName = document.createElement('h4');
        mealName.textContent = meal.strMeal;
        mealItem.appendChild(mealName);

        searchResultsContainer.appendChild(mealItem);
    });
}
document.getElementById('Search').addEventListener('input', updateSearchResults);
window.addEventListener('load', updatemeal);
document.querySelector('.main-child').addEventListener('input', updatemeal);
