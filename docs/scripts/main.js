// Custom Lightbox Implementation (fallback if jQuery/Ekko Lightbox not available)
function initCustomLightbox() {
    // Create modal HTML structure
    const modalHtml = `
        <div id="custom-lightbox" class="custom-lightbox" style="display: none;">
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <span class="lightbox-prev">&#10094;</span>
                <img class="lightbox-image" src="" alt="">
                <span class="lightbox-next">&#10095;</span>
            </div>
        </div>
    `;
    
    // Add modal to body if it doesn't exist
    if (!document.getElementById('custom-lightbox')) {
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
    
    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background-color: rgba(0, 0, 0, 0.9);
        }
        
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .lightbox-content {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-image {
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 40px;
            font-size: 40px;
            color: white;
            cursor: pointer;
            z-index: 10001;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-prev, .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 30px;
            color: white;
            cursor: pointer;
            z-index: 10001;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 5px;
            padding: 10px 15px;
            user-select: none;
        }
        
        .lightbox-prev {
            left: 20px;
        }
        
        .lightbox-next {
            right: 20px;
        }
        
        .lightbox-prev:hover, .lightbox-next:hover, .lightbox-close:hover {
            background: rgba(0, 0, 0, 0.8);
        }
        
        @media (max-width: 768px) {
            .lightbox-close {
                top: 10px;
                right: 20px;
                font-size: 30px;
                width: 40px;
                height: 40px;
            }
            
            .lightbox-prev, .lightbox-next {
                font-size: 24px;
                padding: 8px 12px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Gallery functionality
    const galleryLinks = document.querySelectorAll('[data-gallery="ww-gallery"]');
    const modal = document.getElementById('custom-lightbox');
    const modalImg = modal.querySelector('.lightbox-image');
    const closeBtn = modal.querySelector('.lightbox-close');
    const prevBtn = modal.querySelector('.lightbox-prev');
    const nextBtn = modal.querySelector('.lightbox-next');
    const overlay = modal.querySelector('.lightbox-overlay');
    
    let currentIndex = 0;
    
    // Add click listeners to gallery images
    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = index;
            showLightbox();
        });
    });
    
    function showLightbox() {
        const link = galleryLinks[currentIndex];
        modalImg.src = link.href;
        modalImg.alt = link.querySelector('img').alt;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function hideLightbox() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Event listeners
    closeBtn.addEventListener('click', hideLightbox);
    overlay.addEventListener('click', hideLightbox);
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + galleryLinks.length) % galleryLinks.length;
        showLightbox();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % galleryLinks.length;
        showLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                hideLightbox();
            }
        }
    });
    
    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextBtn.click();
            } else {
                // Swipe right - previous image
                prevBtn.click();
            }
        }
    }
}

// Initialize lightbox when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Try to use Ekko Lightbox if jQuery is available, otherwise use custom lightbox
    if (typeof $ !== 'undefined' && typeof $.fn.ekkoLightbox !== 'undefined') {
        // Initialize Ekko Lightbox
        $(document).on('click', '[data-toggle="lightbox"]', function(event) {
            event.preventDefault();
            $(this).ekkoLightbox({
                alwaysShowClose: true,
                showArrows: true,
                wrapping: true
            });
        });
    } else {
        // Use custom lightbox implementation
        initCustomLightbox();
    }
});

// Legacy jQuery-based code (for other functionality)
if (typeof $ !== 'undefined') {
    $(document).ready(function () {
        $("#map-image").on("click", function() {
            // Empty for now
        });

        $('#go-to-top').click(function () {
            $('html,body').animate({scrollTop: 0}, 400);
            return false;
        });

        $(".gift-send").click(function () {
            $("#gift-name").text($(this).data("name"));
        });

        $("#reserveGiftButton").click(function () {
            let name = $("#sender-name").val();
            let message = $("#sender-message").val();
            $("#reserveGiftButton").text("전송중...");
            $("#reserveGiftButton").prop("disabled", true);

            if (typeof emailjs !== 'undefined') {
                emailjs.init("user_yjLL5xG0A3kkOCH5BGIDh");
                emailjs.send("wedding-mail", "gift_send", {
                    name: name,
                    gift: $("#gift-name").text(),
                    message: message
                }).then(function (response) {
                    $('#giftMailModal').modal('hide');
                    alert(name + "님의 메시지가 정상적으로 전송되었습니다.");

                    $("#reserveGiftButton").text("예약하기!");
                    $("#sender-name").val('');
                    $("#sender-message").val('');
                    $("#reserveGiftButton").prop("disabled", false);
                }, function (err) {
                    alert("메시지 전송이 실패했습니다. 다시 시도해주세요.");
                });
            }
        });
    });

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
} else {
    // Fallback for when jQuery is not available
    document.addEventListener('DOMContentLoaded', function() {
        // Go to top functionality
        const goToTopBtn = document.getElementById('go-to-top');
        if (goToTopBtn) {
            goToTopBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return false;
            });
        }
        
        // Smooth scroll for navigation links
        const smoothScrollLinks = document.querySelectorAll('a.smooth-scroll');
        smoothScrollLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const target = document.querySelector(targetId);
                    if (target) {
                        event.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    });
}