document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cards = Array.from(track.children);
    const cardWidth = cards[0].getBoundingClientRect().width;

    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    const setCardPosition = (card, index) => {
        card.style.left = cardWidth * index + 'px';
    };

    cards.forEach(setCardPosition);

    const moveToCard = (track, currentCard, targetCard) => {
        track.style.transform = 'translateX(-' + targetCard.style.left + ')';
        currentCard.classList.remove('current-card');
        targetCard.classList.add('current-card');
    };

    const setPositionByIndex = () => {
        currentTranslate = currentIndex * -cardWidth;
        prevTranslate = currentTranslate;
        track.style.transform = `translateX(${currentTranslate}px)`;
    };

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            setPositionByIndex();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            setPositionByIndex();
        }
    });

    const touchStart = (index) => {
        return (event) => {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            track.classList.add('grabbing');
        };
    };

    const touchMove = (event) => {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    };

    const touchEnd = () => {
        cancelAnimationFrame(animationID);
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < cards.length - 1) currentIndex++;
        if (movedBy > 100 && currentIndex > 0) currentIndex--;

        setPositionByIndex();
        track.classList.remove('grabbing');
    };

    const getPositionX = (event) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    };

    const animation = () => {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    };

    cards.forEach((card, index) => {
        const cardImage = card.querySelector('img');
        cardImage.addEventListener('dragstart', (e) => e.preventDefault());

        card.addEventListener('touchstart', touchStart(index));
        card.addEventListener('touchend', touchEnd);
        card.addEventListener('touchmove', touchMove);

        card.addEventListener('mousedown', touchStart(index));
        card.addEventListener('mouseup', touchEnd);
        card.addEventListener('mouseleave', touchEnd);
        card.addEventListener('mousemove', touchMove);
    });

    setPositionByIndex();
});


//animation

document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const closeButton = document.createElement('span');
    const modalImage = document.createElement('img');

    modal.classList.add('modal');
    modalContent.classList.add('modal-content');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalImage);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modalImage.src = imgSrc;
            modal.style.display = 'flex';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.add('melt');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('melt');
        }, 1000); // Duración de la animación de derretimiento
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('melt');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('melt');
            }, 1000); // Duración de la animación de derretimiento
        }
    });
});




//eyes

document.addEventListener('DOMContentLoaded', function() {
    const pupil = document.getElementById('pupil');
    const eye = document.getElementById('cat-eye-svg');

    // Función para mover la pupila siguiendo el cursor
    function movePupil(event) {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 100;
        const eyeCenterY = rect.top + rect.height / 100;
        const mouseX = event.clientX - eyeCenterX ;
        const mouseY = event.clientY - eyeCenterY ;

        const maxX = 30; // Radio máximo de movimiento en el eje X
        const maxY = 30; // Radio máximo de movimiento en el eje Y

        const angle = Math.atan2(mouseY, mouseX);
        const distance = Math.min(maxX * Math.abs(Math.cos(angle)), maxY * Math.abs(Math.sin(angle)));

        const pupilX = 100 + (distance * Math.cos(angle));
        const pupilY = 100 + (distance * Math.sin(angle));

        pupil.setAttribute('cx', pupilX);
        pupil.setAttribute('cy', pupilY);
    }

    // Función para añadir la clase de parpadeo
    function blink() {
        eye.classList.add('blink');
        setTimeout(() => {
            eye.classList.remove('blink');
        }, 200); // Duración de la animación de parpadeo
    }

    document.addEventListener('mousemove', movePupil);

    // Intervalo para parpadeo cada 1 minuto (60000 milisegundos)
    setInterval(blink, 60000);
});
