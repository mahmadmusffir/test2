$(document).ready(function () {

    $(".btnlogout").click(function () {
        Cookies.remove('str1');

        window.location.href = "/Home/Index";

    });



    var str1 = Cookies.get("str1");

    var jsonObject = { "str1": str1 };
    $.ajax({
        type: "POST",
        url: "/api/User/GetUserData", 
        data: JSON.stringify(jsonObject),
        contentType: 'application/json',
        success: function (response) {
            $.each(response, function (index, value) {

                $('#CCEmployeeName').html(value.name + ' <b class="caret"></b>');
                $('#CCEmployeePic').attr('src', value.image);

            });
        }
    });


});
var datatable = "";
var datatable2 = "";
var datatable3 = "";
function DataTabel_NET() {
    if (datatable !== '') {
        datatable = '';
    }
    if (!$.fn.dataTable.isDataTable('#datatables')) {
        datatable = $('#datatables').DataTable({
            retrieve: true,
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records"
            }
        });

    }
}
function DataTabel_NETById(id) {
    if (datatable !== '') {
        datatable = '';
    }
    if (!$.fn.dataTable.isDataTable(id)) {
        datatable = $(id).DataTable({
            retrieve: true,
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records"
            }
        });

    }

}

function DataTabel_Without_Pagination() {
    if (!$.fn.dataTable.isDataTable('#datatables')) {
        datatable2 = $('#datatables').DataTable({
            responsive: true,
            bPaginate: false,
            ordering: false,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records"
            }
        });

    }
}

function DataTabel_Without_PaginationById(id) {
    if (!$.fn.dataTable.isDataTable(id)) {
        datatable3 = $(id).DataTable({
            responsive: false,
            bPaginate: false,
            ordering: false,
            searching: false,
            info: false

        });

    }

}