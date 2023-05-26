
function telConstructor(){function t(t){let e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,right:e.right+window.pageXOffset,bottom:e.bottom+window.pageYOffset,left:e.left+window.pageXOffset}}let e=document.querySelectorAll(".tel-constructor-input"),l=[];e.forEach(e=>{let s=e.dataset.tcCountryCode,n=e.dataset.tcSample,a=e.dataset.tcMinlength?e.dataset.tcMinlength:0,o=e.closest("form").querySelector('[type="submit"]'),r=e.dataset.tcErrorClass?e.dataset.tcErrorClass:"_error",u=e.dataset.tcErrorMessageText,c=[],i=n.replace(/[^a-z]/g,"").length,f="false"!=e.dataset.tcPlus,g=f?"+":"",p=/[^0-9]/g;c=n.split("");let d="",h=s.length+3;function v(t){let e="";for(let l=0,n=0;n<i;l++)void 0!==t[n]?"x"!=c[l]?e+=`${c[l]}`:(e+=`${t[n]}`,n++,h=l+1+s.length+g.length):"x"!=c[l]?e+=`${c[l]}`:(e+="_",n++);return void 0==t[0]&&(h=s.length+3),e}e.value=`${g}${s}${v("")}`,e.oninput=function(t){let l=e.value.substr(1).replace(p,"");l=l.substr(s.length),e.value=`${g}${s}${e.value.substr(s.length+1)}`,"insertText"==t.inputType||(t.inputType="deleteContentBackward",d&&(l=(l=d.substr(1).replace(p,"")).substr(s.length)),l=l.substring(0,l.length-1)),e.value=`${g}${s}${v(l)}`,e.setSelectionRange(h,h),d=e.value},e.onfocus=function(t){let l=e.value.substr(1).replace(p,"");l=l.substr(s.length),e.value=`${g}${s}${e.value.substr(s.length+1)}`,e.value=`${g}${s}${v(l)}`,setTimeout(()=>{e.setSelectionRange(h,h)},50)},e.onclick=function(t){setTimeout(()=>{e.setSelectionRange(h,h)},0)},e.onkeyup=function(t){setTimeout(()=>{e.setSelectionRange(h,h)},0)},o&&(o.onclick=function(n){let o=f?e.value.substr(1).replace(p,""):e.value.replace(p,"");if(o.length<i+s.length&&o.length<Number(a)+s.length){n.preventDefault(),e.classList.add(r);let c=document.createElement("div");u&&(c.classList.add("tel-constructor-error-message"),c.textContent=u,c.style.left=t(e).left+e.offsetWidth/2+"px",c.style.top=t(e).top+"px",l.push([c,e]),document.body.append(c),setTimeout(()=>{c.classList.add("_visible")},0)),window.addEventListener("resize",function(){for(let e=0;e<l.length;e++)l[e][0]&&l[e][1]&&(l[e][0].style.left=t(l[e][1]).left+l[e][1].offsetWidth/2+"px",l[e][0].style.top=t(l[e][1]).top+"px")}),e.onblur=function(){u&&(c.classList.remove("_visible"),setTimeout(()=>{c.remove()},400)),e.classList.remove(r)}}})})}telConstructor();

const 
	body = document.querySelector('body'),
	html = document.querySelector('html');



function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		saveHref = (typeof arg == 'object') ? (arg['saveHref']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id, initStart) {

		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				if(popup.classList.contains('popup')) {

					body.classList.remove('_popup-active');
					html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
					body.classList.add('_popup-active');

					if (saveHref) history.pushState('', "", id);

					setTimeout(() => {
						if (!initStart) {
							popup.classList.add('_active');
							function openFunc() {
								popupCheck = true;
								popup.removeEventListener('transitionend', openFunc);
							}
							popup.addEventListener('transitionend', openFunc)
						} else {
							popup.classList.add('_transition-none');
							popup.classList.add('_active');
							popupCheck = true;
						}

					}, 0)
				}

			} else {
				return new Error(`Not found "${id}"`)
			}
		}
	}

	const close = function (popupClose) {
		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			if (popup.classList.contains('_transition-none')) popup.classList.remove('_transition-none')

			setTimeout(() => {
				popup.classList.remove('_active');
				function closeFunc() {
					const activePopups = document.querySelectorAll('.popup._active');

					if (activePopups.length < 1) {
						body.classList.remove('_popup-active');
						html.style.setProperty('--popup-padding', '0px');
					}

					if (saveHref) {
						removeHash();
						if (activePopups[activePopups.length - 1]) {
							history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
						}
					}

					popupCheckClose = true;
					popup.removeEventListener('transitionend', closeFunc)
				}

				popup.addEventListener('transitionend', closeFunc)

			}, 0)

		}
	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					open(popupOpen.getAttribute('href'))
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose)
				}

			});

			if (saveHref) {
				let url = new URL(window.location);
				if (url.hash) {
					open(url.hash, true);
				}
			}
		},

	}
}

const popup = new Popup();

