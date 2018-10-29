const ProductProvider = require('../Commons/Providers/ProductProvider');
const Property = require('../Commons/Models/Property');
const GremlinProvider = require('../Commons/Providers/GremlinProvider');

module.exports = async function (context, req) {

    let nameValue = context.bindingData.name.toLowerCase();
    let properties = [new Property('name', nameValue)];
    let result = await GremlinProvider.getVertexesByProperty(properties);
    result = result.map(vertex => ProductProvider.parseVertexToProduct(vertex));

    context.res = { body: result }

};