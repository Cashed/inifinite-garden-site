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
          autoCenter: false
        });

        flipbook.turn('peel', 'br');

        loadUserScreenshots();
        listenForScreenshots();

        function loadUserScreenshots() {
          PictureService.getAll().then(function(pics) {
            for (var i = 0; i < pics.length; i++) {
              addPage(flipbook, pics[i]);
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
                PictureService.addPicture($window.data).then(function(newPic) {
                  addPage(flipbook, newPic);
                });
              }
            }, true);
        }
      },
      controller: function($scope) {
        var vm = this;
        vm.pictureDetails = {};
        vm.showModal = false;

        vm.buildDetails = function(pic) {
          vm.pictureDetails.id = pic.id;
          vm.pictureDetails.link = pic.link;
          vm.pictureDetails.date = moment(pic.created_at).calendar();
          vm.pictureDetails.title = pic.title;
          vm.pictureDetails.description = pic.description;
          vm.showModal = true;
          $scope.$apply();
        }
      },
      controllerAs: 'journal'
    }
  }

  function addPage(flipbook, pic) {
    // build page
    var newEntry = $('<div class="journal-entry">');
    var picWrapper = $(`<div class="entry-pic" style="background-image: url(${pic.link})">`);
    var picture = $('<img class="screenshot-preview" src="app/images/polaroid-frame.png" alt="journal screenshot">');

    // add details button to page
    var detailsBackground = $('<div class="details-background">');
    var detailsButton = $(`<img class="details-button" data-toggle="modal" data-target="#entry-details" id="${pic.id}" src="app/images/view-details-button.png">`);

    picWrapper
      .mouseenter(function() {
        detailsBackground.show();
      })
      .mouseleave(function() {
        detailsBackground.hide();
      });

    detailsBackground.append(detailsButton);

    picWrapper.append(picture);
    picWrapper.append(detailsBackground);
    newEntry.append(picWrapper);

    // send picture details back to angular scoped function
    flipbook.on('click', `#${pic.id}`, function() {
      angular.element(`#${pic.id}`).scope().journal.buildDetails(pic);
    });


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
