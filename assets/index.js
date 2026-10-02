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
imageInput.accept = "image/*";

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

    var formData = new FormData();
    formData.append("image", file);

    fetch("https://api.imgbb.com/1/upload?key=73cc53d176b2900e00ce3e8b327acab3", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(json => {
        if (json.success && json.data && json.data.url) {
            var url = json.data.url;
            upload.classList.remove("error_shown");
            upload.setAttribute("selected", url);
            upload.classList.add("upload_loaded");
            upload.classList.remove("upload_loading");
            upload.querySelector(".upload_uploaded").src = url;
        } else {
            throw new Error("ImgBB error");
        }
    })
    .catch(err => {
        console.error(err);
        upload.classList.remove("upload_loading");
        upload.classList.add("error_shown");
        alert("Nie udało się wgrać zdjęcia. Spróbuj inne zdjęcie.");
    });
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
        birthday += "." + element.value;
        if (isEmpty(element.value)) dateEmpty = true;
    });
    birthday = birthday.substring(1);

    if (dateEmpty) {
        document.querySelector(".date").classList.add("error_shown");
        empty.push(document.querySelector(".date"));
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

    if (empty.length > 0) {
        empty[0].scrollIntoView();
        return;
    }

    // zapisujemy wszystko
    localStorage.setItem("mobywatelData", JSON.stringify(formData));
    localStorage.setItem("userImage", formData.image);

    location.href = "id.html";
});

function isEmpty(value) {
    return /^\s*$/.test(value);
}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {
    guide.classList.toggle("unfolded");
});
