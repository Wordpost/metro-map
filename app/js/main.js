$(document).ready(function ()
{ 
	var tags = $('#search-tags'), // контейнер для хранения станций
		metroMap = $('#popup-metro-map'), // контейнер карты метро
		label = metroMap.find('label'), // для заполнения объекта данными метро
		button = metroMap.find('button'), // для заполнения объекта линиями метро
		data = {}; // хранение всех данных в объекте

	button.each(function()
	{// перебераем все кнопки с линиями метро и вносим данные в объект
		var line = $(this).attr("line"); // значение куска ветки метро
		data[line] = $("#popup-metro-map input[lines~=" + line + "]"); // создаем свойство в объекте и вбиваем туда все станции со значением ветки метро
	});

	$.each(label, function(i, item)
	{// перебераем все станции для внесения в объект название метро по их коду
		// тоесть получается: свойство хххх = название метро
		data[$(item).attr("for").substr(5)] = $(item).find('span').html().replace(/<br>/g, " ");
	});

	metroMap.on("click", 'input', function()
	{// клик на станцию в карте метро
		var val = $(this).attr("value"), // значение станции метро хххх
			metro = data[val], // вытаскиваем название метро из объетка данных по значению кода метро хххх
			tag = '<span class="alert-metro '+val+'"><i class="fa fa-subway"></i>'+metro+'</span>';
		$(this).is(":checked") ? tags.append(tag) : tags.find('.'+val).remove(); // если метро уже выбранно, удаляем его из контейнера меток
	});

	metroMap.on("click", 'button', function(event)
	{// клик по куску ветки метро
		event.preventDefault();
		var line = $(this).attr("line"), // определяем цифру ветки на которую кликнули
			obj = data[line], // вытаскиваем из общего оъекта данных
			chek = obj.is(":checked") ? false : true; // проверка на выбранные станции
		obj.prop("checked", chek); // если станции выбранны то снимаем чек иначе ставим

		for (var i = obj.length - 1; i >= 0; i--)
		{ // запускаем цикл по новому объету
			var val = obj[i]['value'], // находим значение хххх в каждом свойстве нового объекта
				tag = '<span class="alert-metro '+val+'"><i class="fa fa-subway"></i>'+data[val]+'</span>'; // находим название метро в объекте данных
			chek ? tags.append(tag) : tags.find('.'+val).remove(); // если метро уже выбранно, удаляем его из контейнера меток
		};
	});

	$('#clean').click(function(event)
	{ // сброс всех выбранных станций
		event.preventDefault();
		metroMap.find('input').prop("checked", false)
		tags.empty();
	})
});