<?php 
	
	// Переменные

	$name = $_POST['your-name'];
	$phone = $_POST['phone'];

	// Переменные
	
	

	// Сообщение для почты
	$message_all = 
	"Сообщение из сайта Gorbachev Travel: " .
	"\n\nИмя: " . $name.
	"\nТелефон: " . $phone;
	

	// Сообщение для почты



	// Отправка на почту

	$ok = mail('gorbachev.agency@gmail.com', '', $message_all); // mail('На какую почту отправлять', 'Тема сообщения', 'Сообщение'); 

	// Отправка на почту



	// Проверка отправки на почту

	

	if ($ok){
		echo "true";
	}else{
		echo "false";
	}

	// Проверка отправки на почту
 ?>