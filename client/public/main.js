//var Hangul = require('hangul-js');

// $( document ).ready(function() {

// 	//$("#sidebar").html('<object data="http://stdweb2.korean.go.kr/main.jsp"/>');


// });

function openNav() {
		document.getElementById("mySidenav").style.width = "375px";
}

function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
}
$("body").click(function(){
	$(".context").unmark();
})

$("tr td:first-child").hover(function(){
    //$(this).css("text-decoration", "underline" );
		var keyword = $(this).text();

		// var options = {};
		// $("input[name='opt[]']").each(function() {
		// 	options[$(this).val()] = $(this).is(":checked");
		// });

		var options = {
		"each": function(element) {
			setTimeout(function() {
				$(element).addClass("animate");
			}, 350);
		}
	};

		// $(".context").unmark({
		// 	done: function() {
		// 		$(".context").mark(keyword, options);
		// 	}
		// });

		$(".context").unmark({
		done: function() {
			$(".context").mark(keyword, options);
		}
	});
	})
