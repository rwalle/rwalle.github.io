const fetchText = (url) => fetch(url).then((response) => response.text());

function loadFragment(file, elementID) {
    fetchText(`/pages/${file}.html`).then((html) => {
        document.getElementById(elementID).innerHTML = html;
    }).catch((error) => {
        console.warn(error);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* Email obfuscation */

function getEmail() {
    const coded = "U@AUL9n.1n";
    const key = "b87rHQnDJmMBF4VcsdE1xZ5y2S36Th0YGWIziof9kPCXlLUwqupNaRAgOjevKt";
    const shift = coded.length;
    let link = "";
    for (let i = 0; i < coded.length; i++) {
        if (key.indexOf(coded.charAt(i)) === -1) {
            link += coded.charAt(i);
        } else {
            const ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length;
            link += key.charAt(ltr);
        }
    }
    return link;
}

/* Slideshow */

let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    if (n >= slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex].style.display = "block";
}

/* Page-specific initialization */

const taglist = [
    { url: null, name: "Huaian" },
    { url: null, name: "Nanjing" },
    { url: "https://www.nsfz.net/", name: "nsfz" },
    { url: "https://www.nju.edu.cn/", name: "NJUer" },
    { url: "https://www.purdue.edu/", name: "boilermaker" },
    { url: null, name: "kindle" },
    { url: null, name: "swimmer" },
    { url: null, name: "cyclist" },
    { url: null, name: "theatregoer" },
    { url: "https://www.vim.org/", name: "vim" },
];

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;

    switch (page) {
        case "about":
            loadFragment("bio", "bio");
            break;

        case "research":
            loadFragment("research-intro", "research-intro");
            showSlides(slideIndex);
            break;

        case "publications":
            loadFragment("research-intro", "research-intro");
            break;

        case "contact": {
            const link = getEmail();
            document.getElementById("email").innerHTML =
                `<a href='mailto:${link}'>${link}</a>`;
            break;
        }

        case "tags":
            loadFragment("bio", "bio");
            shuffleArray(taglist);
            document.getElementById("tags-text").innerHTML = taglist.map((entry, i) => {
                const text = entry.url
                    ? `<a href="${entry.url}" target="_blank">${entry.name}</a>`
                    : entry.name;
                return text + (i < taglist.length - 1 ? ", " : "");
            }).join("");
            break;

        case "favorites":
            loadFragment("bio", "bio");
            const script = document.createElement("script");
            script.src = "/assets/js/wordcloud.js";
            document.body.appendChild(script);
            break;
    }
});
