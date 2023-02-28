# Место Россия

## _Проектная работа студента Яндекс.Практикум, часть седьмая: ООП и модули_

Создана в процессе бесконечного погружения в тернистые недра JavaScript.

Основные достижения этапа:
* код разбит на модули, модули подключены в index.js
* валидация форм осуществляется при помощи ООП
* карточки создаются при помощи методов ООП

Интерактивная функциональность сайта:
* окно редактирования профиля
* окно добавления новой карточки
* возможность удаления карточки
* окно просмотра изображения карточки в увеличенном размере
* "живая" валидация полей форм
* "а также лайк" (П.Маркелов, ревьюер)

## Саммериз + Инсайты
### По результатам пятого ревью:

* Проверять наличие атрибута alt у <img> при сотворении в скрипте, проверять читаемость alt при незагруженной картинке (важен контраст цвета текста и фона)
* Контроль интерактивных элементов: курсор, прозрачность.
* Атрибут value не является обязательным для ```<input>``` и не указывается явно, если отсутствует значение
* отложенная и асинхронная загрузка скрипта - перечитать, когда поумнею: Скрипты: async, defer - если упрощенно, то при указании _defer_ скрипты будут вызваны только после полной загрузки:
  ```HTML
    <script defer src=".//scripts/form-validation.js"></script>
    <script defer src="./scripts/initial-cards.js"></script>
    <script defer src="./scripts/script.js"></script>
  ```
* Если при создании объекта заранее известны свойства - указываем их прямо в объекте:
  ```JavaScript
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
  ```JavaScript
  buttonClosePopupList.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });
  // это чтобы не привязываться к evt.target
  ```
‌
### По результатам шестого ревью:

* кейс с удалением слушателей с закрытого попапа - обязательно удаляем _все_ слушатели _после закрытия_ попапа - чтобы не было "как в прошлый раз", когда один из них оставался и давал ошибку в консоли:
  ```JavaScript
  // закрытие модальных окон
  const closePopup = popup => {
    popup.classList.remove('popup_is-open');
    popup.removeEventListener('mousedown', handleOverlayClick);
    document.removeEventListener('keydown', handleEscEvent);
  }
  ```

* при навешивании обработчика клика на картинку корректнее передавать не evt а сам объект, из которого строится карточка:
  ```JavaScript
  // создание карточки
  const createCard = item => {
    const card = cardSample.cloneNode(true);
    const image = card.querySelector('.card__image');
    const name = card.querySelector('.card__caption');
    const like = card.querySelector('.card__like');
    const buttonRemoveCard = card.querySelector('.card__remove');
    image.src = item.link;
    image.alt = item.name;
    name.textContent = item.name;
    // image.addEventListener('click', handleImageClick); // было - передавалось события
    image.addEventListener('click', () => handleImageClick(item)) // стало - передается первоначальный объект
    like.addEventListener('click', handleLikeClick);
    buttonRemoveCard.addEventListener('click', handleRemoveClick);
    return card;
  }
  ```

* событие 'reset' формы можно использовать как триггер:
  ```JavaScript
  form.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(config, inputList, submitButton);
    }, 0);
  });
  ```
  При сбросе формы происходит вызов функции, переключающей состояние кнопки с помощью метода ```setTimeout()``` отправляющий вызов функции в конец стека (чтобы успел произойти сброс формы)


Посмотреть работу можно по адресу: https://razumtsev.github.io/mesto/

[Илья Разумцев](mailto:razumtsev.il@yandex.ru)
