// if not logged user then redirect to login
if(!localStorage.getItem('loggedUser')){
    window.location.href="loginPageHTML.html";
}

// INITIALING STUFF
// Initialize intlTelInput plugin
const input = document.querySelector("#profileEditContact");
const iti = window.intlTelInput(input, {
    initialCountry: "in",
    separateDialCode: true,
    hiddenInput: "full",
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
});

// Listen to the input event and update the country code accordingly
input.addEventListener("#profileEditContact", function() {
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

// red border
function redBorder(ele) { ele.css('border-color', '#ff0000'); }
// revert border
function revertBorder(ele) { ele.css('border-color', '#5e6278'); }
// nullify the element
function Nullify(ele) { ele.val(''); }
// nullify the check element
function NullifyCheck(ele) { ele.prop('indeterminate', false); ele.prop('checked', false); }
// show toast
function showToast(msg,color) {
    $('#homeToastMsg').text(msg);
    $("#viewHomeToast").toast("show");
}
// display the element span
function DisplaySpan(ele) {
    ele.css('visibility', 'visible');
    ele.css('position', 'relative');
}
// remove element span
function removeSpan(ele) {
    ele.css('visibility', 'hidden');
    ele.css('position', 'absolute');
}


// PERFORM CHANGES BUTTON REQUIREMENTS STARTS HERE 

// profile edit fname
function isValidEditFname() {
    return FnameRegex.test($("#profileEditFname").val());
}
// profile edit lname
function isValidEditLname() {
    if($("#profileEditLname").val()===""){return true;}
    return LnameRegex.test($("#profileEditLname").val());;
}
// profile edit date
function isValidEditDate() {
    curDate = new Date()
    if ($("#profileEditDOB").val() === "") {return false;}
    return (($("#profileEditDOB").val()) <= ((curDate.getFullYear() - 15).toString() + "-" + (curDate.getMonth() + 1).toString() + "-" + curDate.getDate().toString()));
}
// profile edit address
function isValidEditAddress() {
    return true;
}
// profile edit gender
function isValidEditGender() {
    return $("#profileEditGenderMale").is(':checked') || $("#profileEditGenderFemale").is(':checked') || $("#profileEditGenderOther").is(':checked');
}
// profile edit language
function isValidEditLanguage() {
    if ($("#profileEditLanguage").val() === ""){return false;}
    return true;
}
// profile edit skill
function isValidEditSkill() {
    if (skillsArray.length === 0){return false;}
    return true;
}
// profile edit email
function isValidEditEmail() {
    return emailRegex.test($("#profileEditEmail").val());
}
// profile edit contact
function isValidEditContact() {
    return contactRegex.test($("#profileEditContact").val());
}
// profile edit password
function isValidEditPassword() {
    if($("#profileEditPassword").val()==""){return true;}
    return passwordRegex.test($("#profileEditPassword").val());
}
// profile edit confirm password
function isValidEditConfirmPassword() {
    if (isValidEditPassword()) {return ($("#profileEditPassword").val() === $("#profileEditConfirmPassword").val());}
    return false;
}
// create and store make user of skills array keep it as below like this as possible but mandatory to below it of skillsArray.
function changeAndStoreInformation() {
    // getting role
    let roleObj;
    if ($("#profileEditAdminCheck").is(':checked') || $("#profileEditAdminCheck").prop('indeterminate')) {
        if ($("#profileEditAdminReadCheck").is(':checked') && $("#profileEditAdminWriteCheck").is(':checked')) { roleObj = { "Admin": ["Read", "Write"] }; }
        else if ($("#profileEditAdminReadCheck").is(':checked') && !$("#profileEditAdminWriteCheck").is(':checked')) { roleObj = { "Admin": ["Read"] }; }
        else { roleObj = { "Admin": ["Write"] }; }
    }
    else {
        if ($("#profileEditUserReadCheck").is(':checked') && $("#profileEditUserWriteCheck").is(':checked')) { roleObj = { "User": ["Read", "Write"] }; }
        else if ($("#profileEditUserReadCheck").is(':checked') && !$("#profileEditUserWriteCheck").is(':checked')) { roleObj = { "User": ["Read"] }; }
        else { roleObj = { "User": ["Write"] }; }
    }
    // getting gender and pic path accordingly
    let gender = "Other";
    let profilePic = "../assets/profile/other.png";
    if ($("#profileEditGenderMale").is(':checked')) {
        gender = "Male";
        profilePic = "../assets/profile/male.png";
    }
    if ($("#profileEditGenderFemale").is(':checked')) {
        gender = "Female";
        profilePic = "../assets/profile/female.png";
    }
    
    // getting id of logged in user to search and update information
    let currUserID = JSON.parse(localStorage.getItem("loggedUser")).id;
    // getting all users
    let users = JSON.parse(localStorage.getItem("allUsers"));
    // search user with current id
    let userToUpdate = users.find(element => element.id === currUserID);
    // updating the edited information below
    userToUpdate.fname=$("#profileEditFname").val();
    userToUpdate.lname=$("#profileEditLname").val();
    userToUpdate.fname=$("#profileEditFname").val();
    userToUpdate.dob=$("#profileEditDOB").val();
    userToUpdate.address=$("#profileEditAddress").val();
    userToUpdate.role=roleObj;
    userToUpdate.gender=gender;
    userToUpdate.preferredlanguage=$("#profileEditLanguage").val();
    userToUpdate.programmingSkills=skillsArray;
    userToUpdate.email=$("#profileEditEmail").val();
    userToUpdate.contact=$("#profileEditContact").val();
    userToUpdate.profilepic=profilePic;
    let password=$("#profileEditPassword").val();
    if(password){userToUpdate.password=password;} // changing only if the password is edited
    // updating logged-in user in local storage
    localStorage.setItem("loggedUser", JSON.stringify(userToUpdate));
    // updating all users in local storage
    localStorage.setItem("allUsers", JSON.stringify(users));
}


// DOCUMENT ON LOAD
$(document).ready(function(){
    let loggedUserData = JSON.parse(localStorage.getItem("loggedUser"));
    $("#navbarProfilePic").attr("src",loggedUserData.profilepic);
});


// PROFILE INFORMATION SCRIPT STARTS HERE
let currSkills=[];
$("#profileInfoModal").on('show.bs.modal', function () {
    let loggedUserData = JSON.parse(localStorage.getItem('loggedUser')); // get logged in user
    $("#profileInfoPic").attr("src",loggedUserData.profilepic); // adding profile pic path into src attribute

    // likewise adding fetched information below into element
    $('#profileInfoID').text(loggedUserData.id);
    $('#profileInfoEmail').text(loggedUserData.email);
    let lname=loggedUserData.lname;
    if(lname){$('#profileInfoName').text(loggedUserData.fname +" "+ loggedUserData.lname);}
    else{$('#profileInfoName').text(loggedUserData.fname);}
    $('#profileInfoContact').text(loggedUserData.contact);
    $('#profileInfoDOB').text(loggedUserData.dob);
    $('#profileInfoGender').text(loggedUserData.gender);
    $('#profileInfoLanguage').text(loggedUserData.preferredlanguage);

    // if address is provided then add into element
    if(loggedUserData.address){$('#profileInfoAddress').text(loggedUserData.address);}
    // displaying role
    let role = loggedUserData.role;
    let keyRole = Object.keys(role)[0];
    let formatRole = `${keyRole} : ${role[keyRole].length === 1 ? role[keyRole][0] : role[keyRole].join(' and ')}`;
    $("#profileInfoRole").text(formatRole);

    // skills making sure that it not gets duplicated on closing and opening the Edit.
    let skills = loggedUserData.programmingSkills;
    skills.forEach(skill => {
        if(!currSkills.includes(skill)){
            // creating and adding each skill as pill
            let spanD = $('<div>').addClass('pillP d-flex mx-1 fw-bold text-primary').text('>')
            let spanP = $('<div>').addClass('fw-bold text-secondary').text(skill);
            spanD.append(spanP);
            $("#profileInfoSkillPills").append(spanD);
            currSkills.push(skill);
        }
    });
})


// PROFILE EDIT SCRIPT STARTS HERE
$("#profileEditModal").on('show.bs.modal', function () {
    // if closed and opened again modal must get values neatly, discarding unsaved but edited values in form
    removeSpan($(".alertSpan")); // remove all the spans 
    // revert the borders
    revertBorder($('#profileEditFname'));
    revertBorder($('#profileEditLname'));
    revertBorder($('#profileEditEmail'));
    revertBorder($('#profileEditContact'));
    revertBorder($('#profileEditDOB'));
    revertBorder($('#profileEditLanguage'));
    revertBorder($('#profileEditAddress'));
    revertBorder($('#profileEditSkill'));

    // on loading the preferred languages must get loaded in datalist as options from local storage
    let prefLang = JSON.parse(localStorage.getItem("preferredLanguages"));
    $.each(prefLang, function (index, item) {
        $("#profileEditLanguage").append('<option value="' + item + '">' + item + '</option>');
    });

    // getting the information to display from logged in user
    let loggedUserData = JSON.parse(localStorage.getItem('loggedUser'));
    $('#profileEditID').text(loggedUserData.id);
    $('#profileEditEmail').val(loggedUserData.email);
    $('#profileEditFname').val(loggedUserData.fname);
    let lname=loggedUserData.lname;
    if(lname){$('#profileEditLname').val(loggedUserData.lname);}
    $('#profileEditContact').val(loggedUserData.contact.slice(-10)); // slicing contact to only get last 10 digit.
    $('#profileEditDOB').val(loggedUserData.dob);
    $('#profileEditGender' + loggedUserData.gender).prop('checked', true);
    $('#profileEditLanguage').val(loggedUserData.preferredlanguage);
    $('#profileEditAddress').val(loggedUserData.address);

    // for role need to clear them so that no conflict occurs
    NullifyCheck($('#profileEditAdminCheck'));
    NullifyCheck($('#profileEditAdminReadCheck'));
    NullifyCheck($('#profileEditAdminWriteCheck'));
    NullifyCheck($('#profileEditUserCheck'));
    NullifyCheck($('#profileEditUserReadCheck'));
    NullifyCheck($('#profileEditUserWriteCheck'));

    // getting role value
    let role = loggedUserData.role;
    let keyRole = Object.keys(role)[0];
    // check if it have both read and write previliage
    if (role[keyRole].length == 1) {
        $('#profileEdit' + keyRole + 'Check').prop('indeterminate', true);
        $('#profileEdit' + keyRole + role[keyRole][0] + 'Check').prop('checked', true);
    }
    else {
        $('#profileEdit' + keyRole + 'Check').prop('checked', true);
        $('#profileEdit' + keyRole + role[keyRole][0] + 'Check').prop('checked', true);
        $('#profileEdit' + keyRole + role[keyRole][1] + 'Check').prop('checked', true);
    }
    $('#profileEditAminCheck').prop('disabled',true);
});


// SCRIPT FOR PILLS IN EDIT SECTION STARTS HERE
let skillsArray = [];
$(document).ready(function () {
    $('#profileEditModal').on('show.bs.modal', function () {
        // revert the input border
        $("#profileEditSkill").on('click', function () {
            revertBorder($(this));
            $(this).val('');
        })
        // initialize the array to get skills
        let arr=[];
        arr=JSON.parse(localStorage.getItem("programmingSkills"));
        // integrate autocomplete with edit skill input
        $("#profileEditSkill").autocomplete({
            source: arr,
            position: { my : "right top", at: "right bottom" },
        });
        // get skills from localstroage and add to to input options
        let prefSkill = JSON.parse(localStorage.getItem("programmingSkills"));
        $.each(prefSkill, function (index, item) {
            $("#profileEditSkillList").append('<option value="' + item + '">' + item + '</option>');
        });
        // existing skill records adding as pills
        let loggedUserData=JSON.parse(localStorage.getItem('loggedUser'));
        let skills = loggedUserData.programmingSkills;
        skills.forEach(skill => {
            if(!skillsArray.includes(skill)){
                // create and add each skill as a pill
                let spanH = $('<div>').addClass('pillSpan bg-secondary text-white text-nowrap border d-flex py-1 px-2 mr-1 mt-1');
                let spanP = $('<div>').addClass('pillP px-1').text(skill);
                let spanC = $('<div>').addClass('crossIcon rounded-circle px-1').text('⛌');
                spanH.append(spanP);
                spanH.append(spanC);
                $("#profileEditSkillPills").append(spanH);
                skillsArray.push(skill);
            }
        });
        // on change ie. adding the skill
        $('#profileEditSkill').on('change', function () {
            var selectedSkill = $(this).val().toLowerCase();
            if (selectedSkill && !skillsArray.includes(selectedSkill)) {
                let spanH = $('<div>').addClass('pillSpan text-white text-nowrap rounded-4 border d-flex py-1 px-2 mr-1 mt-1');
                let spanP = $('<div>').addClass('pillP px-1').text(selectedSkill);
                let spanC = $('<button>').addClass('btn btn-close-white m-0 ml-1 py-0 px-1 rounded-circle crossIcon');
                spanC.text('⛌');
                spanH.append(spanP);
                spanH.append(spanC);
                $('#profileEditSkillPills').append(spanH);
                $(this).val(''); // Clear input after selecting skill
                skillsArray.push(selectedSkill);
            }
            else {$('#profileEditSkill').val("");}
        });
        // when cross icon is cliked closet element with class pillspan is deleted ie, parent
        $(document).on('click', '.crossIcon', function () {
            let skillToRemove = $(this).prev().text().trim();
            skillsArray = skillsArray.filter(function (e) { return e !== skillToRemove; });
            $(this).closest('.pillSpan').remove();
            console.log(skillsArray);
        });
    });

});


// CHANGES TO BE DONE

// edit email
$('#profileEditEmail').on('click',function(){
    revertBorder($(this));
    removeSpan($('#editemailspan'))
});
// edit email validated at each change
$('#profileEditEmail').on('change',function(){
    let val = $(this).val();
    if(val && !isValidEditEmail()){
        redBorder($(this));
        DisplaySpan($("#editemailspan"));
    }
});
// edit fname
$('#profileEditFname').on('click',function(){
    revertBorder($(this));
    removeSpan($('#editfnamespan'))
});
// edit fname validated at each change
$('#profileEditFname').on('change',function(){
    let val = $(this).val();
    if(val && !isValidEditFname()){
        redBorder($(this));
        DisplaySpan($("#editfnamespan"));
    }
});
// edit lname
$('#profileEditLname').on('click',function(){
    revertBorder($(this));
    removeSpan($('#editlnamespan'));
});
// edit lname at each change
$('#profileEditLname').on('change',function(){
    let val = $(this).val();
    if(val && !isValidEditLname()){
        redBorder($(this));
        DisplaySpan($("#editlnamespan"));
    }
});
// edit contact
$('#profileEditContact').on('click',function(){
    revertBorder($(this));
    removeSpan($('#editcontactspan'));
});
// edit contact validated at each change
$('#profileEditContact').on('change',function(){
    let val = $(this).val();
    if(val && !isValidEditContact()){
        redBorder($(this));
        DisplaySpan($("#editcontactspan"));
    }
});
// edit dob
$('#profileEditDOB').on('click',function(){
    revertBorder($(this));
    removeSpan($('#editdobspan'));
});
// edit dob validated at each change
$('#profileEditDOB').on('change',function(){
    let val = $(this).val();
    if(val && !isValidEditDate()){
        redBorder($(this));
        DisplaySpan($("#editdobspan"));
    }
});
// edit gender-male
$("#profileEditGenderMale").on('click', function () {removeSpan($("#editgenderspan"));});
// edit gender-female
$("#profileEditGenderFemale").on('click', function () {removeSpan($("#editgenderspan"));});
// edit gender-other
$("#profileEditGenderOther").on('click', function () {removeSpan($("#editgenderspan"));});
// edit language
$("#profileEditLanguage").on('click',function(){
    revertBorder($(this));
    removeSpan($('#editlangspan'))
});
// edit address
$("#profileEditAddress").on('click',function(){
    revertBorder($(this));
    removeSpan($('#editaddressspan'))
});
// edit skill
$("#profileEditSkill").on('click',function(){
    revertBorder($(this));
    removeSpan($('#editskillspan'))
});
// edit password
$("#profileEditPassword").on('click',function(){
    revertBorder($(this));
    removeSpan($("#editpassspan"));
});
// edit password at each change
$("#profileEditChangePassword").on('click',function(){
    revertBorder($(this));
    removeSpan($("#editcpassspan"));
});
//role (uneditable, just display) - returning false to make it uneditable
$('#profileEditAdminCheck').on('click',function(){return false;});
$('#profileEditAdminReadCheck').on('click',function(){return false;});
$('#profileEditAdminWriteCheck').on('click',function(){return false;});
$('#profileEditUserCheck').on('click',function(){return false;});
$('#profileEditUserReadCheck').on('click',function(){return false;});
$('#profileEditUserWriteCheck').on('click',function(){return false;});

// changes button on pressed do
$("#profileEditChangeButton").on('click', function () {
    let flag = true;
    if (!isValidEditFname()) {
        redBorder($("#profileEditFname"));
        Nullify($("#profileEditFName"));
        DisplaySpan($("#editfnamespan"));
        flag = false;
    }
    if (!isValidEditLname()) {
        redBorder($("#profileEditLname"));
        Nullify($("#profileEditLName"));
        DisplaySpan($("#editlnamespan"));
        flag = false;
    }
    if (!isValidEditDate()) {
        redBorder($("#profileEditDOB"));
        Nullify($("#profileEditDOB"));
        DisplaySpan($("#editdobspan"));
        flag = false;
    }
    if (!isValidEditAddress()) {
        redBorder($("#profileEditAddress"));
        Nullify($("#profileEditAddress"));
        DisplaySpan($("#editaddressspan"));
        flag = false;
    }
    if (!isValidEditGender()) {
        NullifyCheck($("#profileEditGenderMale"));
        NullifyCheck($("#profileEditGenderFemale"));
        NullifyCheck($("#profileEditGenderOther"));
        DisplaySpan($("#editgenderspan"));
        flag = false;
    }
    if (!isValidEditLanguage()) {
        redBorder($("#profileEditLanguage"));
        Nullify($("#profileEditLanguage"));
        DisplaySpan($("#editlangspan"));
        flag = false;
    }
    if (!isValidEditSkill()) {
        redBorder($("#profileEditSkill"));
        Nullify($("#profileEditSkill"));
        DisplaySpan($("#editskillspan"));
        flag = false;
    }
    if (!isValidEditEmail()) {
        redBorder($("#profileEditEmail"));
        Nullify($("#profileEditEmail"));
        DisplaySpan($("#editemailspan"));
        flag = false;
    }
    if (!isValidEditContact()) {
        redBorder($("#profileEditContact"));
        Nullify($("#profileEditContact"));
        DisplaySpan($("#editcontactspan"));
        flag = false;
    }

    // if all above conditions met then do
    if (flag) {
        // the information gets updated here
        changeAndStoreInformation();
        // nullify all inputs and checks
        Nullify($("#profileEditFname"));
        Nullify($("#profileEditLname"));
        Nullify($("#profileEditDOB"));
        NullifyCheck($("#profileEditAdminCheck"));
        NullifyCheck($("#profileEditAdminReadCheck"));
        NullifyCheck($("#profileEditAdminWriteCheck"));
        NullifyCheck($("#profileEditUserCheck"));
        NullifyCheck($("#profileEditUserReadCheck"));
        NullifyCheck($("#profileEditUserWriteCheck"));
        Nullify($("#profileEditAddress"));
        NullifyCheck($("#profileEditGenderMale"));
        NullifyCheck($("#profileEditGenderFemale"));
        NullifyCheck($("#profileEditGenderOther"));
        Nullify($("#profileEditLanguage"));
        Nullify($("#profileEditSkill"));
        Nullify($("#profileEditEmail"));
        Nullify($("#profileEditContact"));

        // empty the pills
        $('#profileEditSkillPills').empty();
        // empty skillsarray to make sure pills came back at modal open
        skillsArray=[];
        // hide modal
        $('#profileEditModal').modal('hide');
        // show toast
        $('#homeToastMsg').text("Changes are perform successfuly !!");
        $("#viewHomeToast").toast('show');
        $("#homeToastButton").text('Okay');
        $("#homeToastButton").on('click',function(){
            $("#viewHomeToast").toast('hide');
        })
        // reload page to reload the profile pic changed gender-wise
        setTimeout(function(){
            location.reload();
        },1000);
    }

})


// profile logout button on pressed
$('#profileLogOutButton').on('click',function(){
    localStorage.removeItem('loggedUser');
    window.location.href = "loginPageHTML.html";
})












/*

// role edit can done by this but since we dont want to let user edit role we dont need it in edit profile yet (04/03/2024)

// role start
//admin
$("#profileEditAdminCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#editrolespan"));

    //logic for admin
    if ($(this).is(':checked')) {
        $("#profileEditAdminReadCheck").prop('checked', true);
        $("#profileEditAdminWriteCheck").prop('checked', true);
    }
    else {
        $("#profileEditAdminReadCheck").prop('checked', false);
        $("#profileEditAdminWriteCheck").prop('checked', false);
    }

    //logic for user
    $("#profileEditUserCheck").prop('indeterminate', false);
    $("#profileEditUserCheck").prop('checked', false);
    $("#profileEditUserReadCheck").prop('checked', false);
    $("#profileEditUserWriteCheck").prop('checked', false);
})
//admin read
$("#profileEditAdminReadCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#editrolespan"));

    //logic for admin
    if ($(this).is(':checked')) {
        if ($("#profileEditAdminWriteCheck").is(":checked")) {
            $("#profileEditAdminCheck").prop('indeterminate', false);
            $("#profileEditAdminCheck").prop('checked', true);
        }
        else {
            $("#profileEditAdminCheck").prop('indeterminate', true);
        }
    }
    else {
        if ($("#profileEditAdminWriteCheck").is(":checked")) {
            $("#profileEditAdminCheck").prop('indeterminate', true);
        }
        else {
            $("#profileEditAdminCheck").prop('indeterminate', false);
            $("#profileEditAdminCheck").prop('checked', false);
        }
    }

    //logic for user
    $("#profileEditUserCheck").prop('indeterminate', false);
    $("#profileEditUserCheck").prop('checked', false);
    $("#profileEditUserReadCheck").prop('checked', false);
    $("#profileEditUserWriteCheck").prop('checked', false);
})
//admin write
$("#profileEditAdminWriteCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#editrolespan"));

    //logic for admin
    if ($(this).is(':checked')) {
        if ($("#profileEditAdminReadCheck").is(":checked")) {
            $("#profileEditAdminCheck").prop('indeterminate', false);
            $("#profileEditAdminCheck").prop('checked', true);
        }
        else {
            $("#profileEditAdminCheck").prop('indeterminate', true);
        }
    }
    else {
        if ($("#profileEditAdminReadCheck").is(":checked")) {
            $("#profileEditAdminCheck").prop('indeterminate', true);
        }
        else {
            $("#profileEditAdminCheck").prop('indeterminate', false);
            $("#profileEditAdminCheck").prop('checked', false);
        }
    }

    //logic for user
    $("#profileEditUserCheck").prop('indeterminate', false);
    $("#profileEditUserCheck").prop('checked', false);
    $("#profileEditUserReadCheck").prop('checked', false);
    $("#profileEditUserWriteCheck").prop('checked', false);
})

//user
$("#profileEditUserCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#editrolespan"));

    //logic for user
    if ($(this).is(':checked')) {
        $("#profileEditUserReadCheck").prop('checked', true);
        $("#profileEditUserWriteCheck").prop('checked', true);
    }
    else {
        $("#profileEditUserReadCheck").prop('checked', false);
        $("#profileEditUserWriteCheck").prop('checked', false);
    }

    //logic for admin
    $("#profileEditAdminCheck").prop('indeterminate', false);
    $("#profileEditAdminCheck").prop('checked', false);
    $("#profileEditAdminReadCheck").prop('checked', false);
    $("#profileEditAdminWriteCheck").prop('checked', false);
})
//user read
$("#profileEditUserReadCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#editrolespan"));

    //logic for user
    if ($(this).is(':checked')) {
        if ($("#profileEditUserWriteCheck").is(":checked")) {
            $("#profileEditUserCheck").prop('indeterminate', false);
            $("#profileEditUserCheck").prop('checked', true);
        }
        else {
            $("#profileEditUserCheck").prop('indeterminate', true);
        }
    }
    else {
        if ($("#profileEditUserWriteCheck").is(":checked")) {
            $("#profileEditUserCheck").prop('indeterminate', true);
        }
        else {
            $("#profileEditUserCheck").prop('indeterminate', false);
            $("#profileEditUserCheck").prop('checked', false);
        }
    }

    //logic for admin
    $("#profileEditAdminCheck").prop('indeterminate', false);
    $("#profileEditAdminCheck").prop('checked', false);
    $("#profileEditAdminReadCheck").prop('checked', false);
    $("#profileEditAdminWriteCheck").prop('checked', false);
})
//user write
$("#profileEditUserWriteCheck").on('click', function () {
    // disableSignup();
    removeSpan($("#editrolespan"));

    //logic for user
    if ($(this).is(':checked')) {
        if ($("#profileEditUserReadCheck").is(":checked")) {
            $("#profileEditUserCheck").prop('indeterminate', false);
            $("#profileEditUserCheck").prop('checked', true);
        }
        else {
            $("#profileEditUserCheck").prop('indeterminate', true);
        }
    }
    else {
        if ($("#profileEditUserReadCheck").is(":checked")) {
            $("#profileEditUserCheck").prop('indeterminate', true);
        }
        else {
            $("#profileEditUserCheck").prop('indeterminate', false);
            $("#profileEditUserCheck").prop('checked', false);
        }
    }

    //logic for admin
    $("#profileEditAdminCheck").prop('indeterminate', false);
    $("#profileEditAdminCheck").prop('checked', false);
    $("#profileEditAdminReadCheck").prop('checked', false);
    $("#profileEditAdminWriteCheck").prop('checked', false);
})

//role ends here

*/