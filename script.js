async function fetchData() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max,temperature_2m_min&latitude=-22.22111&longitude=-54.80528&current=temperature_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index,precipitation_probability",
    );
    const data = await response.json();
    dayForecast(data);

    const temperature = Math.round(data.current.temperature_2m);
    document.querySelector(".temperature").textContent = `${temperature}°`;
    const mainIcon = document.querySelector(".climate-image img");
    setWeatherIcon(mainIcon, temperature, 200, 200);

    const sixAM = Math.round(data.hourly.temperature_2m[6]);
    document.querySelector("#hour1").textContent = `${sixAM}°`;
    document.querySelector("#temp1").textContent = "6:00 AM";
    const sixAMIcon = document.querySelector(".primary-hour img");
    setWeatherIcon(sixAMIcon, sixAM, 50, 50, null);

    const nineAM = Math.round(data.hourly.temperature_2m[9]);
    document.querySelector("#hour2").textContent = `${nineAM}°`;
    document.querySelector("#temp2").textContent = "9:00 AM";
    const nineAMIcon = document.querySelector(".secondary-hour img");
    setWeatherIcon(nineAMIcon, nineAM, 50, 50, null);

    const twelvePM = Math.round(data.hourly.temperature_2m[12]);
    document.querySelector("#hour3").textContent = `${twelvePM}°`;
    document.querySelector("#temp3").textContent = "12:00 PM";
    const twelvePMIcon = document.querySelector(".tertiary-hour img");
    setWeatherIcon(twelvePMIcon, twelvePM, 50, 50, null);

    const threePM = Math.round(data.hourly.temperature_2m[15]);
    document.querySelector("#hour4").textContent = `${threePM}°`;
    document.querySelector("#temp4").textContent = "3:00 PM";
    const threePMIcon = document.querySelector(".quaternary-hour img");
    setWeatherIcon(threePMIcon, threePM, 50, 50, null);

    const sixPM = Math.round(data.hourly.temperature_2m[18]);
    document.querySelector("#hour5").textContent = `${sixPM}°`;
    document.querySelector("#temp5").textContent = "6:00 PM";
    const sixPMIcon = document.querySelector(".quinary-hour img");
    setWeatherIcon(sixPMIcon, sixPM, 50, 50, null);

    const ninePM = Math.round(data.hourly.temperature_2m[21]);
    document.querySelector("#hour6").textContent = `${ninePM}°`;
    document.querySelector("#temp6").textContent = "9:00 PM";
    const ninePMIcon = document.querySelector(".sixnary-hour img");
    setWeatherIcon(ninePMIcon, ninePM, 50, 50, null);

    const realFeel = Math.round(data.current.apparent_temperature);
    document.querySelector("#realFeel").textContent = `${realFeel}°`;

    const wind = Math.round(data.current.wind_speed_10m);
    document.querySelector("#wind").textContent = `${wind} km/h`;

    const uvIndex = Math.round(data.hourly.uv_index[0]);
    document.querySelector("#uvIndex").textContent = uvIndex;

    const chanceOfRain = Math.round(data.hourly.precipitation_probability[0]);
    document.querySelector(".chance-of-rain-air-cond").textContent = `${chanceOfRain}%`;

    const chanceOfRainElement = Math.round(
      data.hourly.precipitation_probability[0],
    );
    document.querySelector(".chance-of-rain").textContent =
      `Chance of rain: ${chanceOfRainElement}%`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateTodayDate() {
  const todayLabels = document.querySelectorAll(".day p");
  const today = new Date();
  const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;

  todayLabels.forEach((element, index) => {
    element.textContent = index === todayIndex ? "Today" : weekdayNames[index];
  });
}

function setWeatherIcon(
  iconElement,
  temp,
  width,
  height,
  nameTempElement = null,
) {
  switch (true) {
    case temp >= 30:
      iconElement.src = "img/clear-day.svg";
      iconElement.alt = "Clear Day";
      iconElement.width = width;
      iconElement.height = height;
      if (nameTempElement) {
        nameTempElement.textContent = `Sunny`;
      }
      break;

    case temp >= 20 && temp < 30:
      iconElement.src = "img/partly-cloudy-day.svg";
      iconElement.alt = "Partly Cloudy";
      iconElement.width = width;
      iconElement.height = height;
      if (nameTempElement) {
        nameTempElement.textContent = `Partly Cloudy`;
      }
      break;
    case temp >= 10 && temp < 20:
      iconElement.src = "img/cloudy.svg";
      iconElement.alt = "Cloudy";
      iconElement.width = width;
      iconElement.height = height;
      if (nameTempElement) {
        nameTempElement.textContent = `Cloudy`;
      }
      break;
    case temp >= 0 && temp < 10:
      iconElement.src = "img/rain.svg";
      iconElement.alt = "Rain";
      iconElement.width = width;
      iconElement.height = height;
      if (nameTempElement) {
        nameTempElement.textContent = `Rain`;
      }
      break;
    case temp >= -10 && temp < 0:
      iconElement.src = "img/snow.svg";
      iconElement.alt = "Snow";
      iconElement.width = width;
      iconElement.height = height;
      if (nameTempElement) {
        nameTempElement.textContent = `Snow`;
      }
      break;
    default:
      console.error("Invalid temperature");
  }
}

function dayForecast(data) {
  const time = data.daily.time;
  const maxTemps = data.daily.temperature_2m_max;
  const minTemps = data.daily.temperature_2m_min;
  const todayIso = new Date().toLocaleDateString("en-CA");
  const todayIndex = Math.max(0, time.indexOf(todayIso));
  const dayContainers = document.querySelectorAll(".day-container");

  dayContainers.forEach((container, offset) => {
    const iconElement = container.querySelector("img");
    const nameTempElement = container.querySelector(".nameTemp");
    const dataIndex = todayIndex + offset;
    const max = maxTemps[dataIndex];
    const min = minTemps[dataIndex];
    const maxElemt = container.querySelector(".max-temp");
    const minElemt = container.querySelector(".min-temp");

    if (maxElemt && minElemt && max !== undefined && min !== undefined) {
      maxElemt.textContent = `${Math.round(max)}`;
      minElemt.textContent = `/${Math.round(min)}`;
      setWeatherIcon(iconElement, max, 50, 50, nameTempElement);
    }
  });
}

fetchData();
updateTodayDate();