popup.init()


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageBody = document.querySelectorAll('.image-body, figure');
imageBody.forEach(imageBody => {
	const img = imageBody.querySelector('img'), style = getComputedStyle(imageBody);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageBody.style.paddingTop = Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%';
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}


	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

	let btnToScroll = $('.btn-to-scroll');
	if(btnToScroll) {
		event.preventDefault();
		let section;
	
		section = document.querySelector(btnToScroll.getAttribute('href'))
	
		if(section) {
			section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		} else {
			body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowWidth = 0;

function resize() {

	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	if(windowWidth != window.innerWidth) {
		windowWidth = window.innerWidth;
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

document.addEventListener( 'DOMContentLoaded', function () {

	const topBestSlider = new Splide('.top-best__slider', {
		perPage: 1,
		autoWidth: true,
		gap: 21,
		arrows: false,
		pagination: false,
		speed: 1000,
		breakpoints: {
			768: {
				speed: 500,
				gap: 10,
			},
		}
	})

	topBestSlider.mount();

	const ourIslandSlider = new Splide('.our-island__slider', {
		type: 'fade',
		perPage: 1,
		rewind: true,
		arrows: true,
		pagination: false,
		speed: 1000,
		breakpoints: {
			768: {
				speed: 500,
			},
		}
	})

	ourIslandSlider.mount();

	const programNav = new Splide('.program__nav', {
		perPage: 1,
		autoWidth: true,
		arrows: false,
		rewind: true,
		pagination: false,
		isNavigation: true,
		drag: false,
	})

	const programSlider = new Splide('.program__slider', {
		type: 'fade',
		perPage: 1,
		rewind: true,
		arrows: false,
		pagination: false,
		//autoHeight: true,
		/* speed: 1000,
		breakpoints: {
			768: {
				speed: 500,
			},
		} */
	})

	programSlider.sync(programNav);
	programSlider.mount();
	programNav.mount();

	programSlider.on('active', function (event) {
		event.slide.parentElement.style.height = event.slide.scrollHeight + 'px';
	})

	const tariffsSlider = document.querySelectorAll('.tariffs__slider');
	tariffsSlider.forEach(tariffsSlider => {
		const slides = tariffsSlider.querySelectorAll('.tariffs__card');
		let slider = new Splide('.tariffs__slider', {
			perPage: 2,
			arrows: false,
			pagination: false,
			autoHeight: true,
			drag: (slides > 2) ? true : false,
			breakpoints: {
				992: {
					drag: true,
					perPage: 1,
				},
			}
		})
		slider.mount();
	})

	const detailsNav = new Splide('.details__nav', {
		perPage: 1,
		autoWidth: true,
		arrows: false,
		rewind: true,
		pagination: false,
		isNavigation: true,
		drag: false,
	})

	let detailsSliderSlides = document.querySelector('.details__slider');
	if(detailsSliderSlides) detailsSliderSlides = detailsSliderSlides.querySelectorAll('.details__block');

	const detailsSlider = new Splide('.details__slider', {
		type: 'fade',
		perPage: 1,
		rewind: true,
		arrows: false,
		pagination: false,
		//autoHeight: true,
		/* speed: 1000,
		breakpoints: {
			768: {
				speed: 500,
			},
		} */
	})

	detailsSlider.sync(detailsNav);
	detailsSlider.mount();
	detailsNav.mount();

	window.addEventListener('load', function () {
		detailsSlider.on('active', function (event) {
			detailsSlider.root.style.setProperty('--height', event.slide.scrollHeight + 'px');
			detailsSlider.root.classList.add('loaded');
			setTimeout(() => {
				detailsSlider.root.classList.add('loaded-2');
			},400)
		})
	
		detailsSlider.refresh()
		programSlider.refresh()
		
	})

	/* detailsSlider.on('ready', function (event) {
		console.log('init')
	})

	console.log(detailsSliderSlides[0])
	detailsSlider.root.style.setProperty('--height', detailsSliderSlides[0].scrollHeight + 'px');

	if(detailsSliderSlides.length) {
		
	} */
	

})

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <Form> -=-=-=-=-=-=-=-=-=-=-=-=

const form = document.querySelectorAll('.get-details__form');
form.forEach(form => {
	form.addEventListener('submit', function (event) {
		
		event.preventDefault();

		const inputs = form.querySelectorAll('input');

		let errorCheck = false;
			  
		inputs.forEach(input => {
			if(input.value == "" && input.required) {
				input.classList.add('_error');

				errorCheck = true;
			}

			input.addEventListener('blur', function () {
				input.classList.remove('_error');
			})
		})

		if(!errorCheck) {

			let paramsString = "";
			inputs.forEach((input, index) => {
				
				if(input.value) {
					let lastChar = (index == inputs.length-1) ? "" : "&";
					paramsString += input.getAttribute("name") + "=" + input.value + lastChar;
				}
			})

			
	
			// Создаем экземпляр класса XMLHttpRequest
			const request = new XMLHttpRequest();
	
			// Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
			const url = form.getAttribute('action');
			 
			
			request.open("POST", url, true);
			 
			//В заголовке говорим что тип передаваемых данных закодирован. 
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			 
			request.addEventListener("readystatechange", () => {
	
				if(request.readyState === 4 && request.status === 200) {       
					if(request.responseText == "true") {
						const message = document.querySelector('.succes__message');
						message.classList.remove('_loading');						
					}
				}
			});

			const message = document.querySelector('.succes__message');
			message.classList.add('_loading');
			popup.open('#succes-popup')

			setTimeout(() => {
				request.send(paramsString);
			},300)
			
		}
	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- </Form> -=-=-=-=-=-=-=-=-=-=-=-=


