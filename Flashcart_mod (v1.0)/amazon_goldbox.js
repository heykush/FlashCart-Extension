
console.clear();
console.log('%c FlashCart⚡⚡by Gaurav is working! ', "background: blue; color: white; font-size: x-large");



function getAff() 
{
  url = 'https://www.amazon.in/ref=as_li_ss_tl?ie=UTF8&linkCode=sl2&tag=dealyaari0f-21&linkId=4567119abbf5add670204545b55a63cd&language=en_IN';
  $.ajax({
      url: url,
      type: 'get',
      success: function (data, textStatus, jQxhr) {
      },
      error: function (jqXhr, textStatus, errorThrown) {
          console.log(errorThrown);
      }
  });
}


// Deal Claim
function claim(dealid, asin, token) 
{

  data = 'dealId='+dealid+'&itemId='+asin+'&clientId=goldbox_mobile_pc'
  url = 'https://www.amazon.in/gp/deal/ajax/v2/claimDeal.html'
  resp = "";

  $.ajax({
    url: url,
    dataType: 'json',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded',
    data: data,
    beforeSend: function (x) {
        if (x && x.overrideMimeType) {
            x.overrideMimeType("application/x-www-form-urlencoded");
            x.setRequestHeader("x-csrftoken", token);

        }
    },
    success: function (data, textStatus, jQxhr) {
      resp = data;
      console.log(data);
      if(data.isClaimed == "1"){
        delete DealsWanted[dealid]
        $(`span[data-gbdeal-addtocart*="${dealid}"],span[data-gbdeal-watchdeal*="${dealid}"],span[data-gbdeal-actionrecord*="${dealid}"]`).parents('.dealContainer').find('.toggle-switch').prop('checked', false); //Uncheck Switch

        //alert("𝐃𝐞𝐚𝐥 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐚𝐝𝐝𝐞𝐝 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐜𝐚𝐫𝐭 !!")
        try{
          cartWindow.location.reload(true);
        }
        catch{
          cartWindow = window.open("https://www.amazon.in/gp/cart/view.html?ref_=nav_cart")
        }
      }
    },
    error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
    }
  });

  //error: {"retry":0,"isClaimed":0,"errorCode":"1005"}
  //success: {"isClaimed":"1","currentCartQuantity":"1","dealItemStatus":{"customerState":"INCART","itemState":"AVAILABLE","msToCustomerStateExpiry":"900000"},"msCacheTtl":12000}
}


// fetchWidgetConfig - for csrf token header
function setCustomerData() 
{
  data = 'config_name=gb-shoveler'
  url = 'https://www.amazon.in/gp/deal/ajax/fetchWidgetConfig.html'
  resp = "";

  $.ajax({
    url: url,
    dataType: 'json',
    type: 'post',
    async: false,
    contentType: 'application/x-www-form-urlencoded',
    data: data,
    beforeSend: function (x) {
        if (x && x.overrideMimeType) {
            x.overrideMimeType("application/x-www-form-urlencoded");
        }
    },
    success: function (data, textStatus, jQxhr) {
      customerData = data.customerData;
      console.log(customerData)
    },
    error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
    }
  });

}

// GET COOKIE 
// function getCookie(cname) {
//   var name = cname + "=";
//   var decodedCookie = decodeURIComponent(document.cookie);
//   console.log("dedoded cookie" + decodedCookie)
//   var ca = decodedCookie.split(';');
//   for(var i = 0; i <ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }





//MAIN EXECUTION

getAff();
// session_id = getCookie('session-id')
a = document.getElementsByTagName('html')[0].outerHTML

