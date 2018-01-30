const maxChar = 140;

$(document).ready(function() {
  $('.new-tweet form textarea').on('keyup', function() {
    let input = $(this).val();
    let charLeft = (maxChar - input.length);

    // Target the counter class in index.html
    const counter = $(this).parent().children('.counter');

    // If input length is over 140 character, counter colour turns red
    if (input.length > maxChar) {
      $(counter).css('color', 'red');
    }
    counter.text(charLeft);
  });
});