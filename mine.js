document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('#students-table tr');
    const interval = 24 * 60 * 60 * 1000; // Интервал в 24 часа (1 день)

    function getNextUpdateTime() {
        const now = new Date();
        const nextUpdate = new Date();
        nextUpdate.setHours(24, 0, 0, 0); // Устанавливаем следующее обновление на полночь
        if (now >= nextUpdate) {
            nextUpdate.setDate(nextUpdate.getDate() + 1);
        }
        return nextUpdate;
    }

    function saveState(currentIndex, nextUpdateTime) {
        localStorage.setItem('currentIndex', currentIndex);
        localStorage.setItem('nextUpdateTime', nextUpdateTime.toISOString());
    }

    function getCurrentState() {
        return {
            currentIndex: parseInt(localStorage.getItem('currentIndex')) || 0,
            nextUpdateTime: new Date(localStorage.getItem('nextUpdateTime')) || getNextUpdateTime()
        };
    }

    let { currentIndex, nextUpdateTime } = getCurrentState();

    function updateSchedule() {
        console.log("Обновление расписания. Текущий индекс:", currentIndex);
        
        rows.forEach(row => row.classList.remove('highlight'));
        if (currentIndex >= 0 && currentIndex < rows.length) {
            rows[currentIndex].classList.add('highlight');
        }

        saveState(currentIndex, nextUpdateTime);
    }

    function updateDay() {
        const today = new Date().getDay();
        if (today !== 0) { // Если не воскресенье
            currentIndex = (currentIndex + 1) % rows.length;
        }
        nextUpdateTime = getNextUpdateTime();
        updateSchedule();
    }

    function checkUpdate() {
        const now = new Date();
        if (now >= nextUpdateTime) {
            updateDay();
        } else {
            updateSchedule();
        }
    }

    checkUpdate();
    setInterval(checkUpdate, 1000);
});


// document.addEventListener('DOMContentLoaded', function() {
//     const rows = document.querySelectorAll('#students-table tr');
//     const interval = 5 * 1000; // Интервал в 5 секунд

//     // Получаем текущую информацию из LocalStorage
//     let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;
//     let lastUpdateTime = new Date(localStorage.getItem('lastUpdateTime')) || new Date();
//     let nextUpdateTime = new Date(localStorage.getItem('nextUpdateTime')) || new Date(Date.now() + interval);

//     function updateSchedule() {
//         console.log("Обновление расписания. Текущий индекс:", currentIndex);

//         // Убираем выделение у всех строк
//         rows.forEach(row => row.classList.remove('highlight'));

//         if (currentIndex >= 0 && currentIndex < rows.length) {
//             rows[currentIndex].classList.add('highlight'); // Выделяем текущую строку
//         }

//         // Сохраняем текущий индекс и время следующего обновления в LocalStorage
//         localStorage.setItem('currentIndex', currentIndex);
//         localStorage.setItem('nextUpdateTime', nextUpdateTime.toISOString());
//     }

//     function updateDay() {
//         currentIndex = (currentIndex + 1) % rows.length; // Переходим к следующей строке
//         console.log("Обновлённый индекс после смены:", currentIndex);

//         // Устанавливаем следующее время обновления
//         nextUpdateTime = new Date(Date.now() + interval);
//         updateSchedule();
//     }

//     function checkUpdate() {
//         const now = new Date();

//         if (now >= nextUpdateTime) {
//             updateDay(); // Если время для обновления пришло, обновляем строку
//         } else {
//             updateSchedule(); // Иначе просто обновляем расписание
//         }
//     }

//     // Обновляем расписание сразу при загрузке страницы
//     checkUpdate();

//     // Проверяем обновление каждые 1 секунду
//     setInterval(() => {
//         console.log("Проверка обновления каждые 1 секунду");
//         checkUpdate(); // Проверяем, нужно ли обновить строку
//     }, 1000); // Проверка каждую секунду
// });








// Ручная Функция

//  document.addEventListener('DOMContentLoaded', function() {
//     const rows = document.querySelectorAll('#students-table tr');
//     let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;

//     function updateSchedule() {
//         rows.forEach(row => row.classList.remove('highlight'));
//         if (currentIndex >= 0 && currentIndex < rows.length) {
//             rows[currentIndex].classList.add('highlight');
//         }
//         localStorage.setItem('currentIndex', currentIndex);
//     }

//     // Вызов для отображения текущей строки
//     updateSchedule();
    
//     // Функция для изменения строки вручную
//     window.setRowIndex = function(index) {
//         currentIndex = index % rows.length; // Обновляем индекс строки
//         updateSchedule();
//     };

//     // Здесь вызываем setRowIndex для перехода на третью строку
//     setRowIndex(2); // Переходит на третью строку (индекс 2)
// });



