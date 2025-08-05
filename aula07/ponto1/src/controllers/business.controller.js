const getBusiness = async (req, res) => {
  res.send({ status: "success", result: "getBusiness" });
};

const getBusinessById = async (req, res) => {
  res.send({ status: "success", result: "getBusinessById" });
};

const createBusiness = async (req, res) => {
  res.send({ status: "success", result: businessCreated });
};

const addProduct = async (req, res) => {
  res.send({ status: "success", result: "addProduct" });
};

module.exports = {
  getBusiness,
  getBusinessById,
  createBusiness,
  addProduct,
};
