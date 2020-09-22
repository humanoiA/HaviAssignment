(function ($) {
    "use strict";
  
    $(document).ready(function(){
      
     $('#login').click(function(e){
        e.preventDefault();
       
        
        
          auth.requestSignupService($('#register').serialize()).done(function(response){           
            if(response.status == true){
             $('#signup_error').addClass('signup_success');
             $('#signup_error').html(response.message);
             $('#register').trigger('reset');
            }else{
             $('#signup_error').addClass('signup_error');
             $('#signup_error').html(response.message);
            };
            setTimeout(function(){
                location.href=response.redirectTo;
              },500)
          })
          
       
      });
      var auth={
      requestSignupService:function(data){
        return $.ajax({
           url: "/userAPI/loginUser ",
           method: "POST",
           cache:false,
           data: data
        })
    }

    };
});
  })(jQuery);