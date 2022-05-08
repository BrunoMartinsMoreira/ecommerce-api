export default {
  jwt: {
    secret: process.env.SIGNATURE_TOKEN,
    expiresIn: '7d',
  },
};
