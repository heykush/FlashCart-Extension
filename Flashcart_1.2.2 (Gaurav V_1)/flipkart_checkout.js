console.clear();
console.log('%c FlashCart⚡ is working! ', "background: blue; color: white; font-size: x-large");


//CSS FOR BIG CAPTCHA SIZE
var css = document.createElement('style'); 
css.type = 'text/css'; 
styles = `.JqLGrF ._3931C8 .AVMILy {
    border-radius: 5px;
    width: 230px;
    height: 128px;
}
`;
css.appendChild(document.createTextNode(styles)); 
document.getElementsByTagName("head")[0].appendChild(css); 


//CART SUCCESS SOUND
var s = document.createElement('audio');
s.id = 'successAudio';
//s.setAttribute('autoplay', '');
s.innerHTML = `
  <source src="https://www.dropbox.com/s/oq5ccd3279xeq7d/checkout.mp3?dl=1" type="audio/mp3">
`;
document.body.appendChild(s); 

   

//CAPTCHA SUCCESS SOUND
var s = document.createElement('audio');
s.id = 'captchaAudio';
//s.setAttribute('autoplay', '');
s.innerHTML = `
  <source src="https://www.dropbox.com/s/m0pkgg1h8rixk3f/captcha.mp3?dl=1" type="audio/mp3">
`;
document.body.appendChild(s); 

setInterval(() => {
    if(document.getElementsByClassName('AVMILy').length > 0)
    {document.getElementById("captchaAudio").play();}
}, 500);


   
    //Check if sound is on = > then play sound
    chrome.storage.sync.get(['sound'], function(result) {
        sound_option = result.sound;
        console.log("Sound_option is", sound_option);
        if(sound_option == 1) 
        {
            //console.log("Trying to play sound");
            document.getElementById("successAudio").play();
        } 
    });


