const Product = require('../Models/Product');

let ProductProvider = {};

ProductProvider.parseVertexToProduct = (vertex) => {
    if (vertex.label !== 'product') throw 'This Vertex is not a Product.'

    let name = vertex.properties.name[0].value;
    let version = vertex.properties.version[0].value;
    return new Product(name, version);
}

module.exports = ProductProvider