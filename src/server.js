const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const API_KEY = 'badfd217c3c7b8923f22859efe7c121f';

app.post('/getWeather', async (req, res) => {
    if (!req.body.cities || !Array.isArray(req.body.cities)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    let cities = req.body.cities;
    let weatherData = {};

    for (let city of cities) {
        try {
            let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            weatherData[city] = response.data.main.temp + "C";
        } catch (error) {
            console.error(`Error fetching weather for ${city}: ${error.message}`);
            weatherData[city] = 'Error fetching weather';
        }
    }

    res.json({ weather: weatherData });
});

app.listen(3000, () => console.log('Server running on port 3000'));
