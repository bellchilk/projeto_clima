# Climatempo

A weather forecast web app for Dourados, MS — built to practice REST API
consumption and dynamic DOM manipulation.

![App screenshot](https://github.com/user-attachments/assets/2556d26c-0b24-4f74-9f78-39306f3f294a)

---

## Overview

Fetches real-time meteorological data from the Open-Meteo API and renders it
in a clean, organized interface. The user can track current conditions as well
as hourly and weekly forecasts without any backend or API key required.

**Data displayed:**

| Metric | Detail |
|---|---|
| Current temperature | Live reading |
| Hourly forecast | Temperature curve throughout the day |
| Weekly min/max | 7-day temperature range |
| Feels like | Apparent temperature |
| Rain probability | Precipitation chance (%) |
| Wind speed | km/h |
| UV index | Daily peak value |

---

## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

- HTML5, CSS3, JavaScript (ES6+)
- [Open-Meteo API](https://open-meteo.com/) — free, no API key required
- Bootstrap Icons

---

## Getting Started

**Prerequisites:** [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
extension for VS Code

```bash
# Clone the repository
git clone https://github.com/bellchilk/projeto_clima.git
cd projeto_clima
```

Then open `index.html` with Live Server (`Right click → Open with Live Server`).

---

## Key Concepts Practiced

- Consuming a public REST API with `fetch` and `async/await`
- Parsing and transforming JSON response data
- Dynamic DOM manipulation based on API responses
- Responsive layout with CSS

---

*Internship starter project — Dourados, MS*
