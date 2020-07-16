import express, { Router } from 'express';
import {
  PushNotificationSubscriptionRepository,
  UserRepository,
  FamilyUnitRepository,
} from '../infrastructure/repository';
import { RegisterFamilyUnitUseCase } from '../core/usecases';
import { PushNotificationService } from '../infrastructure/services/PushNotificationService';

const router: Router = express.Router();
const userRepo = new UserRepository();
const familyUnitRepo = new FamilyUnitRepository();
const pushNotificationSubscriptionRepo = new PushNotificationSubscriptionRepository();
const pushNotificationService = new PushNotificationService();

router.post('/group', async (req, res, next) => {
  try {
    const usecase = new RegisterFamilyUnitUseCase(
      familyUnitRepo,
      userRepo,
      pushNotificationSubscriptionRepo,
      pushNotificationService
    );

    const familyUnit = await usecase.execute(req.body);
    res.send([familyUnit]);
  } catch (error) {
    next(error);
  }
});

router.get('/groups', async (req, res) => {});

export { router as groups };
