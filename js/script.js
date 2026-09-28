const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    const expanded = nav.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", expanded);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================
   NEWS CAROUSEL
   ========================= */

const newsTrack = document.querySelector(".news-track");
const newsSlides = document.querySelectorAll(".news-slide");
const newsPrev = document.querySelector(".news-prev");
const newsNext = document.querySelector(".news-next");
const newsDots = document.querySelector(".news-dots");

let currentNews = 0;
let newsTimer;


/* CREATE DOTS */

newsSlides.forEach((slide, index) => {

  const dot = document.createElement("button");

  dot.classList.add("news-dot");

  dot.type = "button";

  dot.setAttribute(
    "aria-label",
    `Go to news item ${index + 1}`
  );

  dot.addEventListener("click", () => {

    showNews(index);
    restartNewsTimer();

  });

  newsDots.appendChild(dot);

});


const newsDotButtons =
  document.querySelectorAll(".news-dot");


/* SHOW NEWS */

function showNews(index){

  if(index >= newsSlides.length){
    currentNews = 0;
  }
  else if(index < 0){
    currentNews = newsSlides.length - 1;
  }
  else{
    currentNews = index;
  }

  newsTrack.style.transform =
    `translateX(-${currentNews * 100}%)`;


  newsDotButtons.forEach((dot, i) => {

    dot.classList.toggle(
      "active",
      i === currentNews
    );

  });

}


/* NEXT */

function nextNews(){

  showNews(currentNews + 1);

}


/* PREVIOUS */

function previousNews(){

  showNews(currentNews - 1);

}


/* BUTTONS */

if(newsNext){

  newsNext.addEventListener(
    "click",
    () => {

      nextNews();
      restartNewsTimer();

    }
  );

}


if(newsPrev){

  newsPrev.addEventListener(
    "click",
    () => {

      previousNews();
      restartNewsTimer();

    }
  );

}


/* AUTOMATIC SLIDE */

function startNewsTimer(){

  newsTimer = setInterval(
    nextNews,
    5000
  );

}


function restartNewsTimer(){

  clearInterval(newsTimer);

  startNewsTimer();

}


/* INITIALISE */

if(newsSlides.length > 0){

  showNews(0);

  startNewsTimer();

}
