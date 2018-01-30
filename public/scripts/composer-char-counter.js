$(document).ready(function() {
  $('.new-tweet form textarea').on('keyup', function() {
    let input = $(this).val();
    let charLeft = (140 - input.length);
    const counter = $(this).parent().children('.counter');
    if (input.length > 140) {
      $(counter).css('color', 'red');
    }
    counter.text(charLeft);
  });
});

