$('document').ready(function () {
  console.log('bla');
  if (localStorage.getItem('token') === null || localStorage.getItem('token') === "undefined") {
    console.log('lala');
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

