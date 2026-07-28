# Contributing to Weather App

Thank you for your interest in contributing! Here's how you can help improve this weather app.

## How to Contribute

### 1. Fork the Repository
Click the "Fork" button on GitHub to create your own copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/weather-app.git
cd weather-app
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

Good branch names:
- `feature/temperature-toggle`
- `fix/api-error-handling`
- `docs/update-readme`
- `style/improve-mobile-ui`

### 4. Make Your Changes

#### For Bug Fixes
- Make minimal, focused changes
- Include comments explaining the fix
- Test thoroughly

#### For Features
- Add meaningful comments
- Keep code clean and readable
- Follow existing code style
- Update README if needed

#### For Documentation
- Use clear, simple language
- Include examples where helpful
- Fix typos and grammar

### 5. Test Your Changes
- Open `index.html` in multiple browsers
- Test on mobile devices (or use DevTools)
- Verify all links work
- Check console for errors (F12)

### 6. Commit Your Changes
```bash
git add .
git commit -m "Add: your feature description"
```

Good commit messages:
- `Add: temperature unit toggle feature`
- `Fix: API error handling for invalid cities`
- `Docs: update installation instructions`
- `Style: improve mobile responsiveness`

### 7. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 8. Open a Pull Request
1. Go to GitHub repository
2. Click "Compare & pull request"
3. Add descriptive title and description
4. Explain what changes you made
5. Why they're helpful
6. Submit!

## Code Style Guidelines

### JavaScript
```javascript
// Use meaningful variable names
const currentTemperature = 25;

// Add comments for complex logic
// Fetch data from OpenWeatherMap API
async function getWeather(city) {
    // ...
}

// Use const/let, avoid var
const API_KEY = 'your-key';

// Use arrow functions
const handleSearch = () => {
    // ...
};
```

### HTML
```html
<!-- Use semantic elements -->
<header>
    <h1>Weather App</h1>
</header>

<!-- Close all tags properly -->
<input type="text" placeholder="City name">

<!-- Use meaningful class names -->
<div class="search-container">
    <!-- ... -->
</div>
```

### CSS
```css
/* Use consistent naming convention */
.search-button { }
.weather-card { }
.forecast-icon { }

/* Group related styles */
.button {
    padding: 10px;
    border: none;
    cursor: pointer;
}

/* Use descriptive comments */
/* Search Section */
/* ================ */
```

## Reporting Bugs

### Found a Bug? Report It!

1. Check existing issues first
2. Open a new issue with:
   - **Clear title:** "Describe the bug"
   - **Steps to reproduce:**
     1. Go to...
     2. Click on...
     3. Observe...
   - **Expected behavior:** What should happen
   - **Actual behavior:** What actually happens
   - **Screenshots:** If applicable
   - **Browser/OS:** Chrome on Windows 10, etc.

## Requesting Features

Have an idea? Request it!

1. Check existing issues first
2. Open new issue with:
   - **Clear title:** "Feature: what you want"
   - **Description:** Why would this be helpful?
   - **Example:** How would it work?

## Getting Help

- Read the [README.md](README.md)
- Check existing issues for similar questions
- Read code comments in the files
- Ask in a new issue if stuck

## Thank You!

Your contributions help make Weather App better for everyone! 🙏

---

**Happy Contributing!** 🌤️
