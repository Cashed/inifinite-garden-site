var data = {};

window.addEventListener('message', function(event) {
  var parsed = JSON.parse(event.data);
  data.link = parsed.data.link;
  updateAngular();
});

function updateAngular() {
  document.getElementsByClassName('angular-hook')[0].dataUpdate();
}
