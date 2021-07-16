module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://223740c2dc5d.ngrok.io',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'ed2524c889f4931b6b509aa322d2c173'),
    },
  },
});
