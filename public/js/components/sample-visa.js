$(document).ready(function () {
    const $container = $('.visa-cards-container');
    const $card = $('.visa-card').first();
  
    const scrollAmount = $card.outerWidth(true);
  
    $('.visa-scroll-btn.left').on('click', function () {
      $container.animate({
        scrollLeft: $container.scrollLeft() - scrollAmount
      }, 300);
    });
  
    $('.visa-scroll-btn.right').on('click', function () {
      $container.animate({
        scrollLeft: $container.scrollLeft() + scrollAmount
      }, 300);
    });
});
  