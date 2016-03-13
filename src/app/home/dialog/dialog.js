(function() {
    'use strict';
	angular.module('angularBase')
		.controller('shareDialogController', ShareDialogController);

	function ShareDialogController($mdDialog){
		var share = this;
		//Set default
		share.permissions = "admin";
		share.changePermissions = changePermissions;
		share.close = close;

		function changePermissions(type){
			share.permissions = type;
		}

		function close() {
			$mdDialog.cancel();
		}

		//Just some hardcoded data to show off what it would look like if there was real data
		share.avatarMembers = [
			{
				'name': 'Eric Ponvelle',
				'email': 'eric.ponvelle@email.com',
				'img': 'avatar_1'
			},
			{
				'name': 'John Locke',
				'email': 'john.locke@email.com',
				'img': 'avatar_2'
			},
			{
				'name': 'Jack Shepard',
				'email': 'jack.shepard@email.com',
				'img': 'avatar_3'
			},
			{
				'name': 'Gamer Boy',
				'email': 'gamer.boy@email.com',
				'img': 'avatar_4'
			},
			{
				'name': 'Cindy Lou',
				'email': 'cindy.lou@email.com',
				'img': 'avatar_5'
			},
			{
				'name': 'Jane Pertelli',
				'email': 'jane.pertelli@email.com',
				'img': 'avatar_6'
			}
		];

		share.avatarNonMembers = [
			{
				'name': 'Sarah Kim',
				'email': 'sarah.kim@email.com',
				'img': 'avatar_7'
			},
			{
				'name': 'Jennifer Mead',
				'email': 'jennifer.mead@email.com',
				'img': 'avatar_8'
			}
		];

		share.shareExtentOptions = [
			{
				description: 'Current & future events',
				value: 1
			},
			{
				description: 'Future events',
				value: 2
			},
			{
				description: 'Current month\'s events',
				value: 3
			},
			{
				description: 'Current week\'s events',
				value: 4
			},
			{
				description: 'Custom',
				value: 5
			}
		];
	}

})();
