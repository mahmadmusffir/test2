$(document).ready(function () {

    var str1 = Cookies.get("str1");

    var jsonObject = { "str1": str1 };
    $.ajax({
        type: "POST",
        url: "/api/User/UserProfile",
        data: JSON.stringify(jsonObject),
        contentType: 'application/json',
        success: function (response) {
            

            $.each(response, function (index, value) {
                var gender = value.gender;
                $("#txtsName").val(value.name);
                $("#txtsFName").val(value.fatherName);
                if (gender == "Male") {
                    $("#sMale").prop("checked", true);
                }
                else {
                    $("#sFemale").prop("checked", true);

                }

                $("#txtsPhone").val(value.phoneNumber);
                $("#txtsEmail").val(value.email);
                $("#txtsAddress").val(value.address);
                $("#txtsUsername").val(value.username);
            });
        }
    });


    $("#btnsPSubmit").click(function () {

        var Currentpassword = $("#txtsPassword").val();
        var Newpassword = $("#txtsnewPassword").val();
        var CNewpassword = $("#txtscnewPassword").val();
        var id = Cookies.get("str1");
        if (Currentpassword.length == 0 || Newpassword.length == 0 || CNewpassword.length == 0) {

            showNotification('bottom', 'right', 'Input is Required..', 'error');
        } else {
            if (Newpassword != CNewpassword) {

                showNotification('bottom', 'right', 'Password Not Mached', 'error');
            } else {
                var jsonObject = { "id": id, "oldPassword": Currentpassword, "newPassword": Newpassword };

                $.ajax({
                    type: "POST",
                    url: "/api/User/ChangePassword",
                    data: JSON.stringify(jsonObject),
                    contentType: 'application/json',
                    success: function (response) {

                        if (response.status == "Password Update Successfully") {

                            $("#txtsPassword").val('');
                            $("#txtsnewPassword").val('');
                            $("#txtscnewPassword").val('');

                            showNotification('bottom', 'right', 'Password Update Successfully', 'done', 'success');
                            setTimeout(function () {
                                location.reload();
                            }, 800);

                        }
                        else if (response.status == "Old Password is Incorrect") {
                            $('body').preloader('remove');
                            showNotification('bottom', 'right', 'Old Password is Incorrect', 'error');
                        }

                        else {
                            $('body').preloader('remove');
                            showNotification('bottom', 'right', 'Password Updation Failed', 'error');
                        }
                    },
                });
            }
        }
    });

    $("#btnsImgSubmit").click(function () {
    var formData = new FormData();
    
        var totalFiles = document.getElementById("emp-picture").files.length;
        for (var a = 0; a < totalFiles; a++) {
            var file = document.getElementById("emp-picture").files[a];
        }

        var id = Cookies.get("str1");

        formData.append("files", file);
        formData.append("studentId", id);
        $("#btnsImgSubmit").hide();
    $.ajax({
        type: 'Post',
        url: '/api/User/ChangeProfileImage',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response == "File Uploaded successfully") {
                showNotification('top', 'right', 'Image Uploaded Successfully', 'done', 'success');
                $("#btnsImgSubmit").show();
                setTimeout(function () { window.location.reload(); }, 1200);
            }
            else {

                showNotification('top', 'right', 'Image Upload Failed', 'warning', 'success');
                
                $("#btnsImgSubmit").show();
            }
        },
        error: function (errormsg) { prompt("", JSON.stringify(errormsg)) }
    });
        $("#btnsImgSubmit").show();
    });


});