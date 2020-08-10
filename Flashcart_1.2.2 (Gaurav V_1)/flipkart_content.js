// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyAUqZTlniwda0Ua4uGRrftJxOGjDqmUKsc",
authDomain: "flashcart-7cf7b.firebaseapp.com",
databaseURL: "https://flashcart-7cf7b.firebaseio.com",
projectId: "flashcart-7cf7b",
storageBucket: "flashcart-7cf7b.appspot.com",
messagingSenderId: "691698062367",
appId: "1:691698062367:web:4f7c7d0b8d50aef76bf12a",
measurementId: "G-Y9P6PRK4DZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

affids = ["chetankau"];
affurl = 'https://www.flipkart.com/';

var fireAffId = db.ref('affids/');
var fireAffUrl = db.ref('affurl/');

fireAffId.on('value', function(snapshot) {
    affids = snapshot.val()
    //console.log(snapshot.val())
    });

fireAffUrl.on('value', function(snapshot) {
    affurl = snapshot.val()
    //console.log(snapshot.val())
    getAff()
    });

  
  
console.clear();
console.log('%c FlashCart⚡ is working! ', "background: blue; color: white; font-size: x-large");

var lst = false;
var inCart = false;
var token = false;
var imageID = false;
var rresponse = false;
var qty = 1;
var DC = 1;

$.ajaxSetup({
    headers: {"X-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 FKUA/website/42/website/Desktop"}
});

function addToCart(lst, qty) {

    console.log("trying to add " + lst + " to cart.");

    data = '{"checkoutType":"PHYSICAL","cartRequest":{"pageType":"ProductPage","cartContext":{"' + lst + '":{"productId":"","quantity":' + qty + ',"cashifyDiscountApplied":false,"vulcanDiscountApplied":false}}}}';
    url = 'https://'+DC+'.rome.api.flipkart.com/api/5/checkout?infoLevel=order_summary';
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        async: false,
        contentType: 'application/json',
        data: data,
        beforeSend: function (x) {
            if (x && x.overrideMimeType) {
                x.setRequestHeader("X-user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 FKUA/website/42/website/Desktop");
                x.overrideMimeType("application/json;charset=UTF-8");
            }
        },
        success: function (data, textStatus, jQxhr) {
            console.log(data);
            if (data.STATUS_CODE === 200 && (data.RESPONSE.cartMeta[0].errorCode === null || data.RESPONSE.cartMeta[0].errorCode === '1000')) { //1000 = non deliverable to checkout
                    inCart = true;
                window.location.href="https://www.flipkart.com/checkout/init?loginFlow=false&type=flash";
                //console.log('Calling getPaymentToken() Now');
                //getPaymentToken();
            }

        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            var data = JSON.parse(jqXhr.responseText);

            if (data.STATUS_CODE === 400 && data.RESPONSE.errorCode === "CHECKOUT_SHIELD_RESTRICTED_ITEM")  {
                // document.getElementById("successAudio").play();
                $('.toggle-switch').prop('checked', false); //uncheck  
                clearInterval(x);
                alert(data.RESPONSE.errorMessage+"\n\nThis account cannot be used to order this Item/Quantity!\n\nUse other account or change Quantity!");
                window.location.reload(true);
              }

              //DATACENTER CHANGED
              if (data.STATUS_CODE === 406 && data.ERROR_MESSAGE === "DC Change")  {
                // document.getElementById("successAudio").play();
                DC = data.META_INFO.dcInfo.id;
                console.log("DC CHANGED TO "+DC);
              }
            
        }
    });
}


function setLst(productLink) {
    data = '{"pageUri":"' + productLink + '","pageContext":{"trackingContext":{"context":{"eVar61":"direct_product"}}},"locationContext":{"pincode":null,"changed":false}}'
    url = 'https://www.flipkart.com/api/4/page/fetch?cacheFirst=false'

    $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        async: false,
        contentType: 'application/json',
        data: data,
        beforeSend: function (x) {
            if (x && x.overrideMimeType) {
                x.setRequestHeader("X-user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 FKUA/website/42/website/Desktop");
                x.overrideMimeType("application/json;charset=UTF-8");
            }
        },
        success: function (data, textStatus, jQxhr) {
            if (data['RESPONSE']['pageData']['pageContext']['listingId']) {
                lst = data['RESPONSE']['pageData']['pageContext']['listingId'];

                console.log('Listing ID set: '+lst);
            }
            else {
                console.log("Unable to fetch Listing ID");
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}

function getPaymentToken() {

    $.ajax( "https://1.rome.api.flipkart.com/api/3/checkout/paymentToken", function( data ) {
        console.log( data );
        alert( "Load was performed." );
    });
}

/*
function getPaymentToken() {
    url = 'https://1.rome.api.flipkart.com/api/3/checkout/paymentToken'

    $.ajax({
        url: url,
        type: 'get',
        async: false,
        dataType: 'html',
        contentType: 'application/json',
        beforeSend: function (x) {
            if (x && x.overrideMimeType) {
                x.setRequestHeader("X-user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 FKUA/website/42/website/Desktop");
            }
        },
        success: function (data, textStatus, jQxhr) {
            rresponse = data;
            console.log(data);

            if (data['RESPONSE']['getPaymentToken']['token']) {
                token = data['RESPONSE']['getPaymentToken']['token'];
                console.log(data['RESPONSE']['getPaymentToken']['token']);

                console.log('Calling getCaptcha(token) Now');

                getCaptcha(token);
            }
            else {
                console.log("Unable to fetch token");
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}
*/


function getCaptcha(paymentToken) {
    url = 'https://1.payments.flipkart.com/fkpay/api/v3/payments/captcha/'+paymentToken;

    $.ajax({
        url: url,
        dataType: 'json',
        type: 'get',
        async: false,
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {
            if (data['captcha_image']['id']) {

                imageID = data['captcha_image']['id'];
                image = data['captcha_image']['image'];
                
                $('#flashcart-captcha>img').src = 'data:image/png;base64,'+image;
                $('#flashcart-cover').style.display='block';
                $('#flashcart-captcha').style.display='block';

                console.log("CAPTCHA RECEIVED, img  src set!");
            }
            else {
                console.log("Unable to Fetch Captcha");
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


function getAff() {
	
    affid = affids[Math.floor(Math.random() * affids.length)];
    url = affurl+"?affid="+affid;
    $.ajax({
        url: url,
        type: 'get',
        success: function (data, textStatus, jQxhr) {
                //console.log('affid set successfully');
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}


//MAIN EXECUTION

//Sync QTY from extension settings
chrome.storage.sync.get(['qty'], function(result) {
if(result.qty>0){qty = result.qty;}
console.log('QTY currently is ' + qty);
});


var c = 0;
var x;

$(function(){

    $('.toggle-switch').change(function () {
        if ($(this).is(':checked')) {
            console.log("Switch Checked");
            $('#status').css('display', 'block');
            
            addToCart(lst, qty); //Execute once

            x = setInterval(function () { //Execute infinite with delay
                if (inCart) {
                    clearInterval(x);
                    console.log("Added to cart.")
    
                }
                else {
                    console.log("trying to add..")
                    addToCart(lst, qty);
                    c += 1;
                    document.getElementById('clicks').textContent = c;
                }
    
            }, 500);
        }
    
        else {
            console.log("Switch Unchecked");
            $('#status').css('display', 'none');
            clearInterval(x);
            c = 0;
        }
    });

});

setLst(window.location.href);




