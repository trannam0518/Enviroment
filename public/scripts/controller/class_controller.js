app.controller('class_ctl', ['$scope', '$http', '$window', '$compile', '$timeout', function ($scope, $http, $window, $compile, $timeout) {
    var refresh = function () {

        $http({
            method: 'GET',
            url: '/menu_Class'
        }).then(function successCallback(response) {
			
			setTimeout(function(){
				$scope.class_list =response.data;
				loadtable();
			},500);

        }, function errorCallback(response) {
			
        });
		
		
		
		$http({
            method: 'GET',
            url: '/menu_Class_course'
        }).then(function successCallback(response) {

			$scope.class_course_list =response.data;
           
        }, function errorCallback(response) {
			
        });

    }
    var loadtable = function () {
        var i = 1;
        angular.forEach($scope.class_list, function (obj) {
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
            "aaData": $scope.class_list,
            "rowId": "id_class",
            "aoColumns": [
                { "data": "No","sWidth":"5%" },
                { "data": "code_class", "sClass": "text" },
                { "data": "name_class", "sClass": "text" },
				{
					"data": null, mRender: function (data, type, row) {
								for(var i = 0;i<$scope.class_course_list.length;i++){
									//console.log($scope.class_list.dis_code)
									if($scope.class_course_list[i].dis_code == data.dis_code)
										{
											return $scope.class_course_list[i].dis_name;
										}
								}
					}		
				},
                {
                    "data": "study_time", "sClass": "text"
                },
                {
					"data": null, mRender: function (data, type, row) {
								var str = "";
								var date_star = new Date(data.startday);
								var date = date_star.getDate();
								var month = date_star.getMonth() + 1;
								str = (month >= 10 ? month : "0" + month) + "/" + (date >= 10 ? date : "0" + date) + "/" + date_star.getFullYear();
								return str;
					}		
				},
                {
					"data": null, mRender: function (data, type, row) {
						var str = "";
						var date_end = new Date(data.endday);
						var date = date_end.getDate();
						var month = date_end.getMonth() + 1;
						str = (month >= 10 ? month : "0" + month) + "/" + (date >= 10 ? date : "0" + date) + "/" + date_end.getFullYear();
						return str;
					}
				},
                {
                    "data": null, mRender: function (data, type, row, index) {
                        return "<button class='btn btn-warning btn-xs' data-toggle='modal' data-target='#myModalEdit' ng-click='editt(" + index.row + ")'><span class='glyphicon glyphicon-edit'></span></button>&nbsp;"
                            + "<button class='btn btn-danger btn-xs' id=" + data.id_class + " data-toggle='modal'  ng-click='getremove(" + data.id_class + ")'><span class='glyphicon glyphicon-remove'></span></button>";
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

	 jQuery('input').keydown(function(event){ 
		var keyCode = (event.keyCode ? event.keyCode : event.which);   
			if (keyCode == 13) {
				addkhoahoc();
			}
	});
    //them
    $scope.addclass = function () {
        if ($scope.add.$invalid || $scope.add.$pattern ) {
			if ($scope.add.strongSecret.$error.required) {
			
				$scope.require1 = true;
				$timeout(function () {
					$scope.require1 = false;
				}, 2000);
			};
			if ($scope.add.strongSecret1.$error.required) {
				
				$scope.require2 = true;
				$timeout(function () {
					$scope.require2 = false;
				}, 2000);
			}
			if ($scope.add.strongSecret2.$error.required) {
				
				$scope.require3 = true;
				$timeout(function () {
					$scope.require3 = false;
				}, 2000);
			}
			if ($scope.add.strongSecret3.$error.required ||$scope.add.strongSecret3.$error.pattern ) {
			
				$scope.date1 = true;
				$timeout(function () {
					$scope.date1 = false;
				}, 2000);
			};
			if ($scope.add.strongSecret4.$error.required ||$scope.add.strongSecret4.$error.pattern ) {
			
				
				$scope.date2 = true;
				$timeout(function () {
					$scope.date2 = false;
				}, 2000);
			}
			if ($scope.add.strongSecret5.$error.required) {
				
				$scope.require4 = true;
				$timeout(function () {
					$scope.require4 = false;
				}, 2000);
			}
            return;
        }
		
		
		
		
		
		
		// check id existed
        for (var i = 0; i < $scope.class_list.length; i++) {
            if (angular.lowercase($scope.class_list[i].code_class) == angular.lowercase($scope.class.code_class)) {
                $scope.exiss = true;
                $timeout(function () {
                    $scope.exiss = false;
                }, 3000);
                return;
            }
        }
		
		
		// comparedate
		
				var timeStart = new Date($scope.class.startday);
				var timeEnd = new Date($scope.class.endday);
				if(timeStart.getFullYear() >= timeEnd.getFullYear()){
					if(timeStart.getMonth() + 1 >= timeEnd.getMonth() + 1){
							if(timeStart.getDate() >= timeEnd.getDate()){
								$scope.comparedate = true;
								$timeout(function () {
								$scope.comparedate = false;
								}, 3000);
								return;
							}
					}					
				} 
					
		for(var i=0;i<$scope.class_course_list.length;i++){	
			if($scope.dis_name == $scope.class_course_list[i].dis_name)
			{
			 $scope.class.dis_code = $scope.class_course_list[i].dis_code	
				
			}
		}
		
		
		
		
		
        $http.post('/menu_Class', $scope.class).then(function successCallback(response) {
            //refresh();
            //$window.location.reload();
             $scope.class.No = $scope.class_list.length + 1;
            $scope.class_list.push($scope.class);
			var dt = jQuery('#data_table').dataTable();
            dt.fnAddData($scope.class);
            dt.fnDraw();
            $compile(document.getElementById('data_table'))($scope);
            $scope.code_class = $scope.class.code_class;
            $scope.name_class = $scope.class.name_class;
            $scope.visibility = true;
            $timeout(function () {
                $scope.visibility = false;
            }, 3000);
            $scope.class = null;
            $scope.dis_name = null;
        }, function errorCallback(response) {

        });
    }



    $scope.getremove = function (id) {
        $scope.id = id;
        jQuery("#myModalConfirm").modal('show');
    }


    //xoa
    $scope.remove = function () {
        $http.delete('/menu_Class/' + $scope.id).then(function successCallback(response) {
			 $scope.message = 'Remove Successful';
			jQuery("#myModalmessage").modal('show');

           jQuery("#myModalmessage").on('hidden.bs.modal', function(){
					window.location.reload();
			});
			
            $timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
        }, function errorCallback(response) {
        });
    }




    //load form edit
    $scope.editt = function (index) {
        toSelect = $scope.class_list[index];
        $scope.editclass = toSelect;
        var date_end = new Date(toSelect.endday);
		var date =  date_end.getDate();
        var month = date_end.getMonth() + 1;
        var str1 = (month >= 10 ? month : "0" + month) + "/" + (date >= 10 ? date : "0" + date) + "/" + date_end.getFullYear();
        $scope.editclass.endday = str1;

        var date_star = new Date(toSelect.startday);
		var date = date_star.getDate();
        var month = date_star.getMonth() + 1;
        var str2 = (month >= 10 ? month : "0" + month) + "/" + (date >= 10 ? date : "0" + date) + "/" + date_star.getFullYear();
        $scope.editclass.startday = str2;
        jQuery("#myModalEdit").on('hidden.bs.modal', function () {
			$timeout(function () {
				window.location.reload();
			}, 500)
		});
    }


    //sua
    $scope.updateclass = function () {

		if ($scope.edit.$invalid || $scope.edit.$pattern ) {
			if ($scope.edit.strongSecret.$error.required) {
			
				$scope.require1 = true;
				$timeout(function () {
					$scope.require1 = false;
				}, 2000);
			};
			if ($scope.edit.strongSecret1.$error.required) {
				
				$scope.require2 = true;
				$timeout(function () {
					$scope.require2 = false;
				}, 2000);
			}
			if ($scope.edit.strongSecret2.$error.required) {
				
				$scope.require3 = true;
				$timeout(function () {
					$scope.require3 = false;
				}, 2000);
			}
			if ($scope.edit.strongSecret3.$error.required ||$scope.edit.strongSecret3.$error.pattern ) {
			
				$scope.date1 = true;
				$timeout(function () {
					$scope.date1 = false;
				}, 2000);
			};
			if ($scope.edit.strongSecret4.$error.required ||$scope.edit.strongSecret4.$error.pattern ) {
			
				
				$scope.date2 = true;
				$timeout(function () {
					$scope.date2 = false;
				}, 2000);
			}
            return;
        }

		
		
		
		// comparedate
		
				var timeStart = new Date($scope.editclass.startday);
				var timeEnd = new Date($scope.editclass.endday);
				if(timeStart.getFullYear() >= timeEnd.getFullYear()){
					if(timeStart.getMonth() + 1 >= timeEnd.getMonth() + 1){
							if(timeStart.getDate() >= timeEnd.getDate()){
								$scope.comparedate = true;
								$timeout(function () {
								$scope.comparedate = false;
								}, 3000);
								return;
							}
					}					
				} 
		
        for (var i = 0; i < $scope.class_list.length; i++) {
            if (angular.lowercase($scope.class_list[i].code_class) == angular.lowercase($scope.editclass.code_class) && $scope.class_list[i].id_class != $scope.editclass.id_class) {
                $scope.message = 'Update Fail';
                jQuery("#myModalmessage").modal('show');
                refresh();
				$scope.exiss = true;
				$timeout(function () {
                    $scope.exiss = false;
                }, 3000);
                $timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
                return;
            }
        }
		//set value cho editclass.dis_code
					
		for(var i=0;i<$scope.class_course_list.length;i++){	
			if($scope.edit_dis_name == $scope.class_course_list[i].dis_name)
			{
			 $scope.editclass.dis_code = $scope.class_course_list[i].dis_code	
				
			}
		}
		
	
		
		
		
        $http.put('/menu_Class/' + $scope.editclass.id_class, $scope.editclass).then(function successCallback(response) {
            $scope.message = 'Update Successful';
            jQuery("#myModalmessage").modal('show');
			jQuery("#myModalEdit").modal('hide');
			jQuery("#myModalEdit").on('hidden.bs.modal', function () {
			$timeout(function () {
				window.location.reload();
			}, 500)
			});
            $timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
        }, function errorCallback(response) {

        });
    }
}]);