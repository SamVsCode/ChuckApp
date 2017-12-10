$('document').ready(function () {
  if (localStorage.getItem('token') === null || localStorage.getItem('token') === "undefined") {
    if (window.GLOBAL_User === 'undefined' || window.GLOBAL_User === null) {
      return $.mobile.changePage('/login');
    }
    var token = window.GLOBAL_User;
    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') !== null || localStorage.getItem('token') !== "undefined") {
      // window.location.href = ''
      $.mobile.changePage('/home', {
        transition: "flip"
      });
    }
  }
});