function getPaymentToken() {
    url = 'https://1.rome.api.flipkart.com/api/3/checkout/paymentToken'

    $.ajax({
        url: url,
        type: 'get',
        //async: false,
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

                //getCaptcha(token);
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



var pmode;
var buttons;


conInterval = setInterval(function(){

    console.log("Trying to click continue");
    el = document.getElementsByClassName('_7XMNLT')[0]
    el_text = el.firstChild.firstChild.firstChild.nextSibling.firstChild.textContent
    if(el_text==='Login')
    {
        //el.remove() //Remove login div
        //console.log('Removed Login DIV (_7XMNLT)!!');
        
    }
    $("button[class='_3Jk8fm']").disabled=true; //Disable Login Change button because its autoclicked sometimes

    buttons = Array.from(document.querySelectorAll('button'));

    buttons.forEach((button) => {
        if (button.textContent === 'CONTINUE CHECKOUT' && button.childElementCount === 1) {
            button.click();
            button.disabled=true
            console.log('CONTINUE CHECKOUT Clicked!!');
        }
        if (button.textContent === 'Deliver Here' && button.childElementCount === 0) {
            button.click();
            button.disabled=true
            console.log('Deliver Here Clicked!!');
        }
        if (button.textContent === 'CONTINUE' && button.childElementCount === 0) {
            button.click();
            button.disabled=true
            console.log('CONTINUE Clicked!!');
        }
                })
        
        //$("button:contains(text=CONTINUE CHECKOUT)").click();
        //$("button:contains(text=Deliver Here)").click();
        //$("button:contains(text=CONTINUE)").click();
        //$('#to-payment > ._2AkmmA._2Q4i61._7UHT_c').click();
    }, 50);    
    
    


$(function(){

});


        
//Check PAY mode
chrome.storage.sync.get(['pmode'], function(result) {
    pmode = result.pmode;
    console.log('Mode currently is ' + pmode);


    if(pmode==='cod') //COD is the selected mode
    {
        console.log('INSIDE COD');
            codIntv = setInterval(function(){
                console.log('Checking if there is COD option on page');
                if($("Label[for='COD']").length > 0){ //CHECK if COD option is there on the page
                    console.log("trying to click COD");
                    $("Label[for='UPI']").click(); //ONCE CLICK ON UPI
                    $("Label[for='COD']").click(); //THEN CLICK ON COD
                    window.scrollTo(0,document.body.scrollHeight);
                    
                    $("input[name='captcha']").focus();
                    $("input[name='captcha']").click();
                    clearInterval(codIntv);
                    clearInterval(conInterval);
                }
            }, 100);

            //Check cod advance autopay
            chrome.storage.sync.get(['cod_advance'], function(result) {
            advance = result.cod_advance;
            console.log('COD Advance is ' + advance);
            //click on cod advance pay button
            if(advance == true){
                setInterval(function(){
                    if(document.getElementsByClassName('-os1TD').length>0){ //if there is cod advance text p
                    console.log("trying to click COD Advance");
                    $("Label[for='COD'] button").click(); //For COD Advance 300/500
                    document.getElementsByClassName('-os1TD').remove(); //after clicking remove the div
                    }
                }, 100);
            }
            });
    }

    
    else if(pmode==='phonepe')
    {
        console.log('INSIDE PHONEPE');
            ppIntv = setInterval(function(){

                console.log("trying to click PHONEPE");
                $("Label[for='UPI']").click();
                $("Label[for='PHONEPE']").click();
                $("Label[for='PHONEPE'] button").click(); //click will redirect to phonepe 
                $("Label[for='PHONEPE'] button").remove(); //remove button after clicking
            
            }, 100);
    }


    
    else if(pmode==='netbank')
    {
        console.log('INSIDE NETBANKING');
        //GET BANK From chrome storage 
        chrome.storage.sync.get(['bank'], function(result) {
        bank = result.bank;
        setInterval(function(){
            console.log("trying to click netbanking");
            $(`Label[for='NET_OPTIONS']`).click();

            
            if($(`Label[for='${bank}']`).length > 0)
            {
                console.log("trying to select bank from radio");
                $(`Label[for='${bank}']`).click();
            }
            else
            {
                console.log("trying to select bank from Select options");
                $(`select._1CV081`).val(bank);
            }

        }, 300);

        setInterval(function(){
            console.log("trying to CLick Pay");
            $(`Label[for='NET_OPTIONS'] button`).click();
        }, 600);

        });
            
    }

    else{
        console.log('INSIDE NO CHECKOUT');
        console.log("NO AUTO CHECKOUT")
    }

});




//CHECK FOR ERROR DIV - IF ERROR THEN REFRESH
errorCheck = setInterval(function(){
    //console.log('checking for errors!')

    if(document.getElementsByClassName('_366OkV').length>0 && (document.getElementsByClassName('_2AkmmA _2Q4i61 _7UHT_c').length==0 || document.getElementsByClassName('_2AkmmA _2Q4i61 _7UHT_c')[0].textContent=='Notify Me' )) //Not deliverable to your pincode && (no continue button)
    {
        Array.from(document.getElementsByClassName('_366OkV')).forEach(element => {
            element.remove();
            console.log('Found Error Div(_366OkV)! Refreshing page now!')
        });
        clearInterval(errorCheck);
        window.location.href='https://www.flipkart.com/checkout/init?loginFlow=false&type=flash';
    }

    notLoaded = document.getElementsByClassName('_2AkmmA _2am9e3 _1eFTEo')//Payment not loaded retry button
    if(notLoaded.length==1 ) 
    {
        document.getElementsByClassName('_2AkmmA _2am9e3 _1eFTEo')[0].click();
        if(notLoaded.length==1 ) {document.getElementsByClassName('_2AkmmA _2am9e3 _1eFTEo')[0].click();}
        if(notLoaded.length==1 ) {document.getElementsByClassName('_2AkmmA _2am9e3 _1eFTEo')[0].click();}
        if(notLoaded.length==1 ) {document.getElementsByClassName('_2AkmmA _2am9e3 _1eFTEo')[0].click();}
        if(notLoaded.length==1 ) {document.getElementsByClassName('_2AkmmA _2am9e3 _1eFTEo')[0].click();}
        if(notLoaded.length==1 ) {document.getElementsByClassName('_2AkmmA _2am9e3 _1eFTEo')[0].click();}
        if(notLoaded.length==1 ) {document.getElementsByClassName('_2AkmmA _2am9e3 _1eFTEo')[0].click();}
        clearInterval(errorCheck);
        window.location.href='https://www.flipkart.com/checkout/init?loginFlow=false&type=flash';
    }
    unableToLoad = document.getElementsByClassName('_2AkmmA _1KgjD7 _1eFTEo')
    //Unable to load payment options! Payment failed retry button
    if(unableToLoad.length==1 ) 
    {
        document.getElementsByClassName('_2AkmmA _1KgjD7 _1eFTEo')[0].click();
        if(unableToLoad.length==1 ){document.getElementsByClassName('_2AkmmA _1KgjD7 _1eFTEo')[0].click();}
        if(unableToLoad.length==1 ){document.getElementsByClassName('_2AkmmA _1KgjD7 _1eFTEo')[0].click();}
        if(unableToLoad.length==1 ){document.getElementsByClassName('_2AkmmA _1KgjD7 _1eFTEo')[0].click();}
        if(unableToLoad.length==1 ){document.getElementsByClassName('_2AkmmA _1KgjD7 _1eFTEo')[0].click();}
        if(unableToLoad.length==1 ){document.getElementsByClassName('_2AkmmA _1KgjD7 _1eFTEo')[0].click();}
        if(unableToLoad.length==1 ){document.getElementsByClassName('_2AkmmA _1KgjD7 _1eFTEo')[0].click();}
        //document.getElementsByClassName('_2AkmmA _1KgjD7 _1eFTEo')[0].remove();
        clearInterval(errorCheck);
        window.location.href='https://www.flipkart.com/checkout/init?loginFlow=false&type=flash';
    }
    
    var elementExists = !!document.getElementsByClassName("_3hgEev KJrWp7").length;
    //Items you are trying to checkout are Out Of Stock. Please try again later.
    //We are seeing a surge in the number of shoppers. Please retry after few minutes
    if(elementExists){
        document.getElementsByClassName("_3hgEev KJrWp7")[0].remove();
        try{
            document.getElementsByClassName("_2AkmmA _2tyDxq _1eFTEo")[0].remove();
            console.log('Removed goToCart button')
        }
        catch{
            console.log('Remove goToCart Failed')
        }
        console.log('Found Error Div(_3hgEev KJrWp7)! Refreshing page now!')
        clearInterval(errorCheck);
        window.location.href='https://www.flipkart.com/checkout/init?loginFlow=false&type=flash';
    }
    /*
    var elementExists = !!document.getElementsByClassName("_3jlqzO").length;
    if(elementExists){
        document.getElementsByClassName("_3jlqzO")[0].remove();
        console.log('Found Error Div! Refreshing page now!')
        window.location.href='https://www.flipkart.com/checkout/init?loginFlow=false&type=flash';
    }
    */
    var elementExists = !!document.getElementById("IMG_3");
    if(elementExists){
        document.getElementById("IMG_3").remove();
        console.log('Found Error Div(IMG_3)! Refreshing page now!')
        clearInterval(errorCheck);
        window.location.href='https://www.flipkart.com/checkout/init?loginFlow=false&type=flash';
    }
}, 10);