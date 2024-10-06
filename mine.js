document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('#students-table tr');
    const headers = document.querySelectorAll('#students-table th'); // Заголовки таблицы
    let isMoving = JSON.parse(localStorage.getItem('isMoving')) ?? true; // Считываем состояние движения
    let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;

    // Обновляем строку
    function updateSchedule() {
        rows.forEach(row => row.classList.remove('highlight')); // Убираем выделение у всех строк
        if (currentIndex >= 0 && currentIndex < rows.length) {
            rows[currentIndex].classList.add('highlight'); // Выделяем текущую строку
        }
        localStorage.setItem('currentIndex', currentIndex); // Сохраняем текущий индекс
    }

    // Обновляем день (сдвигаем на следующую строку)
    function updateDay() {
        const today = new Date().getDay(); // Получаем текущий день недели
        if (today !== 0) { // Если не воскресенье
            currentIndex = (currentIndex + 1) % rows.length; // Сдвигаем на следующую строку
        }
        updateSchedule(); // Обновляем расписание
    }

    // Проверка для обновления строки в 00:00
    function checkUpdate() {
        if (isMoving) {
            const now = new Date();
            const lastUpdateDate = localStorage.getItem('lastUpdateDate');
            const todayDate = now.toISOString().split('T')[0]; // Получаем дату

            // Если день изменился
            if (lastUpdateDate !== todayDate && now.getHours() === 0) {
                updateDay(); // Обновляем день
                localStorage.setItem('lastUpdateDate', todayDate); // Сохраняем новую дату
            }
        } else {
            updateSchedule(); // Обновляем состояние
        }
    }

    setInterval(checkUpdate, 1000); // Проверка каждые 1 секунду

    // Остановка/запуск движения линии
    function toggleMovement() {
        isMoving = !isMoving; // Переключаем состояние
        localStorage.setItem('isMoving', isMoving); // Сохраняем состояние
        updateSchedule();
        updateButtonColor();
        updateLineGradient();
        updateHeadersGradient();
    }

    // Обновляем цвет кнопки
    function updateButtonColor() {
        if (!isMoving) {
            moveButton.style.background = "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,100,100,0.5) 100%)"; // Красный градиент
            moveButton.style.color = "#fff"; // Белый текст
        } else {
            moveButton.style.background = "linear-gradient(90deg, lime, green)"; // Зелёный градиент при движении
            moveButton.style.color = "#000"; // Чёрный текст
        }
        moveButton.innerText = isMoving ? 'Остановить' : 'Запустить'; // Обновляем текст кнопки
    }

    // Обновляем градиент строки с линией
    function updateLineGradient() {
        const highlightRow = document.querySelector('.highlight');
        if (highlightRow) {
            if (!isMoving) {
                highlightRow.style.background = "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,100,100,0.5) 100%)"; // Красный градиент
                highlightRow.style.color = "#fff"; // Белый текст
            } else {
                highlightRow.style.background = "linear-gradient(90deg, #ffda44, #d4ff88)"; // Жёлто-лаймовый градиент
                highlightRow.style.color = "#000"; // Чёрный текст
            }
        }
    }

    // Обновляем градиент заголовков таблицы
    function updateHeadersGradient() {
        headers.forEach(th => {
            if (!isMoving) {
                th.style.background = "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,100,100,0.5) 100%)"; // Красный градиент
                th.style.color = "#fff"; // Белый текст
            } else {
                th.style.background = "#444"; // Исходный тёмный цвет
                th.style.color = "#fff"; // Белый текст
            }
        });
    }

    // Добавляем кнопку для управления движением
    const moveButton = document.createElement('button');
    moveButton.style.cssText = `
        background-color: lime; /* Начальный цвет кнопки */
        color: #000;
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.3s ease, color 0.3s ease;
    `;
    moveButton.addEventListener('click', toggleMovement); // Добавляем событие клика
    document.body.appendChild(moveButton); // Добавляем кнопку на страницу
    updateButtonColor(); // Устанавливаем начальный цвет кнопки

    // Инициализация расписания при загрузке
    updateSchedule();
    updateLineGradient();
    updateHeadersGradient();
});
