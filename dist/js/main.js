$( document ).ready(function() {
  // popup
  $(document).on("click", ".mfp-link", function () {
    var a = $(this);

    $.magnificPopup.open({
      items: { src: a.attr("data-href") },
      type: "ajax",
      overflowY: "scroll",
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in',
      ajax: {
        tError: "Error. Not valid url",
      },
      callbacks: {
        open: function () {
          setTimeout(function(){
            $('.mfp-wrap').addClass('not_delay');
            $('.mfp-popup').addClass('not_delay');
          },700);
        }
      },

      callbacks: {
        open: function() {
          document.documentElement.style.overflow = 'hidden'
        },

        close: function() {
          document.documentElement.style.overflow = ''
        }
      }
    });
    return false;
  });



  // validate
  $.validator.messages.required = 'Пожалуйста, введите данные';

  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^([а-яё ]+|[a-z ]+)$/i.test(value);
  }, "Поле может состоять из букв и пробелов, без цифр");

  jQuery.validator.addMethod("phone", function (value, element) {
    if (value.startsWith('+375')) {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/i.test(value);
    } else if (value.startsWith('+7')) {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/i.test(value);
    } else {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(value);
    }
  }, "Введите полный номер");



  // imask
  let phone = document.querySelectorAll('.phone-mask')

  if(phone.length) {
    phone.forEach(element => {
      IMask(element, {
        mask: [
          {
            mask: '+{375} (00) 000 00 00',
            startsWith: '375',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+{7} (000) 000 00 00',
            startsWith: '7',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+0000000000000',
            startsWith: '',
            country: 'unknown'
          }
        ],

        dispatch: function (appended, dynamicMasked) {
          var number = (dynamicMasked.value + appended).replace(/\D/g, '');

          return dynamicMasked.compiledMasks.find(function (m) {
            return number.indexOf(m.startsWith) === 0;
          });
        }
      })
    });
  }

  // свойство left для блока в карте
  const mapBlock = document.querySelector('.map-info')

  if(mapBlock) {
    function setLeftPoint() {
      if(window.innerWidth > 1024) {
        const footer = document.querySelector('.footer-content')
        const leftPoint = footer.getBoundingClientRect().left

        mapBlock.style.left = leftPoint + 'px'
      } else {
        mapBlock.style.left = ''
      }
    }
    setLeftPoint()

    window.addEventListener('resize', () => {
      setLeftPoint()
    })
  }

  // splide
  const splideSpecialists = document.querySelector('.splide-specialists')
  const splideMain = document.querySelector('.splide-main')
  const splideAbout = document.querySelector('.splide-about')

  if(splideSpecialists) {
    new Splide( splideSpecialists, {
      destroy: true,
      perPage: 2,
      gap: 20,
      arrows: false,

      breakpoints: {
        768: {
          destroy: false
        },

        576: {
          perPage: 1,
        }
      }
    }).mount();
  }

  if(splideMain) {
    const allSliders = splideMain.querySelectorAll('.splide__slide').length

    if(allSliders > 1) {
      new Splide( splideMain, {
        type: 'loop',
        autoplay: true,
        perPage: 1,
        pagination: false,
        arrows: false,
      }).mount()
    } else {
      new Splide( splideMain, {
        pagination: false,
        arrows: false,
        drag: false
      }).mount()
    }
  }

  if(splideAbout) {
    new Splide( '.splide', {
      pagination: false,
      arrows: false,
      autoWidth: true,
      gap: 10,
      drag: true,
      type: 'loop',

      breakpoints: {
        1024: {
          height: 350
        },
        768: {
          height: 300
        },
        576: {
          height: 220,
        },
      }
    }).mount();
  }

  // burger
  const burgerBtn = document.querySelector('.header-burger')

  if(burgerBtn) {
    const burger = document.querySelector('.header-mob')
    const html = document.documentElement

    burgerBtn.addEventListener('click', () => {
      burger.classList.toggle('active')
      html.classList.toggle('active')
      burgerBtn.classList.toggle('active')
    })
  }

  // hint
  // const aboutBlock = document.querySelector('.about-slider')

  // if(aboutBlock) {
  //   const dragHint = document.querySelector('.drag-hint')
  //   aboutBlock.addEventListener('mousemove', (event) => {
  //     const x = event.clientX;
  //     const y = event.clientY;

  //     console.log(x)
  //     console.log(y)

  //     //  dragHint.style.left = `${x}px`;
  //     // dragHint.style.top = `${y}px`;
  //     dragHint.style.transform = `translate(${x}px, ${y}px)`;
  //     dragHint.classList.add('active')
  //   });
  //   aboutBlock.addEventListener('mouseout', (event) => {
  //     dragHint.classList.remove('active')
  //   });
  // }
});