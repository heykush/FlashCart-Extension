console.clear();
console.log('%c FlashCart⚡ is working! ', "background: blue; color: white; font-size: x-large");

check = 1

function getDetails(productId) {
    url = 'https://api.realme.com/in/product/detail?productId='+productId;
    //console.log(url);

    $.ajax({
        url: url,
        dataType: 'json',
        type: 'get',
        async: false,
        crossDomain: true,
        success: function (data, textStatus, jQxhr) {
            //console.log(data);
            if (data['data']) {
                detailed_data = data['data'];
                console.log(detailed_data);
            }
            else {
                console.log("Unable to get product details");
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            var data = jqXhr.responseText;
            console.log(data);
            console.log(errorThrown);
        }
    });

}



function getStock(productId, skuid) {
    url = 'https://api.realme.com/in/product/spu/status?productId='+productId;
    //console.log(url);

    $.ajax({
        url: url,
        dataType: 'json',
        type: 'get',
        crossDomain: true,
        success: function (data, textStatus, jQxhr) {
            //console.log(data);
            if (data['data']) {
                stockStatus = data['data'][skuid]["stockStatus"];
                saleStatus = data['data'][skuid]["saleStatus"];
                console.log("stockStatus is ", stockStatus);
                console.log("saleStatus is ", saleStatus);
                if(stockStatus == "1" && saleStatus == 1 && check == 1){
                    inStock = true
                    clearInterval(x); //stop trying if instock or incart is true
                    console.log("Trying to Place Order Now...@")
                    order(skuid, quantity, price);
                    setInterval(function(){order(skuid, quantity, price);},3000);
                    
                }
            }
            else {
                console.log("Unable to Fetch Product Status");
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            var data = jqXhr.responseText;
            //console.log(data);
            console.log(errorThrown);
        }
    });

}



function setAdd() {
    url = 'https://api.realme.com/in/user/address/list';
    //console.log(url);

    $.ajax({
        url: url,
        dataType: 'json',
        type: 'get',
        async: false,
        crossDomain: true,
        success: function (data, textStatus, jQxhr) {
            //console.log(data);
            if (data['msg']  == 'success') {
                address = data['data']['records'];
            }
            else {
                console.log("Unable to set address");
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            var data = jqXhr.responseText;
            console.log(data);
            console.log(errorThrown);
        }
    });

}



function order(sku, quantity, price) {
    url = 'https://api.realme.com/in/order/purchase/checkout';
    data = '{"ignoreAdditionNos":[],"skuList":[{"skuName":"","price":'+price+',"skuId":'+sku+',"count":'+quantity+',"giftNos":[],"packageNos":[],"limitOfferCode":""}],"realmeCode":"","purchaseType":1,"pincode":""}';
    //console.log(url);

    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        contentType: 'application/json',
        type: 'post',
        async: false,
        crossDomain: true,
        success: function (data, textStatus, jQxhr) {
            //console.log(data);
            if (data['msg']  == 'success') {
                inCart = true;
                console.log("Added to cart Now creating Order.. ");
                setInterval(function(){ createPurchase(aid); }, 800);
                
            }
            else {
                console.log(data['msg']);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            var data = jqXhr.responseText;
            //console.log(data);
            console.log(errorThrown);
        }
    });

}



function createPurchase(aid) {
    url = 'https://api.realme.com/in/order/purchase/create';
    data = '{"addressId":"'+aid+'","prizeType":"","prizeCode":"","invoiceCategory":1,"invoiceTitle":"","invoiceTaxNo":"","purchaseType":"1","ignoreAdditionNos":[],"quoteUid":"","payMode":""}';
    //console.log(url);

    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        contentType: 'application/json',
        type: 'post',
        crossDomain: true,
        success: function (data, textStatus, jQxhr) {
            //console.log(data);
            if (data['msg']  == 'success') {
                orderId = data['data'];
                console.log("Created Order with Order ID: "+orderId);
                window.location.href = "https://buy.realme.com/in/paytm?orderNo="+orderId;
            }
            else {
                console.log(data['msg']);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            var data = jqXhr.responseText;
            console.log(data);
            console.log(errorThrown);
        }
    });

}


var detailed_data = [];
var address = false;
var orderId = false;
var url =  window.location.pathname;
var pid = url.split('goods/')[1];
var c = 0;
var inCart = false;
var inStock = false
var aid;


getDetails(pid);
keys = Object.keys(detailed_data);
max_qty = detailed_data[keys[0]]['maxQuantity']

//PRODUCT OPTIONS
p_html = "";
keys.forEach(key => {
    p_html += "<option value=" + detailed_data[key]['skuId'] +"|"+ detailed_data[key]['price'] +">" + detailed_data[key]['skuName'] + "</option>";
});


setAdd();

//ADDRESS OPTIONS
a_html = "";
address.forEach(key => {
    a_html += "<option value=" + key['id'] +">" + key['address1'] + "</option>";
});

//QUANTITY OPTIONS
q_html = "";
for (qty=1;qty<=max_qty;qty++){
    q_html += "<option value=" + qty +">" + qty + "</option>";
}


//ADD ALL THE ELEMENTS TO PAGE
$(function(){
    
    document.getElementById("plist").innerHTML = p_html;
    //document.getElementById("quantity").innerHTML = q_html;
    if(address.length>0)
    {
        document.getElementById("alist").innerHTML = a_html;
    }

    $('.toggle-switch').change(function () {
        if ($(this).is(':checked')) {

            document.getElementById("plist").disabled = true;
            document.getElementById("alist").disabled = true;
            document.getElementById("quantity").disabled = true;

            console.log("Switch Checked");

            skuAndPrice = document.getElementById('plist').value; //selected product sku and price
            sku = skuAndPrice.split('|')[0];
            price = skuAndPrice.split('|')[1];

            quantity = document.getElementById('quantity').value; //selected Quantity
            aid = document.getElementById('alist').value; //selected Quantity

            $('#status').css('display', 'block');
            
            getStock(pid, sku) //execute once

            x = setInterval(function () { //keep executing with some delay
                if (inStock || inCart) {
                    clearInterval(x); //stop trying if instock or incart is true
                    //console.log("Added to cart.. create order in process...")
    
                }
                else {
                    console.log("Trying to check stock status...@")
                    getStock(pid, sku)
                    c += 1; //show counter increase
                    document.getElementById('clicks').textContent = c;
                }
    
            }, 800);
        }
    
        else {
            
            document.getElementById("plist").disabled = false;
            document.getElementById("alist").disabled = false;
            document.getElementById("quantity").disabled = false;

            console.log("Switch Unchecked");
            $('#status').css('display', 'none');
            clearInterval(x);
            c = 0;
        }
    });

});


