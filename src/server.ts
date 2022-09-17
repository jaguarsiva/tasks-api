import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/v1', routes);

// Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // TODO: Error logging

  console.log(req.method, req.originalUrl);
  console.log(error);
  if (error.exception) {
    const { status, exception, ...errorBody } = error;
    res.status(status).json(errorBody);
  } else if (error.response) {
    res.status(error.response.status).json(error.response);
  } else {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log('app listening on port', port);
});
