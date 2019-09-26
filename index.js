function fetch_text (url) {
    return fetch(url).then((response) => (response.text()));
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var taglist = [
    {"url": null, "name": "Huaian"},
    {"url": null, "name": "Nanjing"},
    {"url": "https://www.nsfz.net/", "name": "nsfz"},
    {"url": "https://www.nju.edu.cn/", "name": "NJUer"},
    {"url": "https://www.purdue.edu/", "name": "boilermaker"},
    {"url": null, "name": "kindle"},
    {"url": null, "name": "swimmer"},
    {"url": null, "name": "cyclist"},
    {"url": null, "name": "polyglot"},
    {"url": null, "name": "Xbox"},
    {"url": null, "name": "theatregoer"},
    {"url": "https://www.vim.org/", "name": "vim"},
    {"url": "https://evernote.com/", "name": "Evernote"},

];

function loadWordCloud() {
    var script = document.createElement("script");  // create a script DOM node
    script.src = '/wordcloud.js';  // set its src to the provided URL

    document.body.appendChild(script);
}

function restoreOpacity() {
    document.getElementById("content").style.opacity = 1;
}

function postProcessing(tpl) {
    switch (tpl) {
        case 'about':
            loadHTML("bio", "bio", restoreOpacity);
            break;
        case 'tags':
            shuffleArray(taglist);
            l = taglist.length;
            tagshtml = '';
            for (i=0; i<l; i++) {
                entry = taglist[i];
                if (entry.url)
                    tagshtml += "<a href=\"" + entry.url + "\" target=\"_blank\">" + entry.name + "</a>";
                else
                    tagshtml += entry.name;
                if (i < l-1)
                    tagshtml += ", ";
            }
            document.getElementById("tags-text").innerHTML = tagshtml;
            loadHTML("bio", "bio", restoreOpacity);
            break;
        case 'fav':
            loadWordCloud();
            loadHTML("bio", "bio", restoreOpacity);
            break;
        case 'research':
            showSlides(slideIndex);
            loadHTML("research_intro", "research_intro", restoreOpacity);
            break;
        case 'pub':
            loadHTML("research_intro", "research_intro", restoreOpacity);
            break;
        case 'contact':
            link = getEmail();
            linkhtml = "<a href='mailto:"+link+"'>" + link + "</a>";
            document.getElementById("email").innerHTML = linkhtml;
            restoreOpacity();
            break;

        


    }
}

function loadHTML(tpl, elementID, fcn) {
    document.getElementById("content").style.opacity = 0.4;
    fetch_text('/' + tpl + '.htm').then((html) => {
        document.getElementById(elementID).innerHTML = html;
        router.updatePageLinks();

        fcn(tpl);

    }).catch((error) => {
        console.warn(error);
    });
}

function getEmail() {
    coded = "U@AUL9n.1n";
    key = "b87rHQnDJmMBF4VcsdE1xZ5y2S36Th0YGWIziof9kPCXlLUwqupNaRAgOjevKt";
    shift=coded.length;
    link="";
    for (i=0; i<coded.length; i++) {
        if (key.indexOf(coded.charAt(i))==-1) {
            ltr = coded.charAt(i);
            link += (ltr);
        }
        else {
            ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length;
            link += (key.charAt(ltr));
        }
    }
    return link;
}

var slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");

    if (n >= slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex].style.display = "block";
}


function home() { console.log('home'); loadHTML('home', 'content', restoreOpacity);  }

function about() { console.log('about'); loadHTML('about', 'content', postProcessing); }

function tags() { console.log('tags'); loadHTML('tags', 'content', postProcessing); }

function fav() { console.log('fav'); loadHTML('fav', 'content', postProcessing); }

function research() { console.log('research'); loadHTML('research', 'content', postProcessing); }

function pub() { console.log('pub'); loadHTML('pub', 'content', postProcessing); }

function contact() { console.log('contact'); loadHTML('contact', 'content', postProcessing); }

var root = null;
var useHash = false;
var router = new Navigo(root, useHash); //, hash;
router.on('/', home)
.on('/research', research)
.on('/research/pub', pub)
.on('/about', about)
.on('/about/tags', tags)
.on('/about/fav', fav)
.on('/contact', contact)
.resolve();
