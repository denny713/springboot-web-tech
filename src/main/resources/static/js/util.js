$(document).ready(function () {
    hideLoader();
});

function hideLoader() {
    $("#loading").modal("hide");
}

function showLoader() {
    $("#loading").modal("show");
}

function showAlert(type, content, callback) {
    var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
    var _title = null;
    var _message = null;
    if (typeof content == 'string') {
        _title = type[0].toUpperCase() + type.slice(1);
        _message = content
    } else {
        _title = content.title;
        _message = content.message;
    }
    if (isHTML(_message)) {
        Swal.fire({
            title: _title,
            html: _message,
            type: type,
            animation: false,
            customClass: {
                popup: 'animated zoomIn'
            }
        }).then(function () {
            callback && callback();
        });
    } else {
        Swal.fire({
            title: _title,
            text: _message,
            type: type,
            animation: false,
            customClass: {
                popup: 'animated zoomIn'
            }
        }).then(function () {
            callback && callback();
        });
    }
}

function textMoneyFormat() {
    var textInputComponents = $('.money-format');
    textInputComponents.each(function (index) {
        if ($(this).val()) {
            var formatted = moneyFormat($(this).val());
            $(this).val(formatted)
        } else if ($(this).text()) {
            var formatted = moneyFormat($(this).text());
            $(this).html(formatted);
        }
        $(this).keyup(function () {
            $(this).val(moneyFormat($(this).val()));
        });
    });
}

function textPercentFormat() {
    var textPercentComponents = $('.percent-format');
    textPercentComponents.each(function (index) {
        if ($(this).val()) {
            var formatted = parseFloat($(this).val());
            $(this).val(formatted);
        } else if ($(this).text()) {
            var formatted = parseFloat($(this).text());
            $(this).html(formatted.toFixed(2) + " %");
        }
    });
}

function formatMoneyDisplay(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1\,");
}

function removeMoneyDelimiters(num) {
    if (num && num !== undefined) {
        return Number(num.replace(/,/g, ''));
    } else {
        return num;
    }
}

function moneyFormat(desc) {
    if (desc === "" || desc === null) {
        return "0";
    } else {
        var regex = /^[0-9-.,\b\t ]+$/;
        if (!regex.test(desc)) {
            showAlert('warning', "Only Number Please [0-9]");
            return "0";
        } else {
            desc = removeMoneyDelimiters(desc);
            var money = parseFloat(desc);
            return money.formatMoney(0);
        }
    }
}

Number.prototype.formatMoney = function (decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator === undefined ? "." : decSeparator,
        thouSeparator = thouSeparator === undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};
