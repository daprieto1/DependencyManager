const ProductProvider = require('../Commons/Providers/ProductProvider');

module.exports = async function (context, req) {

    let productName = context.bindingData.productName;
    let version = context.bindingData.version;

    let result = await ProductProvider.getProductDependencies(productName, version);
    context.res = { body: result }

};