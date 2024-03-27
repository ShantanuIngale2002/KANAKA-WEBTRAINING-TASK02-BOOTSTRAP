// INITIALS LOCAL STORAGE TO GET USER COUNT

// var myArray = [{"id":0,"fname":"user0f","lname":"user0l","dob":"date","address":"hahaha","role":{"adminuser":["read","write"]},"gender":"aintKnow","preferredlanguage":"none","programmingSkills":["nothing","nothin2"],"email":"user@gmail.com","contact":"0000000000","password":"User@123"}];
// localStorage.setItem("allUsers",JSON.stringify(myArray));
// var preferredLanguages = ["English","Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Odia", "Punjabi"];
// localStorage.setItem("preferredLanguages",JSON.stringify(preferredLanguages));
// var programmingSkills = ["Problem Solving", "Algorithm Design", "Data Structures", "OOPs", "Functional Programming", "Web Development", "Mobile App Development", "Database Management", "Network Programming", "Game Development", "Machine Learning", "Artificial Intelligence", "Data Analysis", "Cloud Computing", "DevOps", "Blockchain Development", "Cybersecurity", "Software Testing", "Embedded Systems", "UI/UX Design", "Scripting", "Version Control", "(CI/CD)", "Agile Methodologies", "Scrum", "Kanban", "Technical Writing", "Project Management", "Team Collaboration", "Debugging", "Code Review"];
// localStorage.setItem("programmingSkills",JSON.stringify(programmingSkills));




// INITIALING STUFF
// Initialize intlTelInput plugin
const input = document.querySelector("#getModalContact");
const iti = window.intlTelInput(input, {
    initialCountry: "in",
    separateDialCode: true,
    hiddenInput: "full",
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
});

// Listen to the input event and update the country code accordingly
input.addEventListener("#getModalContact", function() {
  const selectedCountryData = iti.getSelectedCountryData();
  console.log("Country Code: +" + selectedCountryData.dialCode);
});


