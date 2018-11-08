function createTweetElement(data) {
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
    $span1.text(data.user.name); //not working
    $span2.text(data.user.handle);
    $span3.text(data.content.text);
    const date = new Date(data.created_at).toString();
    const arr = date.split(' ');
    const newDate = arr[0] + arr[1] + arr[2] + arr[3];
    $span4.text(newDate);
    $header.append($image, $span1, $span2);
    $footer.append($span4, $span5);
    $tweet.append($header, $span3, $footer);
    return $tweet;
}

function renderTweets(data) {
    const $tweet = createTweetElement(data);
    $('main').append($tweet);
}

function createSubmitHandler(callback) {
    $('form').submit(function (event) {
        event.preventDefault();
        const form = $(this);
        const formData = form.serialize();
        const text = $('textarea').val();
        if (!text.length) {
            return alert('Please type something!!!');
        } else if (text.length > 140) {
            return alert('The maximum chacaters input is 140!');
        } else {
            console.log('Form submitted, performing ajax call...');
            $.ajax('/tweets/', {
                type: 'POST',
                data: formData,
                complete: loadTweets
            })
        }
    });
}

function loadTweets() {
    const tweetData = {
        "user": {
            "name": "",
            "avatars": {},
            "handle": ""
        },
        "content": {
            "text": $('textarea').val()
        },
        "created_at": ''
    };
    renderTweets(tweetData);
}

function clickComposer() {
    $('#composer').click(function (event) {
        const nav = $('.section.new-tweet');
        console.log('clicked composer button');
        $(".section").slideToggle('slow', function () {
            $("#text").focus();
        });
    })
}
$(document).ready(function () {
    createSubmitHandler();
    clickComposer();

});

