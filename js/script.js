/**
 * Weather App - Main JavaScript
 * 
 * Features:
 * - Search weather by city name
 * - Display current temperature and conditions
 * - Show 5-day forecast
 * - Handle errors gracefully
 * - Responsive loading states
 * 
 * API: OpenWeatherMap (free tier)
 */

// Configuration
const API_KEY = 'YOUR_API_KEY_HERE'; // Get free key from https://openweathermap.org/api
const API_BASE = 'https://api.openweathermap.org/data/2.5';

// Weather Icon Mapping
const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '🌤️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const errorMsg = document.getElementById('errorMsg');
const loader = document.getElementById('loader');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

/**
 * Handle search button click
 * Validates input and fetches weather data
 */
function handleSearch() {
    const city = searchInput.value.trim();

    if (!city) {
        showError('Please enter a city name');
        return;
    }

    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        showError(
            'API Key not configured. Get a free key from ' +
            'https://openweathermap.org/api and update the script.'
        );
        return;
    }

    getWeather(city);
}

/**
 * Fetch weather data from OpenWeatherMap API
 * @param {string} city - City name to search
 */
async function getWeather(city) {
    try {
        showLoader(true);
        clearError();

        // Fetch current weather
        const currentResponse = await fetch(
            `${API_BASE}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!currentResponse.ok) {
            throw new Error('City not found');
        }

        const currentData = await currentResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${API_BASE}/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        const forecastData = await forecastResponse.json();

        // Display data
        displayCurrentWeather(currentData);
        displayForecast(forecastData);

        // Clear search input
        searchInput.value = '';
    } catch (error) {
        showError(error.message || 'Failed to fetch weather data');
        console.error('Error:', error);
    } finally {
        showLoader(false);
    }
}

/**
 * Display current weather information
 * @param {object} data - Weather data from API
 */
function displayCurrentWeather(data) {
    const {
        name,
        sys,
        main,
        weather,
        wind,
        clouds,
        visibility,
    } = data;

    const temp = Math.round(main.temp);
    const condition = weather[0].main;
    const icon = weatherIcons[weather[0].icon] || '🌤️';
    const feelsLike = Math.round(main.feels_like);
    const humidity = main.humidity;
    const pressure = main.pressure;
    const windSpeed = wind.speed;
    const cloudiness = clouds.all;
    const visibilityKm = (visibility / 1000).toFixed(1);

    const html = `
        <div class="weather-info">
            <div class="weather-icon">${icon}</div>
            <div class="weather-details">
                <h2>${name}, ${sys.country}</h2>
                <p>${condition}</p>
                <p>Feels like ${feelsLike}°C</p>

                <div class="weather-stats">
                    <div class="stat">
                        <div class="stat-label">Temperature</div>
                        <div class="stat-value">${temp}°C</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Humidity</div>
                        <div class="stat-value">${humidity}%</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Wind Speed</div>
                        <div class="stat-value">${windSpeed} m/s</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Pressure</div>
                        <div class="stat-value">${pressure} hPa</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Cloudiness</div>
                        <div class="stat-value">${cloudiness}%</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Visibility</div>
                        <div class="stat-value">${visibilityKm} km</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    currentWeatherDiv.innerHTML = html;
}

/**
 * Display 5-day forecast
 * @param {object} data - Forecast data from API
 */
function displayForecast(data) {
    const forecasts = data.list;

    // Get daily forecasts (every 8th item = every 24 hours)
    const dailyForecasts = [];
    const seenDates = new Set();

    for (let i = 0; i < forecasts.length; i += 8) {
        const forecast = forecasts[i];
        const date = new Date(forecast.dt * 1000);
        const dateStr = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });

        if (!seenDates.has(dateStr) && dailyForecasts.length < 5) {
            seenDates.add(dateStr);
            dailyForecasts.push({
                date: dateStr,
                temp: Math.round(forecast.main.temp),
                icon: weatherIcons[forecast.weather[0].icon] || '🌤️',
                description: forecast.weather[0].main,
            });
        }
    }

    // Generate HTML
    const html = dailyForecasts
        .map(
            (f) => `
        <div class="forecast-card">
            <div class="forecast-date">${f.date}</div>
            <div class="forecast-icon">${f.icon}</div>
            <div class="forecast-temp">${f.temp}°C</div>
            <div class="forecast-desc">${f.description}</div>
        </div>
    `
        )
        .join('');

    forecastDiv.innerHTML = html;
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('show');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorMsg.classList.remove('show');
    }, 5000);
}

/**
 * Clear error message
 */
function clearError() {
    errorMsg.classList.remove('show');
}

/**
 * Show/hide loading spinner
 * @param {boolean} show - Whether to show loader
 */
function showLoader(show) {
    if (show) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

/**
 * Initialize app on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Weather App loaded successfully');
    console.log('Note: Please add your OpenWeatherMap API key to script.js');
});
