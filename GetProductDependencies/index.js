const Product = require('../Commons/Models/Product');
const TopologicalSortProvider = require('../Commons/Providers/TopologicalSortProvider');

module.exports = async function (context, req) {

    let nameValue = context.bindingData.name.toLowerCase();
    let versionValue = parseInt(context.bindingData.version);

    let result = await TopologicalSortProvider.sortFromVertex(new Product(nameValue, versionValue));
    context.res = { body: result }

};