// FUNCTIONS UTILITIES
const FnameRegex = /^[a-zA-Z]{1,}$/;
const LnameRegex = /^[a-zA-Z]{0,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/;
const contactRegex = /^\d{10}$/;
var curDate;
var updateObj;


// GENERAL FUNCTIONS
// red and revert border of element
function redBorder(ele) { ele.css('border-color', '#ff0000'); }
function revertBorder(ele) { ele.css('border-color', '#5e6278'); }
// nullify the value of element
function Nullify(ele) { ele.val(''); }
// check buttons nullify
function NullifyCheck(ele) { ele.prop('indeterminate', false); ele.prop('checked', false); }
// show red toast
function showRedToast(msg) {
    $("#redToastMsgID").text(msg);
    $("#viewRedToast").toast("show");
}
// show green toast
function showGreenToast(msg) {
    $("#greenToastMsgID").text(msg);
    $("#viewGreenToast").toast("show");
}
// display span of element
function DisplaySpan(ele) {
    ele.css('visibility', 'visible');
    ele.css('position', 'relative');
}
// remove the span showed before
function removeSpan(ele) {
    ele.css('visibility', 'hidden');
    ele.css('position', 'absolute');
}


// LOGIN FORM SPECIFIC FUNCTIONS
// DISABLE LOGIN BUTTON
function disableLogin() {
    if ($("#getEmail").val() === "") {$("#loginButton").prop('disabled', true);}
    else {$("#loginButton").prop('disabled', false);}
}
// LOGIN FORM USER CREDENTIALS CHECKS
function isValidLoginCredentials() {
    let flag = false;
    let users = JSON.parse(localStorage.getItem("allUsers"));
    if(users){
        let userToUpdate = users.find(element => element.email === $("#getEmail").val());
        if (userToUpdate) {
            if (userToUpdate.password === $("#getPassword").val()) {
                localStorage.setItem("loggedUser", JSON.stringify(userToUpdate));
                flag=true;
            }
        }
    }
    return flag;
}


// FORGOT MODAL SPECIFIC FUNCTIONS
// DISABLE FORGOT BUTTON
function disableForgetButton() {
    if ($("#getForgotEmail").val() === "" || $("#getForgotPassword").val() === "") {$("#forgotButton").prop('disabled', true);}
    else {$("#forgotButton").prop('disabled', false);}
}
// FORGOT EMAIL CHECKS
function isValidForgotMail() {
    let flag = false;
    let users = JSON.parse(localStorage.getItem("allUsers"));
    if(users){
        let userToUpdate = users.find(element => element.email === $("#getForgotEmail").val());
        if (userToUpdate) { flag = true; }
    }
    return flag;
}
// FORGOT PASSWORD CHECK
function isValidForgotPassword() {
    return passwordRegex.test($("#getForgotPassword").val());
}
// FORGOT CONFIRM PASSWORD CHECK
function isValidForgotConfirmPassword() {
    if (isValidForgotPassword()) {return ($("#getForgotPassword").val() === $("#getForgotConfirmPassword").val());}
    return false;
}
// forgot password changes
function getAndChangePassword() {
    let users = JSON.parse(localStorage.getItem("allUsers"));
    let userToUpdate = users.find(element => element.email === $("#getForgotEmail").val());
    userToUpdate.password = $("#getForgotPassword").val();
    localStorage.setItem("allUsers", JSON.stringify(users));
}


// SIGNUP MOPDAL SPECIFIC FUNCTIONS
// DISABLE SINGUP BUTTON
function disableSignup() {
    if ($("#getModalFname").val() === "" ||
        $("#getModalDOB").val() === "" ||
        !($("#getModalGenderMale").is(":checked") ||
            $("#getModalGenderFemale").is(":checked") ||
            $("#getModalGenderOther").is(":checked")) ||
        !($("#getModalAdminReadCheck").is(":checked") ||
            $("#getModalAdminWriteCheck").is(":checked") ||
            $("#getModalUserReadCheck").is(":checked") ||
            $("#getModalUserWriteCheck").is(":checked")) ||
        $("#getModalPreferredLanguage").val() === "" ||
        $("#getModalProgrammingSkill").val() === "" ||
        $("#getModalEmail").val() === "" ||
        $("#getModalContact").val() === "" ||
        $("#getModalPassword").val() === "") {
        $("#signupButton").prop('disabled', true);
    } else {
        $("#signupButton").prop('disabled', false);
    }
}
// SINGUP FNAME CHECK
function isValidModalFName() {
    return FnameRegex.test($("#getModalFname").val());
}
// SINGUP LNAME CHECK
function isValidModalLName() {
    return LnameRegex.test($("#getModalLname").val());;
}
// SINGUP DATE CHECK
function isValidModalDate() {
    curDate = new Date()
    if ($("#getModalDOB").val() === "") {
        return false;
    }
    return (($("#getModalDOB").val()) <= ((curDate.getFullYear() - 15).toString() + "-" + (curDate.getMonth() + 1).toString() + "-" + curDate.getDate().toString()));
}
// SINGUP ADRESS CHECK
function isValidModalAddress() {
    return true;
}
// SINGUP ROLE CHECK
function isValidModalRole() {
    return $("#getModalAdminCheck").prop('indeterminate') || $("#getModalUser").prop('indeterminate') || $("#getModalUserCheck").is(':checked') || $("#getModalAdminCheck").is(':checked') || $("#getModalAdminReadCheck").is(':checked') || $("#getModalAdminWriteCheck").is(':checked') || $("#getModalUserReadCheck").is(':checked') || $("#getModalUserWriteCheck").is(':checked');
}
// SINGUP GENDER CHECK
function isValidModalGender() {
    return $("#getModalGenderMale").is(':checked') || $("#getModalGenderFemale").is(':checked') || $("#getModalGenderOther").is(':checked');
}
// SINGUP PREFERRED LANGUAGE CHECK
function isValidModalPrefLang() {
    if ($("#getModalPreferredLanguage").val() === ""){return false;}
    return true;
}
// SINGUP PROGAMMING SKILLS CHECK
function isValidModalProgSkil() {
    if (skillsArray.length === 0){return false;}
    return true;
}
// SINGUP EMAIL CHECK
function isValidModalEmail() {
    let users = JSON.parse(localStorage.getItem("allUsers"));
    if(users){
        let userToUpdate = users.find(element => element.email === $("#getModalEmail").val());
        if (userToUpdate) { return false; }
    }
    return emailRegex.test($("#getModalEmail").val());
}
// SINGUP CONTACT CHECK
function isValidModalContact() {return contactRegex.test($("#getModalContact").val());}
// SINGUP PASSWORD CHECK
function isValidModalPassword() {return passwordRegex.test($("#getModalPassword").val());}
// SINGUP CONFIRM PASSWORD CHECK
function isValidModalConfirmPassword() {
    if (isValidModalPassword()) {return ($("#getModalPassword").val() === $("#getModalConfirmPassword").val());}
    return false;
}
// RESET SIGNUP MODAL INPUTS
function resetSignup(){
    // nullify values
    Nullify($("#getModalFname"));
    Nullify($("#getModalLname"));
    Nullify($("#getModalDOB"));
    NullifyCheck($("#getModalAdminCheck"));
    NullifyCheck($("#getModalAdminReadCheck"));
    NullifyCheck($("#getModalAdminWriteCheck"));
    NullifyCheck($("#getModalUserCheck"));
    NullifyCheck($("#getModalUserReadCheck"));
    NullifyCheck($("#getModalUserWriteCheck"));
    Nullify($("#getModalAddress"));
    NullifyCheck($("#getModalGenderMale"));
    NullifyCheck($("#getModalGenderFemale"));
    NullifyCheck($("#getModalGenderOther"));
    Nullify($("#getModalPreferredLanguage"));
    Nullify($("#getModalProgrammingSkill"));
    Nullify($("#getModalEmail"));
    Nullify($("#getModalContact"));
    Nullify($("#getModalPassword"));
    Nullify($("#getModalConfirmPassword"));
    // revert borders
    revertBorder($("#getModalFname"));
    revertBorder($("#getModalLname"));
    revertBorder($("#getModalDOB"));
    revertBorder($("#getModalAddress"));
    revertBorder($("#getModalPreferredLanguage"));
    revertBorder($("#getModalProgrammingSkill"));
    revertBorder($("#getModalEmail"));
    revertBorder($("#getModalContact"));
    revertBorder($("#getModalPassword"));
    revertBorder($("#getModalConfirmPassword"));
    // remove spans
    removeSpan($(".signupspan"));
}
// create and store make user of skills array keep it as below like this as possible but mandatory to below it of skillsArray.
function createAndStoreInformation() {
    // getting role value
    let roleObj;
    if ($("#getModalAdminCheck").is(':checked') || $("#getModalAdminCheck").prop('indeterminate')) {
        if ($("#getModalAdminReadCheck").is(':checked') && $("#getModalAdminWriteCheck").is(':checked')) { roleObj = { "Admin": ["Read", "Write"] }; }
        else if ($("#getModalAdminReadCheck").is(':checked') && !$("#getModalAdminWriteCheck").is(':checked')) { roleObj = { "Admin": ["Read"] }; }
        else { roleObj = { "Admin": ["Write"] }; }
    }
    else {
        if ($("#getModalUserReadCheck").is(':checked') && $("#getModalUserWriteCheck").is(':checked')) { roleObj = { "User": ["Read", "Write"] }; }
        else if ($("#getModalUserReadCheck").is(':checked') && !$("#getModalUserWriteCheck").is(':checked')) { roleObj = { "User": ["Read"] }; }
        else { roleObj = { "User": ["Write"] }; }
    }
    // getting gender value and image path accordingly
    let gender = "Other";
    let profilePic = "../assets/profile/other.png";
    if ($("#getModalGenderMale").is(':checked')) {
        gender = "Male";
        profilePic = "assets/profile/male.png";
    }
    if ($("#getModalGenderFemale").is(':checked')) {
        gender = "Female";
        profilePic = "../assets/profile/female.png";
    }
    // assigning my var to all users
    let myVar=JSON.parse(localStorage.getItem("allUsers"));
    if(!myVar){
        myVar=[];
    }
    // creating new user
    let newUser = {
        "id": myVar.length+1,
        "fname": $("#getModalFname").val(),
        "lname": $("#getModalLname").val(),
        "dob": $("#getModalDOB").val(),
        "address": $("#getModalAddress").val(),
        "role": roleObj,
        "gender": gender,
        "preferredlanguage": $("#getModalPreferredLanguage").val(),
        "programmingSkills": skillsArray,
        "email": $("#getModalEmail").val(),
        "contact": iti.getNumber(),
        "password": $("#getModalPassword").val(),
        "profilepic": profilePic
    }
    // push new user
    myVar.push(newUser);
    // update all users including new user
    localStorage.setItem("allUsers", JSON.stringify(myVar));
}


// LOGICS ARE IMPLEMENTED BELOW

// LOGIN FORM LOGIC ALL HERE
// login email
$("#getEmail").on('click', function () {
    disableLogin();
    revertBorder($(this));
});
// login password
$("#getPassword").on('focus', function () {
    disableLogin();
    revertBorder($(this));
});
// login button on press
$("#loginButton").on('click', function () {
    if (!isValidLoginCredentials()) {
        showRedToast("Invalid Credentials, Please try again!!");
        disableLogin();
        redBorder($("#getEmail"));
        redBorder($("#getPassword"));
        Nullify($("#getEmail"));
        Nullify($("#getPassword"));
    }
    else {
        let users = JSON.parse(localStorage.getItem("allUsers"));
        let userToUpdate = users.find(element => element.email === $("#getEmail").val());
        localStorage.setItem("loggedUser", JSON.stringify(userToUpdate));
        showGreenToast("You have Successfully Logged in !!.");
        // show toast
        setTimeout(function(){
            window.location.href = "bootstrapPageHTML.html";
        },1000);

        
    }
});
// login button is disabled here globally
disableLogin();


// FORGOT MODAL LOGIN STARTS HERE
// forgot email
$("#getForgotEmail").on('click', function () {
    disableForgetButton();
    revertBorder($(this));
    removeSpan($("#fgmailspan"));
})
// forgot password
$("#getForgotPassword").on('click', function () {
    disableForgetButton();
    revertBorder($(this));
    removeSpan($("#fgpassspan"));
})
// forgot confirm password
$("#getForgotConfirmPassword").on('click', function () {
    disableForgetButton();
    revertBorder($(this));
    removeSpan($("#fgcpassspan"));
})
// forgot button on pressed
$("#forgotButton").on('click', function () {
    let flag = true;
    if (!isValidForgotMail()) {
        disableForgetButton();
        redBorder($("#getForgotEmail"));
        Nullify($("#getForgotMail"));
        DisplaySpan($("#fgmailspan"));
        flag = false;
    }
    if (!isValidForgotPassword()) {
        disableForgetButton();
        redBorder($("#getForgotPassword"));
        Nullify($("#getForgotPassword"));
        DisplaySpan($("#fgpassspan"));
        flag = false;
    }
    if (!isValidForgotConfirmPassword()) {
        disableForgetButton();
        redBorder($("#getForgotConfirmPassword"));
        Nullify($("#getForgotConfirmPassword"));
        DisplaySpan($("#fgcpassspan"));
        flag = false;
    }
    if (flag) {
        getAndChangePassword(); // change the password accrodingly
        Nullify($("#getForgotEmail"));
        Nullify($("#getForgotPassword"));
        Nullify($("#getForgotConfirmPassword"));
        $("#ForgotModal").modal('hide'); // close modal
        showGreenToast("Your password is changed succefully !!"); //show success toast
    }
})
// forgot button is disabled here globally
disableForgetButton();


// SINGUP MODAL LOGIC STARTS HERE
// initiates modal whenever loaded
$("#SignupModal").on('shown.bs.modal', function () {
    var prefLang = JSON.parse(localStorage.getItem("preferredLanguages"));
    $.each(prefLang, function (index, item) {
        $("#getModalPreferredLanguage").append('<option value="' + item + '">'+item+'</option>');
    });
    var prefSkill = JSON.parse(localStorage.getItem("programmingSkills"));
    $.each(prefSkill, function (index, item) {
        $("#getModalSkillList").append('<option value="' + item + '">'+item+'</option>');
    })
});
// singup fname
$("#getModalFname").on('click', function () {
    // disableSignup();
    revertBorder($(this));
    removeSpan($("#fnspan"));
});
// signup lname is validated at each change
$("#getModalFname").on('change', function () {
    let val = $("#getModalFname").val();
    if(val && !isValidModalFName()){
        redBorder($("#getModalFname"));
        DisplaySpan($("#fnspan"));
    }
});
// singup lname
$("#getModalLname").on('click', function () {
    // disableSignup();
    revertBorder($(this));
    removeSpan($("#lnspan"));
});
// singup lname is validated at each change
$("#getModalLname").on('change', function () {
    let val = $("#getModalLname").val();
    if(val && !isValidModalLName()){
        redBorder($("#getModalLname"));
        DisplaySpan($("#lnspan"));
    }
});
// signup dob
$("#getModalDOB").on('click', function () {
    // disableSignup();
    revertBorder($(this));
    removeSpan($("#dobspan"));
});
// signup dob is validated at each change
$("#getModalDOB").on('change', function () {
    let val = $("#getModalDOB").val();
    if(val && !isValidModalDate()){
        redBorder($("#getModalDOB"));
        DisplaySpan($("#dobspan"));
    }
});
// singup ROLE
//role - admin
$("#getModalAdminCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#rolespan"));

    //logic for admin
    if ($(this).is(':checked')) {
        $("#getModalAdminReadCheck").prop('checked', true);
        $("#getModalAdminWriteCheck").prop('checked', true);
    }
    else {
        $("#getModalAdminReadCheck").prop('checked', false);
        $("#getModalAdminWriteCheck").prop('checked', false);
    }

    //logic for user
    $("#getModalUserCheck").prop('indeterminate', false);
    $("#getModalUserCheck").prop('checked', false);
    $("#getModalUserReadCheck").prop('checked', false);
    $("#getModalUserWriteCheck").prop('checked', false);
})
//admin read
$("#getModalAdminReadCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#rolespan"));
    //logic for admin
    if ($(this).is(':checked')) {
        if ($("#getModalAdminWriteCheck").is(":checked")) {
            $("#getModalAdminCheck").prop('indeterminate', false);
            $("#getModalAdminCheck").prop('checked', true);
        }
        else {$("#getModalAdminCheck").prop('indeterminate', true);}
    }
    else {
        if ($("#getModalAdminWriteCheck").is(":checked")) {$("#getModalAdminCheck").prop('indeterminate', true);}
        else {
            $("#getModalAdminCheck").prop('indeterminate', false);
            $("#getModalAdminCheck").prop('checked', false);
        }
    }
    //logic for user
    $("#getModalUserCheck").prop('indeterminate', false);
    $("#getModalUserCheck").prop('checked', false);
    $("#getModalUserReadCheck").prop('checked', false);
    $("#getModalUserWriteCheck").prop('checked', false);
})
//admin write
$("#getModalAdminWriteCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#rolespan"));
    //logic for admin
    if ($(this).is(':checked')) {
        if ($("#getModalAdminReadCheck").is(":checked")) {
            $("#getModalAdminCheck").prop('indeterminate', false);
            $("#getModalAdminCheck").prop('checked', true);
        }
        else {$("#getModalAdminCheck").prop('indeterminate', true);}
    }
    else {
        if ($("#getModalAdminReadCheck").is(":checked")) {$("#getModalAdminCheck").prop('indeterminate', true);}
        else {
            $("#getModalAdminCheck").prop('indeterminate', false);
            $("#getModalAdminCheck").prop('checked', false);
        }
    }
    //logic for user
    $("#getModalUserCheck").prop('indeterminate', false);
    $("#getModalUserCheck").prop('checked', false);
    $("#getModalUserReadCheck").prop('checked', false);
    $("#getModalUserWriteCheck").prop('checked', false);
})
//role - user
$("#getModalUserCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#rolespan"));
    //logic for user
    if ($(this).is(':checked')) {
        $("#getModalUserReadCheck").prop('checked', true);
        $("#getModalUserWriteCheck").prop('checked', true);
    }
    else {
        $("#getModalUserReadCheck").prop('checked', false);
        $("#getModalUserWriteCheck").prop('checked', false);
    }
    //logic for admin
    $("#getModalAdminCheck").prop('indeterminate', false);
    $("#getModalAdminCheck").prop('checked', false);
    $("#getModalAdminReadCheck").prop('checked', false);
    $("#getModalAdminWriteCheck").prop('checked', false);
})
//user read
$("#getModalUserReadCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#rolespan"));
    //logic for user
    if ($(this).is(':checked')) {
        if ($("#getModalUserWriteCheck").is(":checked")) {
            $("#getModalUserCheck").prop('indeterminate', false);
            $("#getModalUserCheck").prop('checked', true);
        }
        else {$("#getModalUserCheck").prop('indeterminate', true);}
    }
    else {
        if ($("#getModalUserWriteCheck").is(":checked")) {$("#getModalUserCheck").prop('indeterminate', true);}
        else {
            $("#getModalUserCheck").prop('indeterminate', false);
            $("#getModalUserCheck").prop('checked', false);
        }
    }
    //logic for admin
    $("#getModalAdminCheck").prop('indeterminate', false);
    $("#getModalAdminCheck").prop('checked', false);
    $("#getModalAdminReadCheck").prop('checked', false);
    $("#getModalAdminWriteCheck").prop('checked', false);
})
//user write
$("#getModalUserWriteCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#rolespan"));
    //logic for user
    if ($(this).is(':checked')) {
        if ($("#getModalUserReadCheck").is(":checked")) {
            $("#getModalUserCheck").prop('indeterminate', false);
            $("#getModalUserCheck").prop('checked', true);
        }
        else {$("#getModalUserCheck").prop('indeterminate', true);}
    }
    else {
        if ($("#getModalUserReadCheck").is(":checked")) {$("#getModalUserCheck").prop('indeterminate', true);}
        else {
            $("#getModalUserCheck").prop('indeterminate', false);
            $("#getModalUserCheck").prop('checked', false);
        }
    }
    //logic for admin
    $("#getModalAdminCheck").prop('indeterminate', false);
    $("#getModalAdminCheck").prop('checked', false);
    $("#getModalAdminReadCheck").prop('checked', false);
    $("#getModalAdminWriteCheck").prop('checked', false);
})
// singup ROLE complete

