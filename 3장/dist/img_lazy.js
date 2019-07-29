document.addEventListener("DOMContentLoaded", function() { 
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));   
    let active = false;   
    const lazyLoad = function() {   
      if (active === false) {
        active = true; 
        setTimeout(()=> { 
          lazyImages = lazyImages.map((lazyImage) => {  
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && window.getComputedStyle(lazyImage).display !== "none") { 
              lazyImage.src = lazyImage.dataset.src;   
              lazyImage.classList.remove("lazy");    
              return null;
            }else return lazyImage;
          }).filter(image => image);
          if (!lazyImages.length) {
            document.removeEventListener("scroll", lazyLoad);
            window.removeEventListener("resize", lazyLoad);
            window.removeEventListener("orientationchange", lazyLoad);
          }else active = false;
        }, 200);
      }
    }; 
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  });