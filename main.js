function addDinamique(){
btns.forEach(btn =>{
    btn.addEventListener("click",() =>{
        for(let i = 0; i < btns.length; i++){
            if(btns[i].getAttribute("data-item") === btn.getAttribute("data-item")){
            btns[i].classList.remove("active");
            }
        }
        btn.classList.add("active");

        for(let p = 0; p < pages.length; p++){
            let page = pages[p];
            if(page.getAttribute("data-active") === btn.getAttribute("data-active") && page.getAttribute("data-item") === btn.getAttribute("data-item")){
                page.classList.add("active");
            }else if(page.getAttribute("data-item") === btn.getAttribute("data-item")){
                page.classList.remove("active");
            }
        }

    })
})

const btnSlider = document.querySelectorAll("button.slider");
const item = document.querySelector("items");

btnSlider.forEach(btn =>{
    btn.addEventListener("click",() =>{
        if(btn.classList.contains("plus")){
            sectionMeteo.scrollLeft += 400;
        }else{
            sectionMeteo.scrollLeft -= 400;
        }
    })
})

}
