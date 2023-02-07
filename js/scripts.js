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

const inputArea = document.querySelectorAll('.input_area')
const spans = document.querySelectorAll('span.span-required')
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

const form_1_next_btn = document.querySelector(".form_1_btns .btn_next1");
const form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
const form_2_next_btn = document.querySelector(".form_2_btns .btn_next2");
const form_3_back_btn = document.querySelector(".form_3_btns .btn_back");
const form_3_next_btn = document.querySelector(".form_3_btns .btn_next3");
const form_4_back_btn = document.querySelector(".form_4_btns .btn_back");

const addressForm = document.querySelector('#address-form')
const cepInput = document.querySelector('#cep')
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

console.log(spans)

//Functions

//Functions that returns API's data

//get costumers from api

const getAddress = async (cep) => {

    const apiURL = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(apiURL)
    const data = await response.json()
    console.log(data)

    if(data.erro === true){
        if(!addressInput.hasAttribute('disabled')){
            toggleDisabled()
        }
        addressForm.reset()
        setError(6)
        return
    }

    if(addressInput.value === ''){
        toggleDisabled()
    }

    addressInput.value = data.logradouro
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;
}

const toggleDisabled = () => {
    if(regionInput.hasAttribute('disabled')){
        formInputs.forEach((input) => {
            input.removeAttribute('disabled')
        })
    }else{
        formInputs.forEach((input) => {
            input.setAttribute('disabled', 'disabled')
        })
    }
}

//Functions that validates inputs

//functions that remove errors
function removeError(index) {
    inputArea[index].style.border = ''
    spans[index].style.display = 'none'

    inputArea[index].classList = 'inputValidated' 
}

function removeError_form4(index,spanIndex) {
    inputArea[index].style.border = ''
    spans[spanIndex].style.display = 'none'

    inputArea[index].classList = 'inputValidated' 
}

//function that set errors
function setError(index) {
    inputArea[index].style.border = '2px solid #e63636'
    spans[index].style.display = 'block'

    inputArea[index].classList.remove('inputValidated')
}

function setError_form4(index,spanIndex) {
    inputArea[index].style.border = '2px solid #e63636'
    spans[spanIndex].style.display = 'block'

    inputArea[index].classList.remove('inputValidated')
}

//function remove inputValidated
function inputValidatedRemove(index) {
    inputArea[index].classList.remove('inputValidated')
}

//function that validates email
function emailValidate() {
    if(emailRegex.test(inputArea[0].value)){
        removeError(0)
    }else{
        setError(0)
    }
}

//function that validates main password
function mainPasswordValidate() {
    if(inputArea[1].value.length < 8){
        setError(1)
    }else{
        removeError(1)
        comparePassword()
    }
}

//function that compares both passwords
function comparePassword() {
    if(inputArea[1].value == inputArea[2].value && inputArea[2].value.length >= 8){
        removeError(2)
    }else{
        setError(2)
    }
}

//function that validates name
function nameValidate() {
    if(inputArea[3].value.length < 3){
        setError(3)
    }else{
        removeError(3)
    }
}

//function that validates lastname

function lastNameValidate() {
    if(inputArea[4].value.length < 3){
        setError(4)
    }else{
        removeError(4)
    }
}

//function that validates CPF
function cpfValidate() {
    if(inputArea[5].value.length < 14){
        setError(5)
    }else{
        removeError(5)
    }
}

//function that validates CEP

function cepValidate() {
    if(inputArea[6].value.length < 8){
        setError(6)
    }else{
        removeError(6)
    }
}

function numberValidate() {
    if(inputArea[7].value.length < 0){
        setError(7)
    }else{
        removeError(7)
    }
}

function totalExperienceValidate() {
    if(inputArea[9].value < 1){
        setError_form4(9,8)
    }else{
        removeError_form4(9,8)
    }
}


//Functions of steps

