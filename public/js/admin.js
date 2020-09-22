(function ($) {
    "use strict";
  
    $(document).ready(function(){
        function renderUsers(data){
          var el=$('#userDetails');
          var html='';
          //el.html(html);
          if(data.length == 0){
            html=` <div style="color:red">No Users Registered</div>`
            el.append(html)
          }else{
            el.html('');
            for (var i = 0; i < data.length; i++) {
              var user=data[i];
               html=`<tr>
                      <td>${user.firstName}</td>
                      <td>${user.lastName}</td>
                      <td>${user.email}</td>
                     
                    </tr>`;  
                  el.append(html);
            }
          }
        }
       
       function searchUsers(){

         var data={};
          auth.requestSearchusersService(data).done(function(response){
            if(response.status == true){
             renderUsers(response.result);
            }else{
               renderUsers(response.data);
            }
          })  
        }
     
        
        var auth={
            requestSearchusersService:function(data){
              return $.ajax({
                 url: "/userAPI/searchUsers",
                 method: "GET",
                 cache:false,
                 data: data
              })
          }
      
          };
          searchUsers();
      });
      

    
})(jQuery);

  