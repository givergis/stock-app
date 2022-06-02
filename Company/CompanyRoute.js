const express = require('express');
const companyController = require('./CompanyConroller');

const router = express.Router();

router.get('/companyByName/:name',companyController.getCompanyByName);
router.get('/companies',companyController.getCompany);


module.exports = router;