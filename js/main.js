app.main = app.main || {};

(function ( $, window, undefined ) {
	
	"use strict";


	app.main = {

		loginHeader : function(){

			$("#login-header").on("click", function(event){
				event.preventDefault();
				$("#box-area-login").toggleClass('ativo');
				$("#box-area-login").slideToggle('fast');
			});
		},

		validaFormLogin : function(){

			$("#form-area-login").validate();
		
		},

		compartilhar : function(){

			$(".social-icon.facebook").click(function(){
				var url = window.location;
				var urlDec = encodeURIComponent(url);
				var urlOk = 'http://www.facebook.com/sharer.php?u='+urlDec;
				window.open(urlOk,'sharer','toolbar=0,status=0,width=548,height=325');
				return false;
			});
			
			$(".social-icon.twitter").click(function(){
				var url = window.location;
				var urlDec = encodeURIComponent(url);
				var urlOk = 'http://twitter.com/share?url='+urlDec;
				window.open(urlOk,'sharer','toolbar=0,status=0,width=548,height=325');
				return false;
			});
			
			$(".social-icon.google").click(function(){
				var url = window.location;
				var urlDec = encodeURIComponent(url);
				var urlOk = 'https://plus.google.com/share?url='+urlDec;
				window.open(urlOk,'sharer','toolbar=0,status=0,width=548,height=325');
				return false;
			});

		},

		placeholder: function(){
	 		if (!Modernizr.input.placeholder) {
	             $("[placeholder]").focus(function () {
	                 if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
	             }).blur(function () {
	                 if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
	             }).blur();

	             $("[placeholder]").parents("form").submit(function () {
	                 $(this).find('[placeholder]').each(function() {
	                     if ($(this).val() == $(this).attr("placeholder")) {
	                         $(this).val("");
	                     }
	                 });
	             });
	         }
		},


		comoPagar : function(){

			app.imagesComoPagar = [ 
				{href : '../assets/img/img-revista-1.jpg'}, 
				{ href : '../assets/img/img-revista-2.jpg'}, 
				{ href : '../assets/img/img-revista-3.jpg'} 
			];

			$('.como-pagar').on("click", function(event){
				event.preventDefault();
				$.fancybox.open(app.imagesComoPagar,{
				    'openEffect'    :   'elastic',
				    'closeEffect'   :   'elastic',
				    'nextEffect'    :   'fade',
				    'openSpeed'     :   200, 
				    'closeSpeed'    :   200,
				    'padding'		: 	0
				});
			});

		},

		termoCondicaoes : function(){
			$('.link-termo').fancybox({
				width		: 800,
				height		: 500,
				maxWidth	: 800,
				maxHeight	: 500,
				fitToView	: false,
				padding		: 20
			});
		},

		atendimentoEmail : function(){

			//Fancybox para o formulario escondido
			$('.atendimento-email').fancybox({topRatio: 0.1, fitToView: false});

			//mascara nos campos
			$("#atendimento-telefone").mask("(99) 9999-9999");
			$("#atendimento-celular").mask("(99) 9999-9999?9",{placeholder:" "}).focus(function() {
				  $(this).keyup(function() {
				  var numeros = $(this).val().replace(/\D/g, '');
				  if(numeros.length == 11) { $(this).mask("(99) 99999-9999",{placeholder:" "}); }
				  if(numeros.length == 10) { $(this).mask("(99) 9999-9999?9",{placeholder:" "}); }
				  });
			});

			//Valida o Form
			$('#form-atendimento-email').validate({
                submitHandler: function(form) {
                    var $form = $(form);
                    var $inputs = $form.find("input, select, button, textarea");
                    var serializedData = $form.serialize();
                    //$inputs.prop("disabled", true);

                    //console.log(serializedData);

                    $.ajax({
                        url: "/home/atendimento",
                        type: "post",
                        data: serializedData,
                        success: function(retorno){
                            app.util.alertSucesso("Formulário enviado com sucesso.");
                            $inputs.filter(':text').val('');
                            $("#atendimento-mensagem").val('');
                        },
                        error: function(data, textStatus, jqXHR) {
                            app.util.alertError("Erro ao enviar o formulário.");
                            $inputs.filter(':text').val('');
                            $("#atendimento-mensagem").val('');
                        }
                    });

                }
            });

		},
        newsletter : function(){
            $('#form-receba-informe').validate({
                submitHandler: function(form) {
                    var $form = $(form);
                    var $inputs = $form.find("input, select, button, textarea");
                    var serializedData = $form.serialize();
                    //$inputs.prop("disabled", true);

                    console.log(serializedData);

                    $.ajax({
                        url: "/home/newsletter",
                        type: "post",
                        data: serializedData,
                        success: function(retorno){
                            app.util.alertSucesso("Formulário enviado com sucesso.");
                            $inputs.filter(':text').val('');
                        },
                        error: function(data, textStatus, jqXHR) {
                            app.util.alertError("Erro ao enviar o formulário.");
                            $inputs.filter(':text').val('');
                        }
                    });

                }
            });
        },

		init: function(){
			app.main.loginHeader();
			app.main.validaFormLogin();
			app.main.compartilhar();
			app.main.placeholder();
			app.main.comoPagar();
			app.main.termoCondicaoes();
			app.main.atendimentoEmail();
            app.main.newsletter();
		}
		
	}

}(jQuery, window, undefined));



$(function(){ 
	app.main.init();
});
