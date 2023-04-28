const currencyToCountry = {
	"USD": "Estados Unidos",
	"EUR": "Unión Europea",
	"JPY": "Japón",
	"AUD": "Australia",
	"BRL": "Brasil",
	"CAD": "Canadá",
	"CHF": "Suiza",
	"CNY": "China",
	"COP": "Colombia",
	"CZK": "República Checa",
	"DKK": "Dinamarca",
	"EGP": "Egipto",
	"GBP": "Reino Unido",
	"HKD": "Hong Kong",
	"HUF": "Hungría",
	"IDR": "Indonesia",
	"ILS": "Israel",
	"INR": "India",
	"KRW": "Corea del Sur",
	"MXN": "México",
	"MYR": "Malasia",
	"NOK": "Noruega",
	"NZD": "Nueva Zelanda",
	"PHP": "Filipinas",
	"PLN": "Polonia",
	"RON": "Rumania",
	"RUB": "Rusia",
	"SEK": "Suecia",
	"SGD": "Singapur",
	"THB": "Tailandia",
	"TRY": "Turquía"
};
  
fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then(response => response.json())
    .then(data => {
    let rates = data.rates;
	let currencies = ["USD", "GBP", "EUR", "CAD", "AUD", "JPY", "CHF"];
	//"CNY", "NZD", "MXN", "KRW", "SGD", "INR", "HKD", "RUB", "BRL", "SEK", "DKK", "NOK", "ZAR", "TRY", "THB", "IDR", "MYR", "PHP", "HUF", "PLN", "ILS", "AED", "SAR"

	let tableBody = document.getElementById("exchange_rates");

	for (const currency of currencies) {
		let row = tableBody.insertRow();
		let currencyCell = row.insertCell(0);
		let rateCell = row.insertCell(1);

		currencyCell.innerHTML = currency;
		rateCell.innerHTML = rates[currency].toFixed(4);
		}
	})
	.catch(error => console.log(error));
	let taskStorage = JSON.parse(
		window.localStorage.getItem("taskStorage") || "[]"
	  );
	function convertCurrency() {
		let fromCurrency = document.getElementById("from_currency_type").value;
		let toCurrency = document.getElementById("to_currency_type").value;
		let fromAmount = document.getElementById("from_currency").value;
		const ahora = new Date();
   		const fechaActual =ahora.toLocaleDateString() + " " + ahora.toLocaleTimeString();
		// Make API request to convert currency
		fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
			.then(response => response.json())
			.then(data => {
				let conversionRate = data.rates[toCurrency];
				let toAmount = fromAmount * conversionRate;
	
				// Save conversion to local storage
				
				let conversion = {
					fromCurrency: fromCurrency,
					toCurrency: toCurrency,
					fromAmount: fromAmount,
					toAmount: toAmount.toFixed(2),
					fechaActual: fechaActual
				};
				let conversions = JSON.parse(window.localStorage.getItem("conversions")) || [];
				conversions.push(conversion);
				window.localStorage.setItem("conversions", JSON.stringify(conversions));
				JSON.stringify(conversions);
				// Display converted amount
				document.getElementById("to_currency").value = conversion.toAmount;
				
				
	
				
			})
			.catch(error => console.log(error));
	}
	function loadConversionHistoryFromLocalStorage() {
		// Obtener el historial de conversiones guardado en el LocalStorage
		let conversionHistory = JSON.parse(window.localStorage.getItem("conversions")) || [];
	  
		// Obtener la tabla donde se van a cargar los valores históricos
		let tableBody = document.getElementById("conversion_history_table_body");
	  
		// Generar filas de tabla para cada conversión en el historial
		for (const conversion of conversionHistory) {
		  let row = tableBody.insertRow();
		  let fromCurrencyCell = row.insertCell(0);
		  let toCurrencyCell = row.insertCell(1);
		  let fromAmountCell = row.insertCell(2);
		  let toAmountCell = row.insertCell(3);
		  let dateCell = row.insertCell(4);
	  
		  fromCurrencyCell.innerHTML = conversion.fromCurrency;
		  toCurrencyCell.innerHTML = conversion.toCurrency;
		  fromAmountCell.innerHTML = conversion.fromAmount;
		  toAmountCell.innerHTML = conversion.toAmount;
		  dateCell.innerHTML = conversion.fechaActual;
		}
	  }
	function confirmClearHistory() {
		const confirmed = confirm("¿Confirma borrar todos los registros?");
		if (confirmed) {
			clearHistory();
			alert("Historial borrado exitosamente.");
		}
	}
	function showFlag() {
		var select = document.getElementById("from_currency_type");
		var selectedOption = select.options[select.selectedIndex];
		var currency = selectedOption.value;
		var country = currencyToCountry[currency];
		var initial = country.substring(0, 2).toLowerCase();
		var url = `https://flagcdn.com/48x36/${initial}.png`;
		var img = document.createElement("img");
		img.src = url;
		var flagDiv = document.getElementById("flag-div");
		flagDiv.innerHTML = "";
		flagDiv.appendChild(img);
	  }
	  function showFlag2() {
		var select = document.getElementById("to_currency_type");
		var selectedOption = select.options[select.selectedIndex];
		var currency = selectedOption.value;
		var country = currencyToCountry[currency];
		var initial = country.substring(0, 2).toLowerCase();
		var url = `https://flagcdn.com/48x36/${initial}.png`;
		var img = document.createElement("img");
		img.src = url;
		var flagDiv = document.getElementById("flag-div2");
		flagDiv.innerHTML = "";
		flagDiv.appendChild(img);
	  }
	  function actualizar(){
		location.reload(true);
	}
	function clearHistory() {
		// Borrar el historial de conversiones del Local Storage
		localStorage.removeItem("conversions");
	
		// Limpiar la tabla de historial
		let tableBody = document.getElementById("conversion_history_table_body");
		tableBody.innerHTML = "";
	  }
	window.addEventListener("load", function() {
		loadConversionHistoryFromLocalStorage();
	});
	 
	  