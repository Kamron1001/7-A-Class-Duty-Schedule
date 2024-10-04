document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('#students-table tr');
    const interval = 24 * 60 * 60 * 1000; // Интервал в 24 часа (1 день)
    let isMoving = JSON.parse(localStorage.getItem('isMoving')) ?? true; // Переменная для отслеживания движения линии
    let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;

    // Обновляем строку
    function updateSchedule() {
        console.log("Обновление расписания. Текущий индекс:", currentIndex);

        rows.forEach(row => row.classList.remove('highlight')); // Убираем выделение у всех строк
        if (currentIndex >= 0 && currentIndex < rows.length) {
            rows[currentIndex].classList.add('highlight'); // Выделяем текущую строку
        }
        
        // Сохраняем текущий индекс в localStorage
        localStorage.setItem('currentIndex', currentIndex);
    }

    // Обновление дня (сдвигаем на следующую строку, если не воскресенье)
    function updateDay() {
        const today = new Date().getDay(); // Получаем день недели
        if (today !== 0) { // Если не воскресенье
            currentIndex = (currentIndex + 1) % rows.length; // Переходим к следующему индексу
        }
        updateSchedule(); // Обновляем расписание
    }

    // Проверка, нужно ли обновить строку
    function checkUpdate() {
        if (isMoving) {
            const now = new Date();
            const lastUpdateTime = new Date(localStorage.getItem('lastUpdateTime'));
            if (!lastUpdateTime || (now - lastUpdateTime) >= interval) {
                updateDay(); // Обновляем день
                localStorage.setItem('lastUpdateTime', now.toISOString()); // Обновляем время последнего обновления
            }
        } else {
            updateSchedule(); // Обновляем состояние
        }
    }

    // Запускаем проверку и обновление каждую секунду
    setInterval(checkUpdate, 1000);

    // Функция для остановки/запуска линии
    function toggleMovement() {
        isMoving = !isMoving; // Переключаем состояние движения
        localStorage.setItem('isMoving', isMoving); // Сохраняем состояние в localStorage
        updateSchedule(); // Обновляем состояние
        updateButtonStyle(); // Обновляем стиль кнопки
    }

    // Обновление стиля кнопки в зависимости от состояния
    function updateButtonStyle() {
        if (isMoving) {
            moveButton.classList.remove('stopped'); // Убираем класс остановленного состояния
            moveButton.innerText = 'Остановить';
        } else {
            moveButton.classList.add('stopped'); // Добавляем класс остановленного состояния
            moveButton.innerText = 'Запустить';
        }
    }

    // Добавление кнопки для управления движением линии
    const moveButton = document.createElement('button');
    moveButton.addEventListener('click', toggleMovement);
    document.body.appendChild(moveButton); // Добавляем кнопку на страницу
    updateButtonStyle(); // Устанавливаем начальный стиль кнопки

    // Инициализация расписания сразу при загрузке страницы
    updateSchedule();
});
