const images = [
    "assets/images/clo.jpg", "assets/images/4.jpg", "assets/images/55.png"];
let currentIndex = 0;

const carousel = document.querySelector('.carousel img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    carousel.src = images[currentIndex];
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    carousel.src = images[currentIndex];
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    carousel.src = images[currentIndex];
}, 2000);
document.getElementById('hamburger-menu').onclick = function() {
document.getElementById('main-nav').classList.toggle('active');
};