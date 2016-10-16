$(document).ready(function() {
	var cardPrefix = {
		'visa': {'4539': '4539', '4556': '4556', '4916': '4916', '4532': '4532', '4929': '4929', '40240071': '40240071', '4485': '4485', '4716': '4716', '4': '4'},
		'mastercard': {'51': '51', '52': '52', '53': '53', '54': '54', '55': '55'},
		'amex': {'34': '34', '37': '37'},
		'discover': {'300': '300', '301': '301', '302': '302', '303': '303', '36': '36', '38': '38'},
		'diners': {'2014': '2014', '2149': '2149'},
		'enroute': {'4539': '4539', '4556': '4556', '4916': '4916', '4532': '4532', '4929': '4929', '40240071': '40240071', '4485': '4485', '4716': '4716', '4': '4'},
		'jcb': {'35': '35'},
		'voyager': {'8699': '8699'}
	};

	populateCardPrefix();

	$(function() {
		$('select[name="cardType"]').change(function() {
			$('select[name="cardPrefix"]').html('');
			populateCardPrefix();
		});
	});

	function populateCardPrefix() {
		var selectedCardType = $('select[name="cardType"]').val(),
		append = '<option value="" selected disabled>Card Prefix</option>';

	  	$.each(cardPrefix, function (key, value) {
	    	if (selectedCardType === key) {
	      		$.each(value, function (i, obj) {
	        	append += '<option value="'+i+'">'+obj+'</option>';
	      		});
	    	}
	  	});

	  	append += '<option value="custom">Custom BIN</option>';

	  	$('select[name="cardPrefix"]').html(append);
	}

	$(function() {
		$('select[name="cardPrefix"]').change(function() {
			if ($('select[name="cardPrefix"]').val() === "custom") {
				$('.form-card').find('#bin').prop({type: "text"}).prop({placeholder: "Enter Custom BIN"});
			} else {
				$('.form-card').find('#bin').prop({type: "hidden"}).prop({placeholder: ""});
			}
		});
	});

	function strrev(str) {
	   if (!str) return '';
	   var revstr='';
	   for (i = str.length-1; i>=0; i--)
	       revstr+=str.charAt(i)
	   return revstr;
	}

	function completed_number(prefix, length) {

	    var ccnumber = prefix;

	    // generate digits

	    while ( ccnumber.length < (length - 1) ) {
	        ccnumber += Math.floor(Math.random()*10);
	    }

	    // reverse number and convert to int

	    var reversedCCnumberString = strrev( ccnumber );

	    var reversedCCnumber = new Array();
	    for ( var i=0; i < reversedCCnumberString.length; i++ ) {
	        reversedCCnumber[i] = parseInt( reversedCCnumberString.charAt(i) );
	    }

	    // calculate sum

	    var sum = 0;
	    var pos = 0;

	    while ( pos < length - 1 ) {

	        odd = reversedCCnumber[ pos ] * 2;
	        if ( odd > 9 ) {
	            odd -= 9;
	        }

	        sum += odd;

	        if ( pos != (length - 2) ) {

	            sum += reversedCCnumber[ pos +1 ];
	        }
	        pos += 2;
	    }

	    // calculate check digit

	    var checkdigit = (( Math.floor(sum/10) + 1) * 10 - sum) % 10;
	    ccnumber += checkdigit;

	    return ccnumber;

	}

	function credit_card_number(cardPrefix, length, quantity) {

	    var result = new Array();
	    for (var i = 0; i < quantity; i++) {

	        var ccnumber = cardPrefix;
	        result.push( completed_number(ccnumber, length) );
	    }

	    return result;

	}

	$("#generate_card_no").submit(function(e) {
        e.preventDefault();
        $("#loadingdiv").show();

        var prefix, lenght, quantity, cardno, myModal = $("#myModal");

        if ($("#bin").val().trim().length > 0) {
        	prefix = $("#bin").val().trim();
        } else {
        	prefix = $('select[name="cardPrefix"]').val();
        }

        length = $('input[name="lenght"]').val();
        quantity = $('input[name="quantity"]').val();

        cardno = credit_card_number(prefix, length, quantity);

    	myModal.find("#cardNumbers").html(JSON.stringify(cardno, null, 4));
    	myModal.modal("show");
    	setTimeout(function() {
        	$("#loadingdiv").hide();
    	}, 2000);
    });

    $("#copyButton").on("click", function(e) {
        e.preventDefault();
        $("#cardNumbers").select();
		document.execCommand('copy');
    });

});