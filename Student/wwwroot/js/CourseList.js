$(document).ready(function () {
    var updateCourse = 0;
    var Id = 0;
    var cid = 0;
    var sId = Cookies.get("str1");

    var jsonObject = { str1: sId };

    $.ajax({
        type: "POST",
        url: "/api/CourseApi/GetAllCourses",
        data: JSON.stringify(jsonObject),
        contentType: 'application/json',
        success: function (response) {
            $.each(response, function (index, value) {
                Id = Id + 1;
                $("#courseList").append("<tr><td>" + Id + "</td><td>" + value.coursetitle + "</td><td>" + value.fee + "</td> <td>" + value.description + "</td><td class='td-actions text-right'><button type='button' rel='tooltip' class='btn btn-success btn-round btnStudent' id='btnStudent" + value.courseid + "'><i class='material-icons'>perm_identity</i></button>&nbsp;<button type='button' rel='tooltip' class='btn btn-success btn-round btnUpdate' id='btnUpdate" + value.courseid + "'><i class='material-icons'>edit</i></button>&nbsp;<button type='button' rel='tooltip' class='btn btn-danger btn-round btnDelete' id='btnDelete" + value.courseid + "'><i class='material-icons'>close</i></button> </td></tr>");
            });
            DataTabel_NET();


        }
    });

    $(document).on('click', '.btnDelete', function () {
        var id = $(this).attr('id');
        id = id.replace("btnDelete", "");
        var jsonObject = {courseid: id };
        if (confirm("Are you sure you want to delete?")) {
            $.ajax({
                type: "POST",
                url: "/api/CourseApi/DeleteCourse",
                data: JSON.stringify(jsonObject),
                contentType: 'application/json',
                success: function (response) {


                    if (response.status === "Delete Successfully") {
                        showNotification('top', 'right', 'Course Deleted Successfully', 'done', 'success');
                        datatable.destroy();
                        $("#btnDelete" + response.id).closest('tr').remove();
                        DataTabel_NET();
                    }
                    else {
                        showNotification('top', 'right', response.status, 'error', 'danger');
                    }
                },

            });

        }

    });

    $(document).on('click', '.btnStudent', function () {
        var id = $(this).attr('id');
        id = id.replace("btnStudent", "");
        var jsonObject = { courseid: id };
        $.ajax({
            type: "POST",
            url: "/api/CourseApi/GetCourseStudent",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                $("#tblStudent").html('');
                $.each(response, function (index, value) {

                    sr = index + 1;
                    $("#tblStudent").append('<tr id="row' + value.bindId + '"> <td>' + sr + '</td> <td> ' + value.name + ' </td> <td> ' + value.fatherName + ' </td><td> ' + value.email + ' </td> <td> ' + value.phoneNumber + ' </td><td class="td-actions text-right"> <button type="button" rel="tooltip" class="btn btn-danger btn-round btnbDelete" id="btnbDelete' + value.bindId + '"><i class="material-icons">close</i></button> </td> </tr>');
                   
                });
                DataTabel_NETById('#datatablesstd');

                
            },
            error: function (errormsg) { prompt("", JSON.stringify(errormsg)) }
        });
        $('#studentModal').modal('show');

    });

    $(document).on('click', '.btnbDelete', function () {
            var id = $(this).attr('id');
        id = id.replace("btnbDelete", "");
            var jsonObject = { bindId: id };
            if (confirm("Are you sure you want to delete?")) {
                $.ajax({
                    type: "POST",
                    url: "/api/CourseApi/DeleteBindStudent",
                    data: JSON.stringify(jsonObject),
                    contentType: 'application/json',
                    success: function (response) {


                        if (response.status === "Delete Successfully") {
                            showNotification('top', 'right', 'Record Deleted Successfully', 'done', 'success');
                            datatable.destroy();
                            $("#btnbDelete" + response.id).closest('tr').remove();
                            DataTabel_NETById('#datatablesstd');
                        }
                        else {
                            showNotification('top', 'right', response.status, 'error', 'danger');
                        }
                    },

                });

            }

    });


    $(document).on('click', '.btnUpdate', function () {
        var id = $(this).attr('id');
        id = id.replace("btnUpdate", "");
        cid = id;
        updateCourse = $(this).closest('tr');
        var CourseTitle = $(updateCourse).find('td').eq(1).html();
        var Fee = $(updateCourse).find('td').eq(2).html();
        var Description = $(updateCourse).find('td').eq(3).html();
        $('#txtCoursetitle').val(CourseTitle);
        $('#txtFee').val(Fee);
        $('#txtDescription').val(Description);
        $('#CourseUpdate').modal('show');
    });


    $('#btnsSubmit').click(function () {
        var CourseTitle = $("#txtCoursetitle").val();
        var Fee = $("#txtFee").val();
        var Description = $("#txtDescription").val();

        var jsonObject = { "coursetitle": CourseTitle, "description": Description, "fee": Fee, courseid: cid };
        $.ajax({
            type: "POST",
            url: "/api/CourseApi/UpdateCourse",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                if (response.status == "Updated Successfully") {

                    $(updateCourse).find('td').eq(1).html(CourseTitle);
                    $(updateCourse).find('td').eq(2).html(Fee);
                    $(updateCourse).find('td').eq(3).html(Description);

                    showNotification('top', 'right', 'Course Updated Successfully', 'done', 'success');


                } else {

                    showNotification('top', 'right', response.status, 'error', 'danger');

                }

            },
        });
        $('#CourseUpdate').modal('hide');

    });

});