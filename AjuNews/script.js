// Aguarda o documento HTML ser completamente carregado
document.addEventListener("DOMContentLoaded", () => {
  // --- Funcionalidade da Barra Lateral (Sidebar) ---
  const menuBtn = document.getElementById("menu-btn")
  const sidebar = document.getElementById("sidebar")

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      // Adiciona ou remove a classe 'aberta' para mostrar/esconder o menu
      sidebar.classList.toggle("aberta")
    })
  }

  // --- Funcionalidade do Dark Mode ---
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  // Função para aplicar o tema salvo
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
      // Alterna a classe 'dark-mode' no corpo da página baseado no estado do checkbox
      if (themeToggle.checked) {
        body.classList.add("dark-mode")
        localStorage.setItem("tema", "dark")
      } else {
        body.classList.remove("dark-mode")
        localStorage.setItem("tema", "light")
      }
    })
  }

  // Aplica o tema salvo assim que a página carrega
  aplicarTemaSalvo()

  // --- Funcionalidade de Atualização de Dados em Tempo Real ---

  // Função para atualizar preços de ações em tempo real
  function updateStockPrices() {
    const usdPrice = document.getElementById("usd-price")
    const eurPrice = document.getElementById("eur-price")
    const ibovPrice = document.getElementById("ibov-price")
    const usdChange = document.getElementById("usd-change")
    const eurChange = document.getElementById("eur-change")
    const ibovChange = document.getElementById("ibov-change")

    if (usdPrice && eurPrice && ibovPrice) {
      // More realistic price simulation
      const usdBase = 5.85
      const eurBase = 6.15
      const ibovBase = 125847

      const usdNew = (usdBase + (Math.random() - 0.5) * 0.15).toFixed(2)
      const eurNew = (eurBase + (Math.random() - 0.5) * 0.18).toFixed(2)
      const ibovNew = Math.floor(ibovBase + (Math.random() - 0.5) * 1500)

      usdPrice.textContent = `R$ ${usdNew}`
      eurPrice.textContent = `R$ ${eurNew}`
      ibovPrice.textContent = ibovNew.toLocaleString("pt-BR")

      // Calculate and display percentage changes
      const usdChangeVal = (((usdNew - usdBase) * 100) / usdBase).toFixed(2)
      const eurChangeVal = (((eurNew - eurBase) * 100) / eurBase).toFixed(2)
      const ibovChangeVal = (((ibovNew - ibovBase) * 100) / ibovBase).toFixed(1)

      usdChange.textContent = `${usdChangeVal > 0 ? "+" : ""}${usdChangeVal}%`
      eurChange.textContent = `${eurChangeVal > 0 ? "+" : ""}${eurChangeVal}%`
      ibovChange.textContent = `${ibovChangeVal > 0 ? "+" : ""}${ibovChangeVal}%`

      // Update classes for positive/negative changes
      usdChange.className = `change ${usdChangeVal >= 0 ? "positive" : "negative"}`
      eurChange.className = `change ${eurChangeVal >= 0 ? "positive" : "negative"}`
      ibovChange.className = `change ${ibovChangeVal >= 0 ? "positive" : "negative"}`
    }
  }

  // Função para atualizar dados meteorológicos em tempo real
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

  // Inicializa atualizações em tempo real
  updateStockPrices()
  setInterval(updateStockPrices, 15000) // Update every 15 seconds

  updateWeather()
  setInterval(updateWeather, 180000) // Update every 3 minutes
})
