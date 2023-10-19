import { Router, Request, Response } from 'express';
import * as userController from './controllers';
import { validateUser } from './validator';
import { User } from './types';

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
  try {
    const user = req.body;
    const [success, error] = await userController.addUser(user as Omit<User, 'id'>);
    if (!success) {
      res.status(409).json({
        error: error!.message,
      });
      return;
    }
    res.json({
      success,
    });
    return;
  } catch (e: any) {
    res.status(400).json({ message: e.message });
    return;
  }
});

export { router };
