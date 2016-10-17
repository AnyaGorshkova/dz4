

var myModule = (function() {
	'use strict';
	$('button').click(function(){
   	var data = {
    name: $('input#t').val(),
     body: $('input#b').val()
   };
   data=JSON.stringify(data);
   $.ajax({
		url: '/addPost',
		type: 'POST',
		contentType: 'application/json',
		data: data,
		success: 
		// получаем ответ от сервера и добавляем элемент на страницу
			function(ans){
				$('button').after('<h1>'+ans.name+'</h1>');
			},
		// если ошибка, выводим сообщение
		error: function(jqXHR, exception) {
			if (jqXHR.status === 0) {
					alert('Not connect.\n Verify Network.');
			} else if (jqXHR.status == 404) {
					alert('Requested page not found. [404]');
			} else if (jqXHR.status == 500) {
					alert('Internal Server Error [500].');
			} else if (exception === 'parsererror') {
					alert('Requested JSON parse failed.');
			} else if (exception === 'timeout') {
				alert('Time out error.');
			} else if (exception === 'abort') {
				alert('Ajax request aborted.');
			} else {
				alert('Uncaught Error.\n' + jqXHR.responseText);
			}
	}	
});
});
	//чтобы футер не наехал на сатьи
var h_f=$('.footer-page').height();
$('.section_blog').css('padding-bottom', h_f);
// блюр

var blur = function(){

	var
			blurSection = $('.section-blur'),
			blur = $('.popup-container'),
			imgWidth = $('.blur__bg').width(),

			posTop = blurSection.offset().top-blur.offset().top,
			posLeft = blurSection.offset().left-blur.offset().left;

	if ($(window).width()<=1200) {
		$('.popup-container').css('background-image','url(../assets/img/bg-about1200.png)');
		$('.blur__bg img').attr('src','/assets/img/bg-about1200.png');
	}
	if ($(window).width()<=900) {
		$('.popup-container').css('background-image','url(../assets/img/bg-about768.png)');
		$('.blur__bg img').attr('src','/assets/img/bg-about768.png');
	}
	if ($(window).width()<=610){
		$('.popup-container').css('background-image','url(../assets/img/bg-about320.png)');
		$('.blur__bg img').attr('src','/assets/img/bg-about320.png');
	}
	if ($(window).width()>=1200){
		$('.popup-container').css('background-image','url(../assets/img/bg-about.png)');
		$('.blur__bg img').attr('src','/assets/img/bg-about.png');
	}		
			blur.css({
				'background-size' : imgWidth + 'px' + ' ' + 'auto',
				'background-position' : posLeft + 'px' + ' ' + posTop+ 'px'
			});
};




if (window.location.toString().indexOf('portfolio.htm')>0){
	blur();
	}


$(window).resize(function(){
	blur();
});
// слайдер
var flag=true;
var slider = function(sliderCont){
	var counter = 0,
			counter_prev = 4,
			counter_next = 1,
			sliderCur=sliderCont,
			b_n=sliderCur.find('.controls_next'),
			b_p=sliderCur.find('.controls_prev');

	$(b_n).on('click', function(){
		if(flag==true){
			flag=false;
				var
						$this = $(this),
						slider = $this.closest('.slider'),
						imgs = slider.find('.slider__item_big'),
						imgs_prev = slider.find('.slider__item_prev'),
						imgs_next = slider.find('.slider__item_next'),
						descriptions = slider.find('.slider__description'),
						active = imgs.filter('.active'),
						active_prev = imgs_prev.filter('.active'),
						active_next = imgs_next.filter('.active'),
						active_description = descriptions.filter('.active'),
						next;

				if (counter != imgs.length-1){
					next = counter+1;
				} else{
					next = 0;
				}

				counter_prev = counter;

				if (next != imgs.length-1){
					counter_next = next+1;
				} else{
					counter_next = 0;
				}

				active_description.animate({
		        opacity: 0
		      	}, 500, function(){
		      		active_description.removeClass('active');
		      	})
				descriptions.eq(next).addClass('active');
				descriptions.eq(next).animate({
		        opacity: 1
		      	}, 500)

				active.animate({
		        opacity: 0
		      	}, 1000, function(){
		      		active.removeClass('active');
		      	})
				imgs.eq(next).addClass('active');
				imgs.eq(next).animate({
		        opacity: 1
		      	}, 1000)

				var promiseNext1 = new Promise(function(resolve){
					active_next.animate({
		        'top': '-100%'
		      	}, 1000, function(){
			      	active_next.css('top','100%');
			      	active_next.removeClass('active');
			      	resolve("ура");
		      	});
					})

				var promiseNext2 = new Promise(function(resolve){
					imgs_next.eq(counter_next).animate({
		        'top': '0%'
		      	}, 1000, function(){
		      		imgs_next.eq(counter_next).addClass('active');
		      		resolve('second');
		      	});
					})

				var promisePrev1 = new Promise(function(resolve){
					active_prev.animate({
		        'top': '100%'
		      	}, 1000, function(){
		      		active_prev.css('top','-100%');
		      		active_prev.removeClass('active');
		      		resolve('3');
		      	});
					})

				var promisePrev2 = new Promise(function(resolve){
					imgs_prev.eq(counter_prev).animate({
		        'top': '0%'
		      	}, 1000, function(){
		      		imgs_prev.eq(counter_prev).addClass('active');
		      		resolve('4');
		      	});
					})

			Promise.all([
			  promiseNext1,
			  promiseNext2,
			  promisePrev1,
			  promisePrev2
			]).then(function(result){
				console.log('all!!!');
				flag=true;
			})
			counter++;
			if(counter==imgs.length){
				counter = 0;
			}
		}
		return false;
	});

	//предыдущий слайд
	$(b_p).on('click', function(){
		console.log('click');
		if (flag==true){
			flag=false;
			var
					$this = $(this),
					slider = $this.closest('.slider'),
					imgs = slider.find('.slider__item_big'),
					imgs_prev = slider.find('.slider__item_prev'),
					imgs_next = slider.find('.slider__item_next'),
					descriptions = slider.find('.slider__description'),
					active = imgs.filter('.active'),
					active_prev = imgs_prev.filter('.active'),
					active_next = imgs_next.filter('.active'),
					active_description = descriptions.filter('.active'),
					prev;

			if (counter != 0){
				prev = counter-1;
			} else{
				prev = imgs.length-1;
			}

			counter_next = counter;

			if (prev != 0){
				counter_prev = prev-1;
			} else{
				counter_prev = imgs.length-1;
			}

			active_description.animate({
		        opacity: 0
		      	}, 500, function(){
		      		active_description.removeClass('active');
		      	})
				descriptions.eq(prev).addClass('active');
				descriptions.eq(prev).animate({
		        opacity: 1
		      	}, 500)

				active.animate({
		        opacity: 0
		      	}, 1000, function(){
		      		active.removeClass('active');
		      	})
				imgs.eq(prev).addClass('active');
				imgs.eq(prev).animate({
		        opacity: 1
		      	}, 1000)

			var promiseNext1 = new Promise(function(resolve){
						active_next.animate({
			        'top': '-100%'
			      	}, 1500, function(){
				      	active_next.css('top','100%');
				      	active_next.removeClass('active');
				      	resolve("ура");
			      	});
						})

					var promiseNext2 = new Promise(function(resolve){
						imgs_next.eq(counter_next).animate({
			        'top': '0%'
			      	}, 1500, function(){
			      		imgs_next.eq(counter_next).addClass('active');
			      		resolve('second');
			      	});
						})

					var promisePrev1 = new Promise(function(resolve){
						active_prev.animate({
			        'top': '100%'
			      	}, 1500, function(){
			      		active_prev.css('top','-100%');
			      		active_prev.removeClass('active');
			      		resolve('3');
			      	});
						})

					var promisePrev2 = new Promise(function(resolve){
						imgs_prev.eq(counter_prev).animate({
			        'top': '0%'
			      	}, 1500, function(){
			      		imgs_prev.eq(counter_prev).addClass('active');
			      		resolve('4');
			      	});
						})

				Promise.all([
				  promiseNext1,
				  promiseNext2,
				  promisePrev1,
				  promisePrev2
				]).then(function(result){
					console.log('all!!!');
					flag=true;
				})
			
			if(counter!=0){
				counter--;
			}
			else{
				counter = imgs.length-1;
			}
		}
		return false;
	});
}

slider($('.slider1'));

// прелоадер
var imgs = [];
$.each($('*'), function() {
	var
			$this = $(this),
			bg = $this.css('background-image'),
			img = $this.is('img');

	if(bg != 'none'&& bg.indexOf("url")!=-1){
		var path = bg.replace('url("', '').replace('")', '');
		console.log(path);
		imgs.push(path);
	}

	if(img){
		var path = $this.attr('src');

		if (path) {
			imgs.push(path);
		}
	}

});

	var itemTotal=1;
	console.log(imgs.length);
	for(var i = 0; i<imgs.length; i++){
		var image =$('<img>', {
				src: imgs[i]});

		image.on("load", function(){
			setPr(imgs.length,itemTotal);
			itemTotal++;})
		image.on("error", function(){
			setPr(imgs.length,itemTotal);
			itemTotal++;
		});

}
// вычисляем, сколько процентов загружено
	function setPr(total, curent){

		var percent = Math.ceil(curent/total*100);
		console.log(percent);
		if (percent>= 100){
			$('.preloader-container').fadeOut();
			$('body').css('overflow','visible');
		}
		$('.preloader__percent').text(percent + '%');
	}


//вычисляем высоту секции с картой
 var wh = 650;
 if($(window).height() > wh){
 	wh = $(window).height();
 }
 var h = $('.footer-page').height()+wh;
 $('.section_map').height(h);

 // нажатие на кнопку авторизации
 $('#login-button, .button_return').click(function(){
 	$('.popap-wrapper-container').toggleClass('flipp');
 });

// нажатие на гамбургер
 $('.ham').click(function(){
 	$('.main-nav').toggleClass('hide');
 	if($(".ham").hasClass("check")){
 			$('.el1').removeClass('el1_animate');
 			$('.el2').css('opacity','1');
 			$('.el3').removeClass('el3_animate');
 			$(".ham").removeClass("check");

 	} else{
 		$('.el1').addClass('el1_animate');
 		$('.el2').css('opacity','0');
 		$('.el3').addClass('el3_animate');
 		$(".ham").addClass("check");
 	}
 	
 });
 $('.main-nav__link').mouseover(function(){
 	$(this).addClass('ac');
 });
 $('.main-nav__link').mouseout(function(){
 	if($(this).hasClass('ac')){
 		$(this).removeClass('ac');	
 	}
 	
 })


 //Нажатие стрелки вниз в хедере
 $('.arrow-down').click(function(){
 	 var height=$(".header-page").height(); 
 	 $('body,html').animate({"scrollTop": height }, 800);
 });


//фиксировать 
$(window).scroll(function() {
// подсвечиваем заголовки статей

$.each($('article'), function() {
	var
			$this = $(this),
			id_article = $this.attr('id'),
			dist = $this.offset().top,
			h = $this.height();

		if($(window).scrollTop()>=dist-70 && $(window).scrollTop()<=dist+h){
			
			$.each($('.asie-blog__link'), function() {
	
				if($(this).attr('href')=='#'+id_article){
					$(this).addClass('aside-blog__item_active');
				}else{
					$(this).removeClass('aside-blog__item_active');
				}
		})
	}		
});
//фиксируем aside в блоге

	if(($('html').scrollTop()>=$('.header-page').height()) || ($('body').scrollTop()>=$('.header-page').height())){

		if (!($('.aside-blog').hasClass('fixed'))){
    		$('.aside-blog').addClass('fixed');
    	}
    }
  else{
    		if ($('.aside-blog').hasClass('fixed')){
	    		$('.aside-blog').removeClass('fixed');
	    	}
    	}

//анимация 
 if (window.location.toString().indexOf('about.htm')>0){ 

 var toskill = $('.my-skills__skills').offset().top;
	if ($('body').scrollTop()>=(toskill-$(window).height()+$('.my-skills__item').height()) && $('body').scrollTop()<toskill+$('.my-skills__skills').height()){
		$('circle').attr('class', 'fill_anim');
	}
	if ($('body').scrollTop()<(toskill-$(window).height()+$('.my-skills__item').height()) || $('body').scrollTop()>=toskill+$('.my-skills__skills').height()){
		$('circle').attr('class', '');
	}
}
});

$(document).on('click', '.fixed',function(){
	if ($('.fixed').css('left')=='0px' && $(window).width()<=767){
    			$('.fixed').css('left','-50%');
    		}
   if ($('.fixed').css('left')!='0px' && $(window).width()<=767)
   {
    				$('.fixed').css('left','0');
    		}
});
$(window).resize(function(){
  if($(window).width()>767){
  	$('.fixed').css('left','0');
  }
  if($(window).width()<=767){
  	$('.fixed').css('left','-50%');
  }
});

$('.asie-blog__link').on('click', function(){
	event.preventDefault();
	var id  = $(this).attr('href'),
			top = $(id).offset().top;
	$('.asie-blog__link').removeClass('aside-blog__item_active');
	$(this).addClass('aside-blog__item_active');
	$('body,html').animate({scrollTop: top}, 1000);
});

})();

