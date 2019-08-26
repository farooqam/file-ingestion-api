const Readable = require('stream').Readable;
const {
  Aborter,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
  uploadStreamToBlockBlob} = require('@azure/storage-blob');

const apiError = require('./api-error-service');

const ensureEnvironment = () => {
  if (!process.env.AZURE_STORAGE_ACCOUNT_NAME) {
    throw apiError('AZURE_STORAGE_ACCOUNT_NAME not set.');
  }

  if (!process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY) {
    throw apiError('AZURE_STORAGE_ACCOUNT_ACCESS_KEY not set.');
  }

  if (!process.env.AZURE_STORAGE_CONTAINER_NAME) {
    throw apiError('AZURE_STORAGE_CONTAINER_NAME not set.');
  }
};

const uploadString = async (value, path) => {
  ensureEnvironment();

  const stream = new Readable();
  stream.push(value);
  stream.push(null);

  const aborter = Aborter.timeout(30 * 60 * 1000);

  const credentials = new SharedKeyCredential(
      process.env.AZURE_STORAGE_ACCOUNT_NAME,
      process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY);

  const pipeline = StorageURL.newPipeline(credentials);

  let serviceURL;

  if (process.env.USE_LOCAL_STORAGE) {
    serviceURL = new ServiceURL(`http://127.0.0.1:10000/${process.env.AZURE_STORAGE_ACCOUNT_NAME}`, pipeline);
  } else {
    serviceURL = new ServiceURL(`https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, pipeline);
  }

  const containerURL = ContainerURL.fromServiceURL(
      serviceURL,
      process.env.AZURE_STORAGE_CONTAINER_NAME);

  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, path);

  return await uploadStreamToBlockBlob(aborter, stream, blockBlobURL);
};

module.exports = {
  ensureEnvironment,
  uploadString,
};
