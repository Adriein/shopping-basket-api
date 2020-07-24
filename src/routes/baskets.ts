import express, { Router } from 'express';
import {
  PushNotificationSubscriptionRepository,
  UserRepository,
  BasketRepository,
} from '../infrastructure/repository';
import {
  CreateBasketUseCase,
  GetAllRelatedBasketsUseCase,
  GetAllUsersUseCase,
} from '../core/usecases';
import { PushNotificationService } from '../infrastructure/services/PushNotificationService';
import { requireAuth, currentUser } from './middlewares';

const router: Router = express.Router();
const userRepo = new UserRepository();
const familyUnitRepo = new BasketRepository();
const pushNotificationSubscriptionRepo = new PushNotificationSubscriptionRepository();
const pushNotificationService = new PushNotificationService();

router.post('/basket', requireAuth, currentUser, async (req, res, next) => {
  try {
    const usecase = new CreateBasketUseCase(
      familyUnitRepo,
      userRepo,
      pushNotificationSubscriptionRepo,
      pushNotificationService
    );
    req.body.owner = req.currentUser!.id;
    const result = await usecase.execute(req.body);
    res.send(result.data);
  } catch (error) {
    next(error);
  }
});

router.get('/baskets', requireAuth, currentUser, async (req, res, next) => {
  try {
    const usecase = new GetAllRelatedBasketsUseCase(familyUnitRepo);

    res.send((await usecase.execute(req.currentUser!)).data);
  } catch (error) {
    next(error);
  }
});

router.get('/users', requireAuth, currentUser, async (req, res, next) => {
  try {
    const usecase = new GetAllUsersUseCase(userRepo);

    res.send((await usecase.execute(req.currentUser!)).data);
  } catch (error) {
    next(error);
  }
});

export { router as baskets };