var validation = (function() {
	'use strict';

var init = function() {
	_setUpListners();
};
var check = true;
var _setUpListners = function() {
	$('input:text').on('keydown',function(){
		$(this).css('border', '1px solid #608e53');
		$(this).siblings('.icon_input').css({'border-right': '1px solid #608e53','color': '#608e53'});
		$(this).prev('.tooltip').remove();
		check = true;
	})
};

var validateForm = function(form) {
	var 
			elements = form.find('input:text'),
			valid = true;

	$.each(elements, function(index, val){
		
		var
				element = $(val),
				val = element.val();

		if((val.length === 0)) {
			console.log('проверить форму');
			element.css('border', '1px solid #e44845');
			element.siblings('.icon_input').css({'border-right': '1px solid #e44845',
				'color': '#e44845'});
			if(!(element.prev().is('.tooltip'))) {
				element.before("<div class='tooltip'><div class='tooltip__container'>"+element.attr('data-mes')+"</div></div>");
			}
			valid = false;
		}
	})
	check = false;
	return valid;
};

var clearForm = function(form) {
	
	var 
			elements = form.find('input:text');

	$.each(elements, function(index, val){
		
		var
				element = $(val),
				val = element.val();
		element.val('');
		element.css('border', 'none');
		element.siblings('.icon_input').css({'border-right': 'none',
				'color': '#c4cbcd'});
		$('.tooltip').remove();
	});
};
return {
	init: init,
	validateForm: validateForm,
	clearForm: clearForm
};

})();
validation.init();
var login = (function() {
	'use strict';

var init = function() {
	_setUpListners();
};

var _setUpListners = function() {
	$('.button_submit').on('click', _submitForm);
	$('.button_clear').on('click', _clearForm);

};
var _clearForm = function(ev){
	console.log('clear');
	ev.preventDefault();
	var form = $(this).parent().parent().siblings('.login_form');
	validation.clearForm(form);
}
var _submitForm = function(ev){
	ev.preventDefault();
	
	var form = $(this).parent().parent().siblings('.login_form'),
			url = 'login.php',
			defObj = _ajaxForm(form, url);
			// получаем ответ от сервера и обрабатываем
}

var _ajaxForm = function (form, url){
	
	if (!validation.validateForm(form)) return false;

	console.log('всё хорошо, делаем запрос на сервер');
	var data = form.serialize();

	console.log(data);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: data,
	})
	.done(function(ans){
		console.log('done');
		console.log(ans);
	})
	.fail(function(){
		console.log('error');
	})

	validation.clearForm(form);
}

