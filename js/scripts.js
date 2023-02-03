//Progress bar

const circles = document.querySelectorAll(".circle");
(progressBar = document.querySelector(".indicator")),
  (buttons = document.querySelectorAll("button"));
  
const form_1 = document.querySelector(".form_1");
const form_2 = document.querySelector(".form_2");
const form_3 = document.querySelector(".form_3");
const form_4 = document.querySelector(".form_4");


const form_1_btns = document.querySelector(".form_1_btns");
const form_2_btns = document.querySelector(".form_2_btns");
const form_3_btns = document.querySelector(".form_3_btns");
const form_4_btns = document.querySelector(".form_4_btns");

const btn_done = document.querySelector(".btn_done");
const modal_wrapper = document.querySelector(".modal_wrapper");
const shadow = document.querySelector(".shadow");


const form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
const form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
const form_2_next_btn = document.querySelector(".form_2_btns .btn_next");
const form_3_back_btn = document.querySelector(".form_3_btns .btn_back");
const form_3_next_btn = document.querySelector(".form_3_btns .btn_next");
const form_4_back_btn = document.querySelector(".form_4_btns .btn_back");

//Functions

//function that updates the current step and updates the DOM

let currentStep = 1;
const updateSteps = (e) => {

if(e.target.classList == 'btn_next'){
    currentStep++
}else if(e.target.classList == 'btn_back'){
    currentStep--
}

  //loop through all circles and add/remove 'active' class

  circles.forEach((circle, index) => {
    circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
  });

  //update progress bar width based on current step

  progressBar.style.width = `${
    ((currentStep - 1) / (circles.length - 1)) * 100}%`;

};


//Events

//add click event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", updateSteps);
});

//add click event to form_1_next
form_1_next_btn.addEventListener('click', () => {
        
    form_1.style.display = 'none'
    form_2.style.display = 'block'

    form_1_btns.style.display = 'none'
    form_2_btns.style.display = 'flex'
    })

    //add click event to form_2_back
form_2_back_btn.addEventListener('click', () => {
        
    form_1.style.display = 'block'
    form_2.style.display = 'none'

    form_1_btns.style.display = 'flex'
    form_2_btns.style.display = 'none'
    })

    //add click event to form_2_next
form_2_next_btn.addEventListener('click', () => {
        
    form_2.style.display = 'none'
    form_3.style.display = 'block'

    form_2_btns.style.display = 'none'
    form_3_btns.style.display = 'flex'
    })

    //add click event to form_3_back
form_3_back_btn.addEventListener('click', () => {
        
    form_2.style.display = 'block'
    form_3.style.display = 'none'

    form_2_btns.style.display = 'flex'
    form_3_btns.style.display = 'none'
    })

    //add click event to form_3_next
form_3_next_btn.addEventListener('click', () => {
        
    form_3.style.display = 'none'
    form_4.style.display = 'block'

    form_3_btns.style.display = 'none'
    form_4_btns.style.display = 'flex'
    })

    //add click event to form_4_back
form_4_back_btn.addEventListener('click', () => {
        
    form_3.style.display = 'block'
    form_4.style.display = 'none'

    form_3_btns.style.display = 'flex'
    form_4_btns.style.display = 'none'
    })

    btn_done.addEventListener('click', () => {
        modal_wrapper.classList.add('active')
    })

    shadow.addEventListener('click', () => {
        modal_wrapper.classList.remove('active')
    })
    
