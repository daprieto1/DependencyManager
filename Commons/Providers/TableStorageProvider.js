const azureStorage = require('azure-storage');

var TableStorageProvider = {};

TableStorageProvider.getTableService = connectionString => azureStorage.createTableService(connectionString);

module.exports = TableStorageProvider;