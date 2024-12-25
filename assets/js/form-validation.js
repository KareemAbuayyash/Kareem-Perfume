document.getElementById('hamburger-menu').onclick = function () {
    document.getElementById('main-nav').classList.toggle('active');
  };

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');
  const firstNameError = document.getElementById('firstNameError');
  const lastNameError  = document.getElementById('lastNameError');
  const emailError     = document.getElementById('emailError');
  const mobileError    = document.getElementById('mobileError');
  const addressError   = document.getElementById('addressError');
  const ageError       = document.getElementById('ageError');
  const countryError   = document.getElementById('countryError');
  const messageError   = document.getElementById('messageError');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); 

    formMessage.textContent = '';
    formMessage.style.color = '';
    [ 
      firstNameError, lastNameError, emailError, mobileError, 
      addressError, ageError, countryError, messageError
    ].forEach(el => el.textContent = '');

    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
    const email     = document.getElementById('email').value.trim();
    const mobile    = document.getElementById('mobile').value.trim();
    const address   = document.getElementById('address').value.trim();
    const age       = document.getElementById('age').value.trim();
    const hobbies   = document.getElementById('hobbies').value.trim(); 
    const country   = document.getElementById('country').value.trim();
    const message   = document.getElementById('message').value.trim();

    let isValid = true;

    
    const nameRegex   = /^[A-Za-z\s'-]+$/;       
    const emailRegex  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex  = /^[0-9]{8,15}$/;         
    const ageNumber   = parseInt(age, 10);

    if (!firstName) {
      firstNameError.textContent = 'First name is required.';
      isValid = false;
    } else if (!nameRegex.test(firstName) || firstName.length < 2) {
      firstNameError.textContent = 'Please enter a valid first name (min 2 letters).';
      isValid = false;
    }

    if (!lastName) {
      lastNameError.textContent = 'Last name is required.';
      isValid = false;
    } else if (!nameRegex.test(lastName) || lastName.length < 2) {
      lastNameError.textContent = 'Please enter a valid last name (min 2 letters).';
      isValid = false;
    }

    if (!email) {
      emailError.textContent = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!mobile) {
      mobileError.textContent = 'Mobile number is required.';
      isValid = false;
    } else if (!phoneRegex.test(mobile)) {
      mobileError.textContent = 'Please enter a valid mobile number (8-15 digits).';
      isValid = false;
    }

    if (!address) {
      addressError.textContent = 'Address is required.';
      isValid = false;
    } else if (address.length < 5) {
      addressError.textContent = 'Please enter a valid address (min 5 characters).';
      isValid = false;
    }

    if (!age) {
      ageError.textContent = 'Age is required.';
      isValid = false;
    } else if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 120) {
      ageError.textContent = 'Please enter a valid age (1-120).';
      isValid = false;
    }

    if (!country) {
      countryError.textContent = 'Please select a country.';
      isValid = false;
    }

    if (!message) {
      messageError.textContent = 'Message is required.';
      isValid = false;
    } else if (message.length < 10) {
      messageError.textContent = 'Your message must be at least 10 characters.';
      isValid = false;
    }

    if (isValid) {
      formMessage.style.color = 'green';
      formMessage.textContent = 'Thank you! Your inquiry has been submitted successfully.';

      contactForm.reset();
    } else {
      formMessage.style.color = 'red';
      formMessage.textContent = 'Please fix the errors above and try again.';
    }
  });