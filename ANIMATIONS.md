# Framer Motion Animations Documentation

This project includes a comprehensive animation system built with vanilla JavaScript and CSS animations, providing smooth page transitions and component-level animations with full accessibility support.

## Overview

The animation system provides:
- **Scroll-triggered animations** with Intersection Observer
- **Entrance animations** for page load effects
- **Hover animations** for interactive elements
- **Parallax effects** for scroll-based transforms
- **Staggered animations** for multi-element sequences
- **Full accessibility** with prefers-reduced-motion support
- **Graceful degradation** if JavaScript is disabled

## Installation

### Using NPM (Optional - for future framework integration)

```bash
npm install
```

The project includes optional Framer Motion library support via CDN or ES modules for future integration if needed.

## Animation Types

### 1. Entrance Animations (Page Load)

Applied to elements with `data-entrance-animate` attribute:

```html
<h1 data-entrance-animate="slide-up" data-entrance-delay="0">Title</h1>
```

**Available animation types:**
- `slide-up` - Element slides up from below
- `fade-in` - Element fades in

**Attributes:**
- `data-entrance-animate` - Animation type (required)
- `data-entrance-delay` - Delay in milliseconds (optional, default: 0)

### 2. Scroll-Triggered Animations

Applied to elements with `data-animate` attribute:

```html
<div data-animate="fade-in">Content</div>
```

**Available animation types:**
- `fade-in` - Fade in with opacity
- `slide-up` - Slide up from bottom
- `slide-down` - Slide down from top
- `slide-left` - Slide in from right
- `slide-right` - Slide in from left
- `scale-in` - Scale up from smaller size
- `stagger` - Staggered animation for children

**How it works:**
- Elements are observed using Intersection Observer
- Animation triggers when element becomes visible
- Observer is removed after first trigger (animation only plays once)

### 3. Hover Animations

Applied to interactive elements with `data-hover-animate` attribute:

```html
<div class="card" data-hover-animate="lift">Card</div>
```

**Available animation types:**
- `lift` - Element lifts up on hover
- `scale` - Element scales up on hover
- `glow` - Element glows on hover

### 4. Staggered Animations

For animating multiple children sequentially:

```html
<div data-animate="stagger">
  <div data-stagger-item>Item 1</div>
  <div data-stagger-item>Item 2</div>
  <div data-stagger-item>Item 3</div>
</div>
```

Each child is animated with 100ms delay between them.

### 5. Parallax Effects

Applied to elements with `data-parallax` attribute:

```html
<div data-parallax="0.5">Parallax element</div>
```

**Attribute:**
- `data-parallax` - Speed multiplier (0.0 to 1.0)
  - `0.3` - Slower, subtle parallax
  - `0.5` - Medium parallax
  - `1.0` - Fast, dramatic parallax

## CSS Classes for Animations

### Helper Classes

```html
<!-- GPU acceleration for smooth animations -->
<div class="animate-gpu">Content</div>

<!-- Will-change property for performance -->
<div class="will-animate">Content</div>

<!-- Smooth transitions -->
<div class="transition-smooth">Content</div>
<div class="transition-smooth-slow">Content</div>
<div class="transition-smooth-fast">Content</div>

<!-- Animation delays (for manual stagger) -->
<div class="animation-delay-1">Content</div>
<div class="animation-delay-2">Content</div>
```

## Accessibility

### Prefers Reduced Motion

The system respects the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations are disabled for users who prefer reduced motion */
}
```

**What happens:**
- All CSS animations are disabled
- All JavaScript animations are prevented from running
- Elements remain visible without animation delays
- User preference is monitored for changes

### Progressive Enhancement

For users with JavaScript disabled, animations are skipped using `<noscript>` styles:

```html
<noscript>
  <style>
    [data-animate],
    [data-entrance-animate],
    [data-hover-animate] {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }
  </style>
