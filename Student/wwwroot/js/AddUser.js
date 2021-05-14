$(document).ready(function () {


    $("#btnsSubmit").click(function () {

        var Name = $("#txtsName").val();
        var FName = $("#txtsFName").val();
        var PhoneNumber = $("#txtsPhone").val();
        var Email = $("#txtsEmail").val();
        var gender = "Male";
        if ($('#sFemale').is(":checked")) {
            gender = "Female";
        }
        var Address = $("#txtsAddress").val();
        var Username = $("#txtsUsername").val();
        var Password = $("#txtsPassword").val();
        var Insertedbyid = Cookies.get("str1");

        if (Name.length == 0 || FName.length == 0 || PhoneNumber.length == 0 || Email.length == 0 || Address.length == 0 || Username.length == 0 || Password.length == 0) {
            showNotification('bottom', 'right', 'Input is Required..', 'error');
        } else {

            var jsonObject = { "name": Name, "fatherName": FName, "email": Email, "phoneNumber": PhoneNumber, "gender": gender, "address": Address, "username": Username, "password": Password, "insertedbyid": Insertedbyid };
            $('body').preloader({ text: '', percent: 'API', duration: '', zIndex: '99999', setRelative: false });
            $.ajax({
                type: "POST",
                url: "/api/User/InsertData",
                data: JSON.stringify(jsonObject),
                contentType: 'application/json',
                success: function (response) {
                    if (response.status == "Inserted Successfully") {

                        $('body').preloader('remove');
                        $('#txtsName').val('');
                        $('#txtsFName').val('');
                        $('#txtsPhone').val('');
                        $('#txtsEmail').val('');
                        $('#txtsAddress').val('');
                        $('#Username').val('');
                        $('#Password').val('');
                        showNotification('bottom', 'right', 'Register Successfully', 'done', 'success');
                        setTimeout(function () {
                            location.reload();
                        }, 800);
                    }
                    else if (response.status == "Email Matched") {
                        $('body').preloader('remove');
                        showNotification('bottom', 'right', 'Email already exist', 'error');
                    }
                    else if (response.status == "Username Matched") {
                        $('body').preloader('remove');
                        showNotification('bottom', 'right', 'Username already exist', 'error');
                    }

                    else {
                        $('body').preloader('remove');
                        showNotification('bottom', 'right', 'Registration Failed', 'error');
                    }
                },
            });
        }
    });

});