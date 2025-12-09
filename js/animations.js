/**
 * Framer Motion Animations Module
 * Handles all animations with accessibility support and graceful degradation
 */

class FramerAnimations {
  constructor() {
    this.prefersReducedMotion = this.checkPrefersReducedMotion();
    this.intersectionObserver = null;
    this.resizeObserver = null;
    this.initialize();
  }

  /**
   * Check if user prefers reduced motion
   */
  checkPrefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Initialize all animation observers and event listeners
   */
  initialize() {
    if (!this.prefersReducedMotion) {
      this.setupIntersectionObserver();
      this.setupScrollAnimations();
      this.setupHoverAnimations();
      this.setupEntranceAnimations();
    }

    // Add noscript fallback styles
    this.setupFallbacks();

    // Listen for changes to prefers-reduced-motion
    window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        if (this.prefersReducedMotion) {
          this.removeAllAnimations();
        } else {
          this.initialize();
        }
      });
  }

  /**
   * Setup Intersection Observer for scroll-triggered animations
   */
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.applyScrollRevealAnimation(entry.target);
          }
        });
      },
      options
    );

    // Observe elements with animation data attributes
    document
      .querySelectorAll('[data-animate]')
      .forEach((el) => this.intersectionObserver.observe(el));
  }

  /**
   * Apply scroll reveal animations
   */
  applyScrollRevealAnimation(element) {
    const animationType = element.getAttribute('data-animate');

    if (!animationType) return;

    // Remove observer once animation has been triggered
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(element);
    }

    switch (animationType) {
      case 'fade-in':
        this.animateFadeIn(element);
        break;
      case 'slide-up':
        this.animateSlideUp(element);
        break;
      case 'slide-down':
        this.animateSlideDown(element);
        break;
      case 'slide-left':
        this.animateSlideLeft(element);
        break;
      case 'slide-right':
        this.animateSlideRight(element);
        break;
      case 'scale-in':
        this.animateScaleIn(element);
        break;
      case 'stagger':
        this.animateStagger(element);
        break;
      default:
        break;
    }
  }

  /**
   * Fade in animation
   */
  animateFadeIn(element, duration = 600) {
    element.style.animation = `fadeIn ${duration}ms ease-in-out forwards`;
  }

  /**
   * Slide up animation
   */
  animateSlideUp(element, duration = 600) {
    element.style.animation = `slideUp ${duration}ms ease-out forwards`;
  }

  /**
   * Slide down animation
   */
  animateSlideDown(element, duration = 600) {
    element.style.animation = `slideDown ${duration}ms ease-out forwards`;
  }

  /**
   * Slide left animation
   */
  animateSlideLeft(element, duration = 600) {
    element.style.animation = `slideLeft ${duration}ms ease-out forwards`;
  }

  /**
   * Slide right animation
   */
  animateSlideRight(element, duration = 600) {
    element.style.animation = `slideRight ${duration}ms ease-out forwards`;
  }

  /**
   * Scale in animation
   */
  animateScaleIn(element, duration = 600) {
    element.style.animation = `scaleIn ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
  }

  /**
   * Stagger animation for multiple children
   */
  animateStagger(element, duration = 600) {
    const children = element.querySelectorAll('[data-stagger-item]');

    children.forEach((child, index) => {
      const delay = index * 100;
      child.style.animation = `slideUp ${duration}ms ease-out ${delay}ms forwards`;
      child.style.opacity = '0';
    });
  }

  /**
   * Setup hover animations for interactive elements
   */
  setupHoverAnimations() {
    document.querySelectorAll('[data-hover-animate]').forEach((element) => {
      const animationType = element.getAttribute('data-hover-animate');

      element.addEventListener('mouseenter', () => {
        this.applyHoverAnimation(element, animationType, true);
      });

      element.addEventListener('mouseleave', () => {
        this.applyHoverAnimation(element, animationType, false);
      });
    });
  }

  /**
   * Apply hover animations
   */
  applyHoverAnimation(element, animationType, isHovering) {
    const duration = 300;

    if (animationType === 'lift') {
      if (isHovering) {
        element.style.animation = `lift ${duration}ms ease-out forwards`;
      } else {
        element.style.animation = 'none';
        element.style.transform = 'translateY(0)';
      }
    } else if (animationType === 'glow') {
      if (isHovering) {
        element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
      } else {
        element.style.boxShadow = 'var(--shadow-md)';
      }
    } else if (animationType === 'scale') {
      if (isHovering) {
        element.style.animation = `hoverScale ${duration}ms ease-out forwards`;
      } else {
        element.style.animation = 'none';
        element.style.transform = 'scale(1)';
      }
    }
  }

  /**
   * Setup entrance animations for page load
   */
  setupEntranceAnimations() {
    document.querySelectorAll('[data-entrance-animate]').forEach((element) => {
      const animationType = element.getAttribute('data-entrance-animate');
      const delay = element.getAttribute('data-entrance-delay') || '0';

      if (animationType === 'fade-in') {
        element.style.animation = `fadeIn 1000ms ease-in-out ${delay}ms forwards`;
      } else if (animationType === 'slide-up') {
        element.style.animation = `slideUp 1000ms ease-out ${delay}ms forwards`;
      }

      element.style.opacity = '0';
    });
  }

  /**
   * Setup scroll-based parallax and transform effects
   */
  setupScrollAnimations() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener(
      'scroll',
      () => {
        parallaxElements.forEach((element) => {
          this.applyParallaxEffect(element);
        });
      },
      { passive: true }
    );
  }

  /**
   * Apply parallax effect
   */
  applyParallaxEffect(element) {
    const scrolled = window.scrollY;
    const speed = element.getAttribute('data-parallax') || '0.5';
    const yPos = scrolled * speed;

    element.style.transform = `translateY(${yPos}px)`;
  }

  /**
   * Setup fallback styles for JavaScript disabled
   */
  setupFallbacks() {
    const noscriptElement = document.createElement('style');
    noscriptElement.textContent = `
      [data-animate],
      [data-entrance-animate],
      [data-hover-animate] {
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
      }
    `;
    document.head.appendChild(noscriptElement);
  }

  /**
   * Remove all animations
   */
  removeAllAnimations() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    document.querySelectorAll('[data-animate], [data-entrance-animate]').forEach((element) => {
      element.style.animation = 'none';
      element.style.transform = 'none';
      element.style.opacity = '1';
    });
  }
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new FramerAnimations();
  });
} else {
  new FramerAnimations();
}

export { FramerAnimations };
