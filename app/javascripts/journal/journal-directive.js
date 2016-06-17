(function() {
  'use strict';

  angular
    .module('journal', [])
    .directive('journal', journal);

  function journal() {
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

        var entries = [{
          picture: 'https://s-media-cache-ak0.pinimg.com/736x/07/f3/a5/07f3a5acaa4fa8a0b0194c233e4c1c09.jpg',
          title: '',
          description: '',
          date: '06/13/2016'
        }];

        // addPage(flipbook, entries[0]);
      },
      controller: function($scope) {
        const vm = this;

        vm.entryDetails = () => {
          console.log('clicked');
        }
      },
      controllerAs: 'journal'
    }
  }

  function addPage(flipbook, entry) {
    // build page
    var newEntry = $('<div class="journal-entry">');
    var picWrapper = $(`<div class="entry-pic" style="background-image: url(${entry.picture})">`);
    var picture = $('<img src="app/images/polaroid-frame.png" alt="journal screenshot">');

    newEntry.on('click', function() {
      console.log('clicked');
    });

    picWrapper.append(picture);
    newEntry.append(picWrapper);

    // add page to flipbook
    var pageCount = flipbook.turn('pages') + 1;
    var positionOfAddition = pageCount;
    var page = $(newEntry);
    var backPage = $('<div class="hard inside-cover">');

    flipbook.turn('addPage', page, positionOfAddition);
    flipbook.turn('addPage', backPage, positionOfAddition + 1);
    pageCount++;
    flipbook.turn('pages', pageCount);
  }
})();