// signup address
$("#getModalAddress").on('click', function () {
    // disableSignup();
    revertBorder($("#getModalAddress"));
    removeSpan($("#addressspan"));
})
// signup gender - Male
$("#getModalGenderMale").on('click', function () {
    // disableSignup();
    removeSpan($("#gspan"));
});
// signup gender - Female
$("#getModalGenderFemale").on('click', function () {
    // disableSignup();
    removeSpan($("#gspan"));
});
// signup gender - Other
$("#getModalGenderOther").on('click', function () {
    // disableSignup();
    removeSpan($("#gspan"));
});
// signup preferred language
$("#getModalPreferredLanguage").on('click', function (event) {
    // disableSignup();
    revertBorder($(this));
    removeSpan($("#plspan"));
    
});
// signup Pills Logic
let skillsArray = []; // Initialize skillsArray as an empty array
$(document).ready(function () {
    $('#SignupModal').on('shown.bs.modal', function () {
        skillsArray.splice(0,skillsArray.length);
        resetSignup();
        $('#appendProgSkillsHere').empty();
        // programming skills autocomplete integration
        let arr=[];
        arr=JSON.parse(localStorage.getItem("programmingSkills"));
        $("#getModalProgrammingSkill").autocomplete({
            source: arr,
            position: { my : "right top", at: "right bottom" },
        });
        // on change means on adding pills
        $('#getModalProgrammingSkill').on('change', function () {
            var selectedSkill = $(this).val().toLowerCase();
            console.log(selectedSkill);
            if (selectedSkill && !skillsArray.includes(selectedSkill)) {
                // create and add pills
                let spanH = $('<div>').addClass('pillSpan text-white rounded-4 border d-flex py-1 px-2 mr-1 mt-1');
                let spanP = $('<div>').addClass('pillP px-1').text(selectedSkill);
                let spanC = $('<div>').addClass('crossIcon rounded-circle px-1').text('⛌');
                spanH.append(spanP);
                spanH.append(spanC);
                $('#appendProgSkillsHere').append(spanH);
                $(this).val(''); // Clear input after selecting skill
                skillsArray.push(selectedSkill);
                console.log(skillsArray);
            }
            else{$('#getModalProgrammingSkill').val("");} // nullify input
        });
    });
    // when cross is clicked the closed element with class pillspan ie. parent is cut-off
    $(document).on('click','.crossIcon', function () {
        let skillToRemove = $(this).prev().text().trim();
        skillsArray = skillsArray.filter(function (e) { return e !== skillToRemove; });
        $(this).closest('.pillSpan').remove(); // Remove the parent container
        console.log(skillsArray);
    });

});

