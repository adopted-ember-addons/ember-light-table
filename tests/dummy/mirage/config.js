import { discoverEmberDataModels } from 'ember-cli-mirage';
import { createServer } from 'miragejs';
import { A as emberArray } from '@ember/array';
import ENV from '../config/environment';

export default function (config) {
  let finalConfig = {
    ...config,
    models: { ...discoverEmberDataModels(), ...config.models },
    routes,
  };

  return createServer(finalConfig);
}

function routes() {
  this.passthrough('/write-coverage');

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = `${ENV.rootURL}/api`; // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/users', function (schema, request) {
    let { page, limit, sort, dir } = request.queryParams;
    const collection = schema.users.all();
    let { models: users } = collection;

    page = Number(page || 1);
    limit = Number(limit || 20);
    dir = dir || 'asc';

    let meta = {
      page,
      limit,
      totalPages: Math.ceil(users.length / limit),
    };

    if (sort) {
      users = emberArray(users).sortBy(sort);
      if (dir !== 'asc') {
        users = users.reverse();
      }
    }

    let offset = (page - 1) * limit;
    users = users.slice(offset, offset + limit);

    collection.models = users;
    const json = this.serialize(collection);
    json.meta = meta;

    return json;
  });
}
