//tweeter constructor. It dnamicly reconstruct the tweets so
//that they look the same
//I manually hardcode the layout, but the css files automatic 
//apply the styles to respective classes
function createTweetElement(data) {
    // create elements with special classnames
    const $tweet = $("<article>").addClass("tweetArticle");
    const $header = $("<header>").addClass("tweetHeader");
    const $image = $("<img>").addClass("imgHeader");
    const $div1 = $("<div>").addClass("tweeterDiv");
    const $div2 = $("<div>").addClass("hashtagDiv");
    const $div3 = $("<div>").addClass("tweetsDiv");
    const $footer = $("<footer>").addClass("tweetFooter");
    const $div4 = $("<div>").addClass("dayDiv");
    const $div5 = $("<div>").addClass("linkDiv");
    const $a1 = $("<a>").addClass("aLike");
    const $a2 = $("<a>").addClass("aFlag");
    const $a3 = $("<a>").addClass("aRetweet");
    //hardcode img links 
    const $img1 = $("<img>").attr("src", "http://chittagongit.com//images/twitter-like-icon/twitter-like-icon-24.jpg").addClass("link like");
    const $img2 = $("<img>").attr("src", "http://icons-for-free.com/free-icons/png/512/1665645.png").addClass("link flag");
    const $img3 = $("<img>").attr("src", "https://cdn141.picsart.com/271343942011211.png").addClass("link retweet");
    $a1.append($img1);
    $a2.append($img2);
    $a3.append($img3);
    $div5.append($a1, $a2, $a3);

    $image.attr('src', data.user.avatars.small);
    $div1.text(data.user.name);
    $div2.text(data.user.handle);
    $div3.text(data.content.text);
    //uses newDate() to convert a unix standard date format
    //to a real date
    const date = new Date(data.created_at).toString();
    const arr = date.split(' ');
    //index 0 1 2 3 refers to day month year 
    const newDate = arr[0] + arr[1] + arr[2] + arr[3];
    $div4.text(newDate);

    //reconstruct big sections by appending children in the disired
    //and logical order
    $header.append($image, $div1, $div2);
    $footer.append($div4, $div5);
    $tweet.append($header, $div3, $footer);

    return $tweet;
}

//renderTweets append the newly constructed main sub section to the 
//existing main, where data should be an object in a manner such that
//allows the createTweetElement function to work on
function renderTweets(data) {
    data.forEach(tweet => {
        const $tweet = createTweetElement(tweet);
        $('#tweets').prepend($tweet);
    })
}

//this function:
//1. add an event listener using jquery syntax by listening submit action
//on <form> element
//2. if statements to give a dynamic alert using slideToggle on a div element 
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
            $(".lowError").show('slow');
            $('textarea').keydown(function (event) {
                $(".lowError").hide('slow');
                $(".highError").hide('slow');
            })
        } else if (text.length > 140) {
            $(".highError").show('slow');
            $('.textarea').keydown(function (event) {
                $(".lowError").hide('slow');
                $(".highError").hide('slow');
            })
        } else {
            console.log('Form submitted, performing ajax call...');
            $.ajax('/tweets/', {
                type: 'POST',
                data: formData,
                success: function (res) {
                    renderTweets([res]);
                }
            })
            $('textarea')[0].value = '';
            $("#counter")[0].textContent = 140;
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
            const sortNewestFirst = (a, b) => a.created_at - b.created_at;
            const data = res.responseJSON;
            renderTweets(data.sort(sortNewestFirst));
        }
    })
}

function clickComposer() {
    $('#composer').click(function (event) {
        $("#new-tweet").slideToggle('slow', function () {
            $("#text").focus();
        });
    })
}

function hoverArticles() {
    $('.tweetArticle').on("mouseover", function (event) {
        console.log('mouseoever!!!');
        $(this).find('.link').show();
    })
    $('.tweetArticle').on("mouseout", function (event) {

        $(this).find('.link').hide();
    })
}

//call of all the above function after the document DOM is loaded
$(document).ready(function () {
    loadTweets();
    createSubmitHandler();
    clickComposer();
    hoverArticles();
});