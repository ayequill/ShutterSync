import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import multer from 'multer';
import yaml from 'yamljs';

// create express app
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb({ error: 'File type not supported' }, false);
  }
};
const yamlSpec = yaml.load('./server/docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yamlSpec));
export const upload = multer({ storage, fileFilter });
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse cookies
app.use(cookieParser());
// use helmet
app.use(helmet());
// use cors
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
    credentials: true,
  })
);

app.use('/', userRoutes);
app.use('/', authRoutes);

app.use(morgan('dev'));
app.use((err, req, res, next) => {
  if (err.name === 'unauthorizedError') {
    res.status(401).json({
      error: `${err.name}: ${err.message}`,
    });
  } else if (err) {
    res.status(400).json({
      error: `${err.name}: ${err.message}`,
    });
  }
});

export default app;
