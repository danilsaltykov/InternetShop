// If you are not going to code on js, then don't  delete tjis file, but leave it blank.
// Include all your js files to  main.js, not to index.html


"use strict";

document.addEventListener('DOMContentLoaded', function() {
	function DynamicAdapt(type) {
		this.type = type;
	}
	
	DynamicAdapt.prototype.init = function () {
		const _this = this;
		// массив объектов
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		// массив DOM-элементов
		this.nodes = document.querySelectorAll("[data-da]");
	
		// наполнение оbjects объктами
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}
	
		this.arraySort(this.оbjects);
	
		// массив уникальных медиа-запросов
		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});
	
		// навешивание слушателя на медиа-запрос
		// и вызов обработчика при первом запуске
		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];
	
			// массив объектов с подходящим брейкпоинтом
			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};
	
	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};
	
	// Функция перемещения
	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}
	
	// Функция возврата
	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}
	
	// Функция получения индекса внутри родителя
	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};
	
	// Функция сортировки массива по breakpoint и place 
	// по возрастанию для this.type = min
	// по убыванию для this.type = max
	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}
	
					if (a.place === "first" || b.place === "last") {
						return -1;
					}
	
					if (a.place === "last" || b.place === "first") {
						return 1;
					}
	
					return a.place - b.place;
				}
	
				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}
	
					if (a.place === "first" || b.place === "last") {
						return 1;
					}
	
					if (a.place === "last" || b.place === "first") {
						return -1;
					}
	
					return b.place - a.place;
				}
	
				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};
	
	const da = new DynamicAdapt("max");
	da.init();
	
	
	let burger = document.querySelector('.icon-menu');
	let menu = document.querySelector('.menu__body');
	
	let menuParents = document.querySelectorAll('.menu-page__parent');
	
	
	for (let index = 0; index < menuParents.length; index++){
		const menuParent = menuParents[index];
		menuParent.addEventListener('mouseenter', function(e){
			menuParent.classList.add('_active');
		});
		
		menuParent.addEventListener('mouseleave', function(e){
			menuParent.classList.remove('_active');
		})
	
		
	}
	
	
	
	
	burger.addEventListener('click', function(){
		burger.classList.toggle('_active');
		menu.classList.toggle('_active');
	})
	
	let menuPageBurger = document.querySelector('.menu-page__burger');
	let menuPageBody = document.querySelector('.menu-page__body');
	
	menuPageBurger.addEventListener('click', function(){
		menuPageBurger.classList.toggle('_active');
		_slideToggle(menuPageBody);
		
	});
	
	let pageSelect = document.querySelector('.search-page__title');
	let categoriesSearch = document.querySelector('.categories-search');
	
	pageSelect.addEventListener('click', function(){
		pageSelect.classList.toggle('_active');
		_slideToggle(categoriesSearch);
	});
	
	let checkboxCategories = document.querySelectorAll('.categories-search__checkbox');
	
	for (let index = 0; index < checkboxCategories.length; index++){
		const checkboxCategory = checkboxCategories[index];
		checkboxCategory.addEventListener('change', function(){
			checkboxCategory.classList.toggle('_active');
	
			let checkboxActiveCategories = document.querySelectorAll('.categories-search__checkbox._active');
	
			console.log(checkboxActiveCategories.length)
			
	
			if(checkboxActiveCategories.length > 0){
				pageSelect.classList.add('_categories');

			
				let searchQuantity = pageSelect.querySelector('.search-page__quantity');
				searchQuantity.innerHTML = searchQuantity.getAttribute('data-text') + ' ' + checkboxActiveCategories.length;
			} else {
				pageSelect.classList.remove('_categories');
	
			}
	
		});
	
		
	}
	
	
	
	
	//SlideToggle
	
	let _slideUp = (target, duration =500)  =>{
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() =>{
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	
		let _slideDown = (target, duration =500)  =>{
			target.style.removeProperty('display');
			let display = window.getComputedStyle(target).display;
			if(display === 'none')
				display = 'block';
	
			target.style.display = display;
			let height = target.offsetHeight;
			target.style.overflow = 'hidden'	
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() =>{
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	
		let _slideToggle = (target, duration = 500) => {
			if(!target.classList.contains('_slide')) {
				target.classList.add('_slide');
				if(window.getComputedStyle(target).display === 'none') {
					return _slideDown(target, duration);
				}  else {
					return _slideUp(target, duration);
				}
			}
		}
 }, false);



 // slider 


	
	
