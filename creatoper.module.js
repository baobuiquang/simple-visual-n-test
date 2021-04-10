import {
    font_size_p,
    font_size_h1
} from "./creatoper.config.js";


// Minify these
var root = document.documentElement;
root.style.setProperty('--font-size-p', font_size_p);
root.style.setProperty('--font-size-h1', font_size_h1);