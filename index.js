const LineBotSDK = require("@line/bot-sdk");

const channelSecret = process.env.secret;

const koa = require("koa");
const koaBodyparser = require("koa-bodyparser");
const koaRouter = require("koa-router");

const lineAPI = new LineBotSDK.LineBotApi(process.env.channelAccessToken);

const app = new koa();
const router = new koaRouter();

app.use(koaBodyparser());

router.post("/",function(ctx) {
    if (LineBotSDK.validateSignature(ctx.request.body, channelSecret)){
        ctx.status = 200;
        ctx.request.body.events.map(MessageHandler);
    }else {
        ctx.status = 401;
        ctx.body = "Authorize failed .";
    }
});

app.use(router.routes());

const server = app.listen(process.env.PORT || 8080);

async function MessageHandler(event) {
    console.loh(event);
}