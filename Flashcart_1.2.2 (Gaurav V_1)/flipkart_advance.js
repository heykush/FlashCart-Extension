
//Check cod advance autopay
chrome.storage.sync.get(['cod_advance'], function(result) {
    advance = result.cod_advance;
    console.log('COD Advance is ' + advance);
    //click on cod advance pay button
    if(advance == true){
        setInterval(function(){
            console.log("trying to click PHONEPE");
            $("Label[for='UPI']").click();
            $("Label[for='PHONEPE']").click();
            $("Label[for='PHONEPE'] button").click(); //click will redirect to phonepe
            $("Label[for='PHONEPE'] button").remove(); //remove button after clicking
        }, 300);
    }
    });
    
    
    
