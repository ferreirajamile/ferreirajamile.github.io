(function($) { "use strict";
	
	
	//Home text fade on scroll	
	
   $(window).scroll(function () { 
        var $Fade = $('.cd-intro, .small-intro, .scroll-down');
        //Get scroll position of window 
        var windowScroll = $(this).scrollTop();
        //Slow scroll and fade it out 
        $Fade.css({
            'margin-top': -(windowScroll / 0) + "px",
            'opacity': 1 - (windowScroll / 550)
        });
    });	

	
	//Navigation	

	$('ul.slimmenu').on('click',function(){
	var width = $(window).width(); 
	if ((width <= 1200)){ 
		$(this).slideToggle(); 
	}	
	});				
	$('ul.slimmenu').slimmenu(
	{
		resizeWidth: '1200',
		collapserTitle: '',
		easingEffect:'easeInOutQuint',
		animSpeed:'medium',
		indentChildren: true,
		childrenIndenter: '&raquo;'
	});	
			$(window).load(function(){
				
				/* Page Scroll to id fn call */
				$("ul.slimmenu li a,a[href='#top'],a[data-gal='m_PageScroll2id']").mPageScroll2id({
					highlightSelector:"ul.slimmenu li a",
					offset: 30,
					scrollSpeed:800,
					scrollEasing: "easeInOutCubic"
				});
				
				/* demo functions */
				$("a[rel='next']").click(function(e){
					e.preventDefault();
					var to=$(this).parent().parent("section").next().attr("id");
					$.mPageScroll2id("scrollTo",to);
				});
				
			});	

	
	//Home Sections fit screen	
				
	$(function(){"use strict";
		$('.home').css({'height':($(window).height())+'px'});
		$(window).resize(function(){
		$('.home').css({'height':($(window).height())+'px'});
		});
	});

	
			//Home Background Slider

            $.mbBgndGallery.buildGallery({
                containment:"#home",
				autoStart:true,
                timer:3000,
                effTimer:4000,
                controls:"#controls",
                grayScale:false,
                shuffle:true,
                preserveWidth:false,
                effect:"zoom",
//				effect:{enter:{transform:"scale("+(1+ Math.random()*2)+")",opacity:0},exit:{transform:"scale("+(Math.random()*2)+")",opacity:0}},

                // If your server allow directory listing you can use:
                // (however this doesn't work locally on your computer)

                //folderPath:"testImage/",

                // else:

                 images:[
                 "images/1.jpg",
                 "images/2.jpg",
                 "images/3.jpg"
                 ],

                onStart:function(){},
                onPause:function(){},
                onPlay:function(opt){},
                onChange:function(opt,idx){},
                onNext:function(opt){},
                onPrev:function(opt){}
            });
			
	
 	//Parallax
	
	$('.parallax-sep-1').parallax("50%", 0.4);
	$('.parallax-sep-2').parallax("50%", 0.4);
			
			
	//About Carousel

	$(document).ready(function() {
	 
	  var sync1 = $("#sync1");
	  var sync2 = $("#sync2");
	 
	  sync1.owlCarousel({
		singleItem : true,
		transitionStyle : "fade",
		autoHeight : true,
		slideSpeed : 1500,
		navigation: false,
		pagination:false,
		afterAction : syncPosition,
		responsiveRefreshRate : 200
	  });

	  
	  sync2.owlCarousel({
		items : 3,
		itemsDesktop      : [1199,3],
		itemsDesktopSmall     : [979,3],
		itemsTablet       : [768,2],
		itemsMobile       : [479,2],
		pagination:false,
		responsiveRefreshRate : 100,
		afterInit : function(el){
		  el.find(".owl-item").eq(0).addClass("synced");
		}
	  });
	 
	  function syncPosition(el){
		var current = this.currentItem;
		$("#sync2")
		  .find(".owl-item")
		  .removeClass("synced")
		  .eq(current)
		  .addClass("synced")
		if($("#sync2").data("owlCarousel") !== undefined){
		  center(current)
		}
	  }
	 
	  $("#sync2").on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).data("owlItem");
		sync1.trigger("owl.goTo",number);
	  });
	 
	  function center(number){
		var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
		var num = number;
		var found = false;
		for(var i in sync2visible){
		  if(num === sync2visible[i]){
			var found = true;
		  }
		}
	 
		if(found===false){
		  if(num>sync2visible[sync2visible.length-1]){
			sync2.trigger("owl.goTo", num - sync2visible.length+2)
		  }else{
			if(num - 1 === -1){
			  num = 0;
			}
			sync2.trigger("owl.goTo", num);
		  }
		} else if(num === sync2visible[sync2visible.length-1]){
		  sync2.trigger("owl.goTo", sync2visible[1])
		} else if(num === sync2visible[0]){
		  sync2.trigger("owl.goTo", num-1)
		}
		
	  }
	 
	});	
	
	
 	//Skills Counter 
	
	jQuery(document).ready(function($){
        $('.counter-skills').counterUp({
            delay: 100,
            time: 3000
        });
    });

	
	//About Slider 
	
	jQuery(document).ready(function($){
		var itemInfoWrapper = $('.cd-single-item');
		
		itemInfoWrapper.each(function(){
			var container = $(this),
				// create slider pagination
				sliderPagination = createSliderPagination(container);
			
			container.find('.cd-slider').on('click', function(event){
				//enlarge slider images 
				if( !container.hasClass('cd-slider-active') && $(event.target).is('.cd-slider')) {
					itemInfoWrapper.removeClass('cd-slider-active');
					container.addClass('cd-slider-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$('body,html').animate({'scrollTop':container.offset().top - 60}, 500);
					});
				}
			});

			container.find('.cd-close').on('click', function(){
				//shrink slider images 
				container.removeClass('cd-slider-active');
			});

			//update visible slide
			container.find('.cd-next').on('click', function(){
				nextSlide(container, sliderPagination);
			});

			container.find('.cd-prev').on('click', function(){
				prevSlide(container, sliderPagination);
			});

			container.find('.cd-slider').on('swipeleft', function(){
				var wrapper = $(this),
					bool = enableSwipe(container);
				if(!wrapper.find('.selected').is(':last-child') && bool) {nextSlide(container, sliderPagination);}
			});

			container.find('.cd-slider').on('swiperight', function(){
				var wrapper = $(this),
					bool = enableSwipe(container);
				if(!wrapper.find('.selected').is(':first-child') && bool) {prevSlide(container, sliderPagination);}
			});

			sliderPagination.on('click', function(){
				var selectedDot = $(this);
				if(!selectedDot.hasClass('selected')) {
					var selectedPosition = selectedDot.index(),
						activePosition = container.find('.cd-slider .selected').index();
					if( activePosition < selectedPosition) {
						nextSlide(container, sliderPagination, selectedPosition);
					} else {
						prevSlide(container, sliderPagination, selectedPosition);
					}
				}
			});
		});	
			
		//keyboard slider navigation
		$(document).keyup(function(event){
			if(event.which=='37' && $('.cd-slider-active').length > 0 && !$('.cd-slider-active .cd-slider .selected').is(':first-child')) {
				prevSlide($('.cd-slider-active'), $('.cd-slider-active').find('.cd-slider-pagination li'));
			} else if( event.which=='39' && $('.cd-slider-active').length && !$('.cd-slider-active .cd-slider .selected').is(':last-child')) {
				nextSlide($('.cd-slider-active'), $('.cd-slider-active').find('.cd-slider-pagination li'));
			} else if(event.which=='27') {
				itemInfoWrapper.removeClass('cd-slider-active');
			}
		});

		function createSliderPagination($container){
			var wrapper = $('<ul class="cd-slider-pagination"></ul>').insertAfter($container.find('.cd-slider-navigation'));
			$container.find('.cd-slider li').each(function(index){
				var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
					dot = $('<a href="#0"></a>').appendTo(dotWrapper);
				dotWrapper.appendTo(wrapper);
				dot.text(index+1);
			});
			return wrapper.children('li');
		}

		function nextSlide($container, $pagination, $n){
			var visibleSlide = $container.find('.cd-slider .selected'),
				navigationDot = $container.find('.cd-slider-pagination .selected');
			if(typeof $n === 'undefined') $n = visibleSlide.index() + 1;
			visibleSlide.removeClass('selected');
			$container.find('.cd-slider li').eq($n).addClass('selected').prevAll().addClass('move-left');
			navigationDot.removeClass('selected')
			$pagination.eq($n).addClass('selected');
			updateNavigation($container, $container.find('.cd-slider li').eq($n));
		}

		function prevSlide($container, $pagination, $n){
			var visibleSlide = $container.find('.cd-slider .selected'),
				navigationDot = $container.find('.cd-slider-pagination .selected');
			if(typeof $n === 'undefined') $n = visibleSlide.index() - 1;
			visibleSlide.removeClass('selected')
			$container.find('.cd-slider li').eq($n).addClass('selected').removeClass('move-left').nextAll().removeClass('move-left');
			navigationDot.removeClass('selected');
			$pagination.eq($n).addClass('selected');
			updateNavigation($container, $container.find('.cd-slider li').eq($n));
		}

		function updateNavigation($container, $active) {
			$container.find('.cd-prev').toggleClass('inactive', $active.is(':first-child'));
			$container.find('.cd-next').toggleClass('inactive', $active.is(':last-child'));
		}

		function enableSwipe($container) {
			var mq = window.getComputedStyle(document.querySelector('.cd-slider'), '::before').getPropertyValue('content');
			return ( mq=='mobile' || $container.hasClass('cd-slider-active'));
		}
	});

	
 	//Logos Carousel 
	
	$(document).ready(function() {
	 
	  var owl = $("#owl-logos");
	 
	  owl.owlCarousel({
		 
		  itemsCustom : [
			[0, 2],
			[450, 2],
			[600, 2],
			[700, 3],
			[1000, 4],
			[1200, 4],
			[1400, 5],
			[1600, 5]
		  ],
		  autoPlay : 4000
	 
	  });
	 
	});
	
	
 	//Responsive Video 
	
	$(".container").fitVids();
	
	
 	//Facts Counter 
	
	jQuery(document).ready(function($){
        $('.counter-facts').counterUp({
            delay: 100,
            time: 3000
        });
    });


	/* Portfolio Sorting */

	jQuery(document).ready(function($){
		(function ($) { 
		
		
			var container = $('#projects-grid');
			
			
			function getNumbColumns() { 
				var winWidth = $(window).width(), 
					columnNumb = 1;
				
				
				if (winWidth > 1500) {
					columnNumb = 4;
				} else if (winWidth > 1200) {
					columnNumb = 3;
				} else if (winWidth > 900) {
					columnNumb = 2;
				} else if (winWidth > 600) {
					columnNumb = 2;
				} else if (winWidth > 300) {
					columnNumb = 1;
				}
				
				return columnNumb;
			}
			
			
			function setColumnWidth() { 
				var winWidth = $(window).width(), 
					columnNumb = getNumbColumns(), 
					postWidth = Math.floor(winWidth / columnNumb);

			}
			
			$('#portfolio-filter #filter a').click(function () { 
				var selector = $(this).attr('data-filter');
				
				$(this).parent().parent().find('a').removeClass('current');
				$(this).addClass('current');
				
				container.isotope( { 
					filter : selector 
				});
				
				setTimeout(function () { 
					reArrangeProjects();
				}, 300);
				
				
				return false;
			});
			
			function reArrangeProjects() { 
				setColumnWidth();
				container.isotope('reLayout');
			}
			
			
			container.imagesLoaded(function () { 
				setColumnWidth();
				
				
				container.isotope( { 
					itemSelector : '.portfolio-box-1', 
					layoutMode : 'masonry', 
					resizable : false 
				} );
			} );
			
			
		
			
		
			$(window).on('debouncedresize', function () { 
				reArrangeProjects();
				
			} );
			
		
		} )(jQuery);
	} );





	/* DebouncedResize Function */
		(function ($) { 
			var $event = $.event, 
				$special, 
				resizeTimeout;
			
			
			$special = $event.special.debouncedresize = { 
				setup : function () { 
					$(this).on('resize', $special.handler);
				}, 
				teardown : function () { 
					$(this).off('resize', $special.handler);
				}, 
				handler : function (event, execAsap) { 
					var context = this, 
						args = arguments, 
						dispatch = function () { 
							event.type = 'debouncedresize';
							
							$event.dispatch.apply(context, args);
						};
					
					
					if (resizeTimeout) {
						clearTimeout(resizeTimeout);
					}
					
					
					execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
				}, 
				threshold : 150 
			};
		} )(jQuery);


	
	
	
	 // Portfolio Ajax

	 
			$(window).load(function() {
			'use strict';		  
			  var loader = $('.expander-wrap');
			if(typeof loader.html() == 'undefined'){
				$('<div class="expander-wrap"><div id="expander-wrap" class="container clearfix relative"><p class="cls-btn"><a class="close">X</a></p><div/></div></div>').css({opacity:0}).hide().insertAfter('.portfolio');
				loader = $('.expander-wrap');
			}
			$('.expander').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				var url = $(this).attr('href');



				loader.slideUp(function(){
					$.get(url, function(data){
						var portfolioContainer = $('.portfolio');
						var topPosition = portfolioContainer.offset().top;
						var bottomPosition = topPosition + portfolioContainer.height();
						$('html,body').delay(600).animate({ scrollTop: bottomPosition - -10}, 800);
						var container = $('#expander-wrap>div', loader);
						
						container.html(data);
						$("#owl-portfolio-slider").owlCarousel({
							 
							navigation: false, 
							slideSpeed : 300,
							autoPlay : 5000,
							singleItem:true
						 
						});
						
						$(".container").fitVids();
					
						loader.slideDown(function(){
							if(typeof keepVideoRatio == 'function'){
								keepVideoRatio('.container > iframe');
							}
						}).delay(1000).animate({opacity:1}, 200);
					});
				});
			});
			
			$('.close', loader).on('click', function(){
				loader.delay(300).slideUp(function(){
					var container = $('#expander-wrap>div', loader);
					container.html('');
					$(this).css({opacity:0});
					
				});
				var portfolioContainer = $('.portfolio');
					var topPosition = portfolioContainer.offset().top;
					$('html,body').delay(0).animate({ scrollTop: topPosition - 70}, 500);
			});

	});	
	
	
	//set your google maps parameters

	jQuery(document).ready(function($){
		
		var latitude = 44.8013716,
			longitude = 20.4631372,
			map_zoom = 15;

		//google map custom marker icon - .png fallback for IE11
		var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
		var marker_url = ( is_internetExplorer11 ) ? 'images/cd-icon-location.png' : 'images/cd-icon-location.svg';
			
		//define the basic color of your map, plus a value for saturation and brightness
		var	main_color = '#cccccc',
			saturation_value= -100,
			brightness_value= 9;

		//we define here the style of the map
		var style= [ 
			{
				//set saturation for the labels on the map
				elementType: "labels",
				stylers: [
					{saturation: saturation_value}
				]
			},  
			{	//poi stands for point of interest - don't show these lables on the map 
				featureType: "poi",
				elementType: "labels",
				stylers: [
					{visibility: "off"}
				]
			},
			{
				//don't show highways lables on the map
				featureType: 'road.highway',
				elementType: 'labels',
				stylers: [
					{visibility: "off"}
				]
			}, 
			{ 	
				//don't show local road lables on the map
				featureType: "road.local", 
				elementType: "labels.icon", 
				stylers: [
					{visibility: "off"} 
				] 
			},
			{ 
				//don't show arterial road lables on the map
				featureType: "road.arterial", 
				elementType: "labels.icon", 
				stylers: [
					{visibility: "off"}
				] 
			},
			{
				//don't show road lables on the map
				featureType: "road",
				elementType: "geometry.stroke",
				stylers: [
					{visibility: "off"}
				]
			}, 
			//style different elements on the map
			{ 
				featureType: "transit", 
				elementType: "geometry.fill", 
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			}, 
			{
				featureType: "poi",
				elementType: "geometry.fill",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			},
			{
				featureType: "poi.government",
				elementType: "geometry.fill",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			},
			{
				featureType: "poi.sport_complex",
				elementType: "geometry.fill",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			},
			{
				featureType: "poi.attraction",
				elementType: "geometry.fill",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			},
			{
				featureType: "poi.business",
				elementType: "geometry.fill",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			},
			{
				featureType: "transit",
				elementType: "geometry.fill",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			},
			{
				featureType: "transit.station",
				elementType: "geometry.fill",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			},
			{
				featureType: "landscape",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
				
			},
			{
				featureType: "road",
				elementType: "geometry.fill",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			},
			{
				featureType: "road.highway",
				elementType: "geometry.fill",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			}, 
			{
				featureType: "water",
				elementType: "geometry",
				stylers: [
					{ hue: main_color },
					{ visibility: "on" }, 
					{ lightness: brightness_value }, 
					{ saturation: saturation_value }
				]
			}
		];
			
		//set google map options
		var map_options = {
			center: new google.maps.LatLng(latitude, longitude),
			zoom: map_zoom,
			panControl: false,
			zoomControl: false,
			mapTypeControl: false,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			styles: style,
		}
		//inizialize the map
		var map = new google.maps.Map(document.getElementById('google-container'), map_options);
		//add a custom marker to the map				
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude),
			map: map,
			visible: true,
			icon: marker_url,
		});

		//add custom buttons for the zoom-in/zoom-out on the map
		function CustomZoomControl(controlDiv, map) {
			//grap the zoom elements from the DOM and insert them in the map 
			var controlUIzoomIn= document.getElementById('cd-zoom-in'),
				controlUIzoomOut= document.getElementById('cd-zoom-out');
			controlDiv.appendChild(controlUIzoomIn);
			controlDiv.appendChild(controlUIzoomOut);

			// Setup the click event listeners and zoom-in or out according to the clicked element
			google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
				map.setZoom(map.getZoom()+1)
			});
			google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
				map.setZoom(map.getZoom()-1)
			});
		}

		var zoomControlDiv = document.createElement('div');
		var zoomControl = new CustomZoomControl(zoomControlDiv, map);

		//insert the zoom div on the top left of the map
		map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
	});




	
  })(jQuery); 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 





	