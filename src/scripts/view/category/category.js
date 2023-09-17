import axios from 'axios';

const category = async (data) => {
  const mealList = document.querySelector('meal-list');
  const categoryContainer = document.querySelector('.categoryContainer');
  const categeoryList = document.createElement('div');
  categeoryList.classList.add('category-list');
  categeoryList.innerHTML = '';

  data.forEach((element) => {
    categeoryList.innerHTML += `
    
      <div class="category-row">
        <div class="category-item" id="${element.strCategory}">
            <img class="categoryThumb" src="${element.strCategoryThumb}" alt="Category">
            <p class="category-title">${element.strCategory}</p>
        </div>  
      </div>
        `;
  });
  categoryContainer.appendChild(categeoryList);

  const categoryRow = document.querySelectorAll('.category-item');

  categoryRow.forEach((element) => {
    const gambar = element.querySelector('.categoryThumb');
    const judul = element.querySelector('.category-title');

    element.addEventListener('click', async () => {
      const ids = element.getAttribute('id');
      try {
        await axios
          .get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ids.toLocaleLowerCase()}`,
          )
          .then((response) => {
            const responseData = response.data.meals;
            if (responseData) {
              mealList.meals = responseData;
            } else {
              mealList.renderError('error');
            }
          });
      } catch (error) {
        mealList.renderError(error.response.data);
      }
    });
    element.addEventListener('mouseenter', () => {
      gambar.style.display = 'none';
      judul.style.display = 'block';
    });

    element.addEventListener('mouseleave', () => {
      gambar.style.display = 'block';
      judul.style.display = 'none';
    });
  });
};

const categoryErrorRender = (message) => {
  const categoryContainer = document.querySelector('.categoryContainer');
  categoryContainer.innerHTML = '';
  const errorElement = document.createElement('h3');
  errorElement.innerText = `Category ${message}`;
  categoryContainer.innerHTML = '';
  categoryContainer.appendChild(errorElement);
};

export { category, categoryErrorRender };
