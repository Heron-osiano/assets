app.util = app.util || {};

(function ( $, window, undefined ) {

"use strict";


//Preenche Cep
app.util.preencheCep = function(cep, endereco, cidade, estado, bairro, numero){

var cep = $(cep).val().replace(/\D/g,"");

if(cep != "" && cep.length == 8){
          $.getJSON('http://cep.correiocontrol.com.br/'+cep+'.json', function(json){

                   // troca o valor dos elementos
                   $(endereco).val(unescape(json.logradouro));
                   $(cidade).val(unescape(json.localidade));
                   $(estado + " option[value=" + unescape(json.uf) +"]").attr("selected","selected") ;
                   $(bairro).val(unescape(json.bairro));

                   $(numero).focus();

           }).fail(function(){

                   $(endereco).val("");
                   $(cidade).val("");
                   $(estado + 'option[value=""]').attr("selected","selected") ;
                   $(bairro).val("");

                   alert("Cep inválido");
            });
       }


};



//Alerta Erro
app.util.alertError = function(mensagem){

  $.fancybox( '<span class="alert-error">'+mensagem+'</span>');

};


//Alerta Sucesso
app.util.alertSucesso = function(mensagem){

  $.fancybox( '<span class="alert-sucesso">'+mensagem+'</span>');

};



}(jQuery, window, undefined));
