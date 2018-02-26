import mirageInitializer from '../../initializers/ember-cli-mirage';

export default function startMirage(container) {
  mirageInitializer.initialize(container);
}

export function createUsers(numUsers = 20) {
  // TODO: avoid leaky state, use when available:
  //       https://github.com/samselikoff/ember-cli-mirage/issues/1257
  server.db.emptyData();
  server.createList('user', numUsers);
  return server.db.users;
}
