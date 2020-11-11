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
});