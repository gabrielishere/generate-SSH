const { BlockBlobClient, AnonymousCredential, AccountSASServices } = require("@azure/storage-blob");
const { BlobServiceClient } = require("@azure/storage-blob");

try {
    (async function () {

// Call generate SASS token API & main function 

const { url, sasKey } = await (await fetch("http://localhost:7071/api/credentials", { mode: 'cors' })).json();
createSurvey(surveyID, questions, counts);

function createSurvey(surveyID, questions) {

    "use strict";

    const d = new Date();
    let day_ = d.getDate();
    let month_ = d.getMonth();
    let year_ = d.getFullYear();
    var hours_ = d.getHours();
    var minutes_ = d.getMinutes();

    const dateID =
        day_.toString() +
        month_.toString() +
        year_.toString() +
        hours_.toString() +
        minutes_.toString();

    const errorMsgElement = document.querySelector("span#errorMsg");
    const recordedVideo = document.querySelector("video#gum");
    const recordButton = document.querySelector(".record");
    const toolTip = document.querySelector(".tooltiptext");
    const start = document.querySelector(".start");
    const record = document.querySelector(".record");
    const border = document.querySelector(".button-border");
    const spinner = document.querySelector(".spinner");
    const upload = document.querySelector("#upload");
    const next = document.querySelector(".next");
    const results = document.querySelector(".results-window");
    const permissions = document.querySelector(".permissions");
    const instructions = document.querySelector(".written-instructions");
    const instructions_div = document.querySelector(".instruction-box");
    const timerEl = document.getElementById("timer-text");
    const uploadButton = document.querySelector("button#upload");
    const surveyName = document.querySelector(".time-stamp-survey");
    const gumVideo = document.querySelector("video#gum");

    let mediaRecorder;
    let recordedBlobs;
    var StartRecording = true;
    let runTheClock;
    let seconds = 0;

    var myOrientation =
        window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";

    var heightLand = "720";
    var widthLand = "1280";
    var heightPort = "480";
    var widthPort = "640";
    var framerateInput = "0";

    // Configure Azure settings and create blob

    const { BlobServiceClient } = require("@azure/storage-blob");

    const blobSasUrl = url + "/?" + sasKey;

    const blobServiceClient = new BlobServiceClient(blobSasUrl);

    var str = surveyID.replace(/\s/g, "").toLowerCase();
    const containerName = str;
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const createContainer = async () => {
        try {
            reportStatus(`Creating container "${containerName}"...`);
            await containerClient.create();
            reportStatus(`Done.`);
        } catch (error) {
            reportStatus(error.message);
        }
    };

    let text = uuidv4();

    function uuidv4() {
        return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (c) =>
            (
                c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
        );
    }

    //Begin program cycle 

    start.addEventListener("click", () => {
        startCamera();
        h2.style.display = "flex";
        setTimeout(function () {
            points();
        }, 500);
        change();
        // changeSize();
    });

    recordButton.addEventListener("click", () => {
        recordFootage();
    });

    upload.addEventListener("click", () => {
        var currentQuestion = questions[counts];
        var str = currentQuestion;
        currentQuestion = str.replace(/\W+/g, "");
        uploadFootage(text);
        changeOn();
    });

    next.addEventListener("click", () => {
        changeOff();
        points();

        // changeSize();
        results.classList.remove("show");
        next.classList.remove("show");
        $(results).empty();
        if (counts === questions.length - 1) {
            results.classList.add("show");
            next.classList.add("show");
            $(results).append("Thank You");
            endSurvey();
            $(next).empty();
            $(next).append("End Survey");
        } else if (counts === questions.length) {
            changePage();
        } else {
            recordedVideo.autoplay = true;
            recordedVideo.muted = true;
            startCamera();
        }

        $("html, body").animate(
            {
                scrollTop: $(".section-question").offset().top,
            },
            750
        );
    });


    render(seconds);

    function makeTwoNumbers(num) {
        return (num < 10 ? "0" : "") + num;
    }

    function tick() {
        seconds++;
        render(seconds);
    }

    function render(secs) {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor(secs / 60) - hours * 60;
        const seconds = secs % 60;

        const val = [hours, minutes, seconds].map(makeTwoNumbers).join(":");
        timerEl.textContent = val;
    }

    function runTimer() {
        runTheClock = setInterval(tick, 1000);
    }

    function stopTimer() {
        clearInterval(runTheClock);
    }

    function resetTimer() {
        seconds = 0;
        render(seconds);
    }

    const reportStatus = (message) => {
        // console.log(message);
    };

    // Change Question 

    document.addEventListener("DOMContentLoaded", function () {
        num.innerHTML = questions[counts];
        num_text.innerHTML = questions_text[counts];
    });

    function points(num) {
        counts++;
        num = document.getElementById("num");
        num.innerHTML = questions[counts];
        num_text.innerHTML = questions_text[counts];

        if (counts === questions.length) {
            suvreyOn = false;
        }
    }

    function changePage() {
        $(next).empty();
        $(next).append("End Survey");
        window.location.replace(
            "https://app.prolific.co/submissions/complete?cc=5000972B"
        );
    }

    function endSurvey() {
        $(next).empty();
        $(next).append("End Survey");
    }

    function change() {
        h2.classList.add("fade");
        setTimeout(function () {
            h2.classList.remove("fade");
        }, 1250);
    }

    function changeOn() {
        setTimeout(function () {
            h2.classList.add("fade");
        }, 500);
    }

    function changeOff() {
        setTimeout(function () {
            h2.classList.remove("fade");
        }, 1000);
    }

    // Main Functions for use 

    async function recordFootage() {
        if (StartRecording === true) {
            toolTip.textContent = "Stop Recording";
            startRecording();
            recordedVideo.muted = true;
            recordedVideo.loop = false;
            recordedVideo.controls = false;
            recordedVideo.autoplay = true;
        } else {
            stopRecording();
            toolTip.textContent = "Start Recording";
            StartRecording = true;
            uploadButton.disabled = false;
        }
    }

    var video = document.getElementById("video");

    function showRecordedVideo() {
        const mimeType = globalMimeType;
        const superBuffer = new Blob(recordedBlobs, {
            type: mimeType,
        });
        recordedVideo.src = null;
        recordedVideo.srcObject = null;
        recordedVideo.src = window.URL.createObjectURL(superBuffer);
        recordedVideo.autoplay = false;
        recordedVideo.controls = true;
        recordedVideo.muted = false;
        recordedVideo.loop = true;
        recordedVideo.style.transform = "rotateY(0deg)";
    }

    function uploadResult(message) {
        spinner.classList.remove("show");
        next.classList.add("show");
        results.classList.add("show");
        $(results).append(message);
    }

    function handleDataAvailable(event) {
        // console.log("handleDataAvailable", event);
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }

    function getSupportedMimeTypes() {
        const possibleTypes = [
            "video/mp4;codecs=h264,aac",
            "video/webm;codecs=h264,opus",
            "video/webm;codecs=vp9,opus",
            "video/webm;codecs=vp8,opus",
            "video/mp4",
        ];
        return possibleTypes.filter((mimeType) => {
            return MediaRecorder.isTypeSupported(mimeType);
        });
    }

    const globalMimeType = getSupportedMimeTypes()[0];

    function startRecording() {

        document.getElementById("timer").style.display = "block";
        recordButton.disabled = true;
        uploadButton.disabled = true;

        // startVideo();

        var count = 3;
        var counter = setInterval(timer, 1000);

        function timer() {
            count = count - 1;
            if (count <= 0) {
                clearInterval(counter);
                return;
            }
            document.getElementById("timer").innerHTML = count;
        }

        setTimeout(function () {
            recordButton.disabled = false;
            record.classList.add("red");
            var count = 0;
            var counter = setInterval(timer, 1000);

            function timer() {
                count = count + 1;
                if (count <= 0) {
                    clearInterval(counter);
                    return;
                }
            }
            resetTimer();
            runTimer();
            handleSuccess(userStream);
            recordedBlobs = [];
            const mimeType = globalMimeType;
            const options = {
                mimeType,
            };

            try {
                mediaRecorder = new MediaRecorder(window.stream, options);
            } catch (e) {
                console.error("Exception while creating MediaRecorder:", e);
                errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(
                    e
                )}`;
                return;
            }

            StartRecording = false;

            mediaRecorder.onstop = (event) => {
                stopTimer();
                record.classList.remove("red");
                count = 0;
                showRecordedVideo();

            };

            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.start();
            document.getElementById("timer").style.display = "none";
            document.getElementById("timer").innerHTML = 3;
        }, 3200);
    }

    function stopRecording() {
        mediaRecorder.stop();
    }

    function handleSuccess(stream) {
        window.stream = stream;
        const gumVideo = document.querySelector("video#gum");
        gumVideo.src = stream;
        gumVideo.srcObject = stream;
    }

    let userStream;

    async function init(constraints) {
        try {
            userStream = await navigator.mediaDevices.getUserMedia(constraints);
            handleSuccess(userStream);
        } catch (e) {
            console.error("navigator.getUserMedia error:", e);
            errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
        }
    }

    function getOrientation() {
        var orientation = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
    }

    window.onload = function () { getOrientation(); }

    var orientation =
        (screen.orientation || {}).type ||
        screen.mozOrientation ||
        screen.msOrientation;

    if (orientation === "landscape-primary") {

    } else if (orientation === "landscape-secondary") {
    } else if (
        orientation === "portrait-secondary" ||
        orientation === "portrait-primary"
    ) {
    } else if (orientation === undefined) {
        // console.log("The orientation API isn't supported in this browser :(");
    }

    function getUserMediaConstraints() {
        const constraints = {};
        constraints.audio = true;
        constraints.video = {};

        // Landscape
        if (myOrientation === "Landscape") {
            constraints.video.width = {};
            constraints.video.width.ideal = widthLand;
            constraints.video.height = {};
            constraints.video.height.ideal = heightLand;
        }

        // Portrait
        if (myOrientation === "Portrait") {
            constraints.video.width = {};
            constraints.video.width.ideal = widthPort;
            constraints.video.height = {};
            constraints.video.height.ideal = heightPort;
        }

        // FrameRate
        if (framerateInput !== "0") {
            constraints.video.frameRate = {};
            constraints.video.frameRate.min = "0";
        }
        if (framerateInput !== "0") {
            constraints.video.frameRate = constraints.video.frameRate || {};
            constraints.video.frameRate.max = "0";
        }

        return constraints;
    }

    async function startVideo() {
        const constraints = {
            audio: {
                echoCancellation: {
                    exact: true,
                },
            },
            video: {
                width: 1280,
                height: 720,
            },
        };
        // console.log("Using media constraints:", constraints);
        await init(getUserMediaConstraints());
    }

    async function startCamera() {
        startVideo();
        createContainer();
        start.classList.add("show");
        permissions.classList.add("show");
        instructions.classList.add("show");
        instructions_div.classList.add("show");
        setTimeout(function () {
            record.classList.add("show");
            border.classList.add("show");
        }, 100);
    }

    async function uploadFootage(text) {

        uploadButton.disabled = true;
        spinner.classList.add("show");
        const blob = new Blob(recordedBlobs, {
            type: "video/webm",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.style.display = "none";
        a.href = url;

        let accending = makeTwoNumbers(counts);
        let result = text.substring(0, 4);
        let r_temp = uuidv4();
        let r = r_temp.substring(0, 4);

        a.download = "S" + result + "-" + "Q" + accending + "-" + dateID + r + ".webm";

        recordedVideo.muted = true;
        const blockBlobClient = containerClient.getBlockBlobClient(a.download);

        try {
            reportStatus("Uploading files...");
            const promises = [];
            promises.push(blockBlobClient.uploadBrowserData(blob));
            await Promise.all(promises);
            reportStatus("Done.");
            setTimeout(function () {
                uploadResult("Upload Successful");
            }, 2000);
        } catch (error) {
            reportStatus(error.message);
            setTimeout(function () {
                uploadResult(error.message);
            }, 2000);
        }
        resetTimer();

        // spinner.classList.add("show");
        record.classList.remove("show");
        border.classList.remove("show");
        recordedVideo.muted = null;
        recordedVideo.loop = null;
        recordedVideo.controls = null;
        recordedVideo.autoplay = null;
        recordedVideo.src = null;
        recordedVideo.srcObject = null;
        recordedVideo.src = null;
        recordedVideo.autoplay = null;
        recordedVideo.controls = null;
        recordedVideo.muted = null;
        recordedVideo.loop = null;
        recordedVideo.style.transform = "rotateY(180deg)";
    }
}

    }())

} catch {
    console.log("error")
}



/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html