//@1st WidgetContent
try{
  dealids = a.split('"sortedDealIDs" : [')[1];
  dealids = dealids.split(']')[0];
  dealids = dealids.replace(/"/g, '');
  dealids = dealids.replace(/ /g, '');
  dealids = dealids.replace(/\n/g, '');
  dealids = dealids.split(',')
}
catch{
  if(!dealids)
    {
    dealids = a.split('"dealId" :"')[1];
    dealids = dealids.split('"')[0];
    dealids = [dealids];
    }
}

//@2nd WidgetContent
try{
  dealids2 = a.split('"sortedDealIDs" : [')[2];
  dealids2 = dealids2.split(']')[0];
  dealids2 = dealids2.replace(/"/g, '');
  dealids2 = dealids2.replace(/ /g, '');
  dealids2 = dealids2.replace(/\n/g, '');
  dealids2 = dealids2.split(',')
  dealids = dealids.concat(dealids2)
}
catch{
  try{
    if(!dealids2)
      {
        dealids2 = a.split('"dealId" :"')[2];
        dealids2 = dealids2.split('"')[0];
        dealids2 = [dealids2];
        dealids = dealids.concat(dealids2)
      }
  }
  catch{

  }
}


//@3rd WidgetContent
try{
  dealids3 = a.split('"sortedDealIDs" : [')[3];
  dealids3 = dealids3.split(']')[0];
  dealids3 = dealids3.replace(/"/g, '');
  dealids3 = dealids3.replace(/ /g, '');
  dealids3 = dealids3.replace(/\n/g, '');
  dealids3 = dealids3.split(',')
  dealids = dealids.concat(dealids3)
}
catch{
  try{
    if(!dealids3)
      {
        dealids3 = a.split('"dealId" :"')[2];
        dealids3 = dealids3.split('"')[0];
        dealids3 = [dealids3];
        dealids = dealids.concat(dealids3)
      }
  }
  catch{
    
  }
}

mid = a.split("ue_mid = '")[1];
if(!mid){mid = a.split("ue_mid='")[1];}
mid = mid.split("'")[0];

cid = a.split('"customerID":"')[1];
cid = cid.split('"')[0];

/*
csrfToken = a.split('"csrfToken" : "')[1];
if(!csrfToken){csrfToken = a.split('"csrfToken":"')[1];}
csrfToken = csrfToken.split('"')[0];
*/

dids = []

dealids.forEach(makeDID)

function makeDID(item)
{
  if(dids.length==100){return}
  obj = {};
  obj["dealID"] = item;
  dids.push(obj);
}


var customerData //
setCustomerData() //

csrfToken = customerData.csrfToken

// console.log(session_id);
console.log(dealids);
console.log(cid);
console.log(mid);
console.log(csrfToken);

var DealsArray = new Object();

//SHOW FLASHCART and get deal details only if dealids are fount on the page
if(dealids){


data = {"requestMetadata":{"marketplaceID":mid,"clientID":"goldbox_mobile_pc","customerID":cid},"dealTargets":dids,"responseSize":"STATUS_ONLY","itemResponseSize":"DEFAULT_WITH_PREEMPTIVE_LEAKING"}
data = JSON.stringify(data);

url = 'https://www.amazon.in/xa/dealcontent/v2/GetDeals'
resp = "";

$.ajax({
    url: url,
    dataType: 'json',
    type: 'post',
    async: false,
    contentType: 'application/x-www-form-urlencoded', 
    data: data,
    beforeSend: function (x) {
        if (x && x.overrideMimeType) {
            x.overrideMimeType("application/x-www-form-urlencoded");

        }
    },
    success: function (data, textStatus, jQxhr) {
      resp = data;
      console.log(data.dealDetails);
    },
    error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
    }
});

DealsArray = Object.entries(resp.dealDetails);

}




function addSwitch(DealsArray){
  //ADD FLASHCART SWITCH TO ALL THE DEAL CARDS
  try{
    DealsArray.forEach(([key, value]) => { 
      //console.log("DEAL ID: ",key); 
      //console.log("ASIN: ",value.impressionAsin); 
    
      //FLASHCART TOGGLE SWITCH
      var div = document.createElement('div');
      div.id = 'flashcart';
      div.innerHTML = `
      <p>FlashCart ⚡ <input type='checkbox' class='toggle-switch' dealid="${key}" asin="${value.impressionAsin}"></p>
      <div id='status'><p>Trying to add to cart: <span id="clicks">0</span></p>
      </div>
      `;
    
      if(value.type == 'LIGHTNING_DEAL' && value.itemType != "MULTI_ITEM"){
      //if there is no switch then add one 
      if($(`span[data-gbdeal-addtocart*="${key}"],span[data-gbdeal-watchdeal*="${key}"],span[data-gbdeal-actionrecord*="${key}"]`).parents('.dealContainer').find('#flashcart').length < 1){
        //console.log("Switch not found, adding one")
        $(`span[data-gbdeal-addtocart*="${key}"],span[data-gbdeal-watchdeal*="${key}"],span[data-gbdeal-actionrecord*="${key}"]`).parents('.dealContainer').children().last().after(div)
        //$('#desktop_unifiedPrice').children().last().after(div);

        if(DealsWanted[key]){ //if dealid exists in DealsWanted then switch is checked
          $(`span[data-gbdeal-addtocart*="${key}"],span[data-gbdeal-watchdeal*="${key}"],span[data-gbdeal-actionrecord*="${key}"]`).parents('.dealContainer').find('.toggle-switch').prop('checked', true);
        }
            
        //ADD EVENT LISTENER TO EACH TOGGLE
        $(`span[data-gbdeal-addtocart*="${key}"],span[data-gbdeal-watchdeal*="${key}"],span[data-gbdeal-actionrecord*="${key}"]`).parents('.dealContainer').find('.toggle-switch').change(function () {
        
          dealid = $(this).attr("dealid");
          asin = $(this).attr("asin");
          console.log(dealid, " Switch Toggled")
      
          if ($(this).is(':checked')) {
      
            console.log("Switch Checked");
            DealsWanted[dealid] = asin
            $('#status').css('display', 'block');
            // claim deal for all deal ids
            //console.log("DEAL ID: ", dealid); 
            //console.log("ASIN: ", asin); 
            claim(dealid, asin, csrfToken) //Execute once

            // clearInterval(x[dealid]); //Clear any previous execution

            }   
        
            else {
                console.log(dealid + " Switch Unchecked");
                //$('#status').css('display', 'none');
                //clearInterval(x[dealid]);
                delete DealsWanted[dealid]
                //c = 0;
            }
        });
      }
      }
    });
   }
   catch{
     console.log("Error adding switch")    
   }
}

//main
var c = 0
var DealsWanted = {}
var cartWindow

$(function(){

  addSwitch(DealsArray) //addSwitch once

  addSwitchInterval = setInterval(() => { //addSwitch if widget refreshed
    addSwitch(DealsArray)
  }, 10);

  //Claim all DealsWanted infinitely 
claimInterval = setInterval(function () { //Execute infinite with delay

  DealsWantedArray = Object.entries(DealsWanted) //Object to Array
  DealsWantedArray.forEach(([key, value]) => { //claim deal for all DealsWanted (checked)
    console.log("Trying to claim deal ", key, " ", value )
    claim(key, value, csrfToken) //Execute once
  });
  

  }, 20);

});