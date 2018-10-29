const GremlinProvider = require('./GremlinProvider');
const ProductProvider = require('./ProductProvider');

let TopologicalSortProvider = {};

TopologicalSortProvider.sortFromVertex = async (product) => {
    let result = new Set();
    await sort(result, product);
    return Array.from(result);
}

let sort = async (result, product) => {
    let vertexId = `${product.name}_v${product.version}`;
    if (!result.has(product.name)) {        
        let outV = await GremlinProvider.getOutVertexes(vertexId);

        for (var i = 0; i < outV.length; i++) {
            let p = ProductProvider.parseVertexToProduct(outV[i]);
            await sort(result, p);
        }
    }

    result.add(vertexId);
}

module.exports = TopologicalSortProvider;