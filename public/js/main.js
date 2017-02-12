$(document).ready(function () {
        		  $("nav li").on("click", function () {
        			    $(this).toggleClass("active");
        		  });
        	});  
        	-->  
        	
        $( ".menu" ).hide();
        $( ".hamburger" ).click(function() {
        	$( ".menu" ).slideToggle("slow");
        });