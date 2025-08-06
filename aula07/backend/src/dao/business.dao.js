const businessModel = require("../models/business.model");

const getBusiness = async () => {
  const business = await businessModel.find();
  return business;
};

const getBusinessById = async (id) => {
  const business = await businessModel.findById(id);
  return business;
};

const createBusiness = async (business) => {
  const businessCreated = await businessModel.create(business);
  return businessCreated;
};

const updateBusiness = async (id, business) => {
  // findByIdAndUpdate is used to find a document by its ID and update it with the provided data
  const businessUpdated = await businessModel.findByIdAndUpdate(id, { $set: business }, { new: true })
  return businessUpdated;
}

module.exports = { getBusiness, getBusinessById, createBusiness, updateBusiness };
