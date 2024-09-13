document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('#students-table tr');
    let currentDay = 0;

    function updateSchedule() {
        // Убираем предыдущие выделения
        rows.forEach(row => row.classList.remove('highlight'));

        // Рассчитываем текущую строку
        const currentRow = Math.floor(currentDay / 4) % rows.length;
        
        // Подсвечиваем текущих дежурных
        rows[currentRow].classList.add('highlight');

        // Переход на следующий день, пропуская воскресенье
        const today = new Date().getDay();
        if (today !== 0) { // Не воскресенье
            currentDay = (currentDay + 4) % (rows.length * 4);
        }
    }

    // Обновляем расписание каждый день
    setInterval(updateSchedule, 24 * 60 * 60 * 1000);
    updateSchedule(); // Запускаем сразу
});
