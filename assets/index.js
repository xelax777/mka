var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    if (selector.classList.contains("selector_open")) {
        selector.classList.remove("selector_open");
    } else {
        selector.classList.add("selector_open");
    }
});

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown");
    });
});

var sex = "m";

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    });
});

var upload = document.querySelector(".upload");
var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    });
});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', () => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected");

    var file = imageInput.files[0];
    if (!file) {
        upload.classList.remove("upload_loading");
        return;
    }

    var reader = new FileReader();
    reader.onload = function () {
        var url = reader.result;
        upload.classList.remove("error_shown");
        upload.setAttribute("selected", url);
        upload.classList.add("upload_loaded");
        upload.classList.remove("upload_loading");
        upload.querySelector(".upload_uploaded").src = url;
    };
    reader.onerror = function () {
        upload.classList.remove("upload_loading");
        upload.classList.add("error_shown");
    };
    reader.readAsDataURL(file);
});

document.querySelector(".go").addEventListener('click', () => {
    var empty = [];
    var formData = {};

    formData.sex = sex;

    if (!upload.hasAttribute("selected")) {
        empty.push(upload);
        upload.classList.add("error_shown");
    } else {
        formData.image = upload.getAttribute("selected");
    }

    var birthday = "";
    var dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday = birthday + "." + element.value;
        if (isEmpty(element.value)) {
            dateEmpty = true;
        }
    });
    birthday = birthday.substring(1);

    if (dateEmpty) {
        var dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        formData.birthday = birthday;
    }

    document.querySelectorAll(".input_holder").forEach((element) => {
        var input = element.querySelector(".input");
        if (isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        } else {
            formData[input.id] = input.value;
        }
    });

    if (empty.length != 0) {
        empty[0].scrollIntoView();
        return;
    }

    // zapisujemy WSZYSTKIE dane
    try {
        localStorage.setItem("mobywatelData", JSON.stringify(formData));
        localStorage.setItem("userImage", formData.image);
    } catch (e) {
        alert("Zdjęcie jest za duże. Wybierz mniejsze zdjęcie.");
        return;
    }

    location.href = "id.html";
});

function isEmpty(value) {
    return /^\s*$/.test(value);
}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {
    if (guide.classList.contains("unfolded")) {
        guide.classList.remove("unfolded");
    } else {
        guide.classList.add("unfolded");
    }
});