//function that updates the current step and updates the DOM
let currentStep = 1;
const updateSteps = (e) => {

if(e.target.classList == 'btn_next1' || 'btn_next2' || 'btn_next3'){
    if(inputArea[0].classList.contains('inputValidated') && inputArea[1].classList.contains('inputValidated') && inputArea[2].classList.contains('inputValidated')){
    currentStep++   

    }else if(inputArea[3].classList.contains('inputValidated') && inputArea[4].classList.contains('inputValidated') && inputArea[5].classList.contains('inputValidated')){
        currentStep++

    }else if(inputArea[6].classList.contains('inputValidated') && inputArea[7].classList.contains('inputValidated')){
        currentStep++

    }else if(e.target.classList == 'btn_back'){
        console.log('testado')
    currentStep--
    }
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
    if(inputArea[0].classList.contains('inputValidated') && inputArea[1].classList.contains('inputValidated') && inputArea[2].classList.contains('inputValidated')){
        form_1.style.display = 'none'
        form_2.style.display = 'block'
    
        form_1_btns.style.display = 'none'
        form_2_btns.style.display = 'flex'

    inputValidatedRemove(0)
    inputValidatedRemove(1)
    inputValidatedRemove(2)

    }else{
        emailValidate()
        mainPasswordValidate()
        comparePassword()
        return
    }
    })

    //add click event to form_2_back
form_2_back_btn.addEventListener('click', () => {

    form_1.style.display = 'block'
    form_2.style.display = 'none'

    form_1_btns.style.display = 'flex'
    form_2_btns.style.display = 'none'

        emailValidate()
        mainPasswordValidate()
        comparePassword()
    })


    //add click event to form_2_next
form_2_next_btn.addEventListener('click', () => {   
    if(inputArea[3].classList.contains('inputValidated') && inputArea[4].classList.contains('inputValidated') && inputArea[5].classList.contains('inputValidated')){

        form_2.style.display = 'none'
        form_3.style.display = 'block'

        form_2_btns.style.display = 'none'
        form_3_btns.style.display = 'flex' 

        inputValidatedRemove(3)
        inputValidatedRemove(4)
        inputValidatedRemove(5)
    }else{
        nameValidate()
        lastNameValidate()
        cpfValidate()
        return
    }
    })

    //add click event to form_3_back
form_3_back_btn.addEventListener('click', () => {
        
    form_2.style.display = 'block'
    form_3.style.display = 'none'

    form_2_btns.style.display = 'flex'
    form_3_btns.style.display = 'none'

        nameValidate()
        lastNameValidate()
        cpfValidate()
    })

    //add click event to form_3_next
form_3_next_btn.addEventListener('click', () => {

    if(inputArea[6].classList.contains('inputValidated') && inputArea[7].classList.contains('inputValidated')){
        
        form_3.style.display = 'none'
        form_4.style.display = 'block'

        form_3_btns.style.display = 'none'
        form_4_btns.style.display = 'flex'

        inputValidatedRemove(6)
        inputValidatedRemove(7)
    
    }else{
        cepValidate()
        numberValidate()
        return
    }
})
        
    

    //add click event to form_4_back
form_4_back_btn.addEventListener('click', () => {
        
    form_3.style.display = 'block'
    form_4.style.display = 'none'

    form_3_btns.style.display = 'flex'
    form_4_btns.style.display = 'none'

        cepValidate()
        numberValidate()
    })

    //add click event to done button
    btn_done.addEventListener('click', () => {
        if (inputArea[9].classList.contains('inputValidated')) {
            modal_wrapper.classList.add('active')
        }else{
            totalExperienceValidate()
            return
        }
    })

    //add mask of CPF

    inputArea[5].addEventListener('keypress',() => {
        let inputlength = inputArea[5].value.length
        
        if(inputlength === 3 || inputlength === 7){
            inputArea[5].value += '.'
        }

        if(inputlength === 11){
            inputArea[5].value += '-'
        }
    })

    //accept only numbers on CPF input
    inputArea[5].addEventListener('keypress', (e) => {
        const onlyNumbers = /[0-9]/
        const key = String.fromCharCode(e.keyCode)

        if (!onlyNumbers.test(key)) {
            e.preventDefault()
            return
        }
    })

    //accept only numbers on CEP input
    cepInput.addEventListener('keypress', (e) => {
        const onlyNumbers = /[0-9]/
        const key = String.fromCharCode(e.keyCode)

        if (!onlyNumbers.test(key)) {
            e.preventDefault()
            return
        }
    })

    //accept only numbers on total experience input

    inputArea[9].addEventListener('keypress', (e) => {
        const onlyNumbers = /[0-9]/
        const key = String.fromCharCode(e.keyCode)

        if(!onlyNumbers.test(key)){
            e.preventDefault()
            return
        }
    })  

    //get address event 

    cepInput.addEventListener('keyup', (e) => {
        const inputValue = e.target.value

        if(inputValue.length ===8) getAddress(inputValue)
    })
    
