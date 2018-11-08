//Document Ready Check

//Dynamic change to textarea
// 1. listen to keydown event to textarea 
// 2. the max character length in textarea is 140 allowed
// 3. the if statements make sure the color of the counter number becomes
// red when falls below 0 and normal when rise above 0
//
function changeCounter() {
    $("#text").keydown(function () {
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
//start to use changeCounter after DOM is loaded
$(document).ready(function () {

    changeCounter();

});