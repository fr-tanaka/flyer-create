const wrapper = document.querySelector('.wrapper');

/* =================================================== */
// 全ての画像を読み込んでからサイトを表示
/* =================================================== */

let imagesLoadListener = (() => {
 
  let imageCollector = (expectedCount, completeFn) => {
      let receivedCount = 0;
      return () => {
          receivedCount++;
          if(receivedCount === expectedCount) {
              completeFn();
          }
      };
  };

  let imagesLoadListener = (element, callback) => {
      let images = element.querySelectorAll('img');
      if(images === null) {
          callback();
          return;
      }

      //画像の数だけloadListenerが呼ばれたらcallbackが呼ばれる;
      let loadListener = imageCollector(images.length, callback);
      Array.prototype.forEach.call(images, (img) => {
          if(img.complete) {
              loadListener();
          }else {
              img.onload = loadListener;
          }
      });
  };

  return imagesLoadListener;
})();

imagesLoadListener(document.body, () => {
  wrapper.classList.add('is-load');
});


/* =================================================== */
// お問い合わせはこちらボタンの表示制御
/* =================================================== */

const fixedFade = () => {
    
    let fixedFadeIn = (document.querySelector('.l-main').offsetTop);
    let fixedFadeOut = (document.querySelector('.p-contact').offsetTop - window.innerHeight);
  
    if( (fixedFadeIn < window.scrollY ) && (fixedFadeOut > window.scrollY) ) {
        wrapper.classList.add('is-aside__active');
    } else {
        wrapper.classList.remove('is-aside__active');
    }

}

window.addEventListener('DOMContentLoaded', () => {
    
    fixedFade();
});
  
  window.addEventListener('scroll', () => {
    
    fixedFade();
});
  
  window.addEventListener('resize', () => {
  
    fixedFade();
});

/* =================================================== */
// スムーススクロール
/* =================================================== */

// polyfill
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

const smoothScrollTrigger = document.querySelectorAll('[data-scroll]');
for (let i = 0; i < smoothScrollTrigger.length; i++){
  smoothScrollTrigger[i].addEventListener('click', (e) => {
    e.preventDefault();
    let href = smoothScrollTrigger[i].getAttribute('data-scroll');
    let targetElement = document.getElementById(href);
    const rect = targetElement.getBoundingClientRect().top;
    const offset = window.pageYOffset;
    const gap = document.querySelector('.l-header').offsetHeight;
    const target = rect + offset - gap;
    window.scrollTo({
      top: target,
      behavior: 'smooth',
    });

    if( wrapper.classList.contains('is-menu') ) {
      wrapper.classList.remove('is-menu');
      wrapper.classList.add('is-menu-close');
    }
  });
}

/* =================================================== */
// プライバシーポリシーに同意して送信にチェックを入れると送信ボタンがアクティブ化する
/* =================================================== */

const agree = document.querySelector('[data-agree]');

const agreeCheck = () => {
  if(agree.checked == true){
    document.querySelector('.c-form__btn__item').classList.add('is-agree');
  } else {
    document.querySelector('.c-form__btn__item').classList.remove('is-agree');
  }
}


window.addEventListener('DOMContentLoaded', () => {
  agreeCheck();
});

agree.addEventListener("click", () => {
  agreeCheck();
});

/* =================================================== */
// ハンバーガーメニューの開閉制御
/* =================================================== */

const menu = document.querySelector('[data-menu]');
const menuClose = document.querySelector('[data-menu-close]');

menu.addEventListener("click", () => {
    wrapper.classList.add('is-menu');
});

menuClose.addEventListener("click", () => {
    wrapper.classList.remove('is-menu');
    wrapper.classList.add('is-menu-close');
});

document.querySelector('.l-header__nav').addEventListener('animationend', () => {
  wrapper.classList.remove('is-menu-close');
});

/* =================================================== */
// モーダルの表示制御
/* =================================================== */

const dataModal = document.querySelectorAll('[data-modal]');
const dataModalTargetAll = document.querySelectorAll('[data-modal-target]');
const closeBtn = document.querySelector('[data-modal-close]');
const modalWrap = document.querySelector('.p-modal');
const modalBg = document.querySelector('.p-modal__bg');

for (let i = 0; i < dataModal.length; i++){
  dataModal[i].addEventListener("click", (e) => {

    for (let i = 0; i < dataModalTargetAll.length; i++){
      dataModalTargetAll[i].classList.remove('is-active');
    }

    let dataModalTarget = e.currentTarget.dataset.modal;
    let target = document.querySelector('[data-modal-target="'+ dataModalTarget +'"]');

    modalWrap.classList.add('is-open');
    target.classList.add('is-active');

  });
}

const modalClose = ()=> {
  modalWrap.classList.remove('is-open');
};

if(modalBg){
  modalBg.addEventListener("click", modalClose);
}
if(closeBtn){
  closeBtn.addEventListener("click", modalClose);
}
