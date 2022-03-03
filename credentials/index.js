const {
    StorageSharedKeyCredential,
    ContainerSASPermissions,
    generateBlobSASQueryParameters
} = require("@azure/storage-blob");
const { extractConnectionStringParts } = require('./utils.js');


module.exports = async function (context, req) { 
    const permissions = 'c';
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

