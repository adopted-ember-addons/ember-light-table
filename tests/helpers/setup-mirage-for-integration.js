import mirageInitializer from '../../initializers/ember-cli-mirage';

export default function startMirage(container) {
  mirageInitializer.initialize(container);
}

export function createUsers(numUsers = 20) {
  server.createList('user', numUsers);
  return server.db.users;
}
