const TableStorageProvider = require('./TableStorageProvider');

let ProductProvider = {};
let DependencyManagerStringConnection = process.env.DependencyManagerStringConnection;
let ProductVersionsTableName = process.env.ProductVersionsTableName;
let ProductDependenciesTableName = process.env.ProductDependenciesTableName;

ProductProvider.getAvailableVersions = (productName, channel) => {
    let tableService = TableStorageProvider.getTableService(DependencyManagerStringConnection);
    channel = channel.toUpperCase();
    productName = productName.toLowerCase();

    return new Promise((resolve, reject) => {

        tableService.retrieveEntity(ProductVersionsTableName, channel, productName, function (error, result, response) {
            if (error) reject(error);
            resolve({
                name: result.RowKey._,
                channel: result.PartitionKey._,
                availableVersions: result.AvailableVersions._
            });
        });

    });
}

ProductProvider.getProductDependencies = (productName, version) => {

    let tableService = TableStorageProvider.getTableService(DependencyManagerStringConnection);
    productName = productName.toLowerCase();

    return new Promise((resolve, reject) => {
        tableService.retrieveEntity(ProductDependenciesTableName, productName, `${version}`, function (error, result, response) {
            if (error) reject(error);
            resolve({
                name: result.PartitionKey._,
                version: result.RowKey._,
                dependencies: JSON.parse(result.Dependencies._)
            });
        });

    });

}

module.exports = ProductProvider;