const businessService = require("../services/business.service");

const getBusiness = async (req, res) => {
  try {
    const business = await businessService.getBusiness();
    return res.status(200).send({ result: business });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
};

const getBusinessById = async (req, res) => {
  try {
    const { bid } = req.params;
    const business = await businessService.getBusinessById(bid);
    if (!business) {
      return res.status(404).send({  message: "Business not found" });
    }
    return res.status(200).send({ result: business });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
};

const createBusiness = async (req, res) => {
  try {
    const businessData = req.body;
    const businessCreated = await businessService.createBusiness(businessData);
    return res.status(201).send({ result: businessCreated });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { bid } = req.params;
    const productData = req.body;

    const updatedBusiness = await businessService.addProduct(bid, productData);
    if (!updatedBusiness) {
      return res.status(404).send({ message: "Business not found" });
    }

    return res.status(200).send({ result: updatedBusiness });
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
