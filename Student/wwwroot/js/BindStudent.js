
$(document).ready(function () {
    $('.selectpicker').selectpicker();
    var Id = Cookies.get("str1");

    var jsonObject = { str1: Id };

    $.ajax({
        type: "POST",
        url: "/api/CourseApi/GetAllCourses",
        data: JSON.stringify(jsonObject),
        contentType: 'application/json',
        success: function (response) {
            $("#selectClass").html('');
            $("#selectClass").append('<option disabled>Choose Course</option>');
            $.each(response, function (index, value) {
                $('#selectClass').append('<option value="' + value.courseid + '" fee="' + value.fee + '"  desc="' + value.description + '">' + value.coursetitle + '</option>');
            });
            $("#selectClass").selectpicker('refresh');
        }
    });

    $.ajax({
        type: "POST",
        url: "/api/User/GetAllUser",
        data: JSON.stringify(jsonObject),
        contentType: 'application/json',
        success: function (response) {
            $("#selectStudent").html('');
            $("#selectStudent").append('<option disabled>Choose Student</option>');
            $.each(response, function (index, value) {
                $('#selectStudent').append('<option value="' + value.id + '" address="' + value.address + '" email="' + value.email + '" phone="' + value.phoneNumber + '">' + value.name + '</option>');
            });
            $("#selectStudent").selectpicker('refresh');
        }
    });

    $("#selectStudent").change(function () {
        $('#stdEmail').html($("#selectStudent option:selected").attr('email'));
        $('#stdPhone').html($("#selectStudent option:selected").attr('phone'));
        $('#stdAddress').html($("#selectStudent option:selected").attr('address'));
    });
    $('#btnSavebind').click(function () {
        var CourseId = $("#selectClass option:selected").val();
        var Studentid = $("#selectStudent option:selected").val();
            
        var jsonObject = { "studentId": Studentid, "courseId": CourseId };
        $.ajax({
            type: "POST",
            url: "/api/CourseApi/BindStudent",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {

                if (response.status == 'Data Saved') {
                    showNotification('top', 'right', 'Data Saved.', 'done', 'success');
                    setTimeout(function () { window.location.reload(); }, 1200);
                } else {

                    showNotification('top', 'right', response.status, 'warning', 'danger');
                }
            },
            error: function (errormsg) { prompt("", JSON.stringify(errormsg)) }
        });
                            
    });
});