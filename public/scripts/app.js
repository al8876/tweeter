$(document).ready(function(){

  // Display existing tweets from database 

  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      $('#tweetFeed').prepend(createTweetElement(tweet));
    });
  };


  // Parse tweet database from objects into HTML elements

  function createTweetElement(tweet) {
    let $tweet = $("<article>").addClass("indiTweet");
    let $header = $("<header>");
    let $avatars = $("<img>").attr("src", tweet.user.avatars.small);
    let $name = $("<h2>").text(tweet.user.name);
    let $handle = $("<p>").addClass('handle').text(tweet.user.handle);
    let $content = $('<p>').text(tweet.content.text); 
    // Below is bad security one that is hacked
    // let $content = $(`<p>${tweet.content.text}</p>`); 
    let $footer = $('<footer>');
    let $created = $('<p>').text(tweet.created_at);
    let $heart = $('<i>').addClass("fa fa-heart").attr("aria-hidden", "true");
    let $retweet = $('<i>').addClass("fa fa-retweet").attr("aria-hidden", "true");
    let $flag = $('<i>').addClass("fa fa-flag").attr("aria-hidden", "true");
    $($footer).append($created, $heart, $retweet, $flag);
    $($header).append($avatars, $name, $handle);
    $($tweet).append($header, $content, $footer);
    return $tweet;
  }

  function loadAndRenderTweet() {
    $('#tweetFeed').empty()
    $.ajax({
      url: '/tweets',
      method: 'GET',
    }).done(function (tweet) {
      console.log('Success :', tweet);
      renderTweets(tweet);
    });
  };

  loadAndRenderTweet();
  
  // New Tweet Functions

  $('.new-tweet form').on('submit', function(e) {
    // Prevent the default behaviour of new page refresh
    e.preventDefault();
    // Get data of form
    var data = $('.new-tweet form').serialize();
    // Submit using ajax
    console.log(data);

    // Condition for text between char count 0 - 140 
    if ($('textarea').val() === "") {
      window.alert("You need to write to compose a tweet!");
    } else if ($('textarea').val().length > 140) {
      window.alert('Too many characters in your tweet');
    } else {
      $.post('/tweets', data).done(loadAndRenderTweet);
  // Reset the form after submit
      $(this).trigger('reset');
      $('.new-tweet .counter').text('140');
    }
  });

  // Compose Button Click
  $('#nav-bar button').click(function() {
    $('.new-tweet').slideToggle('fast');
    $('.new-tweet textarea').focus();
  });


});