(function() {
    'use strict';
	angular.module('angularBase')
		.controller('homeCtrl', HomeCtrl);

	function HomeCtrl($mdDialog, $mdSidenav){
		var home = this;

		home.openMenu = openMenu;
		home.openShare = openShare;
		home.openSidebar = openSidebar;
		home.isOpenSidebar = false;

		function openMenu($mdOpenMenu, ev) {
			$mdOpenMenu(ev);
			console.log("here");
	    }

	    function openShare(ev) {
	        $mdDialog.show({
				controller: 'shareDialogController',
				controllerAs: 'share',
				templateUrl: 'app/home/dialog/dialog.tpl.html'
	        })
	        .then(function(answer) {
				//Action closed
	        }, function() {
				//Dialog canceled
	        });
	  	}

	  	function openSidebar(){
	  		$mdSidenav('right').toggle();
	  		console.log('open');
	  		home.isOpenSidebar = !home.isOpenSidebar;
	  	}
	}

})();
