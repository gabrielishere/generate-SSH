const { BlockBlobClient, AnonymousCredential, AccountSASServices } = require("@azure/storage-blob");
const { BlobServiceClient } = require("@azure/storage-blob");

try {
    (async function () {
        // const myHeaders = new Headers({

        // })

        const { url, sasKey } = await (await fetch("http://localhost:7071/api/credentials", { mode: 'cors' })).json();
        // document.querySelector('#name').textContent = `SAS Key: ${sasKey}` + "\n" + `URL: ${url}`;

        console.log(sasKey + url)


        // function uploadFile() {
        //     const file = document.getElementById('image').files[0];
        //     blobUpload(file, url, 'images', sasKey);
        // }

        // const fileInput = document.getElementById('image');
        // fileInput.addEventListener("change", uploadFile);



        createSurvey(surveyID, questions, counts);
        // require("dotenv").config();



        function createSurvey(surveyID, questions) {
            // Blob upload parameters

            "use strict";

            // Recorder paramters

            const d = new Date();
            let day_ = d.getDate();
            let month_ = d.getMonth();
            let year_ = d.getFullYear();
            var hours_ = d.getHours();
            var minutes_ = d.getMinutes();
            var seconds_ = d.getSeconds();
            var milliseconds_ = d.getMilliseconds();

            // Blob config

            const { BlobServiceClient } = require("@azure/storage-blob");
            // const fileInput = document.getElementById("file-input");
            // const status = document.getElementById("status");

            // new new new
            const blobSasUrl = sasKey;

            const blobServiceClient = new BlobServiceClient(blobSasUrl);

            // Survey ID
            var str = surveyID.replace(/\s/g, "").toLowerCase();
            const containerName = str;
            const containerClient = blobServiceClient.getContainerClient(containerName);

            // create random ID

            let text = uuidv4();

            function uuidv4() {
                return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (c) =>
                    (
                        c ^
                        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
                    ).toString(16)
                );
            }

            // get Date

            const dateID =
                day_.toString() +
                month_.toString() +
                year_.toString() +
                hours_.toString() +
                minutes_.toString();

            // seconds_.toString() +

            // milliseconds_.toString();

            // declare varibles

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

            // triggers

            // Create a service SAS for a blob container
            // function getContainerSasUri(containerClient, sharedKeyCredential, storedPolicyName) {
            //   const sasOptions = {
            //     containerName: containerClient.containerName,
            //     permissions: ContainerSASPermissions.parse("c")
            //   };

            //   if (storedPolicyName == null) {
            //     sasOptions.startsOn = new Date();
            //     sasOptions.expiresOn = new Date(new Date().valueOf() + 3600 * 1000);
            //   } else {
            //     sasOptions.identifier = storedPolicyName;
            //   }

            //   const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
            //   console.log(`SAS token for blob container is: ${sasToken}`);

            //   return `${containerClient.url}?${sasToken}`;
            // }

            // console.log(getContainerSasUri());

            start.addEventListener("click", () => {
                startCamera();
                h2.style.display = "flex";
                setTimeout(function () {
                    points();
                }, 500);
                change();
                changeSize();
            });

            recordButton.addEventListener("click", () => {
                recordFootage();
            });

            upload.addEventListener("click", () => {
                var currentQuestion = questions[counts];
                var str = currentQuestion;
                currentQuestion = str.replace(/\W+/g, "");
                uploadFootage(text);
            });

            next.addEventListener("click", () => {
                points();
                change();
                changeSize();
                results.classList.remove("show");
                next.classList.remove("show");
                $(results).empty();

                // console.log("current index to observe " + counts);
                // console.log("end of survey index" + questions.length);
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

            // Change question data

            document.addEventListener("DOMContentLoaded", function () {
                num.innerHTML = questions[counts];
                num_text.innerHTML = questions_text[counts];
            });

            function points(num) {
                // console.log("Counts in points was " + counts);
                counts++;
                // console.log("Counts in points is " + counts);
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

            // change container

            function change() {
                h2.classList.add("fade");
                setTimeout(function () {
                    h2.classList.remove("fade");
                }, 1250);
            }

            function changeSize() {
                var questionh2 = document.querySelector(".quesiton-container");
                var offsetHeight = questionh2.offsetHeight;
                questionh2.style.maxHeight = "2000px";
            }

            // create Container

            const createContainer = async () => {
                try {
                    reportStatus(`Creating container "${containerName}"...`);
                    await containerClient.create();
                    reportStatus(`Done.`);
                } catch (error) {
                    reportStatus(error.message);
                }
            };

            // Stopwatch

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

            // Main recorder function

            const reportStatus = (message) => {
                // console.log(message);
            };

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

                //     transform: rotateY(180deg);
                // -webkit-transform: rotateY(180deg); /* Safari and Chrome */
                // -moz-transform: rotateY(180deg); /* Firefox */

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

                    // console.log(
                    //   "Created MediaRecorder",
                    //   mediaRecorder,
                    //   "with options",
                    //   options
                    // );

                    StartRecording = false;

                    mediaRecorder.onstop = (event) => {
                        stopTimer();
                        record.classList.remove("red");
                        count = 0;

                        showRecordedVideo();
                        // console.log("Recorder stopped: ", event);
                        // console.log("Recorded Blobs: ", recordedBlobs);
                    };

                    mediaRecorder.ondataavailable = handleDataAvailable;
                    mediaRecorder.start();
                    // console.log("MediaRecorder started", mediaRecorder);
                    document.getElementById("timer").style.display = "none";
                    document.getElementById("timer").innerHTML = 3;
                }, 3200);
            }

            function stopRecording() {
                mediaRecorder.stop();
            }

            function handleSuccess(stream) {
                // console.log("getUserMedia() got stream:", stream);
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
                // console.log(orientation);
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
