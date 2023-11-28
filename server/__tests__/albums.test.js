import request from 'supertest';
import app from '../app.js';
import Album from '../models/album.model.js';
import mongoose from 'mongoose';

process.env.NODE_ENV = 'test';
const API_KEY = process.env.KEY;

const userID = '6563c29c8e92f08eb9db20df';
const baseURL = `/api/users/${userID}/albums`;

describe('Test Albums', () => {
  let req;
  let albumID;
  beforeEach(async () => {
    mongoose.connect(process.env.TEST_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    req = request(app);
    // await Album.deleteMany({});
  });
  afterAll(async () => {
    // await Album.deleteMany({});
    await mongoose.connection.close();
  });

  test('Get All Albums from user', async () => {
    const res = await req.get(baseURL).set('x-api-key', API_KEY);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  }, 10000);

  test('Create an album', async () => {
    const album = { name: 'Test Album' };
    const res = await req.post(baseURL).send(album).set('x-api-key', API_KEY);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test Album');
    albumID = res.body._id;
  });

  test('/GET Get a single album from without api header', async () => {
    const res = await req.get(`${baseURL}/${albumID}`);

    expect(res.status).toBe(401);
  });

  test('/GET Get a single album with api key attached', async () => {
    const res = await req
      .get(`${baseURL}/${albumID}`)
      .set('x-api-key', API_KEY);

    expect(res.status).toBe(200);
  });
});
