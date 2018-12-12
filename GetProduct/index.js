const ProductProvider = require('../Commons/Providers/ProductProvider');

module.exports = async function (context, req) {

    let productName = context.bindingData.productName;
    let channel = context.bindingData.channel;

    let result = await ProductProvider.getAvailableVersions(productName, channel);

    context.res = { body: result }

};