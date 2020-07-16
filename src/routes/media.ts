import express, { Router } from 'express';
import path from 'path';

const router: Router = express.Router();

router.get('/static/:id', async (req, res) => {
  if (req.params.id == '1') {
    res.sendFile(path.resolve(__dirname, '..','..', 'src', 'static', 'logo.png'));
  }

  if (req.params.id == '2') {
    res.sendFile(path.resolve(__dirname, '..','..', 'src', 'static', 'family.png'));
  }
});

export { router as media };
