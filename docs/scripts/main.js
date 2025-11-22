// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function () {
    // Custom lightbox is initialized automatically

    $("#map-image").on("click")
    {

    }

    $('#go-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 400);
        return false;
    });

    // Countdown Timer Configuration
    const WEDDING_DATE = new Date('2025-02-25T14:00:00').getTime();
    
    // Cache DOM elements for countdown
    const $countdownDays = $('#countdown-days');
    const $countdownHours = $('#countdown-hours');
    const $countdownMinutes = $('#countdown-minutes');
    const $countdownSeconds = $('#countdown-seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = WEDDING_DATE - now;

        if (distance < 0) {
            // Wedding has passed
            $countdownDays.text('00');
            $countdownHours.text('00');
            $countdownMinutes.text('00');
            $countdownSeconds.text('00');
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update display with leading zeros
        $countdownDays.text(String(days).padStart(2, '0'));
        $countdownHours.text(String(hours).padStart(2, '0'));
        $countdownMinutes.text(String(minutes).padStart(2, '0'));
        $countdownSeconds.text(String(seconds).padStart(2, '0'));
    }

    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);


})

// Gallery toggle function
function toggleGallery() {
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    const button = document.getElementById('galleryToggle');
    
    if (hiddenItems.length > 0) {
        // Show all hidden items
        hiddenItems.forEach(item => {
            item.classList.remove('hidden');
        });
        button.textContent = 'Thu gọn';
    } else {
        // Hide items after the first 6
        const allItems = document.querySelectorAll('.gallery-item');
        allItems.forEach((item, index) => {
            if (index >= 6) {
                item.classList.add('hidden');
            }
        });
        button.textContent = 'Xem thêm';
    }
}

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function (event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: target.offset().top
                },
                1000,
                function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                }
            );
        }
    }
});
