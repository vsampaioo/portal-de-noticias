document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn")

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-aberta")
    })
}
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  const aplicarTemaSalvo = () => {
    const temaSalvo = localStorage.getItem("tema")
    if (temaSalvo === "dark") {
      body.classList.add("dark-mode")
      if (themeToggle) {
        themeToggle.checked = true
      }
    } else {
      body.classList.remove("dark-mode")
      if (themeToggle) {
        themeToggle.checked = false
      }
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        body.classList.add("dark-mode")
        localStorage.setItem("tema", "dark")
      } else {
        body.classList.remove("dark-mode")
        localStorage.setItem("tema", "light")
      }
    })
  }

  aplicarTemaSalvo()


  function updateStockPrices() {
    const usdPrice = document.getElementById("usd-price")
    const eurPrice = document.getElementById("eur-price")
    const ibovPrice = document.getElementById("ibov-price")
    const usdChange = document.getElementById("usd-change")
    const eurChange = document.getElementById("eur-change")
    const ibovChange = document.getElementById("ibov-change")

    if (usdPrice && eurPrice && ibovPrice) {
      const usdBase = 5.85
      const eurBase = 6.15
      const ibovBase = 125847

      const usdNew = (usdBase + (Math.random() - 0.5) * 0.15).toFixed(2)
      const eurNew = (eurBase + (Math.random() - 0.5) * 0.18).toFixed(2)
      const ibovNew = Math.floor(ibovBase + (Math.random() - 0.5) * 1500)

      usdPrice.textContent = `R$ ${usdNew}`
      eurPrice.textContent = `R$ ${eurNew}`
      ibovPrice.textContent = ibovNew.toLocaleString("pt-BR")

      const usdChangeVal = (((usdNew - usdBase) * 100) / usdBase).toFixed(2)
      const eurChangeVal = (((eurNew - eurBase) * 100) / eurBase).toFixed(2)
      const ibovChangeVal = (((ibovNew - ibovBase) * 100) / ibovBase).toFixed(1)

      usdChange.textContent = `${usdChangeVal > 0 ? "+" : ""}${usdChangeVal}%`
      eurChange.textContent = `${eurChangeVal > 0 ? "+" : ""}${eurChangeVal}%`
      ibovChange.textContent = `${ibovChangeVal > 0 ? "+" : ""}${ibovChangeVal}%`

      usdChange.className = `change ${usdChangeVal >= 0 ? "positive" : "negative"}`
      eurChange.className = `change ${eurChangeVal >= 0 ? "positive" : "negative"}`
      ibovChange.className = `change ${ibovChangeVal >= 0 ? "positive" : "negative"}`
    }
  }

  function updateWeather() {
    const temperature = document.getElementById("temperature")
    const weatherDesc = document.getElementById("weather-desc")
    const maxTemp = document.getElementById("max-temp")
    const minTemp = document.getElementById("min-temp")
    const humidity = document.getElementById("humidity")

    if (temperature && weatherDesc) {
      const weatherConditions = [
        { temp: 28, desc: "Ensolarado", maxOffset: 4, minOffset: 3, humRange: [50, 70] },
        { temp: 26, desc: "Parcialmente nublado", maxOffset: 3, minOffset: 2, humRange: [60, 80] },
        { temp: 24, desc: "Nublado", maxOffset: 2, minOffset: 2, humRange: [70, 85] },
        { temp: 22, desc: "Chuva leve", maxOffset: 1, minOffset: 1, humRange: [80, 95] },
        { temp: 30, desc: "Muito quente", maxOffset: 5, minOffset: 4, humRange: [45, 65] },
      ]

      const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
      const currentTemp = condition.temp + Math.floor(Math.random() * 3) - 1
      const max = currentTemp + Math.floor(Math.random() * condition.maxOffset) + 1
      const min = currentTemp - Math.floor(Math.random() * condition.minOffset) - 1
      const hum = Math.floor(Math.random() * (condition.humRange[1] - condition.humRange[0])) + condition.humRange[0]

      temperature.textContent = `${currentTemp}°C`
      weatherDesc.textContent = condition.desc
      maxTemp.textContent = `${max}°C`
      minTemp.textContent = `${min}°C`
      humidity.textContent = `${hum}%`
    }
  }


  updateStockPrices()
  setInterval(updateStockPrices, 15000)

  updateWeather()
  setInterval(updateWeather, 180000)
})
