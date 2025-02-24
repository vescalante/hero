jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.php-email-form').submit(function() {
   
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            /*
            else if (/@yahoo.com\s*$/.test(i.val())) {
              //console.log("it ends in @yahoo");
              ferror = ierror = true;
            }else if (/@yahoo.com.mx\s*$/.test(i.val())) {
              //console.log("it ends in @yahoo mx");
              ferror = ierror = true;
            }else if (/@gmail.com\s*$/.test(i.val())) {
              //console.log("it ends in @gmail");
              ferror = ierror = true;
            }else if (/@hotmail.com\s*$/.test(i.val())) {
              //console.log("it ends in @hotmail");
              ferror = ierror = true;
            }else if (/@outlook.com\s*$/.test(i.val())) {
              //console.log("it ends in @outlook");
              ferror = ierror = true;
            }else if (/@aol.com\s*$/.test(i.val())) {
              //console.log("it ends in @aol");
              ferror = ierror = true;
            }
            */
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();

    var this_form = $(this);
    var action = $(this).attr('action');

    if( ! action ) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }
    
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();
    
    var asset=this_form[0][6].value;
    
    $.ajax({
      type: "POST",
      url: action,
      data: str,
      dataType: "json",
      success: function(data) {
        if(data.status == "success"){
          this_form.find('.loading').slideUp();
          this_form.find('.sent-message').slideDown().html(data.message);
          if (asset == "Guia") {
            setTimeout(function(){window.location.href="descarga-guia.php"} , 1000); 
          }else if(asset == "Infografia"){
            setTimeout(function(){window.location.href="descarga-infografia.php"} , 1000); 
          }else{
            setTimeout(function(){window.location.href="gracias.php"} , 1000); 
          }
        }
        else if(data.status == "error"){
          this_form.find('.loading').slideUp();
          this_form.find('.error-message').slideDown().html(data.message);
        }
      }
      /*
      success: function(msg) {
        if (msg == 'OK') {
          this_form.find('.loading').slideUp();
          this_form.find('.sent-message').slideDown();
          this_form.find("input:not(input[type=submit]), textarea").val('');
        } else {
          this_form.find('.loading').slideUp();
          this_form.find('.error-message').slideDown().html(msg);
        }
      }
      */
    });
    return false;
  });

});
