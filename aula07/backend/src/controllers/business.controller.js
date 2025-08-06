const businessDao = require("../dao/business.dao");

const getBusiness = async (req, res) => {
  try {
    const business = await businessDao.getBusiness();
    return res.status(200).send({ status: "success", result: business });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
};

const getBusinessById = async (req, res) => {
  try {
    const { bid } = req.params;
    const business = await businessDao.getBusinessById(bid);
    if (!business) return res.status(404).send({ message: "Business not found" })
    return res.status(200).send({ status: "success", result: business });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message }); 
  }
};

const createBusiness = async (req, res) => {
  try {
    const businessData = req.body;
    const businessCreated = await businessDao.createBusiness(businessData)
    return res.status(201).send({ message: businessCreated })
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message }); 
  }
};

const addProduct = async (req, res) => {
  try {
    const { bid } = req.params;
    const productData = req.body;

    const business = await businessDao.getBusinessById(bid);
    if (!business) return res.status(404).send({ message: "Business not found" })

    business.products.push(productData);
    const updatedBusiness = await businessDao.updateBusiness(business._id, business) // tb poderia passar bid
    return res.status(200).send({ result: updatedBusiness })
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message }); 
  }
};

module.exports = {
  getBusiness,
  getBusinessById,
  createBusiness,
  addProduct,
};
