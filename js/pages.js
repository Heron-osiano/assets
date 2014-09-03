/***************************************************************************
 Página Home
****************************************************************************/
app.home = app.home || {};

(function ( $, window, undefined ) {
	
	"use strict";


	app.home = {

		sliderHeader : function(){
			new app.sliderHeader();
		},

		boxDoacao : function(){
			new app.BoxDoacao();
		},

		carouselProdutos : function(){
			new	app.carouselProduto();
		},

		init: function(){
			app.home.sliderHeader();
			app.home.boxDoacao();
			app.home.carouselProdutos();
		}
		
	}

}(jQuery, window, undefined));



/***************************************************************************
 Página de Doação
****************************************************************************/
app.doacao = app.doacao || {};

(function ( $, window, undefined ) {
	
	"use strict";

	app.doacao = {

		sliderHeader : function(){
			new app.sliderHeader();
		},

		boxDoacao : function(){
			new app.BoxDoacao();
		},

		init: function(){
			app.doacao.sliderHeader();
			app.doacao.boxDoacao();
		}
		
	}

}(jQuery, window, undefined));




/***************************************************************************
 Página de Associação
****************************************************************************/
app.associacao = app.associacao || {};

(function ( $, window, undefined ) {
	
	"use strict";

	app.associacao = {

		sliderHeader : function(){
			new app.sliderHeader();
		},

		boxAssociacao : function(){
			new app.BoxAssociacao();
		},

		init: function(){
			app.associacao.sliderHeader();
			app.associacao.boxAssociacao();
		}
		
	}

}(jQuery, window, undefined));




/***************************************************************************
 Página Revista
****************************************************************************/
app.revista = app.revista || {};

(function ( $, window, undefined ) {
	
	"use strict";

	app.revista = {


		imagesRevista : function(){

			$('#box-conheca-revista').on("click", function(event){
				event.preventDefault();
				$.fancybox.open(app.imagesRevista,{
				    'openEffect'    :   'elastic',
				    'closeEffect'   :   'elastic',
				    'nextEffect'    :   'fade',
				    'openSpeed'     :   200, 
				    'closeSpeed'    :   200,
				    'padding'		: 	0
				});
			});
		},

		carouselProdutos : function(){
			new	app.carouselProduto();
		},

		init: function(){
			app.revista.carouselProdutos();
			app.revista.imagesRevista();
		}
		
	}

}(jQuery, window, undefined));



/***************************************************************************
 Página Quem Somos
****************************************************************************/
app.quemSomos = app.quemSomos || {};

(function ( $, window, undefined ) {
	
	"use strict";

	app.quemSomos = {

		sliderHeader : function(){
			new app.sliderHeader();
		},

		init: function(){
			app.quemSomos.sliderHeader();
		}
		
	}

}(jQuery, window, undefined));



/***************************************************************************
 Página Produtos
****************************************************************************/
app.produto = app.produto || {};

(function ( $, window, undefined ) {
	
	"use strict";

	app.produto = {

		sliderHeader : function(){
			new app.sliderHeader();
		},

		showCategorias : function(){

			$('#categorias-show').on("click", function(event){
				$('#categorias-hidden').slideToggle('fast');
				$('#categorias-hidden').toggleClass('ativo');
			});
		},

		zoomProduto : function(){
			
			var thumbs = $('.thumb-produto a img');
			thumbs.first().addClass('ativo');
			thumbs.on("click", function(){
				thumbs.removeClass('ativo');
				$(this).addClass('ativo');
			});

			var images = [];
			
			$('.thumb-produto a').each(function(){
			  var image = $(this).attr('href');
			  if(image)images.push(image);
			});
			
			jQuery.imgpreload(images,{
					all: function(){
						console.log('carregou imagens grande');
					}
			});

			CloudZoom.quickStart();
		},

		carouselProdutos : function(){

			new	app.carouselProduto();
		},

		maisInformacaoes : function(){

			$(".link-mais-informacoes").on("click", function(event){

				event.preventDefault();
				
				$('html, body').animate({
    				scrollTop: $(".section-descricao-produto").offset().top - 50
				}, 1000);

				return false
			});
		},

		init: function(){
			app.produto.sliderHeader();
			app.produto.showCategorias();
			app.produto.zoomProduto();
			app.produto.maisInformacaoes();
			app.produto.carouselProdutos();
		}
		
	}

}(jQuery, window, undefined));



