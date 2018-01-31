// Display existing tweets from database 

function renderTweets(tweets) {
  tweets.forEach(function(tweet) {
    $('#tweetFeed').append(createTweetElement(tweet));
  
  });
};

// Parse tweet database from objects into HTML elements

function createTweetElement(tweet) {
  let $tweet = $("<article>").addClass("indiTweet");
  let $header = $("<header>");
  let $avatars = $("<img>").attr("src", tweet.user.avatars.small);
  let $name = $("<h2>").text(tweet.user.name);
  let $handle = $("<p>").text(tweet.user.handle);
  let $content = $('<p>').text(tweet.content.text); 
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

// renderTweets(data);

// New Tweet Functions

$('.new-tweet form').on('submit', function(e) {
  // Prevent the default behaviour of new page refresh
  e.preventDefault();
  // Get data of form
  var data = $('.new-tweet form').serialize();
  // submit using ajax
  console.log(data);

  if ($('textarea').val() === "") {
    window.alert("Empty");
  } else if ($('textarea').val().length > 140) {
    window.alert('Too many characters');
  } else {
    $.post('/tweets', data).done(function(){;
      $(function loadTweets() {
        $.ajax({
          url: '/tweets',
          method: 'GET',
          success: function (tweet) {
            console.log('Success :', tweet);
            renderTweets(tweet);
          }
        });
      });
    });
    $(this).trigger('reset');
  }
});