function relayImgurData(data) {
  console.log(typeof data + ' ' + data);
  console.log(JSON.parse(data));
  window.addPicture(JSON.parse(data));
}
