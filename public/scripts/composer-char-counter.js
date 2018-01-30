$(document).ready(function() {
  $('.new-tweet form textarea').on('keyup', function() {
    let input = $(this).val();
    let charLeft = (140 - input.length);

    // Target the counter class in index.html
    const counter = $(this).parent().children('.counter');

    //If input length is over 140 character, counter colour turns red
    if (input.length > 140) {
      $(counter).css('color', 'red');
    }
    counter.text(charLeft);
  });
});

