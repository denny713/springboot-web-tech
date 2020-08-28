$(function () {
    // DataTable
    var table = $('#table').DataTable({
        'destroy': true,
        'dom': '<"top">rt<"bottom"lip><"clear">',
        'language': {
            'lengthMenu': '_MENU_',
            'info': '_PAGE_ to _PAGES_ from _MAX_ data',
            'infoFiltered': '',
            "paginate": {
                "previous": "<i class='fa fa-angle-left'></i>",
                "next": "<i class='fa fa-angle-right'></i>"
            }
        },
        // 'columnDefs': [{
        //     'orderable': false,
        //     'className': 'select-checkbox',
        //     'targets': 0
        // }],
        'select': {
            'style': ($('#table thead th').eq(0).get(0) && $('#table thead th').eq(0).get(0).hasAttribute('single') ? 'single' : 'multiple'),
            'selector': 'td:first-child'
        }
    }).on('draw.dt', function () {
        convertDateDatatables();
        textMoneyFormat();
    });

    // Setup - add a text input to each footer cell
    $('#table tfoot th').each(function (index) {
        var title = $(this).text();
        if ($(this).is(":last-child")) {
            if ($(this).attr("class") === "no-action") {
                $(this).html('<input type="text" class="searchText" placeholder="Search ' + title + '" />');
            } else {
                var hideShowDelete = (table.column(index).header().hasAttribute("hide-delete")) ? '' : '<li><a href="#" onclick="deleteBulkModules();"><i class="fa fa-times"></i> Delete</a></li></ul></div>';
                $(this).html('<div class="btn-group m-0" style="width: 136px" role="group"> ' +
                    '<button type="button" class="bttn bttn-blue custom-button-search"><i class="fa fa-search"></i> Search</button>' +
                    '<button type="button" class="bttn bttn-blue dropdown-toggle custom-button-caret" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>' +
                    '<ul class="dropdown-menu">' +
                    '<li><a href="#" onclick="reset();"><i class="fa fa-undo"></i> Reset</a></li>' +
                    hideShowDelete);
            }
        } else {
            if ($(this).attr("class") === "choices") {
                $(this).html('<div class="col-sm-6 text-center">T</div><div class="col-sm-6 text-center">F</div>');
            } else {
                $(this).html('<input type="text" class="searchText" placeholder="Search ' + title + '" />');
            }
        }
    });

    // Apply the search
    table.columns().every(function () {
        var that = this;
        $('input', this.footer()).addClass('form-control');
        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
        convertDateDatatables();
        textMoneyFormat();
    });

    $('#table').on('click', 'tbody tr', function () {
        var selectedData = table.rows({selected: true}).data().length;
        if (table.row(this, {selected: true}).any()) {
            $('#checkAll').attr('class', 'custom-checkbox-header');
        } else {
            if (selectedData + 1 === table.rows().data().length) {
                $('#checkAll').attr('class', 'custom-checkbox-header2');
            } else {
                $('#checkAll').attr('class', 'custom-checkbox-header');
            }
        }
        setTimeout(function () {
            $('.datatables-counter').html(getSelectedData().length);
        }, 240);
    });

    $('#checkAll').on('click', function () {
        if ($(this).attr('class') === 'custom-checkbox-header') {
            table.rows().select();
            $('.datatables-counter').html(table.rows().data().length);
            $(this).attr('class', 'custom-checkbox-header2');
        } else {
            table.rows().deselect();
            $('.datatables-counter').html('0');
            $(this).attr('class', 'custom-checkbox-header');
        }
    });

});

function reset() {
    $('.searchText').val('').change();
}

function getSelectedData() {
    return $('#table').DataTable().rows('.selected').data();
}

function getAllData() {
    return $('#table').DataTable().rows().data();
}

function convertDateDatatables() {
    var dateComponent = $(".convert-date");
    var regex = /^((19|2[0-9])[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/gm;
    if (dateComponent) {
        dateComponent.each(function (index) {
            var valDate = $(this).text();
            if (!regex.test(valDate)) {
                var tgl = convertDate(valDate);
                $(this).html(tgl)
            }
        });
    }
}

function convertDate(val) {
    var regex = /^((19|2[0-9])[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/gm;
    if (!regex.test(val)) {
        //var date = new Date(valDate.replace('00:00:00 ICT ', ''));
        var date = new Date(val.replace(val.substring(11, 23), ''));
        date.setDate(date.getDate() + 1);
        var tgl = date.toISOString().substring(0, 10);
        return tgl;
    }
    return val;
}

function converDate2(val, type) {
    var date = convertDate(val); //YYYY-MM-DD
    if (type === 1) { // DD/MM/YYYY
        return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
    } else { // MM/DD/YYYY
        return date.substring(5, 7) + "/" + date.substring(8, 10) + "/" + date.substring(0, 4);
    }
}
