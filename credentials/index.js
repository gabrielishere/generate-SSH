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



// Working function

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






// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');
//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }