const ensureEnvironment = () => {
  if (!process.env.AZURE_STORAGE_ACCOUNT_NAME) {
    throw new Error('AZURE_STORAGE_ACCOUNT_NAME non set.');
  }

  if (!process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY) {
    throw new Error('AZURE_STORAGE_ACCOUNT_ACCESS_KEY non set.');
  }

  if (!process.env.AZURE_STORAGE_CONTAINER_NAME) {
    throw new Error('AZURE_STORAGE_CONTAINER_NAME non set.');
  }
};

module.exports = {
  ensureEnvironment,
};
