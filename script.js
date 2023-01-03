(function () {
  "use strict";

  console.log("Skripta pokrenuta...");
  const min_likes = 1; // minimal number of likes a post needs to have in order to be liked // 0 to disable the limit
  const max_likes = 200; /// maximal number of likes a post can have in order to be liked // 0 to disable the limit
  const destinations = [
    "zlatibor",
    "turizam",
    "gradovievrope",
    "marketinguturizmu",
    "digitalnimarketinguturizmu",
    "kopaonik",
    "visitserbia",
    "turistickaagencija",
    "turizamsrbija",
    "jahorina",
    "skijanje",
    "exploreserbia"
  ];

  // Define function which accepts array
  function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  const randomDestination = get_random(destinations);
  // Define time interval 10 sec ... 30 sec [reload every ~20 seconds +/- 10 seconds]
  function getTime() {
    return 10000 + Math.round(Math.random() * 20000);
  }
  console.log("Izabrao hashtag...", randomDestination);
  $(window).on("load", function () {
    console.log("Window loaded");
    setTimeout(function () {
      const divs = document.querySelectorAll(
        "._ac7v._aang > ._aabd._aa8k._aanf > a"
      );
      console.log("Proslo je  10 sekundi");
      get_random(divs).click();
      setTimeout(function () {
        let likes = document.getElementsByClassName(
          "_aacl _aaco _aacw _aacx _aada _aade"
        );
        let numberOfLikes = likes[0].textContent.replace(/\D/g, "");
        let heart = document.querySelector(
          "span._aamw > button > ._abm0 > span > svg"
        );
        let isRed = heart.attributes.color.value;
        let longNumberOfLikes = document
          .querySelectorAll("._aacl > .x1i10hfl > ._aacl > span")[0]
          .textContent.replace(/\D/g, "");
        if (
          (+numberOfLikes > min_likes || +longNumberOfLikes > 0) &&
          isRed === "#fafafa"
        ) {
          console.log("Lajkovao");
          let defD = document.querySelector("span._aamw > button");
          defD.click();
          setTimeout(function () {
            window.location.href = `https://www.instagram.com/explore/tags/${randomDestination}`;
          }, 12000);
        }
      }, 2000);
    }, getTime());
  });
})();
