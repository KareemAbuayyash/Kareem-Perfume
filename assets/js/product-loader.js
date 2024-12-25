$(document).ready(function() {
  $('#hamburger-menu').click(function() {
    $('nav').toggleClass('active');
  });

  loadProducts();

  $('#search-bar').on('input', applyFiltersAndSort);
  $('#sort-dropdown').on('change', applyFiltersAndSort);
  $('#category-dropdown').on('change', applyFiltersAndSort);
});

function showMessage(message) {
  const box = $('#message-box');
  box.text(message).show().css({ opacity: 0 });

  box.animate({ bottom: '10px', opacity: 1 }, 400, function() {
    setTimeout(() => {
      box.animate({ bottom: '-80px', opacity: 0 }, 400, function() {
        box.hide();
      });
    }, 3000);
  });
}

function loadProducts() {
  $.getJSON('data/products.json', function(data) {
    const productsGrid = $('#product-grid');
    productsGrid.empty();

    data.forEach(product => {
      const images = (product.images && product.images.length > 0)
        ? product.images
        : ['https://via.placeholder.com/280x200'];

      const ratingStars = getRatingStars(product.rating);

      const productCard = `
        <div class="product-card" data-category="${product.category}">
          <img class="product-image"
               src="${images[0]}"
               alt="${product.name}"
               onerror="this.onerror=null;this.src='https://via.placeholder.com/280x200';"
          />

          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="price">${product.price}</p>
          <p class="rating">${ratingStars} <span>(${product.rating})</span></p>
          <div class="actions">
            <button class="add-to-cart"
              data-id="${product.id}"
              data-name="${product.name}"
              data-price="${product.price}"
              data-image="${images[0]}">
              Add to Cart
            </button>
            <button class="like" onclick="showLoveAnimation(event)">&#10084;</button>
          </div>
        </div>
      `;
      productsGrid.append(productCard);
    });

    applyFiltersAndSort();
  });
}

function getRatingStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += (i < rating) ? '&#9733;' : '&#9734;';
  }
  return stars;
}

function applyFiltersAndSort() {
  const searchQuery = $('#search-bar').val().toLowerCase();
  const selectedCategory = $('#category-dropdown').val();
  const selectedSort = $('#sort-dropdown').val();

  $.getJSON('data/products.json', function(data) {
    let filteredData = data.filter(product => {
      const isCategoryMatch = (selectedCategory === 'all' || product.category === selectedCategory);
      const isSearchMatch = product.name.toLowerCase().includes(searchQuery);
      return isCategoryMatch && isSearchMatch;
    });

    if (selectedSort === 'price-asc') {
      filteredData.sort((a, b) => 
        parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
      );
    } else if (selectedSort === 'price-desc') {
      filteredData.sort((a, b) => 
        parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
      );
    } else if (selectedSort === 'rating') {
      filteredData.sort((a, b) => b.rating - a.rating);
    }

    const productsGrid = $('#product-grid');
    productsGrid.empty();

    filteredData.forEach(product => {
      const images = (product.images && product.images.length > 0)
        ? product.images
        : ['https://via.placeholder.com/280x200'];

      const ratingStars = getRatingStars(product.rating);

      const productCard = `
        <div class="product-card" data-category="${product.category}">
          <img class="product-image"
               src="${images[0]}"
               alt="${product.name}"
               onerror="this.onerror=null;this.src='https://via.placeholder.com/280x200';"
          />

          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="price">${product.price}</p>
          <p class="rating">${ratingStars} <span>(${product.rating})</span></p>
          <div class="actions">
            <button class="add-to-cart"
              data-id="${product.id}"
              data-name="${product.name}"
              data-price="${product.price}"
              data-image="${images[0]}">
              Add to Cart
            </button>
            <button class="like" onclick="showLoveAnimation(event)">&#10084;</button>
          </div>
        </div>
      `;
      productsGrid.append(productCard);
    });
  });
}

function showLoveAnimation(event) {
  const heart = document.createElement('span');
  heart.classList.add('heart-animation');
  heart.innerHTML = '&#10084;';
  event.target.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 1200);
}

$(document).on('click', '.add-to-cart', function(e) {
  e.stopPropagation(); 
  const id    = $(this).data('id');
  const name  = $(this).data('name');
  const price = $(this).data('price');
  const image = $(this).data('image');

  const item = { id, name, price, image, quantity: 1 };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItemIndex = cart.findIndex(product => product.id === id);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showMessage('Product added to cart!');
});

$(document).on('click', '.product-card', function(e) {
  if (!$(e.target).hasClass('like') && !$(e.target).hasClass('add-to-cart')) {
    const productId = $(this).find('.add-to-cart').data('id');
    localStorage.setItem('selectedProductId', productId);
    window.location.href = 'product-details.html';
  }
});
