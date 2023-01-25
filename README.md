# Место Россия

## _Проектная работа студента Яндекс.Практикум, часть пятая_

Создана в начале очередного погружения в бездонные недра JavaScript.

Интерактивная функциональность сайта:
* окно редактирования профиля
* окно добавления новой карточки
* возможность удаления карточки
* окно просмотра изображения карточки в увеличенном размере
* "а также лайк" (П.Маркелов, ревьюер)

Дополнительно:
* при первоначальной загрузке карточки добавляются на страницу с помощью скрипта из локального массива
* реализовано плавное открытие/закрытие модальных окон
* на смену _function declaration_ пришло _function expression_, что неизбежно привело к рефакторингу кода

По результатам ревью взять на вооружение:
* Проверять наличие атрибута alt у ```<img>``` при сотворении в скрипте, проверять читаемость alt при незагруженной картинке (важен контраст цвета текста и фона)
* Контроль интерактивных элементов: курсор, прозрачность.
* Атрибут value не является обязательным для ```<input>``` и не указывается явно, если отсутствует значение
* отложенная и асинхронная загрузка скрипта - перечитать, когда поумнею: https://learn.javascript.ru/script-async-defer
* Если при создании объекта заранее известны свойства - указываем их прямо в объекте:
```javascript
  const cardEssence = {};
  cardEssence.name = inputCardName.value;
  cardEssence.link = inputCardLink.value;
  // такое себе ;|

  const cardEssence = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  // годнота :)
```
* философия Кнопки Закрытия Попапа - найти и подружить:
```javascript
  buttonClosePopupList.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });
  // это чтобы не привязываться к evt.target
```


Посмотреть работу можно по адресу: https://razumtsev.github.io/mesto/

[Илья Разумцев](mailto:razumtsev.il@yandex.ru)
