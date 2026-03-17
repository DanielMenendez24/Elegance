/**
 * Archivo principal de JavaScript
 * Contiene todas las funcionalidades interactivas del lado del cliente.
 */

// Función que se dispara al hacer click en una etiqueta de tecnología (en services.html)
function toggleTech(element) {
    // Si el elemento ya tiene la clase 'active' (es decir, ya está expandido), se la quitamos para cerrarlo
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        return; // Terminamos la función aquí
    }
    
    // Si no tiene la clase 'active', se la agregamos. Esto activará las animaciones de CSS para expandirse.
    element.classList.add('active');
}

// Lógica del Slider Automático y Manual para la página de inicio (index.html)
document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos track, todos los slides (las imágenes), botones y puntitos indicadores
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dots = document.querySelectorAll('.dot');
    
    // Solo activamos la lógica si estamos en una página que realmente tiene el slider
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        
        // Función dedicada para cambiar el slide indicando la posición en forma de índice
        const goToSlide = (index) => {
            // 1. Quitamos la clase 'active' a la imagen actual y a su puntito
            slides[currentSlide].classList.remove('active');
            if (dots.length > 0) dots[currentSlide].classList.remove('active');
            
            // 2. Actualizamos el índice de forma circular. Manejamos desbordamientos
            currentSlide = (index + slides.length) % slides.length;
            
            // 3. Movemos la pista verticalmente (TranslateY)
            if (track) {
                // Al estar invertida la columna, trasladamos en positivo hacia abajo
                track.style.transform = `translateY(${currentSlide * 100}%)`;
            }
            
            // 4. Asignamos nueva clase 'active' a la nueva imagen  ya su puntito
            slides[currentSlide].classList.add('active');
            if (dots.length > 0) dots[currentSlide].classList.add('active');
        };

        // Función atajo para siguiente y anterior
        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);

        // Activamos intervalo automático
        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 5000); // 5 segundos de rotación
        };

        // Reseteamos el reloj interno a cero cuando el cliente interactúa dando click en botón para que no se cambie a la mitad
        const resetSlider = () => {
            clearInterval(slideInterval);
            startSlider();
        };

        // Escucha en botones físicos (Comprobando que existan)
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetSlider();
            });

            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetSlider();
            });
        }

        // Escucha de clics en los puntos indicadores  (Comprobando que existan)
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                // Si el usuario hace click a un punto especifico (ej el #3), llamamos goToSlide apuntando a esa posicion y paramos reloj
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetSlider();
                });
            });
        }
        
        // Disparamos slider original
        startSlider();
    }
});
