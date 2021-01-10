window.onload = () =>{
    let scrollpos = window.scrollY; 
    const about = document.querySelector("#about > div")
    const tech = document.querySelector("#Tech > div")
    const awards = document.querySelector("#awards > div") 
    const add_class_on_scroll = (dom) => dom.classList.add("come-in")  
    window.addEventListener('scroll', function() { 
      scrollpos = window.scrollY;
      if (scrollpos >= about.offsetHeight) add_class_on_scroll(about)
      if (scrollpos >= tech.offsetHeight) add_class_on_scroll(tech)
      if (scrollpos >= awards.offsetHeight) add_class_on_scroll(awards) 
    }) 
} 