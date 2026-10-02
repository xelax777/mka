var confirmElement = document.querySelector(".confirm");

function closePage() {
    clearClassList();
}

function openPage(page) {
    clearClassList();
    confirmElement.classList.add("page_open");
    confirmElement.classList.add("page_" + page + "_open");
}

function clearClassList() {
    confirmElement.classList.remove("page_open", "page_1_open", "page_2_open", "page_3_open");
}

var time = document.getElementById("time");
var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

if (!localStorage.getItem("update")) {
    localStorage.setItem("update", "24.12.2024");
}

var date = new Date();
var updateText = document.querySelector(".bottom_update_value");
if (updateText) updateText.innerHTML = localStorage.getItem("update");

var updateBtn = document.querySelector(".update");
if (updateBtn) {
    updateBtn.addEventListener('click', () => {
        var newDate = date.toLocaleDateString("pl-PL", options);
        localStorage.setItem("update", newDate);
        updateText.innerHTML = newDate;
        window.scrollTo(0, 0);
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setClock() {
    date = new Date();
    if (time) {
        time.innerHTML = "Czas: " + date.toLocaleTimeString() + " " + date.toLocaleDateString("pl-PL", options);
    }
    delay(1000).then(setClock);
}
setClock();

var unfold = document.querySelector(".info_holder");
if (unfold) {
    unfold.addEventListener('click', () => {
        unfold.classList.toggle("unfolded");
    });
}

// ========== DANE Z localStorage ==========
var data = {};
try {
    data = JSON.parse(localStorage.getItem("mobywatelData") || "{}");
} catch (e) {
    data = {};
}

console.log("Załadowane dane:", data); // do debugowania

// Zdjęcie – najpierw localStorage, później ewentualnie z data
var imageUrl = localStorage.getItem("userImage") || data.image || "";
var photoEl = document.querySelector(".id_own_image");
if (photoEl) {
    if (imageUrl) {
        photoEl.style.backgroundImage = `url(${imageUrl})`;
    } else {
        photoEl.style.backgroundImage = "none";
    }
}

// Reszta danych
var birthday = data.birthday || "01.01.2000";
var parts = birthday.split(".");
var day = parseInt(parts[0]) || 1;
var month = parseInt(parts[1]) || 1;
var year = parseInt(parts[2]) || 2000;

var birthdayDate = new Date(year, month - 1, day);
var birthdayFormatted = birthdayDate.toLocaleDateString("pl-PL", options);

var sexText = (data.sex === "k") ? "Kobieta" : "Mężczyzna";

function setData(id, value) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = value || "";
}

setData("name", (data.name || "").toUpperCase());
setData("surname", (data.surname || "").toUpperCase());
setData("nationality", (data.nationality || "").toUpperCase());
setData("birthday", birthdayFormatted);
setData("familyName", data.familyName || "");
setData("sex", sexText);
setData("fathersFamilyName", data.fathersFamilyName || "");
setData("mothersFamilyName", data.mothersFamilyName || "");
setData("birthPlace", data.birthPlace || "");
setData("countryOfBirth", data.countryOfBirth || "");
setData("adress", "ul. " + (data.adress1 || "") + "<br>" + (data.adress2 || "") + " " + (data.city || ""));

// Data zameldowania
if (!localStorage.getItem("homeDate")) {
    var hd = new Date(2012 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 25));
    localStorage.setItem("homeDate", hd.toLocaleDateString("pl-PL", options));
}
var homeDateEl = document.querySelector(".home_date");
if (homeDateEl) homeDateEl.innerHTML = localStorage.getItem("homeDate");

// PESEL
var peselMonth = month;
if (year >= 2000) peselMonth += 20;
var dayStr = day < 10 ? "0" + day : "" + day;
var monthStr = peselMonth < 10 ? "0" + peselMonth : "" + peselMonth;
var later = (data.sex === "k") ? "0382" : "0295";
var pesel = ("" + year).slice(-2) + monthStr + dayStr + later + "7";
setData("pesel", pesel);
