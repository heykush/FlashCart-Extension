

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
firebase.analytics();
var db = firebase.database();

var upcomingData = db.ref('upcoming/');

upcomingData.on('value', function(snapshot) {
  loadUpcoming(snapshot.val())
  console.log(snapshot.val())
});

//Loading upcoming tab data
function loadUpcoming(data){
  document.getElementById('upcoming').innerHTML = data
}





$(function(){

  
  //Net Banking select options Listener
  $('#netbank_options').change(function() {
    console.log('Bank Selected: ' + this.value);

    //Storage SYnc
    chrome.storage.sync.set({bank: this.value}, function() {
      console.log('chrome.storage bank value is set');
    });
});



  //COD advance checkbox Listener
  $('#cod_advance').change(function() {
    if ($(this).is(':checked')) {
      console.log("cod advance checked");
      advance = true;
    }
    else {
      console.log("cod advance unchecked");
      advance = false;
    }

    //Storage sync for cod advance
    chrome.storage.sync.set({cod_advance: advance}, function() {
      console.log('chrome.storage cod advance is set');
    });
});




  //Listner for auto checkout option
  $('input[type=radio][name=pmode]').change(function() {
    console.log('Mode Selected: ' + this.value);

    //Display Banks List if netbanking is selected
    if(this.value==="netbank")
    {document.getElementById('netbank_options_div').style.display='block'; $('#netbank_options').val("HDFC");}
    else {document.getElementById('netbank_options_div').style.display='none';}

   //Display COD ADVANCE div if COD is selected
   if(this.value==="cod")
   {document.getElementById('cod_advance_div').style.display='block';}
   else {document.getElementById('cod_advance_div').style.display='none';}

   //Storage sync for pmode
    chrome.storage.sync.set({pmode: this.value}, function() {
      console.log('chrome.storage pmode value is set');
    });
});



  
  //Listner for Quantity option
  $('input[type=radio][name=quantity]').change(function() {
    console.log('Quantity Selected: ' + this.value);
    
    //Storage SYnc
    chrome.storage.sync.set({qty: this.value}, function() {
      console.log('chrome.storage qty value is set');
    });
});




  
  //Listner for Sound option
  $('input[type=radio][name=sound]').change(function() {
    console.log('Sound Selected: ' + this.value);
    
    //Storage SYnc
    chrome.storage.sync.set({sound: this.value}, function() {
      console.log('chrome.storage sound value is set');
    });
});




//GET PAYMENT MODE FROM STORAGE AND SELECT IT IN SETTINGS TAB
chrome.storage.sync.get(['pmode'], function(result) {
  console.log('Mode currently is ' + result.pmode);
  $(`input[type=radio][name=pmode][value=${result.pmode}]`).click();

  if(result.pmode==="netbank")
    {chrome.storage.sync.get(['bank'], function(result) {$('#netbank_options').val(result.bank);});}

});





//GET COD ADVANCE FROM STORAGE AND SELECT IT IN SETTINGS TAB
chrome.storage.sync.get(['cod_advance'], function(result) {
  console.log('COD advance currently is ' + result.cod_advance);

  if(result.cod_advance==true)
    {$('#cod_advance').click();}

});


//GET QUANTITY FROM STORAGE AND SELECT IT IN SETTINGS TAB
chrome.storage.sync.get(['qty'], function(result) {
  console.log('Qty currently is ' + result.qty);
  if (result.qty>0){
    $(`input[type=radio][name=quantity][value=${result.qty}]`).click();
  }
  else{
    console.log("Default Quantity set as 1");
    $(`input[type=radio][name=quantity][value=1]`).click();
  }
});




//GET Sound Option FROM STORAGE AND SELECT IT IN SETTINGS TAB
chrome.storage.sync.get(['sound'], function(result) {
  console.log('Sound is ' + result.sound);
  if(result.sound){
    $(`input[type=radio][name=sound][value=${result.sound}]`).click();
    console.log(`Sound set as ${result.sound}`);
  }
  else{
    $(`input[type=radio][name=sound][value=1]`).click();
    console.log(`Default Sound set as 1`);
  }
});



//Add Event listener to all "tablinks" class elements
    Array.from($(".tablinks")).forEach(function(el){
      
      //OnClickListener
      el.addEventListener("click", function(){
        
        //REMOVE ACTIVE CLASSFROM ALL TABS
        Array.from($(".tablinks")).forEach(function(el){
          el.className = el.className.replace(" active", "");;
        });

        //ADD ACTIVE CLASS TO CLICKED TAB
        el.className += " active";
        console.log(el);

        document.getElementsByClassName(el.id)[0].display = 'block';

      });
    });



    //add product list

});