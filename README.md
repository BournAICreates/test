# Contact Form Website

A modern, accessible contact form with client-side validation and responsive design.

## Features

- **Semantic HTML5** structure with proper accessibility attributes
- **Client-side validation** with real-time feedback
- **Responsive design** that works on all devices
- **Accessibility features** including:
  - Proper labels and ARIA attributes
  - Focus management and keyboard navigation
  - Screen reader announcements for errors and status
  - High contrast focus states
- **Form validation** with:
  - Required field validation
  - Email format validation
  - Minimum/maximum length validation
  - Pattern validation for names
  - Inline error messages
- **User experience enhancements**:
  - Loading states during submission
  - Success/error feedback messages
  - Smooth scrolling navigation
  - Hover and focus states
  - Form reset after successful submission

## Technologies Used

- HTML5 with semantic markup
- CSS3 with modern features (Flexbox, Grid, CSS Variables)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)

## Form Fields

- **Name** (required) - Validates for minimum length and character pattern
- **Email** (required) - Validates for proper email format
- **Company** (optional) - Optional field with validation if filled
- **Message** (required) - Validates for minimum and maximum length

## Validation Rules

- Name: 2+ characters, letters/spaces/hyphens/apostrophes only
- Email: Valid email format
- Company: 2+ characters if provided
- Message: 10-1000 characters

## Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Getting Started

1. Clone or download the files
2. Open `index.html` in a web browser
3. The form is ready to use!

## Integration

To integrate with a real backend service (like Formspree, Netlify Forms, or a custom API):

1. Replace the `submitForm` method in `script.js` with your actual API endpoint
2. Update the form submission logic to handle your specific response format
3. Configure any necessary authentication or headers

Example for Formspree:
```javascript
const response = await fetch('https://formspree.io/f/your-form-id', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data)
});
```

## License

MIT License