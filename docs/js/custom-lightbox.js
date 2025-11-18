/**
 * Custom Lightbox with Zoom Support
 * A lightweight, borderless lightbox solution with zoom capabilities
 */
(function() {
    'use strict';

    class CustomLightbox {
        constructor() {
            this.currentIndex = 0;
            this.images = [];
            this.scale = 1;
            this.isDragging = false;
            this.startX = 0;
            this.startY = 0;
            this.translateX = 0;
            this.translateY = 0;
            this.init();
        }

        init() {
            // Create lightbox container
            const lightbox = document.createElement('div');
            lightbox.id = 'custom-lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Close">&times;</button>
                    <button class="lightbox-prev" aria-label="Previous">&lsaquo;</button>
                    <button class="lightbox-next" aria-label="Next">&rsaquo;</button>
                    <div class="lightbox-image-container">
                        <img class="lightbox-image" src="" alt="">
                    </div>
                    <div class="lightbox-counter"></div>
                    <div class="lightbox-zoom-controls">
                        <button class="zoom-in" aria-label="Zoom in">+</button>
                        <button class="zoom-out" aria-label="Zoom out">-</button>
                        <button class="zoom-reset" aria-label="Reset zoom">⟲</button>
                    </div>
                </div>
            `;
            document.body.appendChild(lightbox);

            this.lightbox = lightbox;
            this.overlay = lightbox.querySelector('.lightbox-overlay');
            this.content = lightbox.querySelector('.lightbox-content');
            this.imageContainer = lightbox.querySelector('.lightbox-image-container');
            this.image = lightbox.querySelector('.lightbox-image');
            this.closeBtn = lightbox.querySelector('.lightbox-close');
            this.prevBtn = lightbox.querySelector('.lightbox-prev');
            this.nextBtn = lightbox.querySelector('.lightbox-next');
            this.counter = lightbox.querySelector('.lightbox-counter');
            this.zoomInBtn = lightbox.querySelector('.zoom-in');
            this.zoomOutBtn = lightbox.querySelector('.zoom-out');
            this.zoomResetBtn = lightbox.querySelector('.zoom-reset');

            this.bindEvents();
        }

        bindEvents() {
            // Close button
            this.closeBtn.addEventListener('click', () => this.close());
            this.overlay.addEventListener('click', () => this.close());
            
            // Navigation
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!this.lightbox.classList.contains('active')) return;
                
                switch(e.key) {
                    case 'Escape':
                        this.close();
                        break;
                    case 'ArrowLeft':
                        this.prev();
                        break;
                    case 'ArrowRight':
                        this.next();
                        break;
                }
            });

            // Zoom controls
            this.zoomInBtn.addEventListener('click', () => this.zoom(0.2));
            this.zoomOutBtn.addEventListener('click', () => this.zoom(-0.2));
            this.zoomResetBtn.addEventListener('click', () => this.resetZoom());
            
            // Mouse wheel zoom
            this.imageContainer.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                this.zoom(delta);
            });

            // Touch/Mouse drag for zoomed images
            this.image.addEventListener('mousedown', (e) => this.startDrag(e));
            this.image.addEventListener('touchstart', (e) => this.startDrag(e));
            document.addEventListener('mousemove', (e) => this.drag(e));
            document.addEventListener('touchmove', (e) => this.drag(e));
            document.addEventListener('mouseup', () => this.endDrag());
            document.addEventListener('touchend', () => this.endDrag());

            // Double click to zoom
            this.image.addEventListener('dblclick', () => {
                if (this.scale === 1) {
                    this.zoom(1); // Zoom to 2x
                } else {
                    this.resetZoom();
                }
            });

            // Pinch to zoom on touch devices
            this.imageContainer.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    this.touchDistance = this.getTouchDistance(e.touches);
                }
            });

            this.imageContainer.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    const newDistance = this.getTouchDistance(e.touches);
                    const delta = (newDistance - this.touchDistance) / 100;
                    this.zoom(delta);
                    this.touchDistance = newDistance;
                }
            });
        }

        getTouchDistance(touches) {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }

        startDrag(e) {
            if (this.scale <= 1) return;
            
            this.isDragging = true;
            const point = e.touches ? e.touches[0] : e;
            this.startX = point.clientX - this.translateX;
            this.startY = point.clientY - this.translateY;
            this.image.style.cursor = 'grabbing';
        }

        drag(e) {
            if (!this.isDragging) return;
            
            e.preventDefault();
            const point = e.touches ? e.touches[0] : e;
            this.translateX = point.clientX - this.startX;
            this.translateY = point.clientY - this.startY;
            this.updateTransform();
        }

        endDrag() {
            this.isDragging = false;
            this.image.style.cursor = this.scale > 1 ? 'grab' : 'default';
        }

        zoom(delta) {
            this.scale = Math.max(0.5, Math.min(5, this.scale + delta));
            
            if (this.scale <= 1) {
                this.scale = 1;
                this.translateX = 0;
                this.translateY = 0;
            }
            
            this.updateTransform();
        }

        resetZoom() {
            this.scale = 1;
            this.translateX = 0;
            this.translateY = 0;
            this.updateTransform();
        }

        updateTransform() {
            this.image.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
            this.image.style.cursor = this.scale > 1 ? 'grab' : 'default';
        }

        open(images, index = 0) {
            this.images = images;
            this.currentIndex = index;
            this.resetZoom();
            this.show();
        }

        show() {
            this.image.src = this.images[this.currentIndex];
            this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
            this.lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Update navigation button visibility
            this.prevBtn.style.display = this.images.length > 1 ? 'block' : 'none';
            this.nextBtn.style.display = this.images.length > 1 ? 'block' : 'none';
        }

        close() {
            this.lightbox.classList.remove('active');
            document.body.style.overflow = '';
            this.resetZoom();
        }

        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.resetZoom();
            this.show();
        }

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.resetZoom();
            this.show();
        }
    }

    // Initialize when DOM is ready
    function initLightbox() {
        const lightbox = new CustomLightbox();
        
        // Find all gallery links
        const galleryLinks = document.querySelectorAll('[data-gallery]');
        const galleryMap = new Map();
        
        // Group images by gallery
        galleryLinks.forEach((link, index) => {
            const gallery = link.getAttribute('data-gallery');
            if (!galleryMap.has(gallery)) {
                galleryMap.set(gallery, []);
            }
            galleryMap.get(gallery).push({
                url: link.getAttribute('href'),
                element: link,
                index: galleryMap.get(gallery).length
            });
        });
        
        // Attach click handlers
        galleryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const gallery = link.getAttribute('data-gallery');
                const items = galleryMap.get(gallery);
                const images = items.map(item => item.url);
                const currentItem = items.find(item => item.element === link);
                
                lightbox.open(images, currentItem.index);
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
})();
