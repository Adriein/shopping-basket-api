import {
  Result,
  Repository,
  UseCase,
  Group,
  User,
  Service,
  PushNotificationSubscription,
} from '../../entities';
import { BadRequest, CustomError, UnExpectedError } from '../../errors';
import { SendPushNotifiactionUseCase } from '../SendPushNotificationUseCase';
import { isEqual } from '../../helpers';

export class CreateGroupUnitUseCase implements UseCase<Group> {
  constructor(
    private repository: Repository<Group>,
    private usersRepository: Repository<User>,
    private pushNotificationSubscriptionRepository: Repository<
      PushNotificationSubscription
    >,
    private service: Service
  ) {}

  async execute(familyUnit: any): Promise<Result<Group>> {
    try {
      const { users } = familyUnit;
      //Check if the family unit contains valid users (atleast always come with one user, the creator of the family unit)
      for (const user of users) {
        const userOnDb = await this.usersRepository.findOne(user.username!);
        if (!userOnDb)
          throw new BadRequest(`No user with username: ${user.username} found`);
      }

      //Check if the family unit already exists
      (await this.repository.findMany({})).forEach((group) => {
        const usersIds = group.users.map((user) => user.id);
        if (isEqual(familyUnit.users, usersIds)) {
          throw new BadRequest('This group already exists');
        }
      });

      //Create the family unit
      const createdGroup = await this.repository.save(familyUnit);

      //Notify other users related to family unit
      const sendSubscription = new SendPushNotifiactionUseCase(
        this.service,
        this.pushNotificationSubscriptionRepository
      );
      users.push(familyUnit.owner);
      await sendSubscription.execute(users, {
        title: 'Shopping List',
        message: `Te han añadido a una unidad familiar`,
      });

      return new Result<Group>([createdGroup]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
