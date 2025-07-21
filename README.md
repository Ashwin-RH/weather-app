# 🌤️ Veara – Forecasting Tomorrow, Today

**Veara** is a visually engaging, responsive React weather app that displays real-time weather conditions and short-term forecasts using the OpenWeatherMap API. Designed with Tailwind CSS and enhanced with interactive icons and toast notifications, it offers a smooth and modern user experience.

## 🔗 Live Demo

👉 [Live Site](https://your-deployment-link.com)  
👉 [GitHub Repository](https://github.com/Ashwin-RH/weather-app)



---

## 📸 Preview

> Add a screenshot named `preview.png` in your project root to enable preview here

![Preview](./preview.png)

---

## 🚀 Features

- 🔍 **City-based search** with keyboard support
- 🌡️ **Current weather info** (temperature, condition, location)
- 🧊 **Humidity** and 🌬️ **Wind speed** data
- 📆 **3-hour interval forecast** (next 5 slots)
- ⏳ **Loading spinner** while fetching data
- 🔔 **User-friendly error handling** using toast messages
- ⚡ **Stylish UI** with animated blurred background
- 📱 Fully **responsive** design

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **API:** [OpenWeatherMap](https://openweathermap.org/)
- **UI Enhancements:** React Icons, React Hot Toast
- **Build Tool:** Vite

---

## 🧑‍💻 Local Setup

1. **Clone the repository**

```bash
git clone https://github.com/Ashwin-RH/weather-app.git
cd weather-app
```

2.**Install dependencies**

```bash
npm install
```

3.**Set up API key**

```bash
VITE_APP_ID=your_openweathermap_api_key
```
4.**Start the app**

```bash
npm run dev
```

**Folder Structure**
```bash
src/
├── assets/            # Static icons
├── components/
│   └── Weather.jsx    # Main weather component
├── App.jsx
├── main.jsx
└── index.css          # Tailwind styling
```

