export default {
  jwt: {
    secret: String(process.env.SIGNATURE_TOKEN),
    expiresIn: '7d',
  },
};
