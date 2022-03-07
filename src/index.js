const { BlockBlobClient, AnonymousCredential, AccountSASServices } = require("@azure/storage-blob");
const { BlobServiceClient } = require("@azure/storage-blob");

try{
    (async function () {
        // const myHeaders = new Headers({
          
        // })
        
        const {url, sasKey} = await (await fetch("http://localhost:7071/api/credentials", {mode:'cors'})).json();
        document.querySelector('#name').textContent = `SAS Key: ${sasKey}` + "\n" + `URL: ${url}`;

        // function uploadFile() {
        //     const file = document.getElementById('image').files[0];
        //     blobUpload(file, url, 'images', sasKey);
        // }
        
        // const fileInput = document.getElementById('image');
        // fileInput.addEventListener("change", uploadFile);


blobUpload = function(file, url, container, sasKey) {
    var blobName = buildBlobName(file);
    var login = `${url}/${container}/${blobName}?${sasKey}`;
    var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential());
    blockBlobClient.uploadBrowserData(file);
}

function buildBlobName(file) {
    var filename = file.name.substring(0, file.name.lastIndexOf('.'));
    var ext = file.name.substring(file.name.lastIndexOf('.'));
    return filename + '_' + Math.random().toString(16).slice(2) + ext;
}

const createContainerButton = document.getElementById("create-container-button");
const deleteContainerButton = document.getElementById("delete-container-button");
const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");
const listButton = document.getElementById("list-button");
const deleteButton = document.getElementById("delete-button");
const status = document.getElementById("status");
const fileList = document.getElementById("file-list");

const reportStatus = message => {
    status.innerHTML += `${message}<br/>`;
    status.scrollTop = status.scrollHeight;
}

// Update <placeholder> with your Blob service SAS URL string
const blobSasUrl = url + "/?" + sasKey.replace(/%3A/g, ':');

// const blobSasUrl = "https://physalisvideoblob.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-03-03T23:28:49Z&st=2022-03-03T15:28:49Z&spr=https&sig=mnNdy4U6Iv%2BLItIR%2BvmOhBeSuOXKrQXK1O8kA2999xM%3D";


console.log("Current Token: " + blobSasUrl);

// Create a new BlobServiceClient
const blobServiceClient = new BlobServiceClient(blobSasUrl);

// Create a unique name for the container by 
// appending the current time to the file name
const containerName = "mynewsurvey";

// Get a container client from the BlobServiceClient
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

const deleteContainer = async () => {
    try {
        reportStatus(`Deleting container "${containerName}"...`);
        await containerClient.delete();
        reportStatus(`Done.`);
    } catch (error) {
        reportStatus(error.message);
    }
};

createContainerButton.addEventListener("click", createContainer);
deleteContainerButton.addEventListener("click", deleteContainer);

const listFiles = async () => {
    fileList.size = 0;
    fileList.innerHTML = "";
    try {
        reportStatus("Retrieving file list...");
        let iter = containerClient.listBlobsFlat();
        let blobItem = await iter.next();
        while (!blobItem.done) {
            fileList.size += 1;
            fileList.innerHTML += `<option>${blobItem.value.name}</option>`;
            blobItem = await iter.next();
        }
        if (fileList.size > 0) {
            reportStatus("Done.");
        } else {
            reportStatus("The container does not contain any files.");
        }
    } catch (error) {
        reportStatus(error.message);
    }
};

listButton.addEventListener("click", listFiles);

const uploadFiles = async () => {
    try {
        reportStatus("Uploading files...");
        const promises = [];
        for (const file of fileInput.files) {
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
            promises.push(blockBlobClient.uploadBrowserData(file));
        }
        await Promise.all(promises);
        reportStatus("Done.");
        listFiles();
    }
    catch (error) {
            reportStatus(error.message);
    }
}

selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", uploadFiles);


const deleteFiles = async () => {
    try {
        if (fileList.selectedOptions.length > 0) {
            reportStatus("Deleting files...");
            for (const option of fileList.selectedOptions) {
                await containerClient.deleteBlob(option.text);
            }
            reportStatus("Done.");
            listFiles();
        } else {
            reportStatus("No files selected.");
        }
    } catch (error) {
        reportStatus(error.message);
    }
};

deleteButton.addEventListener("click", deleteFiles);

}())
} catch {
    console.log("error")
}