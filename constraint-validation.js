//Constrained Validation HW
// doc: https://www.w3schools.com/js/js_validation.asp
const form = document.forms['connect-form']


let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/


let errors = 0

//Doge
const validateDogeCoinDonation = ()=>{
    // User can donate 0 or keep empty
    if(form['coin'].value == "" || form['coin'].value == 0 || form['coin'].value == "0"){
        form['coin'].setAttribute('value', '0')
        console.log('User did not donate any DogeCoin')
        form['coin'].validity.valid = true
        form['coin'].closest('.form-group').classList.add('valid')
        form['coin'].closest('.form-group').classList.remove('invalid')
        form['coin'].setCustomValidity('Did you forget to donate?')
    }
    // if user wants to danote it's a 20 dogecoin min
    if(form['coin'].value > 0 && form['coin'].value <20){
        form['coin'].validity.valid = false
        // There is no need for a .setCustomValidity() since the html has a constraint
        // form['coin'].setCustomValidity('20 DogeCoin minimum')
        form['coin'].closest('.form-group').classList.remove('valid')
        form['coin'].closest('.form-group').classList.add('invalid')
        console.log(`User is trying to donate ${form['coin'].value} DogeCoin`)
        errors+=1
    }
    // if user donates 20 or more coins
    if(form['coin'].value >=20){
        form['coin'].validity.valid = true
        form['coin'].setCustomValidity('')
        form['coin'].closest('.form-group').classList.add('valid')
        form['coin'].closest('.form-group').classList.remove('invalid')
    }
}

// validates checkbox
const validateCheckBox = ()=>{
    // I've retained both as true since the user has the option to check or retain unchecked 
    if(!form['yes-newsletter'].checked){
        console.log('User does not want a news letter')
        form['yes-newsletter'].validity.valid = true
    }
    else{
        form['yes-newsletter'].validity.valid = true
        console.log('User Joined News letter')
    }
}

//This function is exclusivly "what can i help you with"
const validateHelpQuestion = ()=>{
    // user did not select an interest
    if(form['kind'].value === 'choose'){
        errors+=1
        form['kind'].validity.valid = false
        form['kind'].setCustomValidity('Choose an Option')
        console.log('User did not Choose an option')
        form['kind'].closest('.form-group').classList.remove('valid')
        form['kind'].closest('.form-group').classList.add('invalid')
        errors+=1
    }
    // user selected an interest
    else{
        console.log(`User has interest in: ${form['kind'].value}`)
        form['kind'].validity.valid =true
        form['kind'].setCustomValidity('')
        form['kind'].closest('.form-group').classList.remove('invalid')
        form['kind'].closest('.form-group').classList.add('valid')
    }
}

// This function exclusivly validates the email
const validateEmail=()=>{
    // Email doesnot match email
    if(!form['email'].value.match(emailRegex)){
        errors+=1
        // Email field is empty
        if(form['email'].value == ''){
            form['email'].validity.valid = false
            form['email'].closest('.form-group').classList.remove('valid')
            form['email'].closest('.form-group').classList.add('invalid')
            console.log("No Email Entered")
        }
        // Email field value does not match the regex
        else{
            form['email'].setCustomValidity('Invalid Email')
            form['email'].validity.valid = false
            form['email'].closest('.form-group').classList.remove('valid')
            form['email'].closest('.form-group').classList.add('invalid')
            console.log('Invalid Email')
        }
    }
    // Email matches the Regex pattern
    else{
        form['email'].validity.valid = true
        form['email'].setCustomValidity('')
        console.log("Valid Email")
        form['email'].closest('.form-group').classList.remove('invalid')
        form['email'].closest('.form-group').classList.add('valid')
    }
}

//this function exclusivly validates the 'last-name' field
const validateLastName = ()=>{
    // Name must be more than 3 char with empty strign edge case
    if(form['last-name'].value.length<3 || form['last-name'].value == ""){
        errors+=1
        form['last-name'].setCustomValidity('Last name must be at least 3 characters');
        console.log('Invalid Last Name');
        form['last-name'].closest('.form-group').classList.remove('valid')
        form['last-name'].closest('.form-group').classList.add('invalid')
        form['last-name'].validity.valid = false
        form['last-name'].reportValidity()
    }
    // Name field meets 3 char min
    else{
        form['last-name'].validity.valid=true
        form['last-name'].setCustomValidity('')
        console.log('Valid Last Name')
        form['last-name'].closest('.form-group').classList.remove('invalid')
        form['last-name'].closest('.form-group').classList.add('valid')
    }
}

//This function exclusivly validates the 'first-name' input in the form
const validateFirstName = ()=>{
        // Name must be more than 3 char with empty strign edge case
    if(form['first-name'].value.length <3 || form['first-name'].value == ""){
        errors+=1
        form['first-name'].setCustomValidity('First name must be at least 3 characters');
        console.log('Invalid First Name');
        form['first-name'].closest('.form-group').classList.remove('valid')
        form['first-name'].closest('.form-group').classList.add('invalid')
        form['first-name'].validity.valid = false
    }
    // Name field meets 3 char min
    else{
        form['first-name'].validity.valid = true
        form['first-name'].closest('.form-group').classList.remove('invalid')
        form['first-name'].closest('.form-group').classList.add('valid')

        console.log('Valid First Name')
        // if the validity is true set it to an empty string to remove false validity / previous validity
        form['first-name'].setCustomValidity('')
    }
}

// This function allows Front-End validation before sending to the server 
function validateFields(e){
    // Validation functions
    validateFirstName();
    validateLastName();
    validateEmail();
    validateHelpQuestion();
    validateCheckBox();
    validateDogeCoinDonation();
    // There must be no errors to submit the form
    if(errors === 0){
        // created an alert so I can pause the execusion and view the messeges in the console before it submitting
        alert("All validations passed...form will submit")
        form.submit()
    }else{
        // Stop submission to fix errors aka default action
        e.preventDefault()
        console.log(`There's ${errors} errors`)
        // reset the error count
        errors = 0
        // cycles back
        form['submit-btn'].addEventListener('click', (e)=>{validateFields(e)})
    }
}
// Submit Event listener
form.addEventListener('submit', (e)=>{validateFields(e)})
