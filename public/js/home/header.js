let currentSlideIndex = 0;
const slides = document.querySelectorAll('.header-slide');
const indicators = document.querySelectorAll('.header-indicator');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Initialize the slideshow when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Auto-advance slides every 4 seconds
    setInterval(nextSlide, 4000);
    
    // Initialize first slide
    showSlide(0);
});