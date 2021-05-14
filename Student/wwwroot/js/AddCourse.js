$(document).ready(function () {


    $("#btnsSubmit").click(function () {

        var CourseTitle = $("#txtCoursetitle").val();
        var Fee = $("#txtFee").val();
        var Description = $("#txtDescription").val();
        var Insertedbyid = Cookies.get("str1");

        if (CourseTitle.length == 0 || Fee.length == 0) {
            showNotification('bottom', 'right', 'Input is Required..', 'error');
        } else {

            var jsonObject = { "coursetitle": CourseTitle, "description": Description, "fee": Fee, "Insertedbyid": Insertedbyid };
            $('body').preloader({ text: '', percent: 'API', duration: '', zIndex: '99999', setRelative: false });
            $.ajax({
                type: "POST",
                url: "/api/CourseApi/InsertCourses",
                data: JSON.stringify(jsonObject),
                contentType: 'application/json',
                success: function (response) {
                    if (response.status == "Inserted Successfully") {

                        $('body').preloader('remove');
                        $('#txtCoursetitle').val('');
                        $('#txtFee').val('');
                        $('#txtDescription').val('');
                        showNotification('bottom', 'right', 'Course Inserted Successfully', 'done', 'success');
                        setTimeout(function () {
                            location.reload();
                        }, 800);
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