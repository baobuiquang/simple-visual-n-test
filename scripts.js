// b: background
// m: music
// c: character
// d: dialog
// s: sound effect
// t: blip tone
// n: note

var characters = [
    { name: "" },
    { name: "Character 1" },
    { name: "Character 2" },
    { name: "Character 3" },
    { name: "Character 4" }
];

var charImgs = [
    { link: "" },
    { link: "./assets/char1.png" },
    { link: "./assets/char2.png" },
    { link: "./assets/char3.png" },
    { link: "./assets/char4.png" }
];

var backgrounds = [
    { link: "" },
    { link: "./assets/bg1.png" },
    { link: "./assets/bg2.png" },
    { link: "./assets/bg3.png" },
    { link: "./assets/bg4.png" }
];

var eventImgs = [
    { link: "./assets/transparent.png" },
    { link: "./assets/img1.png" },
    { link: "./assets/img2.png" },
];

var musics = [
    { link: "" },
    { link: "https://buiquangbao.github.io/music1.mp3" },
    { link: "https://buiquangbao.github.io/music2.mp3" },
    { link: "https://buiquangbao.github.io/music3.mp3" }
];

var allDialogs = {
    eventName1: [
        { next: "eventName2" },
        { m: 1, t: 1, b: 1, c: 1, d: "This is sentence 0.", n: "This is a note 1!" },
        { d: "This is sentence 1." },
        { d: "This is sentence 2.", i: 1 },
        { b: 3, c: 4, d: "This is sentence 3." },
        { d: "This is sentence 4.", n: "This is a note 2!" },
        { d: "This is sentence 5." }
    ],
    eventName2: [
        { choice: "Choice A and go to Route A", next: "eventName3" },
        { choice: "Choice B and go to Route B", next: "eventName4" }
    ],
    eventName3: [
        { next: "eventName1" },
        { m: 2, t: 2, b: 2, c: 2, d: "Route A: This is sentence 0." },
        { d: "Route A: This is sentence 1.", i: 2 },
        { d: "Route A: This is sentence 2.", n: "This is a note 3!" },
        { d: "Route A: This is sentence 3." }
    ],
    eventName4: [
        { next: "eventName1" },
        { m: 3, t: 3, b: 4, c: 3, d: "Route B: This is sentence 0." },
        { d: "Route B: This is sentence 1.", n: "This is a note 4!" },
        { d: "Route B: This is sentence 2." }
    ]
};

var currentEvent = allDialogs["eventName1"];
var dialogsLength = Object.keys(currentEvent).length;
var i = 1;
var myinterval;

var displaySpeed = 30; //char/s

var displayDialogDone = true;

var sound;
var sound_i = 0;
var currentTextBlip = 0;
function playTextBlipSound() {
    if (sound_i === 0) {
        currentTextBlip =
            currentEvent[i].t != undefined
                ? currentEvent[i].t
                : currentTextBlip;
        if (currentTextBlip === 1) {
            sound = new Audio("https://buiquangbao.github.io/male_deep_1.ogg");
        } else if (currentTextBlip === 2) {
            sound = new Audio("https://buiquangbao.github.io/male_deep_2.ogg");
        } else if (currentTextBlip === 3) {
            sound = new Audio("https://buiquangbao.github.io/male_deep_3.ogg");
        }
        sound.play();
    }
    sound_i = sound_i < 3 ? sound_i + 1 : 0;
}

var music = new Audio();

function playMusicBackground() {
    music.pause();
    music = new Audio(musics[currentEvent[i].m].link);
    if (typeof music.loop == "boolean") {
        music.loop = true;
    } else {
        music.addEventListener(
            "ended",
            function () {
                this.currentTime = 0;
                this.play();
            },
            false
        );
    }
    music.play();
}

function userClick() {
    //     Dialogs
    if (displayDialogDone === false) {
        document.getElementById("dialog-text").innerHTML = currentEvent[i].d;
        nextDialog();
    } else if (currentEvent[i].choice === undefined) {
        if (currentEvent[i].c != undefined) {
            document.getElementById("character-name").innerHTML =
                characters[currentEvent[i].c].name;
        }
        if (currentEvent[i].c != undefined) {
            document.getElementById("character-img").src =
                charImgs[currentEvent[i].c].link;
        }
        if (currentEvent[i].b != undefined) {
            document.getElementById("background-img").src =
                backgrounds[currentEvent[i].b].link;
        }
        if (currentEvent[i].n != undefined) {
            document.getElementById("note").innerHTML = currentEvent[i].n;
        }
        if (currentEvent[i].m != undefined) {
            try {
                playMusicBackground();
            } catch (e) {
                console.log(e);
            }
        }
        if (currentEvent[i].i != undefined) {
            document.getElementById("event-img").src =
                eventImgs[currentEvent[i].i].link;
        } else {
            document.getElementById("event-img").src =
                eventImgs[0].link; //Transparent
        }
        displayDialogDone = false;
        let str = "";
        let j = 0;
        myinterval = setInterval(function () {
            playTextBlipSound();
            str += currentEvent[i].d[j];
            document.getElementById("dialog-text").innerHTML = str;
            j++;
            if (j >= currentEvent[i].d.length) {
                nextDialog();
            }
        }, 1000 / displaySpeed);
    }
    //     Choices
    else {
        for (let i = 0; i < dialogsLength; i++) {
            document.getElementById("choice-wrap").style.visibility = "visible";
            document.getElementById("choice-wrap").style.opacity = "1";
            document.getElementById("choice-" + i.toString()).innerHTML =
                currentEvent[i].choice;
            document.getElementById("choice-" + i.toString()).style.opacity = "1";
        }
    }
}

function selectChoice(choice) {
    for (let i = 0; i < dialogsLength; i++) {
        document.getElementById("choice-wrap").style.visibility = "hidden";
        document.getElementById("choice-wrap").style.opacity = "0";
        document.getElementById("choice-" + i.toString()).style.opacity = "0";
    }
    document.getElementById("note").innerHTML = "Your choice: " + currentEvent[choice].choice;
    nextEvent(choice);
}

function nextDialog() {
    clearInterval(myinterval);
    if (i < dialogsLength - 1) {
        i++;
    } else {
        nextEvent(0);
    }
    displayDialogDone = true;
}

function nextEvent(nextAtWhere) {
    i = 1;
    currentEvent = allDialogs[currentEvent[nextAtWhere].next];
    dialogsLength = Object.keys(currentEvent).length;
}

console.log(">> Started");
