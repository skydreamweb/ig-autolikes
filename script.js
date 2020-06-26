// ==UserScript==

// Settings
var min_likes = 0; // minimal number of likes a post needs to have in order to be liked // 0 to disable the limit
var max_likes = 200; /// maximal number of likes a post can have in order to be liked // 0 to disable the limit

var alert_after_n_likes = 10;
var wake_up_hour = 8; // 8 AM
var go_to_sleep_hour = 24; // Midnight

// Code
var number_of_likes = 0;
var currentusername = "";

if ( "config" in window._sharedData ) {
  if ( "viewer" in window._sharedData [ "config" ] ) {
      if ( "username" in window._sharedData [ "config" ] [ "viewer" ] ) {
          currentusername = window._sharedData [ "config" ] [ "viewer" ] [ "username" ];
      }
  }
}

if ( false ) {
  // dummy case
} else if ( "sincere_ly_yours" == currentusername ) {
  var keywords = Array (
      "wool", "luxurydesign", "homesweethome", "luxdesign", "scarf", "winter", "pureluxury", "australianmade", "allnatural", "organic", "merinowool", "interiordesign",
      "designinspo", "fashionable", "stylegram", "styleinspiration", "momandbaby", "bed", "bedroomdecor", "luxurylifestyle", "snow", "winterwonderland", "christmastime", "cabin",
      "blanket", "cosy", "myhousebeautiful", "inspiration", "interiorinspo", "scandinavianhomes", "interior2you", "outdoorsports", "happynewyear2018", "newyear", "fashion", "surface",
      "custom", "textildesigner", "designresearch", "artwork", "arte", "artistic", "artforsale", "artgallery", "contemporaryart", "modernart", "newart", "artist",
      "artstagram", "instaart", "instalike", "instastyle", "instaartist", "abstractart", "artcritic"
      );
} else if ( "dnprices" == currentusername ) {
  var keywords = Array (
      "wool", "luxurydesign", "homesweethome", "luxdesign", "scarf", "winter", "pureluxury", "australianmade", "allnatural", "organic", "merinowool", "interiordesign",
      "designinspo", "fashionable", "stylegram", "styleinspiration", "momandbaby", "bed", "bedroomdecor", "luxurylifestyle", "snow", "winterwonderland", "christmastime", "cabin",
      "blanket", "cosy", "myhousebeautiful", "inspiration", "interiorinspo", "scandinavianhomes", "interior2you", "outdoorsports", "happynewyear2018", "newyear", "fashion", "surface",
      "custom", "textildesigner", "designresearch", "artwork", "arte", "artistic", "artforsale", "artgallery", "contemporaryart", "modernart", "newart", "artist",
      "artstagram", "instaart", "instalike", "instastyle", "instaartist", "abstractart", "artcritic"
      );
}

var input = document.createElement("input");
input.type="button";
input.setAttribute("id", "buttongo");
input.setAttribute("style", "position:absolute;top:30px;right:20px;"); // font-size:18px;
input.value="Go";
input.onclick = button_go_click;
document.body.appendChild(input);

function nextkeyword () {
window.location.href = "https://www.instagram.com/explore/tags/"+keywords[Math.floor(Math.random()*keywords.length)]+"/";
}

function nextlocation () {
 window.location.href = "https://www.instagram.com/explore/locations/"+Math.floor(Math.random()*300000000)+"/";
}

function next (delay) {
if (typeof delay === 'undefined') {
  var d = new Date();
  var h = d.getHours();
  //alert (h);
  if ( wake_up_hour > h ) {
    delay = ( wake_up_hour - h ) * 60 * 60 * 1000;
  } else if ( go_to_sleep_hour < h ) {
    delay = ( h - wake_up_hour ) * 60 * 60 * 1000;
  } else {
    delay = 5000+Math.round(Math.random()*20000); // 5 sec ... 25 sec [reload every ~15 seconds +/- 10 seconds]
  }
}
setTimeout(function () {
  if ( true ) {
    nextkeyword ();
  } else {
    nextlocation ();
  }
}, delay);
}

function parse_number_of_likes (rawl) {
// Log in to like this
if ("like this"==rawl.substr(rawl.length-9)){return 10; console.log("!!!likes this!!!"); }
if ("likes this"==rawl.substr(rawl.length-10)){return 1; console.log("!!!likes this!!!"); } 
if ("Be the first to like this."==rawl.substr(rawl.length-26)){return 0; console.log("!!!be the first to like this.!!!"); } 
var rawn = rawl.replace(" views","").replace(" likes","").replace(",","");
var m = rawn.indexOf("k")>-1?1000:1;
rawn = rawn.replace("k","");
var m = rawn.indexOf("m")>-1?1000000:m;
rawn = rawn.replace("m","");
return Math.floor(parseFloat(rawn,10)*m); // parseInt // replace(".","")
}

function likeunliked () {
 setTimeout(function () {
    us = document.getElementsByClassName("coreSpriteHeartOpen"); 
    if (0==us.length){
      us = document.getElementsByClassName("whiteoutSpriteHeartOpen");
    }
    if (0==us.length){
      us = document.getElementsByClassName("wpO6b ");
    }
  if (us.length>0){
    l_n = document.getElementsByClassName("wpO6b ");
    if ( 0 == l_n.length ) {
      l_n = document.getElementsByClassName("_iuf51");
    }
    n_l = 1 == l_n.length ? parse_number_of_likes ( l_n[0].textContent ) : 0;
    //alert (n_l);
    if ( min_likes > 0 && n_l < min_likes || max_likes > 0 && n_l > max_likes ) {
      next (460000+Math.round(Math.random()*920000));
      return;
    }
    //alert(Math.floor(Math.random()*us.length));
      console.log(us[0]);
    us[0].click();
    number_of_likes++;
      console.log(number_of_likes);
 if ( alert_after_n_likes > 0 && number_of_likes > 0 ) {
      if ( 0 == ( number_of_likes % alert_after_n_likes ) ) {
        alert ( "Another " + alert_after_n_likes + " <3s!" );
      }
    }
  } else {
    //alert("Nothing2<3!");
  }
  next ();
}, 1000);
}
function start_the_loop () {
setTimeout(function () {
  // div class of the image to like
  ks = document.getElementsByClassName("_9AhH0");
  if (ks.length>0){
    ks[Math.floor(Math.random()*ks.length)].click();
  }
  likeunliked ();
}, 500);
}
function button_go_click () {
start_the_loop ();
}
button_go_click ();
