// Login Form

$(function() {
    var button = $('#loginButton');
    var box = $('#loginBox');
	var box1 = $('#registerBox');
    var form = $('#loginForm');
	var form2 = $('#registerForm');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        return false;
    });
	form2.mouseup(function() {
		return false;
	});
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
			box1.hide();
        }
    });

	$('#new_user').click(function(){
		$('#loginBox').toggle();
		$('#registerBox').toggle();
	});
	$('#registered').click(function(){
		$('#loginBox').show();
		$('#registerBox').hide();
	});

	$('#loginForm').submit(function(event) {
		if($(this).find('#mobile').val().length < 1) {
			alert('Please enter mobile number');
			$(this).find('#mobile').focus();
			return false;
		} else if($(this).find('#pass').val().length < 1) {
			alert('Please enter password');
			$(this).find('#pass').focus();
			return false;
		} else {
			$.ajax({
				url: '/user/account/login',
				type: 'POST',
				data: $(this).serialize()
			}).done(function( data ) {
				if(data.ack != 1) {
					alert(data.error_msg);
				} else {
					fetchUserAccountHeader();
				}
			});
		}
		return false;
	});

	$('#registerForm').submit(function(event) {
		var mobReq = /^[0-9]{1}[0-9]{10}$/;
		var name = $(this).find('#name').val();
		name = name.replace(/ /g,'');
		if(name.length < 2) {
			alert('Please enter your name');
			$(this).find('#name').focus();
			return false;
		} else if(mobReq.test($(this).find('#mobile').val()) == false) {
			alert('Please enter mobile number');
			$(this).find('#mobile').focus();
			return false;
		} else if($(this).find('#pass').val().length < 1) {
			alert('Please enter password');
			$(this).find('#pass').focus();
			return false;
		} else if($(this).find('#confpass').val().length < 1) {
			alert('Please enter password again');
			$(this).find('#confpass').focus();
			return false;
		} else if($(this).find('#pass').val() != $(this).find('#confpass').val()) {
			alert('Both passwords does not match.');
			$(this).find('#pass').focus();
			return false;
		} else if(!$(this).find('input#registerterms').is(':checked')) {
			alert('Please accept Terms of Use & Privacy Policy');
			$(this).find('#pass').focus();
			return false;
		} else {
			$.ajax({
				url: '/user/account/register',
				type: 'POST',
				data: $(this).serialize()
			}).done(function( data ) {
				if(data.ack != 1) {
					alert(data.error_msg);
				} else {
					fetchUserAccountHeader();
				}
			});
		}
		return false;
	});

	$(".jqNos").each(function() {
		$(this).keypress(function(e) {
		//var code = $.browser.mozilla ? e.charCode : e.keyCode;
		var code = e.charCode;
			if (((code >= 48) && (code <= 57)) || code == 0) {
				return true;
			}
			else {
				return false;
			}
		});
	});
	
	$(".jqchars").each(function() {
		$(this).keypress(function(e) {
			//var code = $.browser.mozilla ? e.charCode : e.keyCode;
			var code = e.charCode;
			if (((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)) || code == 32 || code == 0) {
				return true;
			}
			else {
				return false;
			}
		})
	});
});

function fetchUserAccountHeader() {
	$.ajax({
		url: '/user/account/header',
		type: 'GET',
	}).done(function( data ) {
		var $parentLi = $('#loginButton').parent();
		$parentLi.html(data);
		$('#loginContainer').remove();
		$('#loginButton').remove();
	});
}
