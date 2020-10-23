
$(document).ready(function(){

    $("#brew-form-submit").on("click", function(event) {
    
      var city = $("#city-name-input").val();
      
      $.ajax({
        url:"/api/brewery/"+ city,  
        method: "GET"
    
	    }).then(function(data) {
        $("#brews").empty();
          console.log(data)
        for ( let i = 0; i < data.length; i++) {
            var li = $(` 

            <li class="list-item brewery-list"><p>Brewery: ${data[i].name}<br>City: ${data[i].city}<br>Address: ${data[i].address}<br>Phone Number: ${data[i].phonenumber}
            <button type="submit" class="btn favorite" data-id=${data[i].id}>Add to Favorites</button>
            </p></li>
 
            `)     
              
             $("#brews").append(li)
        }

        $(".favorite").on("click", function(event) {
          console.log("hello")
      
          $.ajax({
            url:"/api/brewery/" + $(this).data("id"),
            method: "POST", 
        
          }).then(function(data) {
            console.log(data) 
            });
      }); 
	        
      	});
	});


  
  })


  



   
  
  
  