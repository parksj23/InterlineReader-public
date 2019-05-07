const express = require('express');
const router = express.Router();
const dashboard = require('../../controllers/dashboard');

const catchErrors = require('../../helpers/catchErrors');

router.get("/", catchErrors(dashboard.init))
module.exports = router;

router.get('/assetNames', catchErrors(dashboard.getAssetNames))