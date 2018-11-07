// Test / driver code (temporary). Eventually will get this from the server.
function createTweetElement(data) {
    const $tweet = $("<article>").addClass("article tweet");

    const $header = $("<header>").addClass("tweetHeader");
    //header image 
    const $image = $("<img>").addClass("imgHeader");
    //name
    const $span1 = $("<span>").addClass("div tweeter");
    //hashtag
    const $span2 = $("<span>").addClass("span hashtag");
    //tweet
    const $span3 = $("<span>").addClass("span tweets");

    const $footer = $("<footer>").addClass("tweetFooter");
    //when tweeted
    const $span4 = $("<span>").addClass("span day");
    //link
    const $span5 = $("<span>").addClass("span link");

    $image.attr('src',data.user.avatars.small);
    $span1.text(data.user.name);//not working
    $span2.text(data.user.handle);
    $span3.text(data.content.text);
    const date = new Date(data.created_at).toString();
    const arr = date.split(' ');
    const newDate = arr[0] + arr[1] +arr[2]+arr[3];
    $span4.text(newDate);

    // var date = new Date(1461116232227);

    $header.append($image,$span1,$span2);
    $footer.append($span4,$span5);

    $tweet.append($header,$span3,$footer);
    
   




  return $tweet;

}
const tweetData = {
    "user": {
        "name": "Newton",
        "avatars": {
            "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
}
$(document).ready(function () {

    var $tweet = createTweetElement(tweetData);

    console.log($tweet);
    $('main').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});


// Test / driver code (temporary)