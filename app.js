$(function() {

    /* Fixed Header */
    let header = $("#header"); //присваем переменной хедер id хедер
    let intro = $("#intro"); //присваем переменной интро id интро
    let introH= intro.innerHeight(); 
    let scrollPos= $(window).scrollTop(); //получаем позицию скролла элемента сверху
    let nav = $("#nav");
    let navToggle = $("#navToggle");
console.log('text')
    checkScroll(scrollPos, introH);

    $(window).on("scroll resize", function() /*делаем проверки на скролл, перезагрузку стр и изменение размера экрана*/
    {
        introH = intro.innerHeight();//присваем переменной хедер функцию показа размера высоты intro
        scrollPos = $(this).scrollTop();

        checkScroll(scrollPos, introH);

        //console.log(scrollPos); //вывод высоты интро
    }); //отслеживание события скролла

    function checkScroll(scrollPos, introH) {
        
        if( scrollPos > introH ) {
            header.addClass("fixed"); //добавляем класс 
        }  
        else {
            header.removeClass("fixed"); //убираем класс
        }
    }
    

    /* Smooth Scroll */
    $("[data-scroll]").on("click", function(event) //отслеживаем события с эдементом дата-скролл при клике на элемент
    {
        event.preventDefault(); //отменяет стандартное поведение ссылки

        let elementId = $(this).data('scroll'); //хранится id элемента которого хотим скроллить
        let elementOffset = $(elementId).offset().top; //ролучаем отступ элемента от верха

        nav.removeClass("show"); // убирает бургер-меню при клике на ссылку в нем

        $("html, body").animate({
            scrollTop: elementOffset - 70 //делаем плавный переход на ссылки навигации
        }, 700);
    });
    




    /* Nav Toggle */
    

    navToggle.on("click", function(event) // отслеживание клика на бургер меню
    {
        event.preventDefault();

        nav.toggleClass("show");

    });



 // Modal ===========================

 const modalCall = $("[data-modal]");
 const modalClose = $("[data-close]");

 modalCall.on("click", function(event){
     event.preventDefault();
     let $this = $(this);
     let modalId =$this.data('modal');

     $(modalId).addClass('show');
     $("body").addClass('no-scroll');

     setTimeout(function(){
         $(modalId).find(".modal__dialog").css({
                         transform: "rotateX(0)"
                     }); 
     }, 200);

     worksSlider.slick('setPosition');
     
 });

 modalClose.on("click", function(event){
     event.preventDefault();
     let $this = $(this);
     let modalParent =$this.parents('.modal');

     modalParent.find(".modal__dialog").css({
         transform: "rotateX(90deg)"
     }); 

     setTimeout(function(){
        
     modalParent.removeClass('show');
     $("body").removeClass('no-scroll'); 
     }, 200);



 });


 $(".modal").on("click", function(event){
     let $this = $(this); 
     $this.find(".modal__dialog").css({
         transform: "rotateX(90deg)"
     }); 

     setTimeout(function(){
        
         $this.removeClass('show');
         $("body").removeClass('no-scroll');
         }, 200);


    
 });

 $(".modal__dialog").on("click", function(event){
     event.stopPropagation();
 });



});


//плавное появление ==================

function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('element-show');
      }
    });
  }
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.portfolio__item');
  for (let elm of elements) {
    observer.observe(elm);
  }

// Theme change ============================

  function applyTheme(theme) {
    document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
}

document.addEventListener("DOMContentLoaded", () => {
   document.querySelector("#theme").addEventListener("change", function() {
        applyTheme(this.value);
   });
});


document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "auto";

    applyTheme(savedTheme);

    for (const optionElement of document.querySelectorAll("#theme option")) {
        optionElement.selected = savedTheme === optionElement.value;
    }

    document.querySelector("#theme").addEventListener("change", function () {
        localStorage.setItem("theme", this.value);
        applyTheme(this.value);
    });
});



//Scroll indicator =======================


// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}