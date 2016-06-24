(function() {
  'use strict';

  angular
    .module('journal', [])
    .directive('journal', journal);

  function journal($window, PictureService) {
    return {
      restrict: 'E',
      scope: {
        user: '='
      },
      replace: true,
      templateUrl: 'app/javascripts/journal/journal.html',
      link: function(scope, element, attrs) {
        var flipbook = $('#flipbook');

        flipbook.turn({
          width: '100%',
          height: 300,
          autoCenter: true
        });

        flipbook.turn('peel', 'br');

        loadUserScreenshots();
        listenForScreenshots();

        function loadUserScreenshots() {
          PictureService.getAll().then(function(pics) {
            for (var i = 0; i < pics.length; i++) {
              addPage(flipbook, pics[i].link);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        }

        function listenForScreenshots() {
          element[0].dataUpdate = function() {
            scope.$digest();
          }

          scope.$watch(
            function() { return $window.data; },
            function(newVal, oldVal) {
              if (newVal !== oldVal) {
                var newPic = $window.data.link;
                PictureService.addPicture($window.data);
                addPage(flipbook, newPic);
              }
            }, true);
        }
      },
      controller: function($scope) {
        var vm = this;
      },
      controllerAs: 'journal'
    }
  }

  function addPage(flipbook, newPic) {
    // build page
    var newEntry = $('<div class="journal-entry">');
    var picWrapper = $(`<div class="entry-pic" style="background-image: url(${newPic})">`);
    var picture = $('<img src="app/images/polaroid-frame.png" alt="journal screenshot">');

    picWrapper.append(picture);
    newEntry.append(picWrapper);

    // add page to flipbook
    var pageCount = flipbook.turn('pages') - 1;
    var positionOfAddition = pageCount;
    var page = $(newEntry);
    var backPage = $('<div class="hard inside-cover">');

    flipbook.turn('addPage', page, positionOfAddition);
    flipbook.turn('addPage', backPage, positionOfAddition + 1);
    pageCount+= 2;
    flipbook.turn('pages', pageCount);
  }

})();
