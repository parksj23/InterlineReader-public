const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const keys = require('../../../config/keys');
const url = keys.mongoURI;
const databaseName = keys.databaseName;
const dashboard = require("../../../controllers/dashboard")


/**
 * @swagger
 * /dashboard:
 *  get:
 *    tags:
 *      - Dashboard
 *    name: Dashboard Page
 *    summary: Gets the stories to display on the Dashboard Page
 *    produces:
 *      -application/json
 *    responses:
 *      '200':
 *        description: Stories gathered successfully
 *      '500':
 *        description: Internal Server Error
 *
 */

router.get("/", async (req, res, next) => {
    dashboard.getDashboard(req,res,next);
});

/**
 * @swagger
 * /dashboard/middleKorean:
 *  get:
 *    tags:
 *      - Dashboard
 *    name: Middle korean for Dashboard
 *    summary: Gets the middle Korean vocabulary and grammar for the dashboard
 *    produces:
 *      -application/json
 *    responses:
 *      '200':
 *        description: middle korean gathered successfully
 *      '500':
 *        description: Internal Server Error
 *
 */
router.get("/middleKorean", async (req,res,next) => {
 dashboard.getMiddleKorean(req,res,next);
})

/**
 * @swagger
 * /dashboard/modernKorean:
 *  get:
 *    tags:
 *      - Dashboard
 *    name: Modern korean for Dashboard
 *    summary: Get modern Korean vocabulary and grammar for the dashboard
 *    produces:
 *      -application/json
 *    responses:
 *      '200':
 *        description: middle korean gathered successfully
 *      '500':
 *        description: Internal Server Error
 *
 */
router.get("/modernKorean", async(req,res,next) => {
  dashboard.getModernKorean(req,res,next);
})

module.exports = router;


