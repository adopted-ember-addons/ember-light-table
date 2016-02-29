export default function(){
  this.transition(
    this.toRoute('index'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  this.transition(
    this.toRoute('grouped'),
    this.fromRoute(['expandable', 'selectable']),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  this.transition(
    this.toRoute('expandable'),
    this.fromRoute('selectable'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
}
