document.addEventListener('DOMContentLoaded', function() {
    const participantsList = document.querySelector('.participants__list');
    const participantsItems = document.querySelectorAll('.participants__item');
    const prevButton = document.querySelector('.slider-controls__button--prev');
    const nextButton = document.querySelector('.slider-controls__button--next');
    const indicator = document.querySelector('.slider__indicator');

    let itemsToShow = calculateItemsToShow();
    let currentSlide = 0;
    const totalItems = participantsItems.length;
    let maxSlideIndex = Math.ceil(totalItems / itemsToShow) - 1;

    function calculateItemsToShow() {
        const screenWidth = window.innerWidth;

        if (screenWidth < 800) {
            return 1; // 1 слайд на экране
        } else if (screenWidth < 1135) {
            return 2; // 2 слайда на экране
        } else {
            return 3; // 3 слайда на экране
        }
    }

    function updateSlider() {
        const offset = -currentSlide * 100;
        participantsList.style.transform = `translateX(${offset}%)`;

        const currentItem = (currentSlide * itemsToShow) + 1;
        const currentItemRangeEnd = Math.min(currentSlide * itemsToShow + itemsToShow, totalItems);

        if (itemsToShow === 1) {
            indicator.textContent = `${currentItem} / ${totalItems}`;
        } else {
            indicator.textContent = `${currentItemRangeEnd} / ${totalItems}`;
        }

        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === maxSlideIndex;
    }

    function handleResize() {
        itemsToShow = calculateItemsToShow();
        maxSlideIndex = Math.ceil(totalItems / itemsToShow) - 1;
        currentSlide = Math.min(currentSlide, maxSlideIndex);
        updateSlider();
    }

    prevButton.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
            resetAutoSlide(); // Сбросить таймер автопрокрутки при ручном переключении
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentSlide < maxSlideIndex) {
            currentSlide++;
            updateSlider();
            resetAutoSlide(); // Сбросить таймер автопрокрутки при ручном переключении
        }
    });

    window.addEventListener('resize', handleResize);

    updateSlider();

    // Автоматическая смена слайдов
    let autoSlideInterval = setInterval(function() {
        currentSlide = (currentSlide < maxSlideIndex) ? currentSlide + 1 : 0;
        updateSlider();
    }, 4000); // 4000 миллисекунд = 4 секунды

    // Функция сброса автоматической смены слайдов
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(function() {
            currentSlide = (currentSlide < maxSlideIndex) ? currentSlide + 1 : 0;
            updateSlider();
        }, 4000);
    }
});





document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const blocks = document.querySelectorAll('.stages-mob .block');
    const dots = document.querySelectorAll('.stages-slider-controls__dot');

    function updateSlider() {
        blocks.forEach((block, index) => {
            block.classList.toggle('active', index === currentSlide);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    document.querySelector('.mob__button--prev').addEventListener('click', function () {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : blocks.length - 1;
        updateSlider();
    });

    document.querySelector('.mob__button--next').addEventListener('click', function () {
        currentSlide = (currentSlide < blocks.length - 1) ? currentSlide + 1 : 0;
        updateSlider();
    });

    updateSlider();
});




document.querySelectorAll('.header__button').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
