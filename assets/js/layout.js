$.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('authorization', 'Bearer '+localStorage.getItem('token'));
    }
});
$(document).ready(function () {
    $("[data-role='header'], [data-role='footer']").toolbar();
    $("body>[data-role='panel']").panel();
});
