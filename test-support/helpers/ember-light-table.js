import hbs from 'htmlbars-inline-precompile';

export function renderCell(context, name) {
  context.set('_cellComponent', `light-table/cells/${name}`);

  context.render(hbs`
    {{#component _cellComponent column row rawValue=(get row column.valuePath) as |_context|}}
      {{partial 'light-table/-partials/base-cell'}}
    {{/component}}
  `);
}

export function renderColumn(context, name) {
  context.set('_columnComponent', `light-table/columns/${name}`);

  context.render(hbs`
    {{#component _columnComponent column table=table as |_context|}}
      {{partial 'light-table/-partials/base-column'}}
    {{/component}}
  `);
}
