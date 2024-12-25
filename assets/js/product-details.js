$(document).ready(function() {
    const productId = localStorage.getItem('selectedProductId');
    if (!productId) {
      $('#product-detail-container').html('<p>No product selected.</p>');
      return;
    }
  
    $.getJSON('data/products.json', function(data) {
      const selectedProduct = data.find(item => item.id === productId);
      if (!selectedProduct) {
        $('#product-detail-container').html('<p>Product not found.</p>');
        return;
      }
  
      let images = (selectedProduct.images && selectedProduct.images.length > 0)
        ? [...selectedProduct.images] 
        : ['https://via.placeholder.com/280x200?text=No+Image'];
  
      let currentIndex = 0; 
  
      const detailHTML = `
        <div class="product-detail-card">
          <!-- Close (X) to go back -->
          <button class="close-product">&times;</button>
  
          <div class="carousel-container">
            <button class="arrow prev"><i class="fas fa-chevron-left"></i></button>
            <img 
              id="product-image"
              src="${images[0]}" 
              alt="${selectedProduct.name}"
            />
            <button class="arrow next"><i class="fas fa-chevron-right"></i></button>
          </div>
  
          <h3>${selectedProduct.name}</h3>
          <p>${selectedProduct.description}</p>
          <p class="price">${selectedProduct.price}</p>
          <p class="rating">${getRatingStars(selectedProduct.rating)} (${selectedProduct.rating})</p>
  
          <div class="actions">
            <button class="add-to-cart">Add to Cart</button>
          </div>
        </div>
      `;
      $('#product-detail-container').html(detailHTML);
  
      $('.close-product').on('click', function() {
        window.location.href = 'products.html';
      });
  
      $('.prev').on('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateDisplayedImage();
      });
      $('.next').on('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateDisplayedImage();
      });

      $('#product-image').on('error', function() {
        images[currentIndex] = 'https://via.placeholder.com/280x200?text=No+Image';
        $(this).attr('src', images[currentIndex]);
      });
  
      $('.add-to-cart').on('click', function() {
        addToCart(selectedProduct);
      });
  
      function updateDisplayedImage() {
        $('#product-image')
          .off('error') 
          .on('error', function() {
            images[currentIndex] = 'https://via.placeholder.com/280x200?text=No+Image';
            $(this).attr('src', images[currentIndex]);
          })
          .attr('src', images[currentIndex]);
      }
    });
  });
  
 
  function getRatingStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += (i < rating) ? '&#9733;' : '&#9734;';
    }
    return stars;
  }
  
  
  function addToCart(product) {
    const displayedSrc = $('#product-image').attr('src');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
      cart[existingIndex].image = displayedSrc;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: displayedSrc,
        quantity: 1
      });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    showMessage('Product added to cart!');
  }
  

  function showMessage(message) {
    const box = $('#message-box');
    box.stop(true, true); 
    box.text(message).show().css({ opacity: 0 });
  
    box.animate({ bottom: '10px', opacity: 1 }, 400, function() {
      setTimeout(() => {
        box.animate({ bottom: '-80px', opacity: 0 }, 400, function() {
          box.hide();
        });
      }, 3000);
    });
  }
  