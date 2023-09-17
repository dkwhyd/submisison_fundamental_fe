const { default: axios } = require('axios');

class MealCard extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set meal(meal) {
    this._meal = meal;
    this.render();
  }

  async render() {
    await axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this._meal.idMeal}`,
      )
      .then((response) => {
        const responseData = response.data.meals;
        const [newMeal] = responseData;
        this._meal = newMeal;
      });

    this.shadowDOM.innerHTML = '';
    this.shadowDOM.innerHTML = `
        <style>
        h3{
          margin:0;
          padding:0;
          font-size:auto;
        }
          .card {
          width: 300px;
          height:auto;
          background-color: #fff;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          border-radius: 5px;
          overflow: hidden;
          margin: 10px;
          display: inline-block;
          }

          .card .imgThumb {
              width: 100%;
              height: 60%;
          }
          .card .up{
            text-align:center;
            background-color:red;
            align-items:center;
            justify-cotent: center;
          }
          .recipes{
            display:none;
          }
          .upContainer{
            cursor:pointer;
            position:relative;
            top:-10%;
            text-align:center;
            height:10px;


          }
          .upContainer img{
            margin:0;
            padding:0;
            width:50px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            background-color:white;
          }
          .downContainer{
            display:none;
            cursor:pointer;
            text-align:center;
            height:10px;
          }
          .rotate180{
            -webkit-transform:rotate(180deg);
            -moz-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            transform: rotate(180deg);
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
            border-radius: 50%;
          }
          .card-content {
              padding: 15px;
          }

          .card-title {
              margin-bottom: 5px;
              text-align:center
          }

          .card-category {
              font-size: 1rem;
              color: #777;
              margin-bottom: 5px;
          }

          .card-country {
              font-size: 1rem;
              color: #555;
              margin:0;
              padding:0;
        }
  @media screen and (max-width: 750px) {

        .card {
            width: 19rem; /* Make the card span the full width */
            margin:10px;
            margin-bottom:10px;
            height:auto;
          }
      }

    @media screen and (max-width: 480px) {
        .card {
            width: 19rem; /* Reduce the card's maximum width */
            margin: 10px auto; /* Center the card horizontally */
        }

        .card-content {
            padding: 10px; /* Reduce the padding for smaller screens */
        }

        .card-title {
            font-size: 1.2rem; /* Reduce the title font size */
        }

        .card-category,
        .card-country {
            font-size: 0.9rem; /* Reduce the category and country font size */
        }
    }
        </style>
        `;

    this.shadowDOM.innerHTML += this._meal.strArea
      ? `
   
    <div class ="card" id=${this._meal.idMeal}>

        <img class="imgThumb" src="${this._meal.strMealThumb}" width="200">
        <div class="upContainer">
          <img src="https://img.icons8.com/?size=256&id=13621&format=png" alt="show ingreidents" width=25>
        </div>

        <div class = "card-content">
          <h3 class="card-title"> ${this._meal.strMeal}</h3>
          <p class="card-category">
          <img src="https://img.icons8.com/?size=256&id=25109&format=png" alt="category" width=20 >
          ${this._meal.strCategory}</p>
          <p class="card-country"> <img src="https://img.icons8.com/?size=256&id=17768&format=png" alt="region" width=20> ${this._meal.strArea}</p>
          <div class="recipes">
            <h4> Ingredients:</h4>
        <p>${this._meal.strIngredient1} ${this._meal.strMeasure1}, ${this._meal.strIngredient2} ${this._meal.strMeasure2}, ${this._meal.strIngredient3} ${this._meal.strMeasure3}, ${this._meal.strIngredient4} ${this._meal.strMeasure4}, ${this._meal.strIngredient5} ${this._meal.strMeasure5}, ${this._meal.strIngredient6} ${this._meal.strMeasure6}, ${this._meal.strIngredient7} ${this._meal.strMeasure7}, ${this._meal.strIngredient8} ${this._meal.strMeasure8}.
        </p>
            <div class="downContainer">
            <img src="https://img.icons8.com/?size=256&id=13621&format=png" alt="close" width=50 class="rotate180">
          </div>
        </div>
      </div>
    </div>
    `
      : `
      <div class ="card" id=${this._meal.idMeal}>
      <img class="imgThumb" src="${this._meal.strMealThumb}" width="200">
      <div class = "card-content">
        <h4 class="card-title"> ${this._meal.strMeal}</h4>
    
      </div>

    </div>      
      `;

    if (this._meal.strArea) {
      this.card = this.shadowDOM.querySelector('.card');
      this.card.style.height = '25rem';
      this.btnShowRecipes = this.shadowDOM.querySelector('.upContainer');
      this.closeBtn = this.shadowDOM.querySelector('.downContainer');
      this.recipes = this.shadowDOM.querySelector('.recipes');
      this.imageThumb = this.shadowDOM.querySelector('.imgThumb');
      this.btnShowRecipes.addEventListener('click', () => {
        this.recipes.style.display = 'unset';
        this.imageThumb.style.display = 'none';
        this.btnShowRecipes.style.display = 'none';
        this.closeBtn.style.display = 'block';
      });

      this.closeBtn.addEventListener('click', () => {
        this.recipes.style.display = 'none';
        this.imageThumb.style.display = 'unset';
        this.btnShowRecipes.style.display = '';
        this.closeBtn.style.display = 'none';
      });
    }
  }
}

customElements.define('meal-item', MealCard);
