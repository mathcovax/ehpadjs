import { method } from "ehpadjs";

export default method(
    (req, res, short) => {
        short.msg("Super message!").s({ping: "pong"});
    }
);