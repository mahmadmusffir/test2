$(document).ready(function () {
    var updateUser = 0;
    var sid = 0;
    var Id = Cookies.get("str1");

    var jsonObject = { str1: Id };

    $.ajax({
        type: "POST",
        url: "/api/User/GetAllUser",
        data: JSON.stringify(jsonObject),
        contentType: 'application/json',
        success: function (response) {
            $.each(response, function (index, value) {
                $("#userList").append("<tr><td>" + value.name + "</td><td>" + value.fatherName + "</td><td>" + value.email + "</td> <td>" + value.phoneNumber + "</td><td>" + value.gender + "</td><td>" + value.address + "</td><td><img src ='" + value.image + "' width='60' height='60'></td><td class='td-actions text-right'><button type='button' rel='tooltip' class='btn btn-success btn-round btnUpdate' id='btnUpdate" + value.id + "'><i class='material-icons'>edit</i></button>&nbsp;<button type='button' rel='tooltip' class='btn btn-danger btn-round btnDelete' id='btnDelete" + value.id + "'><i class='material-icons'>close</i></button> </td></tr>");
            });
            DataTabel_NET();


        }
    });

    $(document).on('click', '.btnDelete', function () {
        var id = $(this).attr('id');
        id = id.replace("btnDelete", "");
        var Deactivebyid = Cookies.get("str1");
        var jsonObject = { "deactivebyid": Deactivebyid, id: id };
        if (confirm("Are you sure you want to delete?")) {
            $.ajax({
                type: "POST",
                url: "/api/User/DeleteUser",
                data: JSON.stringify(jsonObject),
                contentType: 'application/json',
                success: function (response) {


                    if (response.status === "Delete Successfully") {
                        showNotification('top', 'right', 'User Deleted Successfully', 'done', 'success');
                        $("#btnDelete" + response.id).closest('tr').remove();
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
        sid = id;
        updateUser = $(this).closest('tr');
        var name = $(updateUser).find('td').eq(0).html();
        var fathername = $(updateUser).find('td').eq(1).html();
        var email = $(updateUser).find('td').eq(2).html();
        var phone = $(updateUser).find('td').eq(3).html();
        var gender = $(updateUser).find('td').eq(4).html();
        var address = $(updateUser).find('td').eq(5).html();
        $('#txtsName').val(name);
        $('#txtsFName').val(fathername);
        $('#txtsPhone').val(phone);
        $('#txtsEmail').val(email);
        $('#txtsAddress').val(address);

        if (gender == "Male") {
            $("#sMale").prop("checked", true);
        }
        else
        {
            $("#sFemale").prop("checked", true);

        }
        $('#UserUpdate').modal('show');
    });


    $('#btnsSubmit').click(function () {
        var Name = $("#txtsName").val();
        var FName = $("#txtsFName").val();
        var PhoneNumber = $("#txtsPhone").val();
        var Email = $("#txtsEmail").val();
        var gender = "";
        if ($("#sMale").is(":checked")) {
            gender = "Male";
        }
        else
        {
            gender = "Female";
        }
        var Address = $("#txtsAddress").val();

        var jsonObject = { "name": Name, "fatherName": FName, "phoneNumber": PhoneNumber, "email": Email, "gender": gender, "address": Address, "id": sid};
        $.ajax({
            type: "POST",
            url: "/api/User/UpdateUser",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                if (response.status == "Updated Successfully") {

                    $(updateUser).find('td').eq(0).html(Name);
                    $(updateUser).find('td').eq(1).html(FName);
                    $(updateUser).find('td').eq(2).html(Email);
                    $(updateUser).find('td').eq(3).html(PhoneNumber);
                    $(updateUser).find('td').eq(4).html(gender);
                    $(updateUser).find('td').eq(5).html(Address);
           
                    showNotification('top', 'right', 'User Updated Successfully', 'done', 'success');


                } else {

                    showNotification('top', 'right', response.status, 'error', 'danger');

                }

            },
        });
        $('#UserUpdate').modal('hide');

    });


});