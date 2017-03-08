$(document).ready(function () {});
$( ".menu" ).hide();
$( ".hamburger" ).click(function() {
  $( ".menu" ).slideToggle("slow");
});


$(".popup-trigger").click(function(e){
  ga("send", "event", 'show more', 'click');
});

$(".img-layout").click(function(e){
  ga("send", "event", 'show more', 'click');
});