/***************************************************************************
 Página Curso
****************************************************************************/
app.curso = app.curso|| {};

(function ( $, window, undefined ) {
	
	"use strict";

	app.curso = {

		sliderHeader : function(){
			new app.sliderHeader();
		},

		tabsPrecoCurso : function(){ 

			function verificaInputChecked(){
				if($("#input-presencial").is(':checked')){
					$("#input-presencial").parent('label').addClass("ativo");
					$('.preco-online').hide();
					$('.preco-presencial').show();
				}
				else if($("#input-online").is(':checked')){
					$("#input-online").parent('label').addClass("ativo");
					$('.preco-presencial').hide();
					$('.preco-online').show();
				}
			}

			//Quando o input chama a função que verifica qual mudou e mostra os preços e adiciona class ativo no label pai
			$('.col-opcoes-curso input[type="radio"]').on("change" , function(){
				$('.col-opcoes-curso label').removeClass('ativo');
				verificaInputChecked();
			});

			//Quando inicia adiciona class ativo no primeiro label e muda para checked o input filho 
			//e chama a função para tb mostra os preços
			$('.col-opcoes-curso label').first().addClass("ativo");
			$('.col-opcoes-curso label').first().children('input[type="radio"]').attr('checked', true);
			verificaInputChecked();
		},

		tabsInfoGerais : function(){

			$(".info-gerais-content li a").on("click", function(event){

				event.preventDefault();

				$(".info-gerais-content li a").removeClass("ativo");
				$(this).addClass("ativo");

				var id = $(this).attr("href");
				$(".info-gerais-text").hide();
				$(id).show();

				return false;
			});

			$(".info-gerais-content li a").first().addClass("ativo");
			$(".info-gerais-text").first().show();
		},

		politicaDesconto : function(){
			$('.link-politica-desconto').fancybox({
				width		: 800,
				height		: 500,
				maxWidth	: 800,
				maxHeight	: 500,
				fitToView	: false,
				padding		: 20
			});
		},

		caroseulInfo : function(){

			$('#carousel-info-content').owlCarousel({
			      navigation : false,
			      slideSpeed : 500,
			      paginationSpeed : 500,
				  rewindSpeed : 500,
			      singleItem : true,
			      mouseDrag  : false,
			      pagination: false,
				  afterAction : function(){
				  		$('.legenda-info-content .legenda-info-item').removeClass('ativo');
				  		$('.legenda-info-content .legenda-info-item').eq(this.owl.currentItem).addClass('ativo');
				  }
			});

			var owl = $('#carousel-info-content').data('owlCarousel');
			$('.legenda-info-content .legenda-info-item').on("click", function(){ owl.goTo($(this).index()); });
			$('.seta-carousel-info.next').on("click", function(){ owl.next(); });
			$('.seta-carousel-info.prev').on("click", function(){ owl.prev(); });

			var itens = $('#carousel-info-content .item').length;
			if(itens <= 1){ $('.seta-carousel-info.next').hide(); $('.seta-carousel-info.prev').hide();}
		},

		carouselProdutos : function(){

			new	app.carouselProduto();
	
		},

		init: function(){
			app.curso.sliderHeader();
			app.curso.tabsPrecoCurso();
			app.curso.politicaDesconto();
			app.curso.caroseulInfo();
			app.curso.tabsInfoGerais();
			app.curso.carouselProdutos();
		}
		
	}

}(jQuery, window, undefined));