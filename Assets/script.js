$(document).ready(function () {
    // DOM SELECTION
    var cityList = document.getElementById('cityList');
    var citySearchEl = document.getElementById('citySearch');
    var formEl = document.getElementById('formEl');

    // 5 Day
    // Container

    // Cards
    var fiveWCards = document.getElementById('fiveWCards');
    // Data Placement Elements
    var nowDegree = document.getElementsByClassName('nowDegree');
    var windEl = document.getElementsByClassName('wind');
    var humidityEl = document.getElementsByClassName('humidity');

    // Arrays
    var displayedCities = [
        "Beijing",
        "Hong-Kong",
        "Madrid",
        "Moscow",
        "Paris",
        "Tokyo",
        "Toronto",
        "Washington D.C"
    ];

    var suggestCitiesList = [
        "Ahmedabad",
        "Alexandria",
        "Atlanta",
        "Baghdad",
        "Bangalore",
        "Bangkok",
        "Barcelona",
        "Beijing",
        "Belo Horizonte",
        "Bogotá",
        "Buenos Aires",
        "Cairo",
        "Chengdu",
        "Chennai",
        "Chicago",
        "Chongqing",
        "Dalian",
        "Dallas",
        "Dar es Salaam",
        "Delhi",
        "Dhaka",
        "Dongguan",
        "Foshan",
        "Fukuoka",
        "Guadalajara",
        "Guangzhou",
        "Hangzhou",
        "Harbin",
        "Ho Chi Minh City",
        "Hong Kong",
        "Houston",
        "Hyderabad",
        "Istanbul",
        "Jakarta",
        "Jinan",
        "Johannesburg",
        "Karachi",
        "Khartoum",
        "Kinshasa",
        "Kolkata",
        "Kuala Lumpur",
        "Lagos",
        "Lahore",
        "Lima",
        "London",
        "Los Angeles",
        "Luanda",
        "Madrid",
        "Manila",
        "Mexico City",
        "Miami",
        "Moscow",
        "Mumbai",
        "Nagoya",
        "Nanjing",
        "New York City",
        "Osaka",
        "Paris",
        "Philadelphia",
        "Pune",
        "Qingdao",
        "Rio de Janeiro",
        "Riyadh",
        "Saint Petersburg",
        "Santiago",
        "São Paulo",
        "Seoul",
        "Shanghai",
        "Shenyang",
        "Shenzhen",
        "Singapore",
        "Surat",
        "Suzhou",
        "Tehran",
        "Tianjin",
        "Tokyo",
        "Toronto",
        "Washington, D.C.",
        "Wuhan",
        "Xi'an",
        "Yangon"
    ];

    // Side Bar
    // Print out of suggested cities
    for (var i = 0; i < displayedCities.length; i++) {
        var cityEl = document.createElement('li');
        cityEl.textContent = displayedCities[i];
        $(cityEl).addClass("list-group-item-action list-group-item-dark");
        cityList.appendChild(cityEl);
        $(cityEl).on("click", function(e){
            var cityChoiceBtn = $(e.target).text();
            console.log(cityChoiceBtn);
            getCityWeather(cityChoiceBtn);

        });
    };

    // Form Button Onclick
    var formSubmitHandler = function (event) {
        event.preventDefault();
        var city = citySearchEl.value;
        if (city) {
            getCityWeather(city);
        } else {
            alert('Please enter a City');
        }
    };

    // Weather Elements
    // City Data Request -- Open Weather API
    var getCityWeather = function (city) {
        var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=ba74bedfc46d79d1a8bc03cbde9297ec&units=metric';
        // Today's Weather Dom
        var tempEl = document.getElementById('temp');
        var cityName = document.getElementById('cityName');
        var nowDegree = document.getElementById('nowDegree');
        var nowWeather = document.getElementById('nowWeather');
        var windEl = document.getElementById('wind');
        var humidityEl = document.getElementById('humidity');
        // Data Request
        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        todayTemp = (JSON.stringify(data.main.temp)).slice(0, -1);
                        todayWind = (JSON.stringify(data.wind.speed)).slice(0, -1);
                        todayHumidity = (JSON.stringify(data.main.humidity));
                        nowWeather = (JSON.stringify(data.weather[0].main));
                        console.log(nowWeather);
                        recordWeather(data, nowWeather, todayTemp, todayWind, todayHumidity);
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to GitHub');
            });

        // Local Storage//Record Todays Weather
        var recordWeather = function (data, nowWeather, todayTemp, todayWind, todayHumidity) {
            localStorage.setItem("weatherDescription", nowWeather)
            localStorage.setItem("city", city);
            localStorage.setItem("todayTemp", todayTemp);
            localStorage.setItem("todayWind", todayWind);
            localStorage.setItem("todayHumidity", todayHumidity);
            var m = moment().format('M/D/YYYY');
            var mInt = m.split("/");
            console.log(m);
            console.log(mInt);
            // localStorage.setItem("todayUVIndex", todayUVIndex);
            var todayIcon = document.getElementById("todayIcon");
            todayIcon.innerHTML = "";
            displayTodayWeather(m);
        };

        // Display Todays Weather
        var displayTodayWeather = function (m) {
            // var todayIcon = document.getElementById("todayIcon");
            var iconSet = localStorage.getItem("weatherDescription");
            console.log(iconSet);
            var ticon = $("<i>");
            var par = $("<p>");
            par.appendTo(todayIcon);
            par.text(iconSet.replace(/['"]+/g, ''));
            ticon.appendTo(par);
               if (iconSet == '"Clear"') {
                ticon.addClass("fas fa-sun fa-3x center");
            } else if (iconSet == '"Mist"') {
                ticon.addClass("fas fa-shower fa-3x center");
            } else if (iconSet == '"Clouds"') {
                ticon.addClass("fas fa-cloud fa-3x center");
            } else if (iconSet == '"Rain"') {
                ticon.addClass("fas fa-cloud-rain fa-3x center");
            };

            var todayWeather = document.getElementById('todayWeather');
            todayWeather.style.display = "block";
            var name = localStorage.getItem("city");
            cityName.textContent = name + "\xa0" + m;
            var Ttemp = localStorage.getItem("todayTemp");
            tempEl.textContent = Ttemp;
            var windT = localStorage.getItem("todayWind");
            windEl.textContent = windT;
            var humiditT = localStorage.getItem("todayHumidity");
            humidityEl.textContent = humiditT;

        };

        // 5 Day Weather
        // Today's Weather Dom
        var fivecityName = document.getElementById('cityName');
        var fivenowDegree = document.getElementById('nowDegree');
        var fivenowWeather = document.getElementById('nowWeather');
        var fivewindEl = document.getElementById('wind');
        var fivehumidityEl = document.getElementById('humidity');
        // 5 Day forecast API
        var fiveapiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=ba74bedfc46d79d1a8bc03cbde9297ec&units=metric';

        fetch(fiveapiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        var fiveTemp = [];
                        var fiveHumidity = [];
                        var fiveWeather = [];
                        for (var i = 0; i < 5; i++) {
                            fiveTemp[i] = (JSON.stringify(data.list[i].main.temp)).slice(0, -1);
                            fiveHumidity[i] = (JSON.stringify(data.list[i].main.humidity));
                            fiveWeather[i] = (JSON.stringify(data.list[i].weather[0].main));
                        };
                        recordFiveWeather(data, fiveTemp, fiveHumidity, fiveWeather);
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to GitHub');
            });

        // Local Storage//Record 5-Days Weather
        var recordFiveWeather = function (data, fiveTemp, fiveHumidity, fiveWeather) {
            for (var i = 0; i < 5; i++) {
                localStorage.setItem("fiveTemp" + i, fiveTemp[i]);
                localStorage.setItem("fiveHumidity" + i, fiveHumidity[i]);
                localStorage.setItem("weatherDescription" + i, fiveWeather[i])
                var m = moment().format('M/D/YYYY');
            }
            displayFiveWeather(m);
        };

        // Dom Selection
        var fiveTemp = document.getElementsByClassName('fiveTemp');
        var fiveHumidity = document.getElementsByClassName('fiveHumidity');
        var fiveWeatherIcon = document.getElementsByClassName('fiveWeatherIcon');



        // Display Five Day Weather
        var displayFiveWeather = function (m) {

            var fiveCardsCont = document.getElementById('fiveCardsCont');
            fiveCardsCont.innerHTML = "";
            
            for (var i = 0; i < 5; i++) {
                
                var div = $("<div>")
                var iconCont = $("<div>")
                var tempP = $("<p>")
                var humidity = $("<span>")
                var icon = $("<i>")
                var iconWeather = localStorage.getItem("weatherDescription" + i);
                var icon;
                // Make Card
                div.addClass('weather card');
                div.appendTo(fiveCardsCont);
                // Date
                m = moment().add(i,'days').format('M/D/YYYY');
                
                $("<p>").text(m).appendTo(div);
                iconCont.appendTo(div);
                // Weather Icon
                icon.appendTo(iconCont);
                if (iconWeather == '"Clear"') {
                    icon.addClass("fas fa-sun fa-3x");
                } else if (iconWeather == '"Clouds"') {
                    icon.addClass("fas fa-cloud fa-3x");
                } else if (iconWeather == '"Rain"') {
                    icon.addClass("fas fa-cloud-rain fa-3x");
                };

                // Temperature;
                var fiveT = localStorage.getItem("fiveTemp" + i);
                tempP.text("Temperature:" + fiveT);
                tempP.addClass("mt-3");
                tempP.appendTo(div);

                // Humidity;
                var fiveH = localStorage.getItem("fiveHumidity" + i);
                humidity.text("Humidity:" + fiveH);
                humidity.appendTo(div);
            }
        };
    };
    formEl.addEventListener('submit', formSubmitHandler);
});