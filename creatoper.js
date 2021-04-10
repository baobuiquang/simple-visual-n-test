function outputError(e, str) {
    console.log("Creatoper >> " + str + " >> " + e);
};



// ========== Scroll To Top ========== //
try {
    function scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    var scrollToTopButton = document.getElementById("scrolltotop");
    window.onscroll = function () {
        scrollFunction()
    };
    function scrollFunction() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            scrollToTopButton.style.visibility = "visible";
            scrollToTopButton.style.opacity = "1.0";
        } else {
            scrollToTopButton.style.visibility = "hidden";
            scrollToTopButton.style.opacity = "0.0";
        }
    }
} catch (e) {
    outputError(e, "scrollToTop");
}
// <div class="just-display-on-desktop">
// <button onclick="scrollToTop()" id="scrolltotop" class="just-display-on-desktop" style="transform: rotate(38deg);">&nwarr;</button>
// </div>



// ========== RWD ========== //
try {
    var gap_i;
    var row;
    gap_i = 0;
    row = document.getElementsByClassName('row')[0];
    while (row != undefined) {
        row.style.gap = row.getAttribute('gap');
        row.style.justifyContent = row.getAttribute('type');
        gap_i += 1;
        row = document.getElementsByClassName('row')[gap_i];
    }

    gap_i = 0;
    row = document.getElementsByTagName('row')[0];
    while (row != undefined) {
        row.style.gap = row.getAttribute('gap');
        row.style.justifyContent = row.getAttribute('type');
        gap_i += 1;
        row = document.getElementsByClassName('row')[gap_i];
    }
} catch (e) {
    outputError(e, "RWD");
}
//<div class="row" gap="5px" type="space-evenly">
//<div class="col-2">
//A
//</div>
//<div class="col-8">
//B
//</div>
//</div>


// ========== Navigation ========== //
try {
    // Insert bg and close
    document.getElementsByClassName('nav-links')[0].insertAdjacentHTML(
        'afterbegin',
        `
        <div class="nav-bg"></div>
        <div class="nav-close">
            <br>Close<br><br>
        </div>
    `
    );
    // Toggle Button
    var navIsDisplay = false;
    var nav_links = document.getElementsByClassName("nav-links")[0];
    function toggleNav() {
        if (!navIsDisplay) {
            nav_links.classList.add("nav-display");
            navIsDisplay = true;
        } else {
            nav_links.classList.remove("nav-display");
            navIsDisplay = false;
        }
    }
    document.getElementsByClassName("nav-bg")[0].onclick = toggleNav;
    document.getElementsByClassName("nav-close")[0].onclick = toggleNav;
    // Set nav attributes: type (position) + gap
    var nav = document.getElementsByTagName('nav')[0];
    var nav_links_gap = document.getElementsByClassName("nav-content")[0];
    nav.style.position = nav.getAttribute('type');
    nav_links_gap.style.gap = nav.getAttribute('gap');
} catch (e) {
    outputError(e, "navigation");
}
//<nav type="sticky" gap="12px" style="height: 60px;">
//<div class="nav-title">
//<a href="/">
//    <h1>Navigation Title</h1>
//</a>
//</div>
//<div class="nav-links">
//<div class="nav-content">
//    <a href="/">Link 1</a>
//    <a href="/">Link 2</a>
//    <div class="nav-sub-wrap">
//        <a href="#" class="nav-sub">Have sublink</a>
//        <div class="nav-sub-links">
//            <a href="/">Sublink 1</a>
//            <a href="/">Sublink 2</a>
//        </div>
//    </div>
//    <a href="/">Link 2</a>
//</div>
//</div>
//<div class="nav-button">
//<button onclick="toggleNav()">
//    Toggle Nav
//</button>
//</div>
//</nav>



// ========== Modal Box ========== //
try {
    // Insert bg and close
    let modal_i = 0;
    while (document.getElementsByClassName("modal")[modal_i]) {
        document.getElementsByClassName("modal")[modal_i].insertAdjacentHTML(
            "afterbegin",
            `
            <div class="modal-bg" onclick="toggleModal(this)"></div>
            <div class="modal-close" onclick="toggleModal(this)">
                Close
            </div>
            `
        );
        modal_i++;
    }

    function toggleModal(el) {
        let elModal;
        // Set up elModal = object has the "modal" class
        // 2 case:
        // Case 1: el from bg or close
        if (
            el.classList.contains("modal-bg") ||
            el.classList.contains("modal-close")
        ) {
            elModal = el.parentElement;
        }
        // Case 2: el from the toggleModal button
        else {
            elModal = el.nextElementSibling;
            if (!elModal.classList.contains("modal")) {
                console.log("please put modal immediately after toggle");
            }
        }
        // Toggle modal main function
        let modalIsDisplay = elModal.classList.contains("modal-display");
        if (!modalIsDisplay) {
            elModal.classList.add("modal-display");
            modalIsDisplay = true;
        } else {
            elModal.classList.remove("modal-display");
            modalIsDisplay = false;
        }
    }

} catch (e) {
    outputError(e, "modalbox");
}
//<button onclick="toggleModal(this)">Modal Box 1</button>
//       <div class="modal">
//           <div class="modal-content">
//               This is the modal box!<br>
//               This is the modal box!<br>
//           </div>
//       </div>



// ========== Darkmode ========== //
try {
    // Insert bg and close
    document.getElementById('darkmode').insertAdjacentHTML(
        'afterbegin',
        `
        <div class="darkmode-button">
            <label for="darkmodeCheck">DarkMode</label>
            <input type="checkbox" id="darkmodeCheck">
            <span></span>
        </div>
        `
    );
    // Darkmode functions
    function enableDarkMode() {
        document.body.classList.add("darkmode");
        localStorage.setItem("isDarkMode", "true");
        document.getElementById("darkmodeCheck").checked = true;
        console.log("Creatoper >> enableDarkMode");
    }
    function disableDarkMode() {
        document.body.classList.remove("darkmode");
        localStorage.setItem("isDarkMode", "false");
        document.getElementById("darkmodeCheck").checked = false;
        console.log("Creatoper >> disableDarkMode");
    }
    let isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode === "true") {
        enableDarkMode();
        document.getElementById("darkmodeCheck").checked = true;
    }
    const darkmodeButton = document.querySelector(".darkmode-button");
    darkmodeButton.addEventListener("click", function () {
        isDarkMode = localStorage.getItem("isDarkMode");
        isDarkMode === "true" ? disableDarkMode() : enableDarkMode();
    });
} catch (e) {
    outputError(e, "darkmode");
}
// <div id="darkmode"></div>



// ========== Link relnoopener ========== //
try {
    function relnoopener() {
        const a = document.querySelectorAll('a[target="_blank"]');
        a.forEach(function (element) {
            if (!element.hasAttribute('rel')) {
                element.setAttribute('rel', 'noopener');
            }
        });
    }
    relnoopener();
} catch (e) {
    outputError(e, "relnoopener");
}

