'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by ww on 2018/5/28.
 */
const errorHandle = {
    error(app, logger) {
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                logger.error(error);
                ctx.status = 404;
            }
        });
        app.use(async (ctx, next) => {
            await next();
            if (404 != ctx.status) return;
            ctx.status = 404;
            ctx.body = 'err page';
        });
    }
};
exports.default = errorHandle;