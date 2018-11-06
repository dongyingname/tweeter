$(document).ready(function () {
    console.log('document is ready');

    const maxLength = 140;
    
    $("#text")[0].addEventListener('keydown', function () {
        let charRemain = maxLength - this.value.length;
        console.log('keydowned');
        console.log(charRemain);
        $("#counter")[0].textContent = charRemain;

    });


});

