(function ($) {
    "use strict";
  
$(document).ready(function(){
      
     $('#submitBlock').click(function(e){
        e.preventDefault();
        var data=$('#registerBlock').serialize()        
        auth.requestSignupService(data).done(function(response){           
            if(response.status == true){                
                $('#registerBlock').trigger('reset');
               }
               console.log(response.result[0])
               var el=$('#returnBlock');
                var html='';
                el.html(html);              
                  el.html('');
                  for (var i = 0; i < response.result.length; i++) {
                    var blog=response.result[i].blog;
                    html=`
                     <p>${blog}</p>
                        `;                          
                    el.append(html);
                  }          
            });       
     
        });

       $('#submitBlock').click(function(e){
        e.preventDefault();
        var data=$('#registerBlock').serialize()        
          auth.requestSignupService(data).done(function(response){           
            if(response.status == true){                
                $('#registerBlock').trigger('reset');
               }
               console.log(response.result[0])
               var el=$('#returnBlock');
                var html='';
                el.html(html);              
                  el.html('');
                for (var i = 0; i < response.result.length; i++) {
                    var blog=response.result[i].blog;
                    html=`<p>${blog}</p>`;                          
                    el.append(html);
                }         
          });
      });

      var auth={
      requestSignupService:function(data){
        return $.ajax({
           url: "/userAPI/blog",
           method: "POST",
           cache:false,
           data: data
        })
    }

    };
});
  })(jQuery);

  