</noscript>
```

## Performance Optimization

### GPU Acceleration

The `animate-gpu` class provides:
- `transform: translateZ(0)` - Forces hardware acceleration
- `backface-visibility: hidden` - Improves rendering
- `perspective: 1000px` - Enables 3D rendering context

### Will-Change Property

The `will-animate` class uses `will-change: transform, opacity` to optimize painting and compositing.

### Intersection Observer

- Uses passive event listeners
- Observes only viewport-visible elements
- Automatically cleans up after animation

### Throttled Scroll Events

Scroll animations use passive listeners for better performance.

## File Structure

```
project/
├── js/
│   └── animations.js           # Main animation module
├── css/
│   ├── animations.css          # Animation keyframes
│   ├── main.css                # Main stylesheet
│   ├── variables.css           # CSS variables
│   ├── base/
│   ├── components/
│   ├── layout/
│   └── utilities/
├── index.html                  # HTML with animation attributes
└── package.json                # Package configuration
```

## Implementation Examples

### Hero Section with Entrance Animations

```html
<section class="section bg-light text-center">
  <h1 data-entrance-animate="slide-up" data-entrance-delay="0">
    Modern Digital Solutions
  </h1>
  <p data-entrance-animate="fade-in" data-entrance-delay="200">
    Description text
  </p>
  <button class="btn" data-entrance-animate="slide-up" data-entrance-delay="400">
    Call to Action
  </button>
</section>
```

### Service Cards with Scroll and Hover Animations

```html
<div class="grid grid-3-cols" data-animate="stagger">
  <div class="card will-animate" data-stagger-item data-hover-animate="lift">
    <h3>Service Title</h3>
    <p>Service description</p>
  </div>
  <!-- More cards... -->
</div>
```

### Portfolio with Parallax

```html
<div class="card will-animate" data-hover-animate="lift" data-parallax="0.5">
  <img alt="Portfolio item">
  <h3>Project Title</h3>
</div>
```

## Browser Support

- Modern browsers with:
  - Intersection Observer API
  - CSS Animations
  - Transform/Opacity properties
  
Tested on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## JavaScript API

If you need programmatic control, import the animation module:

```javascript
import { FramerAnimations } from './js/animations.js';

// Animations initialize automatically on DOM ready
// Access the instance if needed for custom logic
```

## Future Integration with Framer Motion

To use the actual Framer Motion library:

```html
<script src="https://cdn.jsdelivr.net/npm/framer-motion@latest"></script>
```

Or via NPM:

```bash
npm install framer-motion
```

## Customization

### Adjusting Animation Timing

Modify durations in `js/animations.js`:

```javascript
// Change entrance animation duration
animateFadeIn(element, 1000) // 1 second instead of 600ms
```

### Adding New Animation Types

In `css/animations.css`:

```css
@keyframes customAnimation {
  from {
    opacity: 0;
    transform: rotate(-5deg);
  }
  to {
    opacity: 1;
    transform: rotate(0);
  }
}
```

Then in `js/animations.js`:

```javascript
case 'custom':
  element.style.animation = `customAnimation 600ms ease-out forwards`;
  break;
```

## Testing

### Test with Reduced Motion Enabled

1. **macOS**: System Preferences > Accessibility > Display > Reduce motion
2. **Windows**: Settings > Ease of Access > Display > Show animations
3. **DevTools**: Emulate `prefers-reduced-motion` in Chrome DevTools

### Test with JavaScript Disabled

1. Open DevTools
2. Go to Settings > Rendering
3. Toggle "Disable JavaScript"

## Common Issues

### Animations Not Playing

1. Check that elements have the correct `data-*` attributes
2. Verify CSS animations are imported in `css/main.css`
3. Check browser console for JavaScript errors
4. Ensure JavaScript is enabled

### Animations Janky

1. Add `will-animate` class to animated elements
2. Use `animate-gpu` for complex animations
3. Reduce animation duration
4. Check for conflicting CSS transitions

### Parallax Not Working

1. Ensure `data-parallax` has a numeric value (0.0-1.0)
2. Check that scroll events are firing (check console)
3. Verify `data-parallax` elements are direct DOM children

## References

- [MDN: CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Framer Motion Documentation](https://www.framer.com/motion/)
