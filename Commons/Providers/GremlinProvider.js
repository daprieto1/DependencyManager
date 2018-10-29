const gremlin = require('gremlin');
const client = gremlin.createClient(
    443,
    process.env.CosmosDBEndpoint,
    {
        "session": false,
        "ssl": true,
        "user": process.env.CosmosDBUser,
        "password": process.env.CosmosDBPassword
    }
);

let GremlinProvider = {};

let execute = (query, options) => {
    return new Promise((resolve, reject) => {
        client.execute(query, options, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

GremlinProvider.getVertexesByProperty = async (properties) => {
    if (!properties || !Array.isArray(properties) || properties.lenght <= 0) throw 'Not valid properties'

    let query = `g.V()`;
    properties.forEach(p => query += `.has('${p.key}','${p.value}')`);

    return await execute(query, {});
}

GremlinProvider.getOutVertexes = async (vertexId) => {
    let query = `g.V('${vertexId}').outE().inV()`;
    return await execute(query, {});
}

module.exports = GremlinProvider