return {
	init:init
};

})();
login.init();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInZhbGlkYXRpb24uanMiLCJsb2dpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG52YXIgbXlNb2R1bGUgPSAoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdC8v0YfRgtC+0LHRiyDRhNGD0YLQtdGAINC90LUg0L3QsNC10YXQsNC7INC90LAg0YHQsNGC0YzQuFxyXG52YXIgaF9mPSQoJy5mb290ZXItcGFnZScpLmhlaWdodCgpO1xyXG4kKCcuc2VjdGlvbl9ibG9nJykuY3NzKCdwYWRkaW5nLWJvdHRvbScsIGhfZik7XHJcbi8vINCx0LvRjtGAXHJcblxyXG52YXIgYmx1ciA9IGZ1bmN0aW9uKCl7XHJcblxyXG5cdHZhclxyXG5cdFx0XHRibHVyU2VjdGlvbiA9ICQoJy5zZWN0aW9uLWJsdXInKSxcclxuXHRcdFx0Ymx1ciA9ICQoJy5wb3B1cC1jb250YWluZXInKSxcclxuXHRcdFx0aW1nV2lkdGggPSAkKCcuYmx1cl9fYmcnKS53aWR0aCgpLFxyXG5cclxuXHRcdFx0cG9zVG9wID0gYmx1clNlY3Rpb24ub2Zmc2V0KCkudG9wLWJsdXIub2Zmc2V0KCkudG9wLFxyXG5cdFx0XHRwb3NMZWZ0ID0gYmx1clNlY3Rpb24ub2Zmc2V0KCkubGVmdC1ibHVyLm9mZnNldCgpLmxlZnQ7XHJcblxyXG5cdGlmICgkKHdpbmRvdykud2lkdGgoKTw9MTIwMCkge1xyXG5cdFx0JCgnLnBvcHVwLWNvbnRhaW5lcicpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsJ3VybCguLi9hc3NldHMvaW1nL2JnLWFib3V0MTIwMC5wbmcpJyk7XHJcblx0XHQkKCcuYmx1cl9fYmcgaW1nJykuYXR0cignc3JjJywnL2Fzc2V0cy9pbWcvYmctYWJvdXQxMjAwLnBuZycpO1xyXG5cdH1cclxuXHRpZiAoJCh3aW5kb3cpLndpZHRoKCk8PTkwMCkge1xyXG5cdFx0JCgnLnBvcHVwLWNvbnRhaW5lcicpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsJ3VybCguLi9hc3NldHMvaW1nL2JnLWFib3V0NzY4LnBuZyknKTtcclxuXHRcdCQoJy5ibHVyX19iZyBpbWcnKS5hdHRyKCdzcmMnLCcvYXNzZXRzL2ltZy9iZy1hYm91dDc2OC5wbmcnKTtcclxuXHR9XHJcblx0aWYgKCQod2luZG93KS53aWR0aCgpPD02MTApe1xyXG5cdFx0JCgnLnBvcHVwLWNvbnRhaW5lcicpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsJ3VybCguLi9hc3NldHMvaW1nL2JnLWFib3V0MzIwLnBuZyknKTtcclxuXHRcdCQoJy5ibHVyX19iZyBpbWcnKS5hdHRyKCdzcmMnLCcvYXNzZXRzL2ltZy9iZy1hYm91dDMyMC5wbmcnKTtcclxuXHR9XHJcblx0aWYgKCQod2luZG93KS53aWR0aCgpPj0xMjAwKXtcclxuXHRcdCQoJy5wb3B1cC1jb250YWluZXInKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCd1cmwoLi4vYXNzZXRzL2ltZy9iZy1hYm91dC5wbmcpJyk7XHJcblx0XHQkKCcuYmx1cl9fYmcgaW1nJykuYXR0cignc3JjJywnL2Fzc2V0cy9pbWcvYmctYWJvdXQucG5nJyk7XHJcblx0fVx0XHRcclxuXHRcdFx0Ymx1ci5jc3Moe1xyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLXNpemUnIDogaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nLFxyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLXBvc2l0aW9uJyA6IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wKyAncHgnXHJcblx0XHRcdH0pO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuaWYgKHdpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpLmluZGV4T2YoJ3BvcnRmb2xpby5odG0nKT4wKXtcclxuXHRibHVyKCk7XHJcblx0fVxyXG5cclxuXHJcbiQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcclxuXHRibHVyKCk7XHJcbn0pO1xyXG4vLyDRgdC70LDQudC00LXRgFxyXG52YXIgZmxhZz10cnVlO1xyXG52YXIgc2xpZGVyID0gZnVuY3Rpb24oc2xpZGVyQ29udCl7XHJcblx0dmFyIGNvdW50ZXIgPSAwLFxyXG5cdFx0XHRjb3VudGVyX3ByZXYgPSA0LFxyXG5cdFx0XHRjb3VudGVyX25leHQgPSAxLFxyXG5cdFx0XHRzbGlkZXJDdXI9c2xpZGVyQ29udCxcclxuXHRcdFx0Yl9uPXNsaWRlckN1ci5maW5kKCcuY29udHJvbHNfbmV4dCcpLFxyXG5cdFx0XHRiX3A9c2xpZGVyQ3VyLmZpbmQoJy5jb250cm9sc19wcmV2Jyk7XHJcblxyXG5cdCQoYl9uKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0aWYoZmxhZz09dHJ1ZSl7XHJcblx0XHRcdGZsYWc9ZmFsc2U7XHJcblx0XHRcdFx0dmFyXHJcblx0XHRcdFx0XHRcdCR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0c2xpZGVyID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlcicpLFxyXG5cdFx0XHRcdFx0XHRpbWdzID0gc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2l0ZW1fYmlnJyksXHJcblx0XHRcdFx0XHRcdGltZ3NfcHJldiA9IHNsaWRlci5maW5kKCcuc2xpZGVyX19pdGVtX3ByZXYnKSxcclxuXHRcdFx0XHRcdFx0aW1nc19uZXh0ID0gc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2l0ZW1fbmV4dCcpLFxyXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbnMgPSBzbGlkZXIuZmluZCgnLnNsaWRlcl9fZGVzY3JpcHRpb24nKSxcclxuXHRcdFx0XHRcdFx0YWN0aXZlID0gaW1ncy5maWx0ZXIoJy5hY3RpdmUnKSxcclxuXHRcdFx0XHRcdFx0YWN0aXZlX3ByZXYgPSBpbWdzX3ByZXYuZmlsdGVyKCcuYWN0aXZlJyksXHJcblx0XHRcdFx0XHRcdGFjdGl2ZV9uZXh0ID0gaW1nc19uZXh0LmZpbHRlcignLmFjdGl2ZScpLFxyXG5cdFx0XHRcdFx0XHRhY3RpdmVfZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnMuZmlsdGVyKCcuYWN0aXZlJyksXHJcblx0XHRcdFx0XHRcdG5leHQ7XHJcblxyXG5cdFx0XHRcdGlmIChjb3VudGVyICE9IGltZ3MubGVuZ3RoLTEpe1xyXG5cdFx0XHRcdFx0bmV4dCA9IGNvdW50ZXIrMTtcclxuXHRcdFx0XHR9IGVsc2V7XHJcblx0XHRcdFx0XHRuZXh0ID0gMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGNvdW50ZXJfcHJldiA9IGNvdW50ZXI7XHJcblxyXG5cdFx0XHRcdGlmIChuZXh0ICE9IGltZ3MubGVuZ3RoLTEpe1xyXG5cdFx0XHRcdFx0Y291bnRlcl9uZXh0ID0gbmV4dCsxO1xyXG5cdFx0XHRcdH0gZWxzZXtcclxuXHRcdFx0XHRcdGNvdW50ZXJfbmV4dCA9IDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhY3RpdmVfZGVzY3JpcHRpb24uYW5pbWF0ZSh7XHJcblx0XHQgICAgICAgIG9wYWNpdHk6IDBcclxuXHRcdCAgICAgIFx0fSwgNTAwLCBmdW5jdGlvbigpe1xyXG5cdFx0ICAgICAgXHRcdGFjdGl2ZV9kZXNjcmlwdGlvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHQgICAgICBcdH0pXHJcblx0XHRcdFx0ZGVzY3JpcHRpb25zLmVxKG5leHQpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRkZXNjcmlwdGlvbnMuZXEobmV4dCkuYW5pbWF0ZSh7XHJcblx0XHQgICAgICAgIG9wYWNpdHk6IDFcclxuXHRcdCAgICAgIFx0fSwgNTAwKVxyXG5cclxuXHRcdFx0XHRhY3RpdmUuYW5pbWF0ZSh7XHJcblx0XHQgICAgICAgIG9wYWNpdHk6IDBcclxuXHRcdCAgICAgIFx0fSwgMTAwMCwgZnVuY3Rpb24oKXtcclxuXHRcdCAgICAgIFx0XHRhY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0ICAgICAgXHR9KVxyXG5cdFx0XHRcdGltZ3MuZXEobmV4dCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGltZ3MuZXEobmV4dCkuYW5pbWF0ZSh7XHJcblx0XHQgICAgICAgIG9wYWNpdHk6IDFcclxuXHRcdCAgICAgIFx0fSwgMTAwMClcclxuXHJcblx0XHRcdFx0dmFyIHByb21pc2VOZXh0MSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe1xyXG5cdFx0XHRcdFx0YWN0aXZlX25leHQuYW5pbWF0ZSh7XHJcblx0XHQgICAgICAgICd0b3AnOiAnLTEwMCUnXHJcblx0XHQgICAgICBcdH0sIDEwMDAsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdCAgICAgIFx0YWN0aXZlX25leHQuY3NzKCd0b3AnLCcxMDAlJyk7XHJcblx0XHRcdCAgICAgIFx0YWN0aXZlX25leHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQgICAgICBcdHJlc29sdmUoXCLRg9GA0LBcIik7XHJcblx0XHQgICAgICBcdH0pO1xyXG5cdFx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0dmFyIHByb21pc2VOZXh0MiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe1xyXG5cdFx0XHRcdFx0aW1nc19uZXh0LmVxKGNvdW50ZXJfbmV4dCkuYW5pbWF0ZSh7XHJcblx0XHQgICAgICAgICd0b3AnOiAnMCUnXHJcblx0XHQgICAgICBcdH0sIDEwMDAsIGZ1bmN0aW9uKCl7XHJcblx0XHQgICAgICBcdFx0aW1nc19uZXh0LmVxKGNvdW50ZXJfbmV4dCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0ICAgICAgXHRcdHJlc29sdmUoJ3NlY29uZCcpO1xyXG5cdFx0ICAgICAgXHR9KTtcclxuXHRcdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdHZhciBwcm9taXNlUHJldjEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKXtcclxuXHRcdFx0XHRcdGFjdGl2ZV9wcmV2LmFuaW1hdGUoe1xyXG5cdFx0ICAgICAgICAndG9wJzogJzEwMCUnXHJcblx0XHQgICAgICBcdH0sIDEwMDAsIGZ1bmN0aW9uKCl7XHJcblx0XHQgICAgICBcdFx0YWN0aXZlX3ByZXYuY3NzKCd0b3AnLCctMTAwJScpO1xyXG5cdFx0ICAgICAgXHRcdGFjdGl2ZV9wcmV2LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdCAgICAgIFx0XHRyZXNvbHZlKCczJyk7XHJcblx0XHQgICAgICBcdH0pO1xyXG5cdFx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0dmFyIHByb21pc2VQcmV2MiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe1xyXG5cdFx0XHRcdFx0aW1nc19wcmV2LmVxKGNvdW50ZXJfcHJldikuYW5pbWF0ZSh7XHJcblx0XHQgICAgICAgICd0b3AnOiAnMCUnXHJcblx0XHQgICAgICBcdH0sIDEwMDAsIGZ1bmN0aW9uKCl7XHJcblx0XHQgICAgICBcdFx0aW1nc19wcmV2LmVxKGNvdW50ZXJfcHJldikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0ICAgICAgXHRcdHJlc29sdmUoJzQnKTtcclxuXHRcdCAgICAgIFx0fSk7XHJcblx0XHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0UHJvbWlzZS5hbGwoW1xyXG5cdFx0XHQgIHByb21pc2VOZXh0MSxcclxuXHRcdFx0ICBwcm9taXNlTmV4dDIsXHJcblx0XHRcdCAgcHJvbWlzZVByZXYxLFxyXG5cdFx0XHQgIHByb21pc2VQcmV2MlxyXG5cdFx0XHRdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2FsbCEhIScpO1xyXG5cdFx0XHRcdGZsYWc9dHJ1ZTtcclxuXHRcdFx0fSlcclxuXHRcdFx0Y291bnRlcisrO1xyXG5cdFx0XHRpZihjb3VudGVyPT1pbWdzLmxlbmd0aCl7XHJcblx0XHRcdFx0Y291bnRlciA9IDA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHJcblx0Ly/Qv9GA0LXQtNGL0LTRg9GJ0LjQuSDRgdC70LDQudC0XHJcblx0JChiX3ApLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zb2xlLmxvZygnY2xpY2snKTtcclxuXHRcdGlmIChmbGFnPT10cnVlKXtcclxuXHRcdFx0ZmxhZz1mYWxzZTtcclxuXHRcdFx0dmFyXHJcblx0XHRcdFx0XHQkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0XHRzbGlkZXIgPSAkdGhpcy5jbG9zZXN0KCcuc2xpZGVyJyksXHJcblx0XHRcdFx0XHRpbWdzID0gc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2l0ZW1fYmlnJyksXHJcblx0XHRcdFx0XHRpbWdzX3ByZXYgPSBzbGlkZXIuZmluZCgnLnNsaWRlcl9faXRlbV9wcmV2JyksXHJcblx0XHRcdFx0XHRpbWdzX25leHQgPSBzbGlkZXIuZmluZCgnLnNsaWRlcl9faXRlbV9uZXh0JyksXHJcblx0XHRcdFx0XHRkZXNjcmlwdGlvbnMgPSBzbGlkZXIuZmluZCgnLnNsaWRlcl9fZGVzY3JpcHRpb24nKSxcclxuXHRcdFx0XHRcdGFjdGl2ZSA9IGltZ3MuZmlsdGVyKCcuYWN0aXZlJyksXHJcblx0XHRcdFx0XHRhY3RpdmVfcHJldiA9IGltZ3NfcHJldi5maWx0ZXIoJy5hY3RpdmUnKSxcclxuXHRcdFx0XHRcdGFjdGl2ZV9uZXh0ID0gaW1nc19uZXh0LmZpbHRlcignLmFjdGl2ZScpLFxyXG5cdFx0XHRcdFx0YWN0aXZlX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zLmZpbHRlcignLmFjdGl2ZScpLFxyXG5cdFx0XHRcdFx0cHJldjtcclxuXHJcblx0XHRcdGlmIChjb3VudGVyICE9IDApe1xyXG5cdFx0XHRcdHByZXYgPSBjb3VudGVyLTE7XHJcblx0XHRcdH0gZWxzZXtcclxuXHRcdFx0XHRwcmV2ID0gaW1ncy5sZW5ndGgtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y291bnRlcl9uZXh0ID0gY291bnRlcjtcclxuXHJcblx0XHRcdGlmIChwcmV2ICE9IDApe1xyXG5cdFx0XHRcdGNvdW50ZXJfcHJldiA9IHByZXYtMTtcclxuXHRcdFx0fSBlbHNle1xyXG5cdFx0XHRcdGNvdW50ZXJfcHJldiA9IGltZ3MubGVuZ3RoLTE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGFjdGl2ZV9kZXNjcmlwdGlvbi5hbmltYXRlKHtcclxuXHRcdCAgICAgICAgb3BhY2l0eTogMFxyXG5cdFx0ICAgICAgXHR9LCA1MDAsIGZ1bmN0aW9uKCl7XHJcblx0XHQgICAgICBcdFx0YWN0aXZlX2Rlc2NyaXB0aW9uLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdCAgICAgIFx0fSlcclxuXHRcdFx0XHRkZXNjcmlwdGlvbnMuZXEocHJldikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGRlc2NyaXB0aW9ucy5lcShwcmV2KS5hbmltYXRlKHtcclxuXHRcdCAgICAgICAgb3BhY2l0eTogMVxyXG5cdFx0ICAgICAgXHR9LCA1MDApXHJcblxyXG5cdFx0XHRcdGFjdGl2ZS5hbmltYXRlKHtcclxuXHRcdCAgICAgICAgb3BhY2l0eTogMFxyXG5cdFx0ICAgICAgXHR9LCAxMDAwLCBmdW5jdGlvbigpe1xyXG5cdFx0ICAgICAgXHRcdGFjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHQgICAgICBcdH0pXHJcblx0XHRcdFx0aW1ncy5lcShwcmV2KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0aW1ncy5lcShwcmV2KS5hbmltYXRlKHtcclxuXHRcdCAgICAgICAgb3BhY2l0eTogMVxyXG5cdFx0ICAgICAgXHR9LCAxMDAwKVxyXG5cclxuXHRcdFx0dmFyIHByb21pc2VOZXh0MSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVfbmV4dC5hbmltYXRlKHtcclxuXHRcdFx0ICAgICAgICAndG9wJzogJy0xMDAlJ1xyXG5cdFx0XHQgICAgICBcdH0sIDE1MDAsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0ICAgICAgXHRhY3RpdmVfbmV4dC5jc3MoJ3RvcCcsJzEwMCUnKTtcclxuXHRcdFx0XHQgICAgICBcdGFjdGl2ZV9uZXh0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHQgICAgICBcdHJlc29sdmUoXCLRg9GA0LBcIik7XHJcblx0XHRcdCAgICAgIFx0fSk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdFx0dmFyIHByb21pc2VOZXh0MiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe1xyXG5cdFx0XHRcdFx0XHRpbWdzX25leHQuZXEoY291bnRlcl9uZXh0KS5hbmltYXRlKHtcclxuXHRcdFx0ICAgICAgICAndG9wJzogJzAlJ1xyXG5cdFx0XHQgICAgICBcdH0sIDE1MDAsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdCAgICAgIFx0XHRpbWdzX25leHQuZXEoY291bnRlcl9uZXh0KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCAgICAgIFx0XHRyZXNvbHZlKCdzZWNvbmQnKTtcclxuXHRcdFx0ICAgICAgXHR9KTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0XHR2YXIgcHJvbWlzZVByZXYxID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSl7XHJcblx0XHRcdFx0XHRcdGFjdGl2ZV9wcmV2LmFuaW1hdGUoe1xyXG5cdFx0XHQgICAgICAgICd0b3AnOiAnMTAwJSdcclxuXHRcdFx0ICAgICAgXHR9LCAxNTAwLCBmdW5jdGlvbigpe1xyXG5cdFx0XHQgICAgICBcdFx0YWN0aXZlX3ByZXYuY3NzKCd0b3AnLCctMTAwJScpO1xyXG5cdFx0XHQgICAgICBcdFx0YWN0aXZlX3ByZXYucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQgICAgICBcdFx0cmVzb2x2ZSgnMycpO1xyXG5cdFx0XHQgICAgICBcdH0pO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHRcdHZhciBwcm9taXNlUHJldjIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKXtcclxuXHRcdFx0XHRcdFx0aW1nc19wcmV2LmVxKGNvdW50ZXJfcHJldikuYW5pbWF0ZSh7XHJcblx0XHRcdCAgICAgICAgJ3RvcCc6ICcwJSdcclxuXHRcdFx0ICAgICAgXHR9LCAxNTAwLCBmdW5jdGlvbigpe1xyXG5cdFx0XHQgICAgICBcdFx0aW1nc19wcmV2LmVxKGNvdW50ZXJfcHJldikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQgICAgICBcdFx0cmVzb2x2ZSgnNCcpO1xyXG5cdFx0XHQgICAgICBcdH0pO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHRQcm9taXNlLmFsbChbXHJcblx0XHRcdFx0ICBwcm9taXNlTmV4dDEsXHJcblx0XHRcdFx0ICBwcm9taXNlTmV4dDIsXHJcblx0XHRcdFx0ICBwcm9taXNlUHJldjEsXHJcblx0XHRcdFx0ICBwcm9taXNlUHJldjJcclxuXHRcdFx0XHRdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnYWxsISEhJyk7XHJcblx0XHRcdFx0XHRmbGFnPXRydWU7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHJcblx0XHRcdGlmKGNvdW50ZXIhPTApe1xyXG5cdFx0XHRcdGNvdW50ZXItLTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGNvdW50ZXIgPSBpbWdzLmxlbmd0aC0xO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcbn1cclxuXHJcbnNsaWRlcigkKCcuc2xpZGVyMScpKTtcclxuXHJcbi8vINC/0YDQtdC70L7QsNC00LXRgFxyXG52YXIgaW1ncyA9IFtdO1xyXG4kLmVhY2goJCgnKicpLCBmdW5jdGlvbigpIHtcclxuXHR2YXJcclxuXHRcdFx0JHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRiZyA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxyXG5cdFx0XHRpbWcgPSAkdGhpcy5pcygnaW1nJyk7XHJcblxyXG5cdGlmKGJnICE9ICdub25lJyYmIGJnLmluZGV4T2YoXCJ1cmxcIikhPS0xKXtcclxuXHRcdHZhciBwYXRoID0gYmcucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuXHRcdGNvbnNvbGUubG9nKHBhdGgpO1xyXG5cdFx0aW1ncy5wdXNoKHBhdGgpO1xyXG5cdH1cclxuXHJcblx0aWYoaW1nKXtcclxuXHRcdHZhciBwYXRoID0gJHRoaXMuYXR0cignc3JjJyk7XHJcblxyXG5cdFx0aWYgKHBhdGgpIHtcclxuXHRcdFx0aW1ncy5wdXNoKHBhdGgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuXHR2YXIgaXRlbVRvdGFsPTE7XHJcblx0Y29uc29sZS5sb2coaW1ncy5sZW5ndGgpO1xyXG5cdGZvcih2YXIgaSA9IDA7IGk8aW1ncy5sZW5ndGg7IGkrKyl7XHJcblx0XHR2YXIgaW1hZ2UgPSQoJzxpbWc+Jywge1xyXG5cdFx0XHRcdHNyYzogaW1nc1tpXX0pO1xyXG5cclxuXHRcdGltYWdlLm9uKFwibG9hZFwiLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRzZXRQcihpbWdzLmxlbmd0aCxpdGVtVG90YWwpO1xyXG5cdFx0XHRpdGVtVG90YWwrKzt9KVxyXG5cdFx0aW1hZ2Uub24oXCJlcnJvclwiLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRzZXRQcihpbWdzLmxlbmd0aCxpdGVtVG90YWwpO1xyXG5cdFx0XHRpdGVtVG90YWwrKztcclxuXHRcdH0pO1xyXG5cclxufVxyXG4vLyDQstGL0YfQuNGB0LvRj9C10LwsINGB0LrQvtC70YzQutC+INC/0YDQvtGG0LXQvdGC0L7QsiDQt9Cw0LPRgNGD0LbQtdC90L5cclxuXHRmdW5jdGlvbiBzZXRQcih0b3RhbCwgY3VyZW50KXtcclxuXHJcblx0XHR2YXIgcGVyY2VudCA9IE1hdGguY2VpbChjdXJlbnQvdG90YWwqMTAwKTtcclxuXHRcdGNvbnNvbGUubG9nKHBlcmNlbnQpO1xyXG5cdFx0aWYgKHBlcmNlbnQ+PSAxMDApe1xyXG5cdFx0XHQkKCcucHJlbG9hZGVyLWNvbnRhaW5lcicpLmZhZGVPdXQoKTtcclxuXHRcdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCd2aXNpYmxlJyk7XHJcblx0XHR9XHJcblx0XHQkKCcucHJlbG9hZGVyX19wZXJjZW50JykudGV4dChwZXJjZW50ICsgJyUnKTtcclxuXHR9XHJcblxyXG5cclxuLy/QstGL0YfQuNGB0LvRj9C10Lwg0LLRi9GB0L7RgtGDINGB0LXQutGG0LjQuCDRgSDQutCw0YDRgtC+0LlcclxuIHZhciB3aCA9IDY1MDtcclxuIGlmKCQod2luZG93KS5oZWlnaHQoKSA+IHdoKXtcclxuIFx0d2ggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiB9XHJcbiB2YXIgaCA9ICQoJy5mb290ZXItcGFnZScpLmhlaWdodCgpK3doO1xyXG4gJCgnLnNlY3Rpb25fbWFwJykuaGVpZ2h0KGgpO1xyXG5cclxuIC8vINC90LDQttCw0YLQuNC1INC90LAg0LrQvdC+0L/QutGDINCw0LLRgtC+0YDQuNC30LDRhtC40LhcclxuICQoJyNsb2dpbi1idXR0b24sIC5idXR0b25fcmV0dXJuJykuY2xpY2soZnVuY3Rpb24oKXtcclxuIFx0JCgnLnBvcGFwLXdyYXBwZXItY29udGFpbmVyJykudG9nZ2xlQ2xhc3MoJ2ZsaXBwJyk7XHJcbiB9KTtcclxuXHJcbi8vINC90LDQttCw0YLQuNC1INC90LAg0LPQsNC80LHRg9GA0LPQtdGAXHJcbiAkKCcuaGFtJykuY2xpY2soZnVuY3Rpb24oKXtcclxuIFx0JCgnLm1haW4tbmF2JykudG9nZ2xlQ2xhc3MoJ2hpZGUnKTtcclxuIFx0aWYoJChcIi5oYW1cIikuaGFzQ2xhc3MoXCJjaGVja1wiKSl7XHJcbiBcdFx0XHQkKCcuZWwxJykucmVtb3ZlQ2xhc3MoJ2VsMV9hbmltYXRlJyk7XHJcbiBcdFx0XHQkKCcuZWwyJykuY3NzKCdvcGFjaXR5JywnMScpO1xyXG4gXHRcdFx0JCgnLmVsMycpLnJlbW92ZUNsYXNzKCdlbDNfYW5pbWF0ZScpO1xyXG4gXHRcdFx0JChcIi5oYW1cIikucmVtb3ZlQ2xhc3MoXCJjaGVja1wiKTtcclxuXHJcbiBcdH0gZWxzZXtcclxuIFx0XHQkKCcuZWwxJykuYWRkQ2xhc3MoJ2VsMV9hbmltYXRlJyk7XHJcbiBcdFx0JCgnLmVsMicpLmNzcygnb3BhY2l0eScsJzAnKTtcclxuIFx0XHQkKCcuZWwzJykuYWRkQ2xhc3MoJ2VsM19hbmltYXRlJyk7XHJcbiBcdFx0JChcIi5oYW1cIikuYWRkQ2xhc3MoXCJjaGVja1wiKTtcclxuIFx0fVxyXG4gXHRcclxuIH0pO1xyXG4gJCgnLm1haW4tbmF2X19saW5rJykubW91c2VvdmVyKGZ1bmN0aW9uKCl7XHJcbiBcdCQodGhpcykuYWRkQ2xhc3MoJ2FjJyk7XHJcbiB9KTtcclxuICQoJy5tYWluLW5hdl9fbGluaycpLm1vdXNlb3V0KGZ1bmN0aW9uKCl7XHJcbiBcdGlmKCQodGhpcykuaGFzQ2xhc3MoJ2FjJykpe1xyXG4gXHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjJyk7XHRcclxuIFx0fVxyXG4gXHRcclxuIH0pXHJcblxyXG5cclxuIC8v0J3QsNC20LDRgtC40LUg0YHRgtGA0LXQu9C60Lgg0LLQvdC40Lcg0LIg0YXQtdC00LXRgNC1XHJcbiAkKCcuYXJyb3ctZG93bicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiBcdCB2YXIgaGVpZ2h0PSQoXCIuaGVhZGVyLXBhZ2VcIikuaGVpZ2h0KCk7IFxyXG4gXHQgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XCJzY3JvbGxUb3BcIjogaGVpZ2h0IH0sIDgwMCk7XHJcbiB9KTtcclxuXHJcblxyXG4vL9GE0LjQutGB0LjRgNC+0LLQsNGC0YwgXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbi8vINC/0L7QtNGB0LLQtdGH0LjQstCw0LXQvCDQt9Cw0LPQvtC70L7QstC60Lgg0YHRgtCw0YLQtdC5XHJcblxyXG4kLmVhY2goJCgnYXJ0aWNsZScpLCBmdW5jdGlvbigpIHtcclxuXHR2YXJcclxuXHRcdFx0JHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRpZF9hcnRpY2xlID0gJHRoaXMuYXR0cignaWQnKSxcclxuXHRcdFx0ZGlzdCA9ICR0aGlzLm9mZnNldCgpLnRvcCxcclxuXHRcdFx0aCA9ICR0aGlzLmhlaWdodCgpO1xyXG5cclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKT49ZGlzdC03MCAmJiAkKHdpbmRvdykuc2Nyb2xsVG9wKCk8PWRpc3QraCl7XHJcblx0XHRcdFxyXG5cdFx0XHQkLmVhY2goJCgnLmFzaWUtYmxvZ19fbGluaycpLCBmdW5jdGlvbigpIHtcclxuXHRcclxuXHRcdFx0XHRpZigkKHRoaXMpLmF0dHIoJ2hyZWYnKT09JyMnK2lkX2FydGljbGUpe1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYXNpZGUtYmxvZ19faXRlbV9hY3RpdmUnKTtcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FzaWRlLWJsb2dfX2l0ZW1fYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHRcdFxyXG59KTtcclxuLy/RhNC40LrRgdC40YDRg9C10LwgYXNpZGUg0LIg0LHQu9C+0LPQtVxyXG5cclxuXHRpZigoJCgnaHRtbCcpLnNjcm9sbFRvcCgpPj0kKCcuaGVhZGVyLXBhZ2UnKS5oZWlnaHQoKSkgfHwgKCQoJ2JvZHknKS5zY3JvbGxUb3AoKT49JCgnLmhlYWRlci1wYWdlJykuaGVpZ2h0KCkpKXtcclxuXHJcblx0XHRpZiAoISgkKCcuYXNpZGUtYmxvZycpLmhhc0NsYXNzKCdmaXhlZCcpKSl7XHJcbiAgICBcdFx0JCgnLmFzaWRlLWJsb2cnKS5hZGRDbGFzcygnZml4ZWQnKTtcclxuICAgIFx0fVxyXG4gICAgfVxyXG4gIGVsc2V7XHJcbiAgICBcdFx0aWYgKCQoJy5hc2lkZS1ibG9nJykuaGFzQ2xhc3MoJ2ZpeGVkJykpe1xyXG5cdCAgICBcdFx0JCgnLmFzaWRlLWJsb2cnKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcclxuXHQgICAgXHR9XHJcbiAgICBcdH1cclxuXHJcbi8v0LDQvdC40LzQsNGG0LjRjyBcclxuIGlmICh3aW5kb3cubG9jYXRpb24udG9TdHJpbmcoKS5pbmRleE9mKCdhYm91dC5odG0nKT4wKXsgXHJcblxyXG4gdmFyIHRvc2tpbGwgPSAkKCcubXktc2tpbGxzX19za2lsbHMnKS5vZmZzZXQoKS50b3A7XHJcblx0aWYgKCQoJ2JvZHknKS5zY3JvbGxUb3AoKT49KHRvc2tpbGwtJCh3aW5kb3cpLmhlaWdodCgpKyQoJy5teS1za2lsbHNfX2l0ZW0nKS5oZWlnaHQoKSkgJiYgJCgnYm9keScpLnNjcm9sbFRvcCgpPHRvc2tpbGwrJCgnLm15LXNraWxsc19fc2tpbGxzJykuaGVpZ2h0KCkpe1xyXG5cdFx0JCgnY2lyY2xlJykuYXR0cignY2xhc3MnLCAnZmlsbF9hbmltJyk7XHJcblx0fVxyXG5cdGlmICgkKCdib2R5Jykuc2Nyb2xsVG9wKCk8KHRvc2tpbGwtJCh3aW5kb3cpLmhlaWdodCgpKyQoJy5teS1za2lsbHNfX2l0ZW0nKS5oZWlnaHQoKSkgfHwgJCgnYm9keScpLnNjcm9sbFRvcCgpPj10b3NraWxsKyQoJy5teS1za2lsbHNfX3NraWxscycpLmhlaWdodCgpKXtcclxuXHRcdCQoJ2NpcmNsZScpLmF0dHIoJ2NsYXNzJywgJycpO1xyXG5cdH1cclxufVxyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZml4ZWQnLGZ1bmN0aW9uKCl7XHJcblx0aWYgKCQoJy5maXhlZCcpLmNzcygnbGVmdCcpPT0nMHB4JyAmJiAkKHdpbmRvdykud2lkdGgoKTw9NzY3KXtcclxuICAgIFx0XHRcdCQoJy5maXhlZCcpLmNzcygnbGVmdCcsJy01MCUnKTtcclxuICAgIFx0XHR9XHJcbiAgIGlmICgkKCcuZml4ZWQnKS5jc3MoJ2xlZnQnKSE9JzBweCcgJiYgJCh3aW5kb3cpLndpZHRoKCk8PTc2NylcclxuICAge1xyXG4gICAgXHRcdFx0XHQkKCcuZml4ZWQnKS5jc3MoJ2xlZnQnLCcwJyk7XHJcbiAgICBcdFx0fVxyXG59KTtcclxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xyXG4gIGlmKCQod2luZG93KS53aWR0aCgpPjc2Nyl7XHJcbiAgXHQkKCcuZml4ZWQnKS5jc3MoJ2xlZnQnLCcwJyk7XHJcbiAgfVxyXG4gIGlmKCQod2luZG93KS53aWR0aCgpPD03Njcpe1xyXG4gIFx0JCgnLmZpeGVkJykuY3NzKCdsZWZ0JywnLTUwJScpO1xyXG4gIH1cclxufSk7XHJcblxyXG4kKCcuYXNpZS1ibG9nX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdHZhciBpZCAgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKSxcclxuXHRcdFx0dG9wID0gJChpZCkub2Zmc2V0KCkudG9wO1xyXG5cdCQoJy5hc2llLWJsb2dfX2xpbmsnKS5yZW1vdmVDbGFzcygnYXNpZGUtYmxvZ19faXRlbV9hY3RpdmUnKTtcclxuXHQkKHRoaXMpLmFkZENsYXNzKCdhc2lkZS1ibG9nX19pdGVtX2FjdGl2ZScpO1xyXG5cdCQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogdG9wfSwgMTAwMCk7XHJcbn0pO1xyXG5cclxufSkoKTtcclxuIiwidmFyIHZhbGlkYXRpb24gPSAoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRfc2V0VXBMaXN0bmVycygpO1xyXG59O1xyXG52YXIgY2hlY2sgPSB0cnVlO1xyXG52YXIgX3NldFVwTGlzdG5lcnMgPSBmdW5jdGlvbigpIHtcclxuXHQkKCdpbnB1dDp0ZXh0Jykub24oJ2tleWRvd24nLGZ1bmN0aW9uKCl7XHJcblx0XHQkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjNjA4ZTUzJyk7XHJcblx0XHQkKHRoaXMpLnNpYmxpbmdzKCcuaWNvbl9pbnB1dCcpLmNzcyh7J2JvcmRlci1yaWdodCc6ICcxcHggc29saWQgIzYwOGU1MycsJ2NvbG9yJzogJyM2MDhlNTMnfSk7XHJcblx0XHQkKHRoaXMpLnByZXYoJy50b29sdGlwJykucmVtb3ZlKCk7XHJcblx0XHRjaGVjayA9IHRydWU7XHJcblx0fSlcclxufTtcclxuXHJcbnZhciB2YWxpZGF0ZUZvcm0gPSBmdW5jdGlvbihmb3JtKSB7XHJcblx0dmFyIFxyXG5cdFx0XHRlbGVtZW50cyA9IGZvcm0uZmluZCgnaW5wdXQ6dGV4dCcpLFxyXG5cdFx0XHR2YWxpZCA9IHRydWU7XHJcblxyXG5cdCQuZWFjaChlbGVtZW50cywgZnVuY3Rpb24oaW5kZXgsIHZhbCl7XHJcblx0XHRcclxuXHRcdHZhclxyXG5cdFx0XHRcdGVsZW1lbnQgPSAkKHZhbCksXHJcblx0XHRcdFx0dmFsID0gZWxlbWVudC52YWwoKTtcclxuXHJcblx0XHRpZigodmFsLmxlbmd0aCA9PT0gMCkpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ9C/0YDQvtCy0LXRgNC40YLRjCDRhNC+0YDQvNGDJyk7XHJcblx0XHRcdGVsZW1lbnQuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNlNDQ4NDUnKTtcclxuXHRcdFx0ZWxlbWVudC5zaWJsaW5ncygnLmljb25faW5wdXQnKS5jc3Moeydib3JkZXItcmlnaHQnOiAnMXB4IHNvbGlkICNlNDQ4NDUnLFxyXG5cdFx0XHRcdCdjb2xvcic6ICcjZTQ0ODQ1J30pO1xyXG5cdFx0XHRpZighKGVsZW1lbnQucHJldigpLmlzKCcudG9vbHRpcCcpKSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuYmVmb3JlKFwiPGRpdiBjbGFzcz0ndG9vbHRpcCc+PGRpdiBjbGFzcz0ndG9vbHRpcF9fY29udGFpbmVyJz5cIitlbGVtZW50LmF0dHIoJ2RhdGEtbWVzJykrXCI8L2Rpdj48L2Rpdj5cIik7XHJcblx0XHRcdH1cclxuXHRcdFx0dmFsaWQgPSBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG5cdGNoZWNrID0gZmFsc2U7XHJcblx0cmV0dXJuIHZhbGlkO1xyXG59O1xyXG5cclxudmFyIGNsZWFyRm9ybSA9IGZ1bmN0aW9uKGZvcm0pIHtcclxuXHRcclxuXHR2YXIgXHJcblx0XHRcdGVsZW1lbnRzID0gZm9ybS5maW5kKCdpbnB1dDp0ZXh0Jyk7XHJcblxyXG5cdCQuZWFjaChlbGVtZW50cywgZnVuY3Rpb24oaW5kZXgsIHZhbCl7XHJcblx0XHRcclxuXHRcdHZhclxyXG5cdFx0XHRcdGVsZW1lbnQgPSAkKHZhbCksXHJcblx0XHRcdFx0dmFsID0gZWxlbWVudC52YWwoKTtcclxuXHRcdGVsZW1lbnQudmFsKCcnKTtcclxuXHRcdGVsZW1lbnQuY3NzKCdib3JkZXInLCAnbm9uZScpO1xyXG5cdFx0ZWxlbWVudC5zaWJsaW5ncygnLmljb25faW5wdXQnKS5jc3Moeydib3JkZXItcmlnaHQnOiAnbm9uZScsXHJcblx0XHRcdFx0J2NvbG9yJzogJyNjNGNiY2QnfSk7XHJcblx0XHQkKCcudG9vbHRpcCcpLnJlbW92ZSgpO1xyXG5cdH0pO1xyXG59O1xyXG5yZXR1cm4ge1xyXG5cdGluaXQ6IGluaXQsXHJcblx0dmFsaWRhdGVGb3JtOiB2YWxpZGF0ZUZvcm0sXHJcblx0Y2xlYXJGb3JtOiBjbGVhckZvcm1cclxufTtcclxuXHJcbn0pKCk7XHJcbnZhbGlkYXRpb24uaW5pdCgpOyIsInZhciBsb2dpbiA9IChmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG52YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdF9zZXRVcExpc3RuZXJzKCk7XHJcbn07XHJcblxyXG52YXIgX3NldFVwTGlzdG5lcnMgPSBmdW5jdGlvbigpIHtcclxuXHQkKCcuYnV0dG9uX3N1Ym1pdCcpLm9uKCdjbGljaycsIF9zdWJtaXRGb3JtKTtcclxuXHQkKCcuYnV0dG9uX2NsZWFyJykub24oJ2NsaWNrJywgX2NsZWFyRm9ybSk7XHJcblxyXG59O1xyXG52YXIgX2NsZWFyRm9ybSA9IGZ1bmN0aW9uKGV2KXtcclxuXHRjb25zb2xlLmxvZygnY2xlYXInKTtcclxuXHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdHZhciBmb3JtID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygnLmxvZ2luX2Zvcm0nKTtcclxuXHR2YWxpZGF0aW9uLmNsZWFyRm9ybShmb3JtKTtcclxufVxyXG52YXIgX3N1Ym1pdEZvcm0gPSBmdW5jdGlvbihldil7XHJcblx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHRcclxuXHR2YXIgZm9ybSA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuc2libGluZ3MoJy5sb2dpbl9mb3JtJyksXHJcblx0XHRcdHVybCA9ICdsb2dpbi5waHAnLFxyXG5cdFx0XHRkZWZPYmogPSBfYWpheEZvcm0oZm9ybSwgdXJsKTtcclxuXHRcdFx0Ly8g0L/QvtC70YPRh9Cw0LXQvCDQvtGC0LLQtdGCINC+0YIg0YHQtdGA0LLQtdGA0LAg0Lgg0L7QsdGA0LDQsdCw0YLRi9Cy0LDQtdC8XHJcbn1cclxuXHJcbnZhciBfYWpheEZvcm0gPSBmdW5jdGlvbiAoZm9ybSwgdXJsKXtcclxuXHRcclxuXHRpZiAoIXZhbGlkYXRpb24udmFsaWRhdGVGb3JtKGZvcm0pKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdGNvbnNvbGUubG9nKCfQstGB0ZEg0YXQvtGA0L7RiNC+LCDQtNC10LvQsNC10Lwg0LfQsNC/0YDQvtGBINC90LAg0YHQtdGA0LLQtdGAJyk7XHJcblx0dmFyIGRhdGEgPSBmb3JtLnNlcmlhbGl6ZSgpO1xyXG5cclxuXHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiB1cmwsXHJcblx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cdFx0ZGF0YTogZGF0YSxcclxuXHR9KVxyXG5cdC5kb25lKGZ1bmN0aW9uKGFucyl7XHJcblx0XHRjb25zb2xlLmxvZygnZG9uZScpO1xyXG5cdFx0Y29uc29sZS5sb2coYW5zKTtcclxuXHR9KVxyXG5cdC5mYWlsKGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zb2xlLmxvZygnZXJyb3InKTtcclxuXHR9KVxyXG5cclxuXHR2YWxpZGF0aW9uLmNsZWFyRm9ybShmb3JtKTtcclxufVxyXG5cclxucmV0dXJuIHtcclxuXHRpbml0OmluaXRcclxufTtcclxuXHJcbn0pKCk7XHJcbmxvZ2luLmluaXQoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
