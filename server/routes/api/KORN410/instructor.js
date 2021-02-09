const express = require("express");
const router = express.Router();
const instructor = require("../../../controllers/instructor");
// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );

router.get("/", (req, res, next) => {
  instructor.initialize(req, res, next);
});

router.put("/addStory", (req, res, next) => {
  instructor.addNewStory(req.body, res, next);
});
router.put("/addStoryInfo", (req, res, next) => {
  instructor.addStoryInfo(req.body, res, next);
});

router.get("/getStories", (req, res, next) => {
  instructor.getAllStories(req, res, next);
});

router.get("/getVocab", (req, res, next) => {
  instructor.getVocabulary(req.body, res, next);
});

router.put("/renameCollection", (req, res, next) => {
  instructor.renameCollections(req.body, res, next);
});

router.put("/editVocab/saveVocab", (req, res, next) => {
  instructor.saveVocab(req.body, res, next);
});

router.put("/editVocab/updateVocab", (req, res, next) => {
  instructor.updateVocab(req.body, res, next);
});

router.put("/editVocab/addVocab", (req, res, next) => {
  instructor.addVocab(req.body, res, next);
});

router.put("/editGrammar/addGrammar", (req, res, next) => {
  instructor.addGrammar(req.body, res, next);
});

router.put("/editVocab/deleteVocab", (req, res, next) => {
  instructor.deleteVocab(req.body, res, next);
});

router.put("/editGrammar/updateGrammar", (req, res, next) => {
  instructor.updateGrammar(req.body, res, next);
});

router.put("/editGrammar/deleteGrammar", (req, res, next) => {
  instructor.deleteGrammar(req.body, res, next);
});

router.get("/midkr-gram", (req, res, next) => {
  instructor.getMiddleKRGram(req, res, next);
});

router.put("/midkr-gram", (req,res,next) => {
  instructor.updateMiddleKoreanGrammar(req.body, res, next);
});

router.delete("/midkr-gram", (req, res, next) => {
  instructor.deleteMiddleKoreanGrammer(req.body, res, next);
})

router.get("/midkr-voc", (req, res, next) => {
  instructor.getMiddleKRVoc(req, res, next);
});

router.put("/midkr-voc", (req,res,next) => {
  instructor.updateMiddleKoreanVoc(req.body, res, next);
});

router.delete("/midkr-voc", (req, res, next) => {
  instructor.deleteMiddleKoreanVoc(req.body, res, next);
})


/**
 * @swagger
 * /instructor/classes:
 *  get:
 *    tags:
 *      - /instructor
 *    name: All Class Information
 *    summary: Get information on all the classes the Instructor teaches
 *    consumes:
 *      application/json
 *    produces:
 *      -application/json
 *    parameters:
 *      - in: query
 *        name: instructorId
 *        schema:
 *          type: string
 *        required:
 *          - instructorId
 *    responses:
 *      '200':
 *        description: Stories Retrieved from database
 *      '500':
 *        description: Internal Server Error
 *
 */
router.get("/classes", (req,res,next) => {
  instructor.getClasses(req,res,next);
})

/**
 * @swagger
 * /instructor/classes:
 *  post:
 *    tags:
 *      - /instructor
 *    name: Create new Class
 *    summary: Create a new class that the instructor is teaching
 *    consumes:
 *      application/json
 *    produces:
 *      -application/json
 *    parameters:
 *      - in: body
 *        name: newClass
 *        description: Information about the new class
 *        schema:
 *          type: object
 *          example:
 *            newClass:
 *              instructorId: 5bba55d8372a190ad3dfda13
 *              className: Test New Class
 *              classDesc: Here is an example class
 *              storyList: [123,456,789]
 *              status: pending
 *              createdDate: 2018-09-24T09:39:04.305+00:00
 *              lastUpdated: 2018-09-24T09:39:04.305+00:00
 *        required:
 *          - instructorId
 *        properties:
 *          instructorId:
 *            type: string
 *          className:
 *            type: string
 *          classDesc:
 *            type: string
 *          storyList:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *          createdDate:
 *            type: string
 *          lastUpdated:
 *            type: string
 *
 *    responses:
 *      '200':
 *        description: Class successfully created
 *      '500':
 *        description: Internal Server Error. Check server logs
 *
 */
router.post("/classes", (req,res,next) => {
  instructor.updateClass(req,res,next);
})

/**
 * @swagger
 * /instructor/classes:
 *  put:
 *    tags:
 *      - /instructor
 *    name: Create new Class
 *    summary: Create a new class that the instructor is teaching
 *    consumes:
 *      application/json
 *    produces:
 *      -application/json
 *    parameters:
 *      - in: body
 *        name: updateClass
 *        description: Information about the new class
 *        schema:
 *          type: object
 *          example:
 *            newClass:
 *              instructorId: 5bba55d8372a190ad3dfda13
 *              className: Test New Class
 *              classDesc: Here is an Updated example class
 *              storyList: [123,456,789]
 *              status: active
 *              createdDate: 2018-09-24T09:39:04.305+00:00
 *              lastUpdated: 2018-09-24T09:39:04.305+00:00
 *        required:
 *          - instructorId
 *        properties:
 *          instructorId:
 *            type: string
 *          className:
 *            type: string
 *          classDesc:
 *            type: string
 *          storyList:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *          createdDate:
 *            type: string
 *          lastUpdated:
 *            type: string
 *
 *    responses:
 *      '200':
 *        description: Class successfully created
 *      '500':
 *        description: Internal Server Error. Check server logs
 *
 */
router.put("/classes", (req,res,next) => {
  instructor.updateClass(req,res,next);
})

/**
 * @swagger
 * /instructor/classes:
 *  delete:
 *    tags:
 *      - /instructor
 *    name: Delete a Class
 *    summary: Delete a class that the instructor is teaching
 *    consumes:
 *      application/json
 *    produces:
 *      -application/json
 *    parameters:
 *      - in: body
 *        name: delClass
 *        description: Information about the class to delete
 *        schema:
 *          type: object
 *          example:
 *            instructorId: 5bba55d8372a190ad3dfda13
 *            classId: 5e6eb19e9cd22504c488b164
 *        required:
 *          - instructorId
 *          - classId
 *        properties:
 *          instructorId:
 *            type: string
 *          classId:
 *            type: string
 *
 *    responses:
 *      '200':
 *        description: Class successfully created
 *      '500':
 *        description: Internal Server Error. Check server logs
 *
 */
router.delete("/classes", (req,res,next) => {
  instructor.deleteClass(req,res,next);
})

module.exports = router;
