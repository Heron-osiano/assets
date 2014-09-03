/*
* Slide do Topo
* Dependencias : Jquery, Owl Carousel, imgPreload.
*/

app.sliderHeader = app.sliderHeader || {};

(function ( $, window, undefined) {
	
	"use strict";

	app.sliderHeader = function() {

		this.Slider = $('#slider-content');
		this.SliderParent = $('#slider-topo');
		this.SliderWrapper = $('#slider-topo').find('.slider-wrapper');
		this.SliderItem = $('#slider-content').find('.slider-item');
		this.SliderVideo = $('.slider-video iframe');
		this.SliderLegenda = $('#slider-legenda');
		this.SliderLegendaItem = $('#slider-legenda ul li');
		this.Next = $('#slider-next');
		this.Prev = $('#slider-prev');
		this.WithControl = (this.SliderLegenda.length) ? false : true; //verifica se existe o box da legenda, senão existir ele vai imprimir os bullets
		this.WithLegenda = (this.SliderLegenda.length) ? true : false; //verifica se existe o box da legenda
		this.WithVideo = (this.SliderVideo.length) ? false : true; //verifica se existe o iframe do video, se existir as opções "stopOnHover" e "autoplay" do slide é false
		this.SliderData;
		this.Event = "click";
		var that = this;

		this.Init();

	};

	app.sliderHeader.prototype = {

		Init : function() {

				var that = this;

				this.Slider.owlCarousel({
				      navigation : false,
				      slideSpeed : 500,
				      paginationSpeed : 500,
					  rewindSpeed : 500,
					  autoPlay : that.WithVideo,
					  stopOnHover : that.WithVideo,
				      singleItem : true,
				      mouseDrag  : false,
				      pagination: that.WithControl,
				      afterInit : function(){
							if(that.WithControl) that.SliderParent.addClass("slider-com-control"); // se não existir legenda ele add classe com control
					  },
					  afterAction : function(){
					  		if(that.WithLegenda) that.AddLegendaAtivo(this.owl.currentItem); // se existir o box legenda a cada ação do slide ele muda a classe ativo
					  }
				});

			this.SliderData = this.Slider.data('owlCarousel');

			this.Next.on(that.Event, function(){that.SliderData.next();});
			this.Prev.on(that.Event, function(){that.SliderData.prev();});

			this.ImagesOnLoad();
			this.verificaQtdItens();
			if(this.WithLegenda) this.LegendaOnClick();

		},

		LegendaOnClick : function() {
				var that = this;
				this.SliderLegendaItem.on(that.Event, function(e){ that.SliderData.goTo($(this).index()); });
		},

		AddLegendaAtivo : function(numero) {
				this.SliderLegendaItem.removeClass('ativo');
				this.SliderLegendaItem.eq(numero).addClass('ativo');
		},

		ImagesOnLoad : function() {
			var that = this;
			var images = [];
			this.SliderItem.each(function(){
			  var el = $(this), image = el.css('background-image').replace(/"/g, '').replace(/url\(|\)$/ig, '');
			  if(image)images.push(image);
			});
			jQuery.imgpreload(images,{
					all: function(){
						that.SliderWrapper.delay(500).fadeIn();
					}
			});
		},

		verificaQtdItens : function(){
			if( this.SliderItem.length <= 1 ){
				this.Next.hide();
				this.Prev.hide();
			}
		}

};

}(jQuery, window, undefined));





/*
* Box Doaçao
* Dependencias : Jquery, MaskMoney.
*/

app.BoxDoacao = app.BoxDoacao || {};

(function ( $, window, undefined) {
	
	"use strict";

	app.BoxDoacao = function() {

		this.FormDoacao = $('#form-doacao');
		
		this.BoxDoacao = $('#box-doacao');
		this.TabsItem = $('#box-doacao .tab-item-doacao');

		this.Itens = $('#box-doacao .doacao-itens');
		this.ItensMensal = $('#box-doacao .item-mensal');
		this.ItensUnico = $('#box-doacao .item-unico');
		this.ItemOutroValor = $('#box-doacao #item-outro-valor');

		this.Titles = $('#box-doacao .title-box-doacao');
		this.TitleMensal = $('#box-doacao #title-mensal');
		this.TitleUnico = $('#box-doacao #title-unico');
		this.TitleOutroValorMensal = $('#box-doacao #title-outro-valor-mensal');
		this.TitleOutroValorUnico = $('#box-doacao #title-outro-valor-unico');

		this.Aviso = $('#box-doacao #doacao-aviso');

		this.BoxOutroValor = $('#box-doacao #box-outro-valor');
		this.InputOutroValor = $('#box-doacao #inpt-outro-valor');
		this.FecharOutroValor = $('#box-doacao #fechar-outro-valor');


		//inputs Hidden
		this.Tipo = $('#box-doacao #tipo');
		this.Opcao = $('#box-doacao #opcao');
		this.TemOutroValor = $('#box-doacao #tem-outro-valor');
		this.ValorMinimo = $('#box-doacao #valor-minimo');
		this.ValorAssocicao = $('#box-doacao #valor-associacao').val();

		this.Init();

	};

	app.BoxDoacao.prototype = {

		Init : function() {

				this.Events();
				this.VericacaoInicial();
				this.ValidaForm();
		},

		Events : function() {

				var that = this;

				//Quando Clica nas opções
				this.Itens.on("click", function(){
					
					that.Itens.removeClass('ativo');
					$(this).addClass('ativo');

					var opcao = this.id;
					var	valor = $(this).data('valor');
					that.Opcao.val(opcao);

					if(parseFloat(valor) >= parseFloat(that.ValorAssocicao)) that.Aviso.slideDown();
					else that.Aviso.slideUp();
				});

				//Quando Clica nas tabs Mensal/Pountual
				this.TabsItem.on("click", function(){
					
					that.TabsItem.removeClass('ativo');
					$(this).addClass('ativo');

					var tipo = this.id;
					that.Tipo.val(tipo);

					if(tipo == "DOACAO-MENSAL"){
						that.Itens.hide();
						that.ItensMensal.show();
						that.Itens.removeClass('ativo');
						that.ItensMensal.first().addClass('ativo');
						that.BoxOutroValor.hide();
						
						that.TemOutroValor.val('FALSE');
						that.Opcao.val(that.ItensMensal.first().attr('id'));

						if(parseFloat(that.ItensMensal.first().data('valor')) >= parseFloat(that.ValorAssocicao)) that.Aviso.slideDown();
						else that.Aviso.slideUp();

						that.VerificaTitle();
					}
					else if(tipo == "DOACAO-UNICA"){
						that.Itens.hide();
						that.ItensUnico.show();
						that.Itens.removeClass('ativo');
						that.ItensUnico.first().addClass('ativo');
						that.BoxOutroValor.hide();
						
						that.TemOutroValor.val('FALSE');
						that.Opcao.val(that.ItensUnico.first().attr('id'));

						if(parseFloat(that.ItensUnico.first().data('valor')) >= parseFloat(that.ValorAssocicao)) that.Aviso.slideDown();
						else that.Aviso.slideUp();

						that.VerificaTitle();

					}
				});

				//Quando Clica na opçao escolher outro valor
				this.ItemOutroValor.on("click", function(){
					that.BoxOutroValor.fadeIn('fast');
					that.Aviso.slideUp();
					that.InputOutroValor.focus();
					that.TemOutroValor.val('TRUE');

					that.VerificaTitle();
				});

				//Quando Clica para fechar o box outro valor
				this.FecharOutroValor.on("click", function(){
					that.BoxOutroValor.fadeOut('fast');
					that.TemOutroValor.val('FALSE');

					that.VerificaTitle();
				});

				//Aplica o Filtro Máscada Money
				this.InputOutroValor.maskMoney({ allowNegative: false, thousands:'.', decimal:',', affixesStay: false});

		},

		VerificaTitle:  function() {

			var that = this,
				abaAtual = this.Tipo.val(),
				TemOutroValor = this.TemOutroValor.val();
			
			that.Titles.hide();
			if(abaAtual == "DOACAO-MENSAL" && TemOutroValor == "FALSE") this.TitleMensal.show();
			else if(abaAtual == "DOACAO-UNICA" && TemOutroValor == "FALSE") this.TitleUnico.show();
			else if(abaAtual == "DOACAO-MENSAL" && TemOutroValor == "TRUE") this.TitleOutroValorMensal.show();
			else if(abaAtual == "DOACAO-UNICA" && TemOutroValor == "TRUE") this.TitleOutroValorUnico.show();
		},

		VericacaoInicial: function(){
			var that = this,
			abaAtual = this.Tipo.val(),
			opcao = this.Opcao.val(),
			temOutroValor = this.TemOutroValor.val();
			
			$('#' + abaAtual).addClass('ativo');
			$('#' + opcao).addClass('ativo');

			//if($('#' + opcao).data('valor') >= that.ValorAssocicao && temOutroValor == "FALSE") that.Aviso.show();
			
			if(abaAtual == "DOACAO-MENSAL") this.ItensMensal.show();
			else if(abaAtual == "DOACAO-UNICA") this.ItensUnico.show();

			if(temOutroValor == "TRUE") this.BoxOutroValor.show();

			this.VerificaTitle();

			setTimeout(function() {that.BoxDoacao.css('visibility', 'visible');}, 300);
		},

		ValidaForm: function(){
			
			var that = this;
			
			this.FormDoacao.on("submit", function(event){

				var	valorDoado = that.InputOutroValor.maskMoney('unmasked')[0],
					ValorMinimo = that.ValorMinimo.val().replace(",","."),
					temOutroValor = that.TemOutroValor.val();

				if(valorDoado < ValorMinimo && temOutroValor == "TRUE"){
					
					var mensagem = 'O valor mínimo de doação é de R$'+ValorMinimo.replace(".",",")+' reais';
					app.util.alertError(mensagem);
					
					event.preventDefault();
					return false;
				}


			});	

		}
};

}(jQuery, window, undefined));





/*
* Box Associaçao
* Dependencias : Jquery, MaskMoney.
*/

app.BoxAssociacao = app.BoxAssociacao || {};

(function ( $, window, undefined) {
	
	"use strict";

	app.BoxAssociacao = function() {

		this.BoxAssociacao = $('#box-associacao');
		this.TabsItem = $('#box-associacao .tab-item-associacao');

		this.Itens = $('#box-associacao .associacao-itens');
		this.ItensMensal = $('#box-associacao .item-mensal');
		this.ItensAnual = $('#box-associacao .item-anual');
		this.ItensValorPrincipal = $('#box-associacao .item-valor-princical');
		this.ItemOutroValor = $('#box-associacao #item-outro-valor');
		this.ItemNaoQuero = $('#box-associacao #item-nao-quero');

		this.BoxOutroValor = $('#box-associacao #box-outro-valor');
		this.InputOutroValor = $('#box-associacao #inpt-outro-valor');
		this.FecharOutroValor = $('#box-associacao #fechar-outro-valor');

		this.Titles = $('#box-associacao .title-box-associacao');
		this.TitleMensal = $('#box-associacao #title-mensal');
		this.TitleAnual = $('#box-associacao #title-anual');

		//inputs Hidden
		this.Tipo = $('#box-associacao #tipo');
		this.Opcao = $('#box-associacao #opcao');
		this.TemOutroValor = $('#box-associacao #tem-outro-valor');
		this.NaoQuero = $('#box-associacao #nao-quero-contribuir');

		this.Init();

	};

	app.BoxAssociacao.prototype = {

		Init : function() {

				this.Events();
				this.VericacaoInicial();
		},

		Events : function() {

				var that = this;

				//Quando Clica nas opções
				this.Itens.on("click", function(){
					
					that.Itens.removeClass('ativo');
					that.ItemNaoQuero.removeClass('ativo');
					$(this).addClass('ativo');

					var opcao = this.id;
					that.Opcao.val(opcao);
					that.NaoQuero.val('FALSE');
				});

				//Quando Clica na opção Não Quero Contribuir
				this.ItemNaoQuero.on("click", function(){
					
					that.Itens.removeClass('ativo');
					$(this).addClass('ativo');

					that.NaoQuero.val('TRUE');
				});

				//Quando Clica nas tabs Mensal/Pountual
				this.TabsItem.on("click", function(){
					
					that.TabsItem.removeClass('ativo');
					$(this).addClass('ativo');

					var tipo = this.id;
					that.Tipo.val(tipo);

					if(tipo == "ASSOCIACAO-MENSAL"){
						that.Itens.hide();
						that.ItensValorPrincipal.hide();
						that.Itens.removeClass('ativo');
						that.ItensMensal.show();

						that.ItemNaoQuero.addClass('ativo');
						
						that.BoxOutroValor.hide();
						
						that.TemOutroValor.val('FALSE');
						that.NaoQuero.val('TRUE');

						that.VerificaTitle();
					}
					else if(tipo == "ASSOCIACAO-ANUAL"){
						that.Itens.hide();
						that.ItensValorPrincipal.hide();
						that.Itens.removeClass('ativo');
						that.ItensAnual.show();

						that.ItemNaoQuero.addClass('ativo');
						
						that.BoxOutroValor.hide();
						
						that.TemOutroValor.val('FALSE');
						that.NaoQuero.val('TRUE');

						that.VerificaTitle();
					}
				});

				//Quando Clica na opçao escolher outro valor
				this.ItemOutroValor.on("click", function(){
					that.BoxOutroValor.fadeIn('fast');
					that.InputOutroValor.focus();
					that.TemOutroValor.val('TRUE');
					that.NaoQuero.val('FALSE');
				});

				//Quando Clica para fechar o box outro valor
				this.FecharOutroValor.on("click", function(){
					that.BoxOutroValor.fadeOut('fast');
					that.TemOutroValor.val('FALSE');

					that.Itens.removeClass('ativo');
					that.ItemNaoQuero.addClass('ativo');
					that.NaoQuero.val('TRUE');
				});

				//Aplica o Filtro Máscada Money
				this.InputOutroValor.maskMoney({ allowNegative: false, thousands:'.', decimal:',', affixesStay: false});

		},


		VerificaTitle:  function() {

			var that = this,
				abaAtual = this.Tipo.val(),
				TemOutroValor = this.TemOutroValor.val();
			
			that.Titles.hide();
			if(abaAtual == "ASSOCIACAO-MENSAL") this.TitleMensal.show();
			else if(abaAtual == "ASSOCIACAO-ANUAL") this.TitleAnual.show();
		},


		VericacaoInicial: function(){
			var that = this,
			abaAtual = this.Tipo.val(),
			opcao = this.Opcao.val(),
			NaoQuero = this.NaoQuero.val(),
			temOutroValor = this.TemOutroValor.val();

			$('#' + abaAtual).addClass('ativo');
			
			if(NaoQuero == "TRUE") this.ItemNaoQuero.addClass('ativo');
			else $('#' + opcao).addClass('ativo');
			
			if(abaAtual == "ASSOCIACAO-MENSAL") this.ItensMensal.show();
			else if(abaAtual == "ASSOCIACAO-ANUAL") this.ItensAnual.show();

			if(temOutroValor == "TRUE") this.BoxOutroValor.show();

			this.VerificaTitle();

			setTimeout(function() {that.BoxAssociacao.css('visibility', 'visible');}, 300);

		}

};

}(jQuery, window, undefined));






/*
* Carousel Produtos
* Dependencias : Jquery, Owl Carousel.
*/
app.carouselProduto = app.carouselProduto || {};

(function ( $, window, undefined) {
	
	"use strict";

	app.carouselProduto = function() {

		this.Carousel = $('#box-carousel-produto');
		this.CarouselItem = $('#box-carousel-produto .box-item-produto');
		this.Next = $('#seta-right');
		this.Prev = $('#seta-left');
		this.CarouselData;
		var that = this;

		this.Init();

	};

	app.carouselProduto.prototype = {

		Init : function() {

			var that = this;

			this.Carousel.owlCarousel({
				items : 4,
				navigation : false,
				slideSpeed : 500,
				paginationSpeed : 500,
				rewindSpeed : 500,
				autoPlay : false,
				mouseDrag  : true,
				pagination: false,
				scrollPerPage: true
			});

			this.CarouselData = this.Carousel.data('owlCarousel');

			this.Prev.on('click', function(){ that.CarouselData.prev(); });
			this.Next.on('click', function(){ that.CarouselData.next(); });

			this.verificaQtdItens();

		},

		verificaQtdItens : function(){
			if( this.CarouselItem.length <= 4 ){
				this.Next.hide();
				this.Prev.hide();
			}
		}

};

}(jQuery, window, undefined));
