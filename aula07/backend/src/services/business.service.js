const businessDao = require("../dao/business.dao");

const getBusiness = async () => {
  const business = await businessDao.getBusiness();
  return business;
};

const getBusinessById = async (id) => {
  const business = await businessDao.getBusinessById(id);
  if (!business) return null;
  return business;
};

const createBusiness = async (businessData) => {
  const businessCreated =  await businessDao.createBusiness(businessData);
  return businessCreated;
};

const addProduct = async (businessId, productData) => {
  const business = await businessDao.getBusinessById(businessId);
  if (!business) return null;

  business.products.push(productData);
  const updatedBusiness = await businessDao.updateBusiness(businessId, business);
  return updatedBusiness;
};

module.exports = {
  getBusiness,
  getBusinessById,
  createBusiness,
  addProduct,
};
