console.clear();
console.log('%c FlashCart⚡ is working! ', "background: blue; color: white; font-size: x-large");



$(function(){

    $('.toggle-switch').change(function () {
        if ($(this).is(':checked')) {
            console.log("Switch Checked");
            $('#status').css('display', 'block');

            window.open("https://api.realme.com"+window.location.pathname);
        }
    
        else {
            console.log("Switch Unchecked");
            $('#status').css('display', 'none');
            c = 0;
        }
    });
    

});




