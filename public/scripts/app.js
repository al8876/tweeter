// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

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
  $.post('/tweets', data);

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