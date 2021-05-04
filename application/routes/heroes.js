const Express = require("express");
const router = Express.Router();
const hero_controller = require(`../controllers/heroes`);
const hero_answer_controller = require(`../controllers/hero.answers`);

const middleware = require(`../../system/middleware`);


router.get("/", hero_controller.index);

router.get("/followers/current", hero_controller.fetchCurrentFollowers);
router.get("/followers/next", hero_controller.fetchNextFollowers);
router.get("/followers/prev", hero_controller.fetchPrevFollowers);

router.get("/answer/current", hero_answer_controller.fetchCurrentAnswer);
router.get("/answer/next", hero_answer_controller.fetchNextAnswer);
router.get("/answer/prev", hero_answer_controller.fetchPrevAnswer);


module.exports = router;