const form = document.forms['contactForm']

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

// this validates ex: www.google.com/test || www.google.com || google.com || https://www.google.com/test || http://www.google.com/test || https://www.google.com || http://www.google.com
const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/


let errors = 0

const messageValidation = ()=>{
    if(form['message'].value === '' || form['message'].value.length<10){
        form['message'].validity.valid = false
        form['message'].setCustomValidity('Please enter a message')
        form['message'].closest('.form-group').classList.remove('valid')
        form['message'].closest('.form-group').classList.add('invalid')
        errors+=1
    }
    else{
        form['message'].validity.valid = true
        form['message'].setCustomValidity('')
        form['message'].closest('.form-group').classList.add('valid')
        form['message'].closest('.form-group').classList.remove('invalid')
    }
}

const titleValidation = ()=>{
    if(form['title'].value === '' || form['title'].value.length<3){
        form['title'].validity.valid = false
        form['title'].setCustomValidity('Please enter a title')
        form['title'].closest('.form-group').classList.remove('valid')
        form['title'].closest('.form-group').classList.add('invalid')
        errors+=1
    }
    else{
        form['title'].validity.valid = true
        form['title'].setCustomValidity('')
        form['title'].closest('.form-group').classList.add('valid')
        form['title'].closest('.form-group').classList.remove('invalid')
    }
}


const flexOptionValidation = ()=>{
    // debugger
    let talkCode = document.getElementById('talkCode')
    let jobField = document.getElementById('jobInfo')
    // EdgeCase coverage if flexOptionShower() doesnt fire if it does, this wont effect it
    if(form['contactReason'].value === 'jobOPP'){
        talkCode.setAttribute('hidden', '')
        jobField.removeAttribute("hidden")
        if(form['job-title'].value == "" || form['job-title'].value.length<3){
            errors+=1
            form['job-title'].setCustomValidity("Write a job title")
            form['job-title'].validity.valid = false
            form['job-title'].closest('.form-group').classList.remove('valid')
            form['job-title'].closest('.form-group').classList.add('invalid')
            console.log('here')
        }
        if(!form['company-site'].value.match(urlRegex) || form['company-site'].value == ""){
            errors+=1
            form['company-site'].validity.valid = false
            form['company-site'].setCustomValidity("Enter a valid URL")
            form['company-site'].closest('.form-group').classList.remove('valid')
            form['company-site'].closest('.form-group').classList.add('invalid')
        }
        else{

            form['job-title'].setCustomValidity('')
            form['job-title'].validity.valid = true
            form['job-title'].closest('.form-group').classList.remove('invalid')
            form['job-title'].closest('.form-group').classList.add('valid')

            form['company-site'].setCustomValidity('')
            form['company-site'].validity.valid = true
            form['company-site'].closest('.form-group').classList.add('valid')
            form['company-site'].closest('.form-group').classList.remove('invalid')
        }
    }
    if(form['contactReason'].value === "talkCode"){
        jobField.setAttribute('hidden', '')
        talkCode.removeAttribute('hidden')
        if(form['language'].value == ""){
            errors+=1
            form['language'].validity.valid = false
            form['language'].setCustomValidity("Select a language")
            form['language'].closest('.form-group').classList.remove('valid')
            form['language'].closest('.form-group').classList.add('invalid')
        }else{
            form['language'].setCustomValidity('')
            form['language'].validity.valid = true
            form['language'].closest('.form-group').classList.remove('invalid')
            form['language'].closest('.form-group').classList.add('valid')
        }
        form['language'].addEventListener('change', (e)=>{
            if(form['language'].value == ""){
                form['language'].validity.valid = false
                form['language'].setCustomValidity("Choose a language")
                form['language'].closest('.form-group').classList.remove('valid')
                form['language'].closest('.form-group').classList.add('invalid')
            }else{
                form['language'].validity.valid = true
                form['language'].setCustomValidity('')
                form['language'].closest('.form-group').classList.remove('invalid')
                form['language'].closest('.form-group').classList.add('valid')
            }
        })
    }
}

const reasonValidation =()=>{
    if(form['contactReason'].value ==""){
        errors+=1
        form['contactReason'].setCustomValidity("Choose a reason for contact")
        form['contactReason'].validity.valid= false
        form['contactReason'].closest('.form-group').classList.remove('valid')
        form['contactReason'].closest('.form-group').classList.add('invalid')
    }else{
        form['contactReason'].setCustomValidity('')
        form['contactReason'].validity.valid = true
        form['contactReason'].closest('.form-group').classList.remove('invalid')
        form['contactReason'].closest('.form-group').classList.add('valid')
    }
}

const flexOptionShower= ()=>{
    let talkCode = document.getElementById('talkCode')
    let jobField = document.getElementById('jobInfo')
    form['contactReason'].addEventListener('change', ()=>{
        if(form['contactReason'].value == 'jobOPP'){
            jobField.removeAttribute("hidden");
            talkCode.setAttribute("hidden", true)
        }
        if(form['contactReason'].value =="talkCode"){
            talkCode.removeAttribute("hidden")
            // if you use an empty string for true it saves 8bits of memory
            jobField.setAttribute("hidden", '')
        }
    })
    return 0
}

const emailValidation = ()=>{
    if(!form['email'].value.match(emailRegex)){
        errors+=1
        if(form['email'].value ==""){
            errors+=1
            form['email'].validity.valid = false
            form['email'].setCustomValidity("Enter a email")
            form['email'].closest('.form-group').classList.remove('valid')
            form['email'].closest('.form-group').classList.add('invalid')
        }
        else{
        form['email'].validity.valid = false
        form['email'].setCustomValidity("Enter a valid Email")
        form['email'].closest('.form-group').classList.remove('valid')
        form['email'].closest('.form-group').classList.add('invalid')}
    }else{
        form['email'].validity.valid = true
        form['email'].setCustomValidity('')
        form['email'].closest('.form-group').classList.remove('invalid')
        form['email'].closest('.form-group').classList.add('valid')
    }
}

const nameValidation = ()=>{
    if(form['name'].value.length < 3 || form['name'].value === ""){
        errors+=1
        form['name'].setCustomValidity('Name must be at least 3 characters')
        form['name'].closest('.form-group').classList.remove('valid')
        form['name'].closest('.form-group').classList.add('invalid')
        form['name'].validity.valid = false
        form['name'].reportValidity()
    }else{
        form['name'].reportValidity()
        form['name'].validity.valid = true
        form['name'].setCustomValidity('')
        form['name'].closest('.form-group').classList.remove('invalid')
        form['name'].closest('.form-group').classList.add('valid')
    }
}

let alertCounter = 0
function validations(e){
    flexOptionShower();
    nameValidation();
    emailValidation();
    reasonValidation();
    flexOptionValidation();
    titleValidation();
    messageValidation();
    console.log(errors)
    if(errors === 0){
        if(alertCounter === 0){
            alert('Your message has been sent')
            alertCounter+=1
            form.submit()
        }   
    }else{
        e.preventDefault()
        errors = 0
        form['submitBtn'].addEventListener('click', (e)=>{validations(e)})
    }
}

// Event Listeners
flexOptionShower();

// This event needs to get fired before submit so the flexOptions can show


form.addEventListener('submit', (e)=>{validations(e)})
