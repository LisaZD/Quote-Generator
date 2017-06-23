//QUOTES ON DESIGN API

$(document).ready(function() {
    $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        //Known issue of right single quote appearing as unicode
        for (var i = 0; i < post.title.split('').length; i++) {
            if (post.title.split('')[i] === '&') {
              post = data.shift();
              break;
            }
          };
        $('#quote-title').text("-" + post.title); 
        $('#quote-content').html(post.content);},
      cache: false
    });
  });

$('#get-another-quote-button').on('click', function(e) {
    e.preventDefault();
    $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        //Known issue of right single quote appearing as unicode
        for (var i = 0; i < post.title.split('').length; i++) {
            if (post.title.split('')[i] === '&') {
              post = data.shift();
              break;
            }
          };
        $('#quote-title').text("-" + post.title); 
        $('#quote-content').html(post.content);},
      cache: false
    });
  });

//PASS QUOTE TO TWITTER
$('#tweet').click(function() {
  var quote = $("#quote-content").text();
  var author = $("#quote-title").text();
  
  //Remove line breaks
  quote = quote.replace(/(\r\n|\n|\r)/gm,"");
  
  //Remove spaces at end of quote
  var qArray = quote.split('');
  for (var i = 0; i < 2; i++) {
    if (qArray[qArray.length - 1] === " ") {
      qArray.pop();
    };
  };
  quote = qArray.join('');
  
  //Build twitter URL
  var tweetURL = "https://twitter.com/intent/tweet";
  var quoteURL = encodeURIComponent(quote);
  var authorURL = encodeURIComponent(author);
  tweetURL = tweetURL + "?text=" + encodeURIComponent("\"") +  quoteURL + encodeURIComponent("\"") + "  " + authorURL + "&hashtags=quotes";
  $("#tweet").attr("href", tweetURL);
});