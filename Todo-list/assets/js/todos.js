// check off specific todos by clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("done");
});

// click on to delete todo
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	// the event will not effect parents elements
	event.stopPropagation();
});

// 
$("input[type='text']").on("keypress",function(event){
	if(event.which === 13){
		var newTodoText = $(this).val();
		//creat a new li and add to ul
		$("ul").append("<li><span><i class='fa fa-trash-alt'></i></span> "+newTodoText+"</li>");
		// clear the input value
		$(this).val("");
	}
});

$(".fa-pencil-alt").on("click",function(){
	$("input[type='text']").fadeToggle();
});