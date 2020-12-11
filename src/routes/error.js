const router = require("koa-router")();

router.get("/error", async (ctx, next) => {
  await ctx.render("er", {
    title: "错误页面",
  });
});

router.get("*", async (ctx, next) => {
  await ctx.render("404", {
    title: "404页面",
  });
});

module.exports = router;
