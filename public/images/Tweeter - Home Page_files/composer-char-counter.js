//Document Ready Check

//Dynamic change to textarea
function changeCounter() {
    $("#text")[0].addEventListener('keydown', function () {
        const maxLength = 140;
        let charRemain = maxLength - this.value.length;
        $("#counter")[0].textContent = charRemain;
        if (charRemain < 0) {
            $("#counter")[0].style.color = 'red';
        } else {
            $("#counter")[0].style.color = '';
        }
    });
}

$(document).ready(function () {

    console.log('document is ready');

    changeCounter();

});