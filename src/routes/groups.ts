import express, { Router } from 'express';
import {
  PushNotificationSubscriptionRepository,
  UserRepository,
  GroupRepository,
} from '../infrastructure/repository';
import {
  CreateGroupUnitUseCase,
  GetAllGroupsUseCase,
  GetAllUsersUseCase,
} from '../core/usecases';
import { PushNotificationService } from '../infrastructure/services/PushNotificationService';
import { requireAuth, currentUser } from './middlewares';

const router: Router = express.Router();
const userRepo = new UserRepository();
const familyUnitRepo = new GroupRepository();
const pushNotificationSubscriptionRepo = new PushNotificationSubscriptionRepository();
const pushNotificationService = new PushNotificationService();

router.post('/group', requireAuth, currentUser, async (req, res, next) => {
  try {
    const usecase = new CreateGroupUnitUseCase(
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

router.get('/groups', requireAuth, currentUser, async (req, res, next) => {
  try {
    const usecase = new GetAllGroupsUseCase(familyUnitRepo);

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

export { router as groups };
