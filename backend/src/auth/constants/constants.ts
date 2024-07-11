export const jwtConstants = {
    secret: process.env.SECRET_KEY,
    refresh: process.env.REFRESH_KEY,
    accessExpireTime: process.env.ACCESS_EXPIRE_TIME,
    refreshExpireTime: process.env.REFRESH_EXPIRE_TIME,
};
