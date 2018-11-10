//tweeter constructor. It dnamicly reconstruct the tweets so
//that they look the same
//I manually hardcode the layout, but the css files automatic 
//apply the styles to respective classes
function createTweetElement(data) {
    // create elements with special classnames
    const $tweet = $("<article>").addClass("article tweet");
    const $header = $("<header>").addClass("tweetHeader");
    const $image = $("<img>").addClass("imgHeader");
    const $span1 = $("<span>").addClass("div tweeter");
    const $span2 = $("<span>").addClass("span hashtag");
    const $span3 = $("<span>").addClass("span tweets");
    const $footer = $("<footer>").addClass("tweetFooter");
    const $span4 = $("<span>").addClass("span day");
    const $span5 = $("<span>").addClass("span link");
    $image.attr('src', data.user.avatars.small);
    $span1.text(data.user.name);
    $span2.text(data.user.handle);
    $span3.text(data.content.text);
    //uses newDate() to convert a unix standard date format
    //to a real date
    const date = new Date(data.created_at).toString();
    const arr = date.split(' ');
    //index 0 1 2 3 refers to day month year 
    const newDate = arr[0] + arr[1] + arr[2] + arr[3];
    $span4.text(newDate);
    //reconstruct big sections by appending children in the disired
    //and logical order
    $header.append($image, $span1, $span2);
    $footer.append($span4, $span5);
    $tweet.append($header, $span3, $footer);

    return $tweet;
}

//renderTweets append the newly constructed main sub section to the 
//existing main, where data should be an object in a manner such that
//allows the createTweetElement function to work on
function renderTweets(data) {
    data.forEach(tweet => {
        const $tweet = createTweetElement(tweet);
        $('main').append($tweet);
    })
}

//this function:
//1. add an event listener using jquery syntax by listening submit action
//on <form> element
//2. if statements to give a dynamic alert using slideToggle on a span element 
//in the <form> element whenever the character length in the textarea is over
//140 and below 0
// 3. the error messages would disapear when additional input is detected

// 4. if the character length  is between 0 and 140, it will console.log and send 
// a post request to the server through ajax
// 5. loadTweets function is the value of the complete key so that after the post
// it will trigger and append the new tweet to the existing tweets
function createSubmitHandler(callback) {
    $('form').submit(function (event) {
        event.preventDefault();
        const form = $(this);
        const formData = form.serialize();
        const text = $('textarea').val();

        if (!text.length) {
            return $("span.low").slideToggle('slow');

        } else if (text.length > 140) {
            return $("span.high").slideToggle('slow');
        } else {
            $('textarea').keydown(function (event) {
                $("span.low").hide('slow');
                $("span.high").hide('slow');
            });
            console.log('Form submitted, performing ajax call...');
            $.ajax('/tweets/', {
                type: 'POST',
                data: formData,
                complete: loadTweets
            })
        }
    });
}

// 1. tweetData: manually construct the tweet HTML structure that take 
// the data from server to fill the key values
// 2. callback the renderTweets function and pass tweetData into it
// so to append a new tweet to the exisiting tweet
function loadTweets() {
    $.ajax('/tweets/', {
        type: 'GET',
        complete: function (res) {
            const sortNewestFirst = (a, b) => b.created_at-a.created_at;
        // console.log(tweets);
        // callback(null, tweets.sort(sortNewestFirst));
            const data = res.responseJSON;
            // console.log(data.sort(sortNewestFirst));
            renderTweets(data.sort(sortNewestFirst));
        }
    })
}

function clickComposer() {
    $('#composer').click(function (event) {
        $(".section").slideToggle('slow', function () {
            $("#text").focus();
        });
    })
}

//call of all the above function after the document DOM is loaded
$(document).ready(function () {
    loadTweets();
    createSubmitHandler();
    clickComposer();
});