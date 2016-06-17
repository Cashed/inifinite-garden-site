window.relayImgurData = function(data) {
  console.log(typeof data + ' ' + data);
  console.log(JSON.parse(data));
  addPicture(JSON.parse(data));
}
