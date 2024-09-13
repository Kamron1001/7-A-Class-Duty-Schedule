document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('#students-table tr');
    let currentDay = new Date().getDay(); // Начинаем с текущего дня недели

    function updateSchedule() {
        // Убираем предыдущие выделения
        rows.forEach(row => row.classList.remove('highlight'));

        // Рассчитываем текущую строку
        const currentRow = Math.floor(currentDay / 4) % rows.length;

        // Подсвечиваем текущих дежурных
        rows[currentRow].classList.add('highlight');
    }

    function updateDay() {
        const today = new Date().getDay();
        if (today !== 0) { // Если не воскресенье
            // Увеличиваем currentDay и обрабатываем переход в начало
            currentDay = (currentDay + 1) % (rows.length * 4); // Переход на следующий день
        }
        updateSchedule();
    }

    // Обновляем расписание сразу при загрузке
    updateSchedule();

    // Устанавливаем обновление на каждый день в 00:00
    setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            updateDay();
        }
    }, 60 * 1000); // Проверяем каждую минуту
});