// signup programming skills
$("#getModalProgrammingSkill").on('click', function (event) {
    // disableSignup();
    revertBorder($(this));
    removeSpan($("#psspan"));
});
// singup email
$("#getModalEmail").on('click', function () {
    // disableSignup();
    revertBorder($(this));
    removeSpan($("#espan"));
});
// signup email validated after each change
$("#getModalEmail").on('change', function () {
    // disableSignup();
    let val = $("#getModalEmail").val();
    if(val && !isValidModalEmail()){
        redBorder($("#getModalEmail"));
        DisplaySpan($("#espan"));
    }
});
// signup contact
$("#getModalContact").on('click', function () {
    // disableSignup();
    revertBorder($(this));
    removeSpan($("#cspan"));
});
// signup contact validated at each change
$("#getModalContact").on('change', function () {
    // disableSignup();
    let val = $("#getModalContact").val();
    if(val && !isValidModalContact()){
        redBorder($(this));
        DisplaySpan($("#cspan"));
    }
});
// signup password
$("#getModalPassword").on('click', function () {
    // disableSignup();
    revertBorder($(this));
    removeSpan($("#pspan"));
});
// signup password validated at each change
$("#getModalPassword").on('change', function () {
    // disableSignup();
    let val = $(this).val();
    if(val && !isValidModalPassword()){
        redBorder($(this));
        DisplaySpan($("#pspan"));
    }
});
// signup confirm password
$("#getModalConfirmPassword").on('click', function () {
    // disableSignup();
    revertBorder($(this));
    removeSpan($("#cpspan"));
});
// signup confirm password validated at each change
$("#getModalConfirmPassword").on('change', function () {
    // disableSignup();
    let val = $(this).val();
    if(val && !isValidModalConfirmPassword()){
        redBorder($(this));
        DisplaySpan($("#cpspan"));
    }
});
// signup button on pressed
$("#signupButton").on('click', function () {
    let flag = true;
    if (!isValidModalFName()) {
        // disableSignup();
        redBorder($("#getModalFname"));
        Nullify($("#getModalFName"));
        DisplaySpan($("#fnspan"));
        flag = false;
    }
    if (!isValidModalLName()) {
        // disableSignup();
        redBorder($("#getModalLname"));
        Nullify($("#getModalLName"));
        DisplaySpan($("#lnspan"));
        flag = false;
    }
    if (!isValidModalDate()) {
        // disableSignup();
        redBorder($("#getModalDOB"));
        Nullify($("#getModalDOB"));
        DisplaySpan($("#dobspan"));
        flag = false;
    }
    if (!isValidModalRole()) {
        // disableSignup();
        NullifyCheck($("#getModalAdminCheck"));
        NullifyCheck($("#getModalAdminReadCheck"));
        NullifyCheck($("#getModalAdminWriteCheck"));
        NullifyCheck($("#getModalUserCheck"));
        NullifyCheck($("#getModalUserReadCheck"));
        NullifyCheck($("#getModalUserWriteCheck"));
        DisplaySpan($("#rolespan"));
        flag = false;
    }
    if (!isValidModalAddress()) {
        // disableSignup();
        redBorder($("#getModalAddress"));
        Nullify($("#getModalAddress"));
        DisplaySpan($("#addressspan"));
        flag = false;
    }
    if (!isValidModalGender()) {
        // disableSignup();
        NullifyCheck($("#getModalGenderMale"));
        NullifyCheck($("#getModalGenderFemale"));
        NullifyCheck($("#getModalGenderOther"));
        DisplaySpan($("#gspan"));
        flag = false;
    }
    if (!isValidModalPrefLang()) {
        // disableSignup();
        redBorder($("#getModalPreferredLanguage"));
        Nullify($("#getModalPreferredLanguage"));
        DisplaySpan($("#plspan"));
        flag = false;
    }
    if (!isValidModalProgSkil()) {
        // disableSignup();
        redBorder($("#getModalProgrammingSkill"));
        Nullify($("#getModalProgrammingSkill"));
        DisplaySpan($("#psspan"));
        flag = false;
    }
    if (!isValidModalEmail()) {
        // disableSignup();
        redBorder($("#getModalEmail"));
        Nullify($("#getModalEmail"));
        DisplaySpan($("#espan"));
        flag = false;
    }
    if (!isValidModalContact()) {
        // disableSignup();
        redBorder($("#getModalContact"));
        Nullify($("#getModalContact"));
        DisplaySpan($("#cspan"));
        flag = false;
    }
    if (!isValidModalPassword()) {
        // disableSignup();
        redBorder($("#getModalPassword"));
        Nullify($("#getModalPassword"));
        DisplaySpan($("#pspan"));
        flag = false;
    }
    if (!isValidModalConfirmPassword()) {
        // disableSignup();
        redBorder($("#getModalConfirmPassword"));
        Nullify($("#getModalConfirmPassword"));
        DisplaySpan($("#cpspan"));
        flag = false;
    }
    // if all above validations are passed then do
    if (flag) {
        createAndStoreInformation(); // call function to add new user into all users
        // after adding new user nullify everything
        Nullify($("#getModalFname"));
        Nullify($("#getModalLname"));
        Nullify($("#getModalDOB"));
        NullifyCheck($("#getModalAdminCheck"));
        NullifyCheck($("#getModalAdminReadCheck"));
        NullifyCheck($("#getModalAdminWriteCheck"));
        NullifyCheck($("#getModalUserCheck"));
        NullifyCheck($("#getModalUserReadCheck"));
        NullifyCheck($("#getModalUserWriteCheck"));
        Nullify($("#getModalAddress"));
        NullifyCheck($("#getModalGenderMale"));
        NullifyCheck($("#getModalGenderFemale"));
        NullifyCheck($("#getModalGenderOther"));
        Nullify($("#getModalPreferredLanguage"));
        Nullify($("#getModalProgrammingSkill"));
        Nullify($("#getModalEmail"));
        Nullify($("#getModalContact"));
        Nullify($("#getModalPassword"));
        Nullify($("#getModalConfirmPassword"));
        // empty the pills
        $('#appendProgSkillsHere').empty();
        // close SignupModal
        $("#SignupModal").modal('hide');
        // show toast
        showGreenToast("Successfully signed in !!! User can log in now.");
    }
})
// singup button is disabled here globally
// disableSignup();




