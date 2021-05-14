$(document).ready(function () {
    var Id = Cookies.get("str1");

    var jsonObject = { str1: Id };

    $.ajax({
        type: "POST",
        url: "/api/CourseApi/GetBindStudent",
        data: JSON.stringify(jsonObject),
        contentType: 'application/json',
        success: function (response) {
            $.each(response, function (index, value) {
                var y = 1;
                var date = new Date(value.bsdatetime);
                var day = date.getDate();
                var month = date.getMonth() + y;
                var year = date.getFullYear();

                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12; 
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var Time = hours + ':' + minutes + ' ' + ampm;

                var bdate = (day < 10 ? '0' : '') + day + '/' +
                    (month < 10 ? '0' : '') + month + '/' +
                    year;

                var bsdateTime = bdate + '  ' + Time

                $("#bindStudentList").append("<tr><td>#" + value.bsid + "</td><td>" + value.studentName + "</td><td>" + value.courseTitle + "</td> <td>" + bsdateTime + "</td><td class='td-actions text-right'><button type='button' rel='tooltip' class='btn btn-danger btn-round btnDelete' id='btnDelete" + value.bsid + "'><i class='material-icons'>close</i></button> </td></tr>");
            });
            DataTabel_NET();


        }
    });

    $(document).on('click', '.btnDelete', function () {
        var id = $(this).attr('id');
        id = id.replace("btnDelete", "");
        var jsonObject = {bindId: id };
        if (confirm("Are you sure you want to delete?")) {
            $.ajax({
                type: "POST",
                url: "/api/CourseApi/DeleteBindStudent",
                data: JSON.stringify(jsonObject),
                contentType: 'application/json',
                success: function (response) {


                    if (response.status === "Delete Successfully") {
                        showNotification('top', 'right', 'Record Deleted Successfully', 'done', 'success');
                        $("#btnDelete" + response.id).closest('tr').remove();
                    }
                    else {
                        showNotification('top', 'right', response.status, 'error', 'danger');
                    }
                },

            });

        }

    });
});