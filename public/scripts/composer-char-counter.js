const maxChar = 140;

$(document).ready(function() {
  // On keyboard input - change counter positive or negative
  $('.new-tweet form textarea').on('input', function() {
    let input = $(this).val();
    let charLeft = (maxChar - input.length);

    // Target the counter class in index.html
    const counter = $(this).parent().children('.counter');

    // If input length is over 140 character, counter colour turns red
    if (input.length > maxChar) {
      $(counter).css('color', 'red');
    } else if (input.length < maxChar || input.length === maxChar) {
      $(counter).css('color', 'black');
    }
    counter.text(charLeft);
  });

});