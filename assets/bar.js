function sendTo(url) {
    location.href = url + ".html";
}

document.querySelectorAll(".bottom_element_grid").forEach((element) => {
    element.addEventListener('click', () => {
        sendTo(element.getAttribute("send"));
    });
});

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return 1;
    }
    if (/android/i.test(userAgent)) {
        return 2;
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 3;
    }
    return 4;
}

if (getMobileOperatingSystem() == 2) {
    var bar = document.querySelector(".bottom_bar");
    if (bar) {
        bar.style.height = "70px";
    }
}
