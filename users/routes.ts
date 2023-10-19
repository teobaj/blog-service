import { Router, Request, Response } from 'express';
import * as userController from './controllers';

const router: Router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json({
      error: 'No Id provided',
    });
    return;
  }
  const [user, error] = await userController.getUser(id);
  if (error) {
    console.log(user, error);
    res.status(404).json({ message: error.message });
    return;
  }
  res.json(user);
});

router.post('/', async (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({ ok: 'ok' });
});

export { router };
