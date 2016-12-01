
import * as express from "express";

const router = express.Router();

router.get("/", async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        res.render("default", {});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
