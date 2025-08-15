import { AppDataSource } from '../data-source';
import { User } from '../../src/users/entities/user.entity';
import { Role } from '../../src/roles/entities/roles.entity';

async function runSeed() {
  await AppDataSource.initialize();

  const roleRepo = AppDataSource.getRepository(Role);
  const userRepo = AppDataSource.getRepository(User);

  // --- Check and create roles if not exist ---
  let superseniorAdminRole = await roleRepo.findOne({ where: { name: 'SuperSeniorAdmins' } });
  if (!superseniorAdminRole) {
    superseniorAdminRole = roleRepo.create({ name: 'SuperSeniorAdmins', isActive: true });
    await roleRepo.save(superseniorAdminRole);
    console.log('Created role: SuperSeniorAdmins');
  } else {
    console.log('Role already exists: SuperSeniorAdmins');
  }

  let adminRole = await roleRepo.findOne({ where: { name: 'Admins' } });
  if (!adminRole) {
    adminRole = roleRepo.create({ name: 'Admins', isActive: true });
    await roleRepo.save(adminRole);
    console.log('Created role: Admins');
  } else {
    console.log('Role already exists: Admins');
  }

  // --- Check and create users if not exist ---
  let user1 = await userRepo.findOne({ where: { email: 'johngg@example.com' } });
  if (!user1) {
    user1 = userRepo.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johngg@example.com',
      password: 'securepassword', // plain text for now
      isActive: true,
      role: superseniorAdminRole,
    });
    await userRepo.save(user1);
    console.log('Created user: johngg@example.com');
  } else {
    console.log('User already exists: johngg@example.com');
  }

  let user2 = await userRepo.findOne({ where: { email: 'john.doegg@example.com' } });
  if (!user2) {
    user2 = userRepo.create({
      firstName: 'UpdatedName',
      lastName: 'Doe',
      email: 'john.doegg@example.com',
      password: 'securepass',
      isActive: false,
      role: adminRole,
    });
    await userRepo.save(user2);
    console.log('Created user: john.doegg@example.com');
  } else {
    console.log('User already exists: john.doegg@example.com');
  }

  console.log('Database has been seeded successfully!');
  await AppDataSource.destroy();
}

runSeed().catch((err) => {
  console.error('Error while seeding:', err);
  process.exit(1);
});
