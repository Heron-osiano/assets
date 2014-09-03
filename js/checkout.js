app.checkout = app.checkout || {};

(function ( $, window, undefined ) {
	
	"use strict";


	app.checkout = {

		formaDePagamentoTab : function(){

			$('.box-forma-pagamento .item-forma-pagamento').on("click", function(){
				
				//Adiciona a Classe "Ativo" para a opçao clicada e adiciona checked true para o input radio filho
				$('.box-forma-pagamento .item-forma-pagamento').removeClass('ativo');
				$(this).addClass('ativo');
				$(this).children().children('input[type="radio"]').attr('checked', true);
				
				//Verifica o id do input radio que foi clicado e mostra o conteudo dele
				var id = $(this).children().children('input[type="radio"]').attr('id');
				if(id == "input-cartao-credito"){ 
					$('.box-forma-pagamento .content-tab').hide(); 
					$('#content-cartao-credito').show();
				}else if(id == "input-boleto"){ 
					$('.box-forma-pagamento .content-tab').hide(); 
					$('#content-boleto').show();
				}
				else if(id == "input-debito"){
					$('.box-forma-pagamento .content-tab').hide();
					$('#content-debito').show();
				}

			});

		},

		validaform : function(id){

			$(id).validate({

				onfocusout: false,
				onkeyup: false,
				onclick: false,

			    showErrors: function(errorMap, errorList) {
			        var erros = "",
			        	totalErros = errorList.length;
			        
			        $.each(errorList, function() {
			            erros += "- " + this.message + "<br/>";
			        });    
			       
			        if(totalErros >= 1) { app.util.alertError(erros); }
			    },

			    messages: {
			     "pagamento"   : "Escolha a forma de pagamento.", 
			     "banco" : "Escolha uma das opções de banco.",
			     "agencia" : "Digite o número de sua agência.",
			     "digito-agencia" : "Digite o número do dígito de sua agência.",
			     "conta-corrente" : "Digite o número de sua conta-corrente.",
			     "digito-conta-corrente" : "Digite o número do dígito de sua conta-corrente.",
			     "dia-debito" : "Escolha um dia para o débito."
			   }
			
			});

		},

		init: function(){
			
		}
		
	}

}(jQuery, window, undefined));
