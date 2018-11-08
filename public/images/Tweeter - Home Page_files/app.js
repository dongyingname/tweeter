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
// const tweetData = [{
//         "user": {
//             "name": "Newton",
//             "avatars": {
//                 "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//                 "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//                 "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//             },
//             "handle": "@SirIsaac"
//         },
//         "content": {
//             "text": "If I have seen further it is by standing on the shoulders of giants"
//         },
//         "created_at": 1461116232227
//     },
//     {
//         "user": {
//             "name": "Descartes",
//             "avatars": {
//                 "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//                 "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//                 "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//             },
//             "handle": "@rd"
//         },
//         "content": {
//             "text": "Je pense , donc je suis"
//         },
//         "created_at": 1461113959088
//     },
//     {
//         "user": {
//             "name": "Johann von Goethe",
//             "avatars": {
//                 "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//                 "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//                 "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//             },
//             "handle": "@johann49"
//         },
// "content": {
//     "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
// }
//         "created_at": 1461113796368
//     }];

function loadTweets() {
    $('form').submit(function (event) {
        event.preventDefault();
        const text = $('textarea').val();
        const form = $(this);
        const formData = form.serialize();

        if (!text.length) {
            alert('Please type something!!!');
        } else if (text.length > 140) {
            alert('The maximum chacaters input is 140!');
        } else {
            const tweetData = {
                "user": {
                    "name": "",
                    "avatars": {},
                    "handle": ""
                },
                "content": {
                    "text": text
                },
                "created_at": ''
            };
            renderTweets(tweetData);
            console.log('Form submitted, performing ajax call...');
            $.ajax('/tweets/', {
                type: 'POST',
                data: formData
            })
        }
    });
}

$(document).ready(function () {
    // renderTweets(tweetData);
    loadTweets();

});


// Test / driver code (temporary)