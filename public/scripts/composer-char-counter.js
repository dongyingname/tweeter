$(document).ready(function () {
    console.log('document is ready');

    const a = $("textarea");
    //console.log(a[0]);
    //console.log(a[0]).nodeValue;
    let maxLength = 140;

    a[0].addEventListener('mouseover', function () {
        console.log('mouseovered');
        console.log(maxLength - this.value.length);
 
        
    
    });
});

