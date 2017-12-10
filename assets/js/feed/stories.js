$( document ).on( "pageinit", "#home", function( event ) {
    $.ajax({
        url: 'http://localhost:1337/user',
        type: 'GET',
        success: function(results){
            results.forEach(function(result){
                $('#userlist').append('<li><a href="'+result.profileUrl+'"><img src="'+result.avatar+'" /><h3>'+result.name+'</h3><p>'+result.email+'</p></a></li>');                
            });
            $('#userlist').listview("refresh");
        }
    })
});
  