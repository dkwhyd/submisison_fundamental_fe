import './meal.css';
import '../../component/meal-item';

class MealList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set heading(heading) {
    this._heading = heading;
    this.render();
  }

  set meals(meals) {
    this._meals = meals;
    this.render();
  }

  renderError(message) {
    this.shadowDOM.innerHTML = '';

    this.shadowDOM.innerHTML += `
      <h3>${message}</h3>
      `;
  }

  render() {
    this.shadowDOM.innerHTML = '';

    this._meals.forEach((element) => {
      const mealitem = document.createElement('meal-item');
      mealitem.meal = element;
      this.shadowDOM.appendChild(mealitem);
    });
  }
}

customElements.define('meal-list', MealList);
