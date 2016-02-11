var siteUrl = '';
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', retrieveListItems);

function retrieveListItems() {
  var clientContext = new SP.ClientContext(siteUrl);
  var oList = clientContext.get_web().get_lists().getByTitle('HitCount');
  var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml("<ViewFields><FieldRef Name='Title' /></ViewFields>");
  this.collListItem = oList.getItems(camlQuery);

  clientContext.load(collListItem);

  clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));

}

function onQuerySucceeded(sender, args) {

  var listItemInfo = '';
  var listItemEnumerator = collListItem.getEnumerator();
  while (listItemEnumerator.moveNext()) {
    var oListItem = listItemEnumerator.get_current();
    listItemInfo = oListItem.get_item('Title');
  }
  updateListItem(listItemInfo);
}

function updateListItem(item) {
  var clientContext = new SP.ClientContext(siteUrl);
  var oList = clientContext.get_web().get_lists().getByTitle('HitCount');
  var parsed = parseInt(item, 10);
  parsed++;
  $('#viewResults').html('Total Page Views: ' + parsed);
  this.oListItem = oList.getItemById(1);
  oListItem.set_item('Title', parsed);
  oListItem.update();
  clientContext.executeQueryAsync(Function.createDelegate(this, this.itemupdated), Function.createDelegate(this, this.onQueryFailed));

}

function itemupdated() {

  console.log('Item updated!');
}

function onQueryFailed(sender, args) {

  console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
