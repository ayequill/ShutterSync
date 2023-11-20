import dotenv from 'dotenv';

dotenv.config();

const getKeys = process.env.API_KEYS;
const API_KEYS = getKeys ? getKeys.split(',') : ['1234567890'];

const checkApiKey = (req, res, next) => {
  const apiKey = req.get('x-api-key');
  if (API_KEYS.includes(apiKey)) {
    next();
  } else {
    res.status(401).json({
      error: 'Unauthorized',
    });
  }
};

export default checkApiKey;
