<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <script src="js/jquery-1.9.1.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" crossorigin="anonymous">
    <link rel="stylesheet" href="css/dataTables.bootstrap5.css">
    <link rel="stylesheet" href="css/all.min.css"> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet">
    <link rel="stylesheet" href="css/custom.css"> 
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md">
                <div class="title">
                </div>                
                <div style="display:flex">
                    <div style="padding:2px"><button id="list_btn" class="btn btn-success">Contacts List</button></div>
                    <div style="padding:2px"><button id="add_btn" class="btn btn-primary">Add New Contact</button></div>
                    <div style="padding:2px">
                        <form id='form_csv' action="tx_uploadCSV.php" method="POST" enctype="multipart/form-data"> 
                        <div style="margin: 0 15px;" onclick="file_explorer();">
                            <input id='file_csv' type='file' name='file_csv' style="display: none;" />
                        </div>
                            <button id='button_csv' type="button" class="btn btn-warning">Upload CSV</button>
                            <input type='submit' value='Submit'  style="display: none;" />
                        </form>
                    </div>
                    <div id="status_txt"></div>
                </div>
                <div class="tab-container">
                    
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="list">
                            <h5 class="mark">Contacts List</h5>
                            <div class="row">
                                <div class="col">
                                    <div>
                                        <table id="dataTable_contactsList" class="table table-bordered table-striped">
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade show" id="details"><form onsubmit="return false">
                            <h5 class="mark">Contact Details - <span id="contact_first_last_name"></span></h5>
                            
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label class="styled" for="">Id</label>
                                        <input type="text" class="form-control" id="id" disabled>
                                    </div>
                                    <div class="form-group">
                                        <label class="styled" for="">First Name</label>
                                        <input type="text" class="form-control" id="first_name" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="styled" for="">Last Name</label>
                                        <input type="text" class="form-control" id="last_name" required>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label class="styled" for="">Email</label>
                                        <input type="email" class="form-control" id="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="styled" for="">Phone Number</label>
                                        <input type="tel" class="form-control" id="phone_number" required onkeypress="javascript:return onlyNumbers(event);" >
                                    </div>
                                    <div class="form-group">
                                        <label class="styled" for="">Date Created</label>
                                        <input type="text" class="form-control" id="datetime_created" disabled>
                                    </div>
                                </div>
                            </div>
                            <div style="padding:2px"><button type="submit" id="update_btn" class="btn btn-info">Update</button></div>
                        </div></form>
                        <div class="tab-pane fade show" id="form"><form onsubmit="return false">
                            <h5 class="mark">Add New Contact</h5>
                            
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label class="styled" for="">Id</label>
                                        <input type="text" class="form-control" id="id" disabled>
                                    </div>
                                    <div class="form-group">
                                        <label class="styled" for="">First Name</label>
                                        <input type="text" class="form-control" id="new_first_name" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="styled" for="">Last Name</label>
                                        <input type="text" class="form-control" id="new_last_name" required>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label class="styled" for="">Email</label>
                                        <input type="email" class="form-control" id="new_email" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="styled" for="">Phone Number</label>
                                        <input type="text" class="form-control" id="new_phone_number" required onkeypress="javascript:return onlyNumbers(event);" >
                                    </div>
                                    <div class="form-group">
                                        <label class="styled" for="">Date Created</label>
                                        <input type="text" class="form-control" id="datetime_created" disabled>
                                    </div>
                                </div>
                            </div>
                            <div style="padding:2px"><button type="submit" id="add_new_btn" class="btn btn-info">Add New</button></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<script src="js/functions.js"></script>
<script src="js/jquery.dataTables.min.js"></script>
<script src="js/dataTables.bootstrap.min.js"></script>
</html>