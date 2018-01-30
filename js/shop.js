/*
/*COOKIES
*/

var goods = 0;
var cartArray = [];
var picturesArray = [];
var maxBasket = 5;

function loadCookies() {
	
	var cookie = getCookie('vagoods');
	goods = parseInt(cookie);
	if(goods == undefined || isNaN(goods)) {
		goods = 0;
		cartArray = [];
		return;
	}

	for(var i = 0; i < maxBasket; i++) {
		var buff = getCookie('cart-element-'+i);
		cartArray[i] = parseInt(buff);
	}

	WatchCart();

	var basketImg = document.getElementById('basket-img');
	if(!(basketImg === null)) {
		switch (goods) {
			case 1:
			basketImg.src = 'img/icons/tote-bag-1.png';
			break;
			case 2:
			basketImg.src = 'img/icons/tote-bag-2.png';
			break;
			case 3:
			basketImg.src = 'img/icons/tote-bag-3.png';
			break;
			default:
			basketImg.src = 'img/icons/tote-bag-0.png';
			break;
		}
	}
};

/*
/* DATABASE
*/
picturesArray[0] = {
	id: 1,
	name: 'Волк',
	cost: 1500,
	img: 'img/galery/1/icon-1.jpg'
}
picturesArray[1] = {
	id: 2,
	name: 'Лайза',
	cost: 2200,
	img: 'img/galery/2/icon-1.jpg'
}

/*
/* SHOP FUNCTIONS
*/
function AddToCart( id ) {

	if(goods == 3) {
		var error1 = document.getElementById("basket-button");
		error1.href = '#error1';
		return;
	}
	for(var i = 0; i < cartArray.length; i++)
	{
		if(id == cartArray[i]) {
			var error2 = document.getElementById("basket-button");
			error2.href = '#error2';
			return;
		}
	}
	cartArray[goods] = id;
	goods+=1;

	setCookie('vagoods', goods, 7);
	setCookie('cart-element-'+(goods-1), cartArray[goods-1], 7);

	var basketImg = document.getElementById('basket-img');
	if(!(basketImg === null)) {
		switch (goods) {
			case 1:
			basketImg.src = 'img/icons/tote-bag-1.png';
			break;
			case 2:
			basketImg.src = 'img/icons/tote-bag-2.png';
			break;
			case 3:
			basketImg.src = 'img/icons/tote-bag-3.png';
			break;
			default:
			basketImg.src = 'img/icons/tote-bag-0.png';
			break;
		}
	}
	var button = document.getElementById("basket-button");
	button.href = '#success-cart';
	return;
};

