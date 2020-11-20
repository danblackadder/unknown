const swaggerAutogen = require('swagger-autogen')()
 
const doc = {
    info: {
        "version": "",                // by default: "1.0.0"
        "title": "",                  // by default: "REST API"
        "description": ""             // by default: ""
    },
    host: "",                         // by default: "localhost:3000"
    basePath: "",                     // by default: "/"
    schemes: [],                      // by default: ['http']
    consumes: [],                     // by default: ['application/json']
    produces: [],                     // by default: ['application/json']
    tags: [                           // by default: empty Array
        {
            "name": "",               // Tag name
            "description": ""         // Tag description
        },
        // { ... }
    ],
    securityDefinitions: { },         // by default: empty object
    definitions: { }                  // by default: empty object
}
 
const outputFile = './documentation/documentation.json'
const endpointsFiles = [
    './routes/authentication/user.js',
    './routes/task/project.js', 
    './routes/task/task.js'
]
 
swaggerAutogen(outputFile, endpointsFiles, doc)

//https://www.npmjs.com/package/swagger-autogen for documentation on how to write swagger