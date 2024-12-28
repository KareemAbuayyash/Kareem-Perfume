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

function loadCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartItemsContainer = $('#cart-items');
  cartItemsContainer.empty();

  if (cart.length === 0) {
    showMessage('Your cart is empty. Please add some items!');
    $('#cart-table').hide();
    return; 
  } else {
    $('#cart-table').show();
  }

  let subtotal = 0;
  const shippingCost = 0.00;

  cart.forEach((item, index) => {
    const itemPrice = parseFloat(item.price.replace('$', '')) || 0;
    const itemTotal = itemPrice * item.quantity;
    subtotal += itemTotal;

    const row = `
      <tr>
        <td><img src="${item.image || 'https://via.placeholder.com/100x100'}" alt="${item.name}" width="60"/></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <input
            type="number"
            class="item-quantity"
            value="${item.quantity}"
            min="1"
            data-index="${index}"
            style="width:50px;"
          />
        </td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td>
          <button class="remove-item" data-index="${index}">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    `;
    cartItemsContainer.append(row);
  });

  $('#subtotal').text(subtotal.toFixed(2));
  $('#total').text((subtotal + shippingCost).toFixed(2));

  attachCartEventListeners();
}

function attachCartEventListeners() {
  $('.item-quantity').on('change', function() {
    const newQuantity = parseInt($(this).val());
    const index = $(this).data('index');
    updateQuantity(index, newQuantity);
  });

  $('.remove-item').on('click', function() {
    const index = $(this).data('index');
    removeItem(index);
  });
}

function updateQuantity(index, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (newQuantity > 0) {
    cart[index].quantity = newQuantity;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

$(document).ready(function() {
  $('#hamburger-menu').click(function() {
    $('nav').toggleClass('active');
  });

  loadCart();

  $('#continue-shopping').click(function() {
    window.location.href = 'products.html';
  });

  $('#buy-now').click(function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    if (cart.length === 0) {
      showMessage('Cart is empty. Please add some items before purchasing!');
    } else {
      localStorage.removeItem('cart');
      
      loadCart();
    
      $('#subtotal').text('0.00');
      $('#total').text('0.00');
      
      showMessage('Thank you for your purchase!');
    }
  });
  
});
