const {
    StorageSharedKeyCredential,
    ContainerSASPermissions,
    generateBlobSASQueryParameters,
} = require("@azure/storage-blob");
const { extractConnectionStringParts } = require('./utils.js');

const { BlockBlobClient, AnonymousCredential, AccountSASServices } = require("@azure/storage-blob");
const { BlobServiceClient } = require("@azure/storage-blob");

// wdlacitx

module.exports = async function (context, req) {
    const permissions = 'wactx';
    const container = 'mynewsurvey';

    context.res = {
        headers:
        {
            "Access-Control-Allow-Origin": "*"
        },

        body: generateSasToken(process.env.AzureWebJobsStorage, container, permissions)
    };
    context.done();
};



// WORKING FUNCTION

function generateSasToken(connectionString, container, permissions) {

    const { accountKey, accountName, url } = extractConnectionStringParts(connectionString);
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey.toString('base64'));

    var expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 2);


    const sasKey = generateBlobSASQueryParameters({
        containerName: container,
        permissions: ContainerSASPermissions.parse(permissions),
        expiresOn: expiryDate,
    }, sharedKeyCredential);

    return {

        sasKey: sasKey.toString(),
        url: url
    };
}


// TEMP FUNCTION 

// function generateSasToken(connectionString, container, permissions) {

//     const { accountKey, accountName, url } = extractConnectionStringParts(connectionString);
//     const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey.toString('base64'));
//     var expiryDate = new Date();
//     var startsOn = new Date();

//     expiryDate.setHours(expiryDate.getHours() + 2);

//     expiresOn = expiryDate;
//     // Generate user delegation SAS for a container
//     const userDelegationKey = BlobServiceClient.getUserDelegationKey(startsOn, expiresOn);

//     const  sasKey = generateBlobSASQueryParameters({
//         containerName: container,
//         permissions: ContainerSASPermissions.parse("racwdl"), // Required
//         startsOn: expiryDate, // Optional. Date type
//         expiresOn: expiryDate, // Required. Date type
//         ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
//         // protocol: SASProtocol.HttpsAndHttp, // Optional
//         version: "2018-11-09" // Must greater than or equal to 2018-11-09 to generate user delegation SAS
//     },
//     userDelegationKey
//         //    accountName
//     ).toString();

//     return {

//         sasKey: sasKey.toString(),
//         url: url
//     };
// }

// --------------------------------------------------------------------------------------------------

// 
