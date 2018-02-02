$(document).ready(function(){

  // Parse tweet database from objects into HTML elements
  function createTweetElement(tweet) {
    let $tweet = $("<article>").addClass("indiTweet");
    let $header = $("<header>");
    let $avatars = $("<img>").attr("src", tweet.user.avatars.small);
    let $name = $("<h2>").text(tweet.user.name);
    let $handle = $("<p>").addClass('handle').text(tweet.user.handle);
    let $content = $('<p>').text(tweet.content.text);
    let $footer = $('<footer>');

    // Moment package to display time created at
    let $created = $('<p>').text(moment(tweet.created_at).fromNow());

    // Font Awesome icons (Like, Retweet, Flag) for Tweet footer
    let $heart = $('<i>').addClass("fa fa-heart").attr("aria-hidden", "true");
    let $retweet = $('<i>').addClass("fa fa-retweet").attr("aria-hidden", "true");
    let $flag = $('<i>').addClass("fa fa-flag").attr("aria-hidden", "true");

    // Append elements to header and footer of tweet
    $($footer).append($created, $heart, $retweet, $flag);
    $($header).append($avatars, $name, $handle);

    // Append footer and header to tweet
    $($tweet).append($header, $content, $footer);

    return $tweet;
  }

  // Display existing tweets from database
  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      $('#tweetFeed').prepend(createTweetElement(tweet));
    });
  }

  // Function to load and render tweets on the Tweet Newsfeed using AJAX
  function loadAndRenderTweet() {
    $('#tweetFeed').empty();
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).done(function (tweet) {
      console.log('Success :', tweet);
      renderTweets(tweet);
    });
  }

  loadAndRenderTweet();
  
  // New Tweet Functions
  $('.new-tweet form').on('submit', function(e) {
    // Prevent the default behaviour of new page refresh
    e.preventDefault();
    // Get data of form
    var data = $('.new-tweet form').serialize();

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

  // Compose Button Click - Toggle Slide animation
  $('#nav-bar button').click(function() {
    $('.new-tweet').slideToggle('fast');
    $('.new-tweet textarea').focus();
  });

});