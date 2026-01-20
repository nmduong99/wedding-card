// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function () {
    // Custom lightbox is initialized automatically

    $("#map-image").on("click")
    {

    }

    $('#go-to-top').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 400);
        return false;
    });

    // Countdown Timer Configuration
    const WEDDING_DATE = new Date('2026-02-01T14:00:00').getTime();

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

    // ===== Mobile Menu Auto-Close Functionality =====
    var $navbarToggler = $('.navbar-toggler');
    var $navbarCollapse = $('#ww-navbarNav');

    // Function to close mobile menu
    function closeMobileMenu() {
        if ($navbarCollapse.hasClass('show')) {
            $navbarCollapse.collapse('hide');
            $navbarToggler.attr('aria-expanded', 'false');
        }
    }

    // Close menu when clicking a nav link
    $navbarCollapse.on('click', 'a.nav-link', function () {
        closeMobileMenu();
    });

    // Close menu on outside click
    $(document).on('click', function (event) {
        var $target = $(event.target);
        // If menu is open and click is outside navbar
        if ($navbarCollapse.hasClass('show') &&
            !$target.closest('.navbar').length) {
            closeMobileMenu();
        }
    });

    // Close menu on Escape key
    $(document).on('keydown', function (event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            if ($navbarCollapse.hasClass('show')) {
                closeMobileMenu();
                $navbarToggler.focus(); // Restore focus to toggle button
            }
        }
    });

    // Update aria-expanded on toggle
    $navbarToggler.on('click', function () {
        var isExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !isExpanded);
    });

})

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

// Toggle QR code display for gift section
function toggleQR(person) {
    var frontId = person + '-front';
    var backId = person + '-back';
    var front = document.getElementById(frontId);
    var back = document.getElementById(backId);

    if (front && back) {
        if (front.style.display === 'none') {
            front.style.display = 'block';
            back.style.display = 'none';
        } else {
            front.style.display = 'none';
            back.style.display = 'block';
        }
    }
}

// Custom Gallery Toggle
function toggleGallery() {
    var collage = document.getElementById('collage-view');
    var grid = document.getElementById('full-gallery-grid');
    var btn = document.getElementById('explore-btn');

    if (collage.style.display !== 'none') {
        collage.style.display = 'none';
        grid.classList.add('show-grid');
        btn.textContent = 'Thu g?n';
    } else {
        collage.style.display = 'block';
        grid.classList.remove('show-grid');
        btn.textContent = 'Xem t?t c? ?nh';
    }
}

/* Optimized Carousel Logic - Native Scroll with Auto-animation */
$(window).on('load', function () {
    const viewport = document.querySelector('.gallery-carousel-viewport');
    if (!viewport) return;

    /* Clone children for infinite scroll effect */
    const track = viewport.querySelector('.gallery-carousel-track');
    if (track && track.children.length > 0) {
        const items = Array.from(track.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Configuration constants
    const AUTO_SCROLL_SPEED = 0.3; // Pixels per frame - slower for smoother animation
    const SCROLL_RESUME_DELAY = 2000; // Milliseconds to wait before resuming auto-scroll
    const TRANSITION_BUFFER = 1; // Pixel buffer for seamless infinite loop transition
    
    let animationId;
    let isPaused = false;

    // Smooth infinite scroll animation
    function autoScroll() {
        if (!isPaused) {
            viewport.scrollLeft += AUTO_SCROLL_SPEED;
            // Seamless reset when reached halfway through cloned content
            const halfWidth = viewport.scrollWidth / 2;
            if (viewport.scrollLeft >= halfWidth - TRANSITION_BUFFER) {
                viewport.scrollLeft = viewport.scrollLeft - halfWidth;
            }
        }
        animationId = requestAnimationFrame(autoScroll);
    }
    
    // Start auto-scroll
    animationId = requestAnimationFrame(autoScroll);

    // Pause auto-scroll on hover for better UX
    viewport.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    viewport.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Pause when user manually scrolls (touch or wheel)
    let scrollTimeout;
    viewport.addEventListener('scroll', () => {
        isPaused = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isPaused = false;
        }, SCROLL_RESUME_DELAY);
    });
});

/* Music Player Logic */
$(document).ready(function () {
    var audio = document.getElementById('player');
    var controlBtn = $('#music-control');
    var isPlaying = false;

    if (audio) {
        // Set volume to 0.1
        audio.volume = 0.05;
        audio.loop = true;

        // Toggle Play/Pause on click
        controlBtn.on('click', function () {
            if (audio.paused) {
                audio.play();
                isPlaying = true;
                $(this).addClass('fa-spin'); // Spin icon when playing
            } else {
                audio.pause();
                isPlaying = false;
                $(this).removeClass('fa-spin');
            }
        });

        // Landing Page Music Button Logic
        $('#landing-music-btn').on('click', function () {
            if (audio.paused) {
                var playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(function () {
                        isPlaying = true;
                        controlBtn.addClass('fa-spin');
                    }).catch(function (error) {
                        console.log('Play prevented:', error);
                    });
                }
            }
            $('#landing-music-container').fadeOut(800);

            // Scroll to next section
            $('html, body').animate({
                scrollTop: $("#events").offset().top - 10
            }, 1000);
        });


    }
});

// Copy to clipboard function
function copyToClipboard(text) {
    // Create a temporary textarea element
    var tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);

    // Select the text
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text
    try {
        document.execCommand("copy");
        alert("Đã sao chép số tài khoản: " + text);
    } catch (e) {
        console.error("Copy failed", e);
    }

    // Remove the temporary element
    document.body.removeChild(tempInput);
}