function WatchCart() {
	for(var i = 0; i < maxBasket; i++)
	{
		var pel = document.getElementById("basket-element-" + (i+1));
		pel.innerHTML = "<p id='basket-element-" + (i+1) + "></p>";
		var a = document.getElementById("be-" + (i+1));
		a.className = 'delete-button hidden';
	}

	if(goods == 0) {
		var empty = document.getElementById('basket-element-1');
		empty.innerHTML = "<p class='basket-element-1'>Ваша корзина пуста</p>";
		var result = document.getElementById('result');
		result.innerHTML = "<p id='result'></p>";
		var order = document.getElementById('order-button');
		if( !(order === null) ) {
			order.className = 'delete-button hidden';
		}
		
		return;
	}
	var basketElemetsArray = [];
	var summ = 0;
	for(var i = 0; i < goods; i++)
	{
		var el;
		for(var j = 0; j < picturesArray.length; j++)
		{
			if(cartArray[i] == picturesArray[j].id) {
				el = "<div class='container'>" +
				"<div class='row'>" +
				"<div class='col-md-1 col-sm-1 col-xs-1'></div>" +
				"<div class='col-md-2 col-sm-4 col-xs-4'>" +
				"<img class='basket-icon' src='" + picturesArray[j].img +
				"' alt=''>" +
				"</div>" +
				"<div class='col-md-2 col-sm-2 col-xs-2'>" + 
				"<p>" + picturesArray[j].name + "</p>" +
				"<p><b>" + picturesArray[j].cost + " руб. </b></p>" +
				"</div>" + "</div>" + "</div>";

				summ += picturesArray[j].cost;
			}
		}
		basketElemetsArray[i] = document.getElementById('basket-element-' + (i+1) );
		basketElemetsArray[i].innerHTML = "<div class='basket-element-" + (i+1) + "'>" + 
		el + "</div>";
		var deleteButton = document.getElementById('be-' + (i+1) );
		deleteButton.className = 'delete-button not-hidden';
	}
	var result = document.getElementById('result');
		result.innerHTML = "<p id='result'>Промежуточный итог: <b>" + summ + " руб. </b></p>";

	var order = document.getElementById('order-button');
		order.className = 'delete-button not-hidden';


	var delivery1 = document.getElementById('dm-1');
	var delivery2 = document.getElementById('dm-2');
	var endsum;

	if( !(delivery2 === null) ) {
		var deliverysum = delivery2.value;
	}
	else {
		return;
	}
	
	if(delivery2.checked) {
		endsum = parseInt(summ) + parseInt(delivery2.value);
		document.getElementById('delivery-sum').innerHTML = "<p id='delivery-sum'>Доставка: 400 руб.</p>";
		document.getElementById('end-sum').innerHTML = "<p id='end-sum'>Итого: " + endsum + " руб.</p>";
	}
	else if(delivery1.checked) {
		endsum = summ;
		document.getElementById('delivery-sum').innerHTML = "<p id='delivery-sum'>Доставка: 0 руб.</p>";
		document.getElementById('end-sum').innerHTML = "<p id='end-sum'>Итого: " + endsum + " руб.</p>";
	}

	return;
};

function DeleteFromCart( index ) {
	cartArray.splice(index, 1);
	goods-=1;

	var basketImg = document.getElementById('basket-img');
	if(!(basketImg === null)) {
		switch (goods) {
			case 1:
			basketImg.src = 'img/icons/tote-bag-1.png';
			break;
			case 2:
			basketImg.src = 'img/icons/tote-bag-2.png';
			break;
			case 3:
			basketImg.src = 'img/icons/tote-bag-3.png';
			break;
			default:
			basketImg.src = 'img/icons/tote-bag-0.png';
			break;
		}
	}
	

	deleteCookie('cart-element-NaN');
	for(var i = 0; i < 30; i++) {
		deleteCookie('cart-element-'+i );
	}
	if(goods == 0) {
		deleteCookie('vagoods');
	}
	else {
		setCookie('vagoods', goods, 7);
		for(var i = 0; i < cartArray.length; i++) {
			setCookie('cart-element-'+i, cartArray[i], 7);
		}
	}

	var endsum = document.getElementById('end-sum');
	if( !(endsum === null) ) {
		endsum.innerHTML = "<p id='end-sum'></p>";
	}
	else {
		WatchCart();
		return;
	}
	var deliverysum = document.getElementById('delivery-sum');
	deliverysum.innerHTML = "<p id='delivery-sum'></p>"
	
	WatchCart();
};

function checkButtonCondition() {
	var tbox = document.getElementsByClassName('t-box');
	for(var i = 0; i < tbox.length; i++) {
		tbox[i].style.backgroundColor = '';
		if( tbox[i].value === "" ) {
			document.getElementById("button-condition").href = '#fields-error';
			tbox[i].style.backgroundColor = '#f2bcbc';
			return;
		}
	}

	var rb1 = document.getElementById('dm-1');
	var rb2 = document.getElementById('dm-2');
	if( !(rb1.checked) && !(rb2.checked) ) {
		document.getElementById("button-condition").href = '#fields-error';
		return;
	}
	
	document.getElementById("button-condition").href = '#success-window';

};

function functionsSpan() {
	WatchCart();
	checkButtonCondition();
};