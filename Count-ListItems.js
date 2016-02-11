var web = '/sites/DssGblInnovationIdeas/IdeaRep/';
ExecuteOrDelayUntilScriptLoaded(Initialize, "sp.js");

function Initialize() {
  var clientContext = new SP.ClientContext(web);
  var list = clientContext.get_web().get_lists().getByTitle("Posts");
  var camlQuery = new SP.CamlQuery();
  var q = "<Where><Eq><FieldRef Name='StatusID' /><Value Type='Integer'>1</Value></Eq></Where>";
  camlQuery.set_viewXml(q);
  this.listItems = list.getItems(camlQuery);
  clientContext.load(listItems, 'Include(Id)');
  clientContext.executeQueryAsync(Function.createDelegate(this, this.onListItemsLoadSuccess),
    Function.createDelegate(this, this.onQueryFailed));
}

function onListItemsLoadSuccess(sender, args) {
  var count = 0;
  var listEnumerator = this.listItems.getEnumerator();
  //iterate though all of the items
  while (listEnumerator.moveNext()) {
    count = count + 1;
  }

  $('#count').text("Total Ideas Posted: " + count);
}

function onQueryFailed(sender, args) {
  console.log('request failed ' + args.get_message() + '\n' + args.get_stackTrace());
}
