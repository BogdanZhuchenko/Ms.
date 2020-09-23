document.addEventListener('DOMContentLoaded', function() {
	$(".owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		dots: true,
		nav: true,
		smartSpeed: 1000,
		margin: 50
	});

	$('.svg-btn-play').click(function() {
		$('.owl-item.active .main-slider__video-block').addClass('active');
		$('.owl-item.active .main-slider__video').attr({"controls":"controls"});
		$('.owl-item.active .main-slider__video').get(0).play();
	});

	$('.accordion-item__trigger').click(function(e){
		e.preventDefault();

		const parent = $(this).parent();

		if (parent.hasClass('accordion-item--active')) {
			parent.removeClass('accordion-item--active')
			.children('.accordion-item__content').slideUp('faste');
		}else {
			parent.addClass('accordion-item--active')
			.children('.accordion-item__content').slideDown('faste');
		}
	});

	$('.btn-nav').click(function(e){
		e.preventDefault();
		let nav = $('.header__nav'),
		navActive = nav.hasClass('active');

		if (navActive == true) {
			nav.removeClass('transition');
			$('body').removeClass('active');

			setTimeout(function () {
				nav.removeClass('active');
			}, 400);
		}else {
			$('body').addClass('active');
			nav.addClass('active');

			setTimeout(function () {
				nav.addClass('transition');
			}, 100);
		}

	});

	$(window).resize(function(){

		let widthDoc = $(this).width();

		if (widthDoc > 901) {
			$('body').removeClass('active');
			$('.header__nav').removeClass('active transition');

		}
	});

	$(window).resize();

	let modalButtons = document.querySelectorAll('.js-open-modal'),
	overlay      = document.querySelector('#js-overlay-modal'),
	closeButtons = document.querySelectorAll('.js-modal-close');

	modalButtons.forEach(function(item){

		item.addEventListener('click', function(e) {

			e.preventDefault();

			let modalId = this.getAttribute('data-modal'),
			modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

			modalElem.classList.add('active');
			overlay.classList.add('active');
		}); // end click

	}); // end foreach

	closeButtons.forEach(function(item){

		item.addEventListener('click', function(e) {
			let parentModal = this.closest('.modal');

			parentModal.classList.remove('active');
			overlay.classList.remove('active');
		});

	}); // end foreach

	document.body.addEventListener('keyup', function (e) {
		let key = e.keyCode;

		if (key == 1000) {

			document.querySelector('.modal.active').classList.remove('active');
			document.querySelector('.overlay').classList.remove('active');
		};
	}, false);

	overlay.addEventListener('click', function() {
		document.querySelector('.modal.active').classList.remove('active');
		this.classList.remove('active');
	});

	const offset = 150;
	const scrollUp = document.querySelector('.scroll-up');
	const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
	const pathLength = scrollUpSvgPath.getTotalLength();

	scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
	scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

	const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

	// updateDashoffset
	const updateDashoffset = () => {
		const height = document.documentElement.scrollHeight - window.innerHeight;
		const dashoffset = pathLength - (getTop() * pathLength / height)

		scrollUpSvgPath.style.strokeDashoffset = dashoffset;
	};
	// onScroll
	window.addEventListener('scroll', () => {
		updateDashoffset();

		if (getTop() > offset) {
			scrollUp.classList.add('scroll-up--active');
		}else {
			scrollUp.classList.remove('scroll-up--active');
		}
	});
	// click 
	scrollUp.addEventListener('click', (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

		document.querySelectorAll('.tabs-triggers__item').forEach((item) =>
	item.addEventListener('click', function(e) {
		e.preventDefault();
		const id = e.target.getAttribute('href').replace('#', '');

		document.querySelectorAll('.tabs-triggers__item').forEach(
			(child) => child.classList.remove('tabs-triggers__item--active')
			);
		document.querySelectorAll('.tabs-content__item').forEach(
			(child) => child.classList.remove('tabs-content__item--active')
			);

		item.classList.add('tabs-triggers__item--active');
		document.getElementById(id).classList.add('tabs-content__item--active');
		})
	);

	document.querySelector('.tabs-triggers__item').click();

});