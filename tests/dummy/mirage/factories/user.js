/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

faker.locale = 'en_US';

const MATERIAL_UI_COLORS = ['#F44336', '#E91E63', '#9C27B0', '#009688', '#2196F3', '#4CAF50', '#FFC107', '#FF5722', '#607D8B'];

export default Factory.extend({
  firstName: faker.name.firstName,
  lastName: faker.name.firstName,
  company: faker.company.companyName,
  address: faker.address.streetAddress,
  country: faker.address.country,
  state: faker.address.state,
  email: faker.internet.email,
  username: faker.internet.userName,
  avatar: faker.internet.avatar,
  bio: faker.lorem.paragraph,
  color: () => faker.random.arrayElement(MATERIAL_UI_COLORS)
});
