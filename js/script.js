$(document).ready(setInterval(test, 0));

function test() {

    $(".bgs").each(function(index) {

        $(this).fadeOut(2000);
        $(this).delay(2000 * index).fadeIn(2000).fadeOut(2000);

    });
}

/*
$('#open-menu, #btn-begin').click(function(){
	$('#home').fadeOut();
	$('#workspace').fadeIn(2000);
	$('body').css('backgroundColor', '#121A21');
});
*/

$('[data-toggle="tooltip"]').tooltip({
    'placement': 'right'
});