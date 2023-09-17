import './category/category.css';
import axios from 'axios';
import { category, categoryErrorRender } from './category/category';
import '../component/search-element';
import './meal/mealList';

const main = () => {
  const mealList = document.querySelector('meal-list');
  const searchField = document.querySelector('search-element');

  // getmeal
  const getMeal = async (keywords) => {
    let keywordSearch = keywords;
    if (!keywordSearch) {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      const randomAlphabet =
        alphabet[Math.floor(Math.random() * alphabet.length)];
      keywordSearch = randomAlphabet;
    }

    try {
      await axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${keywordSearch}`,
        )
        .then((response) => {
          const dataMeal = response.data.meals;
          if (dataMeal) {
            mealList.meals = dataMeal;
          } else {
            mealList.renderError('Data not found');
          }
        });
    } catch (error) {
      mealList.renderError(error.message);
    }
  };

  // get cetegory
  const getCategory = async () => {
    try {
      await axios
        .get('https:www.themealdb.com/api/json/v1/1/categories.php')
        .then((response) => {
          const categoryData = response.data.categories;
          if (categoryData) {
            category(categoryData);
          }
        });
    } catch (error) {
      categoryErrorRender(error.message);
    }
  };

  // search
  async function searchRecipes() {
    getMeal(searchField.value);
  }

  searchField.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      searchRecipes();
    }
  });

  searchField.clickHandler = searchRecipes;

  getCategory();
  getMeal();
};

export default main;
