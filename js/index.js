// ^ Global Variables
var emptyInput = document.querySelector(".empty-input");
var nameRegex =/^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/;
var emailRegex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var passwordRegex =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{5,16}$/
// &------------------Sign Up Section--------------------
var signUpName = document.querySelector(".signup-name");
var signUpEmail = document.querySelector(".signup-email");
var signUpPassword = document.querySelector(".signup-password");
var signUp = document.querySelector(".signup");

var userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

if (signUpName && signUpEmail && signUpPassword && signUp){

    signUpName.addEventListener("blur", function () {
        validate(nameRegex, signUpName);
    });

    signUpEmail.addEventListener("blur", function () {
        validate(emailRegex, signUpEmail);
    });

    signUpPassword.addEventListener("blur", function () {
        validate(passwordRegex, signUpPassword);
    });


    function isSignUpEmpty() {
        if (signUpEmail.value == "" || signUpName.value == "" || signUpPassword.value =="") {
            return false
        } else {
            return true
        }
    }

    function store() {
        var details = {
            username: signUpName.value,
            email: signUpEmail.value,
            password: signUpPassword.value
        }
        userDetails.push(details);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
        
    signUp.addEventListener('click', function(){
        if (isSignUpEmpty() === false) {
            emptyInput.classList.remove("d-none");
            document.querySelector(".success").classList.add("d-none");
            document.querySelector(".exsit-email").classList.add("d-none");
            return false;
        }

        var isNameValid = validate(nameRegex, signUpName);
        var isEmailValid = validate(emailRegex, signUpEmail);
        var isPasswordValid = validate(passwordRegex, signUpPassword);
        //* If either input is invalid, do not proceed
        if (!isNameValid || !isEmailValid || !isPasswordValid) {
            return; //* Stop execution if validation fails
        }
        
        var emailExist = false;

        for (var i = 0; i < userDetails.length; i++){
            if (userDetails[i].email.toLowerCase() === signUpEmail.value.toLowerCase()){
                emailExist = true; 
                break;
            }
        }

        if(emailExist){
            document.querySelector(".exsit-email").classList.remove("d-none");
            document.querySelector(".success").classList.add("d-none");
            emptyInput.classList.add("d-none");
        }
        else{
            store();
            document.querySelector(".success").classList.remove("d-none");
            document.querySelector(".exsit-email").classList.add("d-none");
            emptyInput.classList.add("d-none");
        }
    
    })
}

//* ---------------------Login Section-------------------
var loginEmail = document.querySelector(".signinemail");
var loginPassword = document.querySelector(".signinpassword");
var loginBtn = document.querySelector(".login");

if (loginEmail && loginPassword && loginBtn){
    var userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

    function isLoginEmpty() {
        if (loginEmail.value == "" || loginPassword.value == "") {
            return false
        } else {
            return true
        }
    }

    function login() {
        if (isLoginEmpty() == false) {
            emptyInput.classList.remove("d-none");
            document.querySelector(".error").classList.add("d-none");
            return false;
        }
        for (var i = 0; i < userDetails.length; i++) {
            if (userDetails[i].email.toLowerCase() == loginEmail.value.toLowerCase() && userDetails[i].password == loginPassword.value) {
                localStorage.setItem('sessionUsername', userDetails[i].username)
                document.body.innerHTML = `
                <section class=" d-flex flex-column justify-content-center align-items-center">
                    <nav class="w-100 fixed-top py-2 ">
                        <div class="container d-flex justify-content-between">
                            <h4>Smart Login</h4>
                            <button class="btn btn-outline-warning logout-btn">Log Out</button>
                        </div>
                    </nav>

                    <div class="main-section rounded-2 p-5">
                        <h1 class="welcome-color text-center">Welcome <span>${userDetails[i].username}</span></h1>
                    </div>
                </section>
                `
                var logoutBtn = document.querySelector(".logout-btn");
                logoutBtn.addEventListener("click", function() {
                    localStorage.removeItem('sessionUsername');
                    window.location.href = "./index.html";
                });

                break; 

            }else{
                document.querySelector(".error").classList.remove("d-none");
                emptyInput.classList.add("d-none");
            }
        }
    }
    loginBtn.addEventListener("click", login);
}



//? Validate Function
function validate(regex, element){
    if(regex.test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
}

