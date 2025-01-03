# Kareem-Perfume

A premium perfume e-commerce website that showcases elegant fragrances. Built with **HTML**, **CSS**, **JavaScript**, **jQuery**, **AJAX**, and **JSON**, this project offers a seamless user experience for browsing and purchasing perfumes online.

---

## Table of Contents

1. [Features](#features)  
2. [Technologies](#technologies)  
3. [Project Structure](#project-structure)  
4. [Getting Started](#getting-started)  
5. [Usage](#usage)  
6. [Customization](#customization)  
7. [License](#license)  
8. [Contact](#contact)  

---

## Features

1. **Responsive Header & Navigation**  
   - Hamburger menu toggles on small screens.  
   - Smooth navigation transitions.

2. **Interactive Carousel**  
   - Displays featured perfume images.  
   - Auto-slides with manual next/prev buttons.

3. **Brand Highlights**  
   - Showcases multiple premium perfume brands.  
   - Hover effects and calls to action (View More).

4. **Product Listings**  
   - Products dynamically fetched from a `products.json` file.  
   - **Search**, **filter**, and **sort** products.  
   - Each product shows name, image, price, description, rating.

5. **Add to Cart with Local Storage**  
   - Add items to cart; if they already exist, quantity increments.  
   - Simple **message box** confirms “Product added to cart!”

6. **Contact Us Form**  
   - Validates user input (first name, last name, email, mobile, etc.).  
   - Inline error messages (no pop-ups).  
   - Collects user inquiries.

---

## Technologies

- **HTML**: Structuring the website content.  
- **CSS**: Styling and layout (including responsive design).  
- **JavaScript**: Core logic (carousel, filters, form validation).  
- **jQuery**: DOM manipulation, event handling, and AJAX calls (`$.getJSON`).  
- **AJAX**: Dynamically fetching `products.json`.  
- **JSON**: Storing product information (name, price, rating, etc.).

---

## Project Structure

Kareem-Perfume/ │ ├─ index.html (Home page with carousel, featured brands) ├─ products.html (Lists all products) ├─ about.html (About the brand, mission, story) ├─ contact.html (Contact form with validation) ├─ cart.html (Cart page reading from localStorage) ├─ assets/ │ ├─ css/ │ │ ├─ home.css │ │ ├─ brandimage.css │ │ ├─ slideimage.css │ │ ├─ footer.css │ │ └─ ... │ ├─ js/ │ │ ├─ main.js (General site functionality) │ │ ├─ products.js (Logic for fetching & displaying products) │ │ └─ ... │ ├─ images/ │ │ ├─ dior.png │ │ ├─ le-labo.jpg │ │ ├─ ... │ ├─ gif/ │ │ └─ 2.gif │ └─ ... ├─ data/ │ └─ products.json (Product data in JSON format) ├─ README.md └─ LICENSE

