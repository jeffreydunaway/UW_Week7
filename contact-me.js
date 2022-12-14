// Get contact form element
const form = document.getElementById('contact-form');
// Get customer name element
const cname = document.getElementById('cus-name');
// Get email element
const email = document.getElementById('email');
// Get message element
const message = document.getElementById('message');


// Get <select> element with id is 'contact-kind'
const contact = document.getElementById('contact-kind');
// Get div element with id = 'job'
const job = document.getElementById('job');
// Get div element with id = 'code'
const code = document.getElementById('code');
// Get job title element with id = 'title'
const title = document.getElementById('title');
// Get company url element with id = 'company'
const companyURL = document.getElementById('company');
// Get coding language element
const language = document.getElementById('language');


const checkValidation = (e) => {
  // Get the state of cname
  const nameValidState = cname.value.trim().length > 2;
  // Get email value without space
  const emailValue = email.value.trim();
  const isEmail = /\w+@\w+\.\w+/.test(emailValue);
  // Check if the length of message > 9 or not
  const messageValidState = message.value.trim().length > 9;

  // Get the value of title
  const titleValue = title.value.trim();
  // Get company url
  const url = companyURL.value.trim();
  const isURL = /https?\:\/\/.+\..+/.test(url);
  // Get language value
  const languageValue = language.value;

  // Check if the customer name is valid or not
  if (!nameValidState) {
    e.preventDefault();
    // Call function setInvalidInput to show error message
    setInvalidInput(cname, 'Your name must be 3 characters or more!');
  } else {
    setValidInput(cname);
  }
  // Check if the email is valid or not
  if (emailValue === '') {
    e.preventDefault();
    setInvalidInput(email, 'Email cannot be blank. Please enter your email!');
  } else if (!isEmail) {
    e.preventDefault();
    setInvalidInput(email, 'Email is invalid. Please re-enter your email.');
  } else {
    setValidInput(email);
  }
  // Check if the message is valid or not
  if (!messageValidState) {
    e.preventDefault();
    // Call function setInvalidInput to show error message
    setInvalidInput(message, 'Your message must be 10 characters or more!');
  } else {
    setValidInput(message);
  }

  //Check if <job> element is displayed or not
  if (job.style.display === 'block') {
    // Check if the title is valid or not
    if (titleValue === '') {
      e.preventDefault();
      setInvalidInput(title, 'Job title cannot be blank. Please enter your job title!');
    } else {
      setValidInput(title);
    }
    // Check if the url is valid or not
    if (url === '') {
      e.preventDefault();
      setInvalidInput(companyURL, 'Company website cannot be blank. Please enter your company website!');      
    } else if (!isURL) {
      e.preventDefault();
      setInvalidInput(companyURL, 'Company website is invalid. Please re-enter your company website!');
    } else {
      setValidInput(companyURL);
    }
  }
  // Check if <code> element is displayed or not
  if (code.style.display === 'block') {
    if (languageValue === 'choose') {
      e.preventDefault();
      setInvalidInput(language, 'Please choose a coding language!');
    } else {
      setValidInput(language);
    };
  }

};

// Fires form's submit listener
form.addEventListener('submit', checkValidation);

// Define function setInvalidInputField to show info about invalid input
function setInvalidInput(input, message) {
  // Get parent element of the current input field
  const formGroup = input.parentElement;
  // Get element 'small'
  const small = formGroup.querySelector('small');
  // Add class name 'invalid' to the parent element
  formGroup.classList.add('invalid');
  // Remove class name 'valid' from the parent element
  formGroup.classList.remove('valid');
  // Using small element to show an error message in HTML page
  small.innerText = message;
}

// Define function setValidInputField
function setValidInput(input) {
  // Get parent element of the current input field
  const formGroup = input.parentElement;
  // Add class name 'valid' to the parent element
  formGroup.classList.add('valid');
  // Remove class name 'invalid' from the parent element
  formGroup.classList.remove('invalid');  
}

// Fires <select> element listener
contact.addEventListener('change', e => {
  // if option <job> is selected
  job.style.display = e.target.value === 'job'? 'block': 'none';
  // If option <code> is selected
  code.style.display = e.target.value === 'code'? 'block': 'none';
});
