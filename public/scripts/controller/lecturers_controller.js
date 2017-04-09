app.controller('lecturer_ctl', ['$scope', '$http', '$window', '$compile', '$timeout','Upload', function ($scope, $http, $window, $compile,$timeout,Upload) {

	var refresh = function () {
		$http({
			method: 'GET',
			url: '/menu_Lecturers'
		}).then(function successCallback(response) {
			setTimeout(
			function(){
				$scope.lecturers_list = response.data;
				loadtable();
			},500);

		}, function errorCallback(response) {

		});
		
		
		$http({
			method: 'GET',
			url: '/menu_Lecturers_user'
		}).then(function successCallback(response) {
			$scope.lecturers_list_user = response.data;
		}, function errorCallback(response) {

		});
	}
	
	
	
	var loadtable = function () {
		var i = 1;
		angular.forEach($scope.lecturers_list, function (obj) {
			obj.No = i;		
			i++;
		});
		var t = jQuery("#data_table").DataTable({
			"aLengthMenu": [
				[10, 25, 50, 100, -1],
				[10, 25, 50, 100, "All"]
			],
			"iDisplayLength": 10,
			"retrieve": true,
			//"processing": true,
			"deferRender": true,
			"aaData": $scope.lecturers_list,
			"rowId": "id_lec",
			"aoColumns": [
				{ "data": "No", "sWidth": "5%" },
				{ "data": "code_lec", "sClass": "text" },
				{
					"data": null, mRender: function (data, type, row) {
						for(var j=0;j< $scope.lecturers_list_user.length;j++){
							if ( $scope.lecturers_list_user[j].user_code == data.user_code) {
									return $scope.lecturers_list_user[j].fullname;
							}
							
						}
					}, "sClass": "text"
				},
				{
					"data": null, mRender: function (data, type, row) {
						for(var j=0;j< $scope.lecturers_list_user.length;j++){
							if ( $scope.lecturers_list_user[j].user_code == data.user_code) {
									if ($scope.lecturers_list_user[j].phone == "undefined" || $scope.lecturers_list_user[j].phone == null) {
											$scope.lecturers_list_user[j].phone = "";
										}
									return $scope.lecturers_list_user[j].phone;
							}
							
						}
					}, "sClass": "text"
				},
				{ "data": "degree", "sClass": "text" },
				{
					"data": null, mRender: function (data, type, row) {
						if (data.description == "undefined" || data.description == null) {
							data.description = "";
						}
						return data.description;
					}, "sClass": "text"
				},			
				{ "data": "major", "sClass": "text" },			
				{
					"data": null, mRender: function (data, type, row) {
						for(var j=0;j< $scope.lecturers_list_user.length;j++){
							if ( $scope.lecturers_list_user[j].user_code == data.user_code) {
									if ($scope.lecturers_list_user[j].email == "undefined" || $scope.lecturers_list_user[j].email == null) {
											$scope.lecturers_list_user[j].email = "";
										}
									return $scope.lecturers_list_user[j].email;
							}
							
						}
					}, "sClass": "text"
				},
				{
					"data": null, mRender: function (data, type, row) {
						var str = "";
						if (data.status_lec == 1) {
							str = "Active";
						}
						else {
							str = "Inactive";
						}
						return str;
					}, "sWidth": "5%"
				},
				{
					"data": null, mRender: function (data, type, row, index) {
						return "<button class='btn btn-warning btn-xs' data-toggle='modal' data-target='#myModalEdit' ng-click='editt(" + index.row + ")'><span class='glyphicon glyphicon-edit'></span></button>&nbsp;"
							+ "<button class='btn btn-danger btn-xs' id=" + data.id_lec + " data-toggle='modal'  ng-click='getremove(" + data.id_lec + ")'><span class='glyphicon glyphicon-remove'></span></button>";
					}, "sWidth": "7%"
				}
			],
			"order": [[0, "asc"]]
		});

		t.on('order.dt search.dt draw.dt page.dt destroy.dt', function () {
			$compile(document.getElementById('data_table'))($scope);
		}).draw();

		jQuery('#data_table tbody').on('click', 'tr', function () {
			t.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
		});
	}
	
	
	refresh();

	// enter keudown 
	jQuery('input').keydown(function(event){ 
		var keyCode = (event.keyCode ? event.keyCode : event.which);   
			if (keyCode == 13) {
				addLecturer();
			}
	});

	$scope.getremove = function (id) {
		jQuery("#myModalConfirm").modal('show');
		$scope.id = id;
	}

	//xoa
	$scope.remove = function () {
		$http.delete('/menu_Lecturers/' + $scope.id).then(function successCallback(response) {
			$scope.message = 'Removed successfully';
			jQuery("#myModalmessage").modal('show');
			$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
			jQuery("#myModalmessage").on('hidden.bs.modal', function(){
					window.location.reload();
			});
		}, function errorCallback(response) {

		});
	}


				//upload file
				$scope.$watch('file', function () {
					if ($scope.file != null) {
						$scope.files = [$scope.file]; 
					}
				});

				
			//
		

	//them
	$scope.addLecturer = function (files) {
		
	
		
		

		if ($scope.add.$invalid || $scope.add.$pattern ) {
			if ($scope.add.strongSecret.$error.required) {
			
				$scope.require = true;
				$timeout(function () {
					$scope.require = false;
				}, 2000);
			};
			if ($scope.add.strongSecret2.$error.required) {
				
				$scope.require2 = true;
				$timeout(function () {
					$scope.require2 = false;
				}, 2000);
			}
			if ($scope.add.strongSecret3.$error.required) {
				
				$scope.require3 = true;
				$timeout(function () {
					$scope.require3 = false;
				}, 2000);
			}
			if ($scope.add.strongSecret4.$error.required) {
				
				$scope.require4 = true;
				$timeout(function () {
					$scope.require4 = false;
				}, 2000);
			}
            return;
        }		


		for (var i = 0; i < $scope.lecturers_list.length; i++) {
			if (angular.lowercase($scope.lecturers_list[i].code_lec) == angular.lowercase($scope.lecturer.code_lec)) {
				$scope.exiss = true;
				$timeout(function () {
					$scope.exiss = false;
				}, 3000);
				return;
			}
		}
		
			//set user_code
			for(var i = 0;i< $scope.lecturers_list_user.length;i++){
				if($scope.lecturers_list_user[i].fullname == $scope.fullname){
					$scope.lecturer.user_code = $scope.lecturers_list_user[i].user_code;
					break;
				}
			}
		
	
	
	
	

		//upload image
					if (files && files.length) {
							var file = files[i];
							var i =0;
							if (!file.$error) {
								Upload.upload({
									url: '/menu_Lecturers_image',
									data: {
									  username: $scope.username,
									  file: file  
									}
								}).then(function (resp) {
									$timeout(function() {
										/*$scope.log = 'file: ' +
										resp.config.data.file.name +
										', Response: ' + JSON.stringify(resp.data) +
										'\n' + $scope.log;*/
										$scope.log = "ok1";
										// trong nay muon show thi minh dung $scope.log = cai gi do
									});
								}, null, function (evt) {
									var progressPercentage = parseInt(100.0 *
											evt.loaded / evt.total);
									$scope.log = 'progress: ' + progressPercentage + 
										'% ' + evt.config.data.file.name;
										if(progressPercentage ==100 ){
											i++;
											if(progressPercentage ==100 && i ==2){
															
													$http.post('/menu_Lecturers', $scope.lecturer).then(function successCallback(response) {
													$scope.lecturer.No = $scope.lecturers_list.length + 1;
													$scope.lecturer.status_lec = 1;
													$scope.lecturers_list.push($scope.lecturer);

													var dt = jQuery('#data_table').dataTable();
													dt.fnAddData($scope.lecturer);
													dt.fnDraw();
													$compile(document.getElementById('data_table'))($scope);
													$scope.code_lec = $scope.lecturer.code_lec;
													$scope.fullname = $scope.lecturer.fullname;
													$scope.visibility = true;
													
													$timeout(function () {
														$scope.visibility = false;
													}, 3000);
													
													$scope.lecturer = null;
													$scope.fullname= null;
													$scope.image= null;




												}, function errorCallback(response) {
													
												});
											}
										}
									 
								});	
								
							}
						
					}else{
						
						
												$http.post('/menu_Lecturers', $scope.lecturer).then(function successCallback(response) {
												$scope.lecturer.No = $scope.lecturers_list.length + 1;
												$scope.lecturer.status_lec = 1;
												$scope.lecturers_list.push($scope.lecturer);

												var dt = jQuery('#data_table').dataTable();
												dt.fnAddData($scope.lecturer);
												dt.fnDraw();
												$compile(document.getElementById('data_table'))($scope);
												$scope.code_lec = $scope.lecturer.code_lec;
												$scope.fullname = $scope.lecturer.fullname;
												$scope.visibility = true;
												
												$timeout(function () {
													$scope.visibility = false;
												}, 3000);
												
												$scope.lecturer = null;
												$scope.fullname= null;
												$scope.image= null;




												}, function errorCallback(response) {
													
												});
						
									
					}
					
	}
	//reload when close modal add
			jQuery("#myModalAdd").on('hidden.bs.modal', function () {
				$timeout(function () {
					window.location.reload();
				}, 500)
				});

	//load form edit
	$scope.editt = function (index) {
		var toSelect = $scope.lecturers_list[index];
		$scope.editlecturer = toSelect;
		
		jQuery("#myModalEdit").on('hidden.bs.modal', function () {
			$timeout(function () {
				window.location.reload();
			}, 500)
		});

	}

	//sua
	$scope.updatelecturer = function (files) {
		if ($scope.edit.$invalid || $scope.edit.$pattern ) {
			if ($scope.edit.strongSecret.$error.required) {
			
				$scope.require = true;
				$timeout(function () {
					$scope.require = false;
				}, 2000);
			};
			if ($scope.edit.strongSecret2.$error.required) {
				
				$scope.require2 = true;
				$timeout(function () {
					$scope.require2 = false;
				}, 2000);
			}
            return;
        }


		for (var i = 0; i < $scope.lecturers_list.length; i++) {
			if ($scope.lecturers_list[i].id_lec != $scope.editlecturer.id_lec && angular.lowercase($scope.lecturers_list[i].code_lec) == angular.lowercase($scope.editlecturer.code_lec)) {
				$scope.exiss = true;
				refresh();
				$timeout(function () {
                    $scope.exiss = false;
                }, 3000);
				return;
			}
		}
		//set user_code
			for(var i = 0;i< $scope.lecturers_list_user.length;i++){
				if($scope.lecturers_list_user[i].fullname == $scope.editfullname){
					$scope.editlecturer.user_code = $scope.lecturers_list_user[i].user_code;
					break;
				}
			}
				//upload image
					if (files && files.length) {
								for (var i = 0; i < files.length; i++) {
								  var file = files[i];
								  if (!file.$error) {
									Upload.upload({
										url: '/menu_Lecturers_image_edit',
										data: {
										  username: $scope.username,
										  file: file  
										}
									}).then(function (resp) {
										
									}, null, function (evt) {
										
										var progressPercentage = parseInt(100.0 *
											evt.loaded / evt.total);
										if(progressPercentage ==100 ){
											i++;
											if(progressPercentage ==100 && i ==2){
												
														$http.put('/menu_Lecturers/' + $scope.editlecturer.id_lec, $scope.editlecturer).then(function successCallback(response) {
															$scope.message = 'Update Successful';
															jQuery("#myModalmessage").modal('show');
															jQuery("#myModalEdit").modal('hide');
															jQuery("#myModalEdit").on('hidden.bs.modal', function () {
															$timeout(function () {
																window.location.reload();
															}, 500)
															});
														}, function errorCallback(response) {

														});
												
												
											}
													
										}

									});
								  }
								}
					}else{
						
						$http.put('/menu_Lecturers/' + $scope.editlecturer.id_lec, $scope.editlecturer).then(function successCallback(response) {
							$scope.message = 'Update Successful';
							jQuery("#myModalmessage").modal('show');
							jQuery("#myModalEdit").modal('hide');
							jQuery("#myModalEdit").on('hidden.bs.modal', function () {
							$timeout(function () {
								window.location.reload();
							}, 500)
							});
						}, function errorCallback(response) {

						});
						
						
					}
			

	}

}]);

