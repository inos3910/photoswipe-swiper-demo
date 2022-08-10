import Swiper, {Navigation, Pagination} from 'swiper';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

class Gallery {
  constructor() {
    this.swiper = this.slide();
    this.imagePopUp(this.swiper);
  }

  // スライド（Swiper）
  slide() {
    const slide = new Swiper('#js-slide', {
      modules                 : [Navigation, Pagination],
      pagination: {
        el       : '.swiper-pagination',
        type     : 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop                    : true,
      preventClicksPropagation: true,
      autoHeight              : true
    });
    return slide;
  }

  // スライド画像のポップアップ（PhotoSwipe）
  imagePopUp(swiper){
    const $target = document.querySelector('[data-pswp]');
    if(!$target){
      return;
    }

    const slides = $target.querySelectorAll('a');

    slides.forEach((el) => {
      const img = el.querySelector('img');
      el.setAttribute('data-pswp-width', img.naturalWidth);
      el.setAttribute('data-pswp-height', img.naturalHeight);
    });

    const lightbox = new PhotoSwipeLightbox({
      gallery              : $target,
      children             : 'a',
      showHideAnimationType: 'zoom',
      pswpModule           : PhotoSwipe
    });

    if(!swiper){
      lightbox.init();
      return;
    }

    // 監視ターゲットの取得
    let target = null;
    const reg = /\d+/;

    // オブザーバーの作成
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const matchCount = mutation.target.innerText.match(reg);
        const index = parseInt(matchCount) - 1;
        if(swiper.activeIndex !== index){
          swiper.slideTo(index);
        }
      });
    });

    lightbox.on('openingAnimationEnd', () => {
      target = document.querySelector('.pswp__counter');
        // 監視の開始
        observer.observe(target, {
          childList: true
        });
      });

    lightbox.on('closingAnimationEnd', () => {
      observer.disconnect();
    });

    lightbox.init();
  }
}

new Gallery();