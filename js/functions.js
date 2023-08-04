var serviceUrl = "http://localhost/crud_task/service/services.php";
var uploadUrl = "http://localhost/crud_task/service/tx_csvUpload.php";

// =============================================
// LIST CONTACTS                       S T A R T
// =============================================
function call_contactsList(serviceName, callback) {   
  var xhr = new XMLHttpRequest();
  var url = serviceUrl;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) { 
      callback(xhr.responseText);
    }
  };
  xhr.send("serviceName="+serviceName);
}

function getContactsList() { 
  contactIdSelected = 0;
  call_contactsList("getContactsList", function(response) {
    
    var response_array = JSON.parse(response); 
    status_val = response_array["status"];
    data = response_array["data"];
    if (data.length>0){
      itemNum = data.length;
      dataTable_data_table = "";
      dataTable_data_td = "";

      for (i=0;i<itemNum;i++){

        res_id = data[i].id;
        res_first_name = data[i].first_name;
        res_last_name = data[i].last_name;
        res_email = data[i].email;
        res_phone_number = data[i].phone_number; 

        dataTable_data_td += '<tr>';
        dataTable_data_td += '<td><a href="javascript:void(0);" onclick="javascript:getContactDetails(\''+res_id+'\', \''+res_first_name+'\', \''+res_last_name+'\'); return false"><button class="btn btn-success btn-sm"><i class="fa fa-pencil"></i></button></a></td>';
        dataTable_data_td += '<td><a href="javascript:void(0);" onclick="javascript:deleteContact(\''+res_id+'\', \''+res_first_name+'\', \''+res_last_name+'\'); return false"><button class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button></a></td>';
        dataTable_data_td += '<td>'+res_id+'</td>';
        dataTable_data_td += '<td>'+res_first_name+'</td>';
        dataTable_data_td += '<td>'+res_last_name+'</td>';
        dataTable_data_td += '<td>'+res_email+'</td>'; 
        dataTable_data_td += '<td>'+res_phone_number+'</td>'; 
        dataTable_data_td += '</tr>';
      }

      dataTable_data_table += '<thead>';
      dataTable_data_table += '<tr>';
      dataTable_data_table += '<th>&nbsp;</th>';
      dataTable_data_table += '<th>&nbsp;</th>';
      dataTable_data_table += '<th>Id</th>'; 
      dataTable_data_table += '<th>First Name</th>';
      dataTable_data_table += '<th>Last Name</th>';
      dataTable_data_table += '<th>Email</th>';
      dataTable_data_table += '<th>Phone Number</th>';
      dataTable_data_table += '</tr>';
      dataTable_data_table += '</thead>';
      dataTable_data_table += '<tbody>';
      dataTable_data_table += dataTable_data_td;
      dataTable_data_table += '</tfoot>';
 
      if (firstCall==0)
        $('#dataTable_contactsList').DataTable().destroy();

      document.getElementById("dataTable_contactsList").innerHTML = dataTable_data_table;

      firstCall = 0;
      $(function () {
        $('#dataTable_contactsList').DataTable({
            'paging'      : true,
            'lengthChange': false,
            'searching'   : true,
            'ordering'    : true,
            'order'       : [[2,"desc"]],
            'info'        : true,
            'autoWidth'   : false
        })
      })      

    }    
    else
        document.getElementById("dataTable_contactsList").innerHTML = "<div style='text-align:center'>No record exists.</div>";
  
  });
}
// =============================================
// LIST CONTACTS                           E N D
// =============================================


// =============================================
// DELETE CONTACT                      S T A R T
// =============================================
function call_deleteContact(serviceName, contactIdSelected, callback) {   
  var xhr = new XMLHttpRequest();
  var url = serviceUrl;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) { 
      callback(xhr.responseText);
    }
  };
  xhr.send("serviceName="+serviceName+"&contactIdSelected="+contactIdSelected);
}

function deleteContact(id, first_name, last_name){
  contactIdSelected = id;
  x = confirm("Do you confirm the deletion of the contact ("+first_name+" "+last_name+")?");
  if (x){
      call_deleteContact("deleteContact", contactIdSelected, function(response) {
        var response_array = JSON.parse(response); 
        if (response_array["status"]=="ok"){
            $("#status_txt").html("Record is deleted successfully");
            $("#status_txt").css({"color":"green"});
            $("#status_txt").show();
            getContactsList();
        }
        else
          alert("error occured");
      });
  }
}
// =============================================
// DELETE CONTACT                          E N D
// =============================================



// =============================================
// CONTACT DETAILS                     S T A R T
// =============================================
function call_contactDetails(serviceName, contactIdSelected, callback) {   
  var xhr = new XMLHttpRequest();
  var url = serviceUrl;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) { 
      callback(xhr.responseText);
    }
  };
  xhr.send("serviceName="+serviceName+"&contactIdSelected="+contactIdSelected);
}

function doGetContactDetails() { 
  $("#status_txt").hide();
  call_contactDetails("getContactDetails", contactIdSelected, function(response) {
 
    var response_array = JSON.parse(response); 
    data = response_array["data"];
    if (data.id>0){
        res_id = data.id;
        res_first_name = data.first_name;
        res_last_name = data.last_name;
        res_email = data.email;
        res_phone_number = data.phone_number;
        res_datetime_created = data.datetime_created;

        $("#id").val(res_id);
        $("#first_name").val(res_first_name);
        $("#last_name").val(res_last_name);
        $("#contact_first_last_name").html(res_first_name + " " + res_last_name);
        $("#email").val(res_email);
        $("#phone_number").val(res_phone_number);
        $("#datetime_created").val(res_datetime_created);   
    }    
    $("#list").hide();
    $("#form").hide();
    $("#details").show();
 });
}

function getContactDetails(id){
  $("#status_txt").hide();
  contactIdSelected = id;
  doGetContactDetails();
}
// =============================================
// CONTACT DETAILS                         E N D
// =============================================



// =============================================
// ADD CONTACT                         S T A R T
// =============================================
function call_addContact(first_name, last_name, email, phone_number, callback) {   
  var xhr = new XMLHttpRequest();
  var url = serviceUrl;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) { 
        callback(xhr.responseText);
    }
  };
  xhr.send("serviceName=addContact&first_name="+first_name+"&last_name="+last_name+"&email="+email+"&phone_number="+phone_number);
}

function doAddContact(first_name, last_name, email, phone_number){
  $("#status_txt").hide();
  call_addContact(first_name, last_name, email, phone_number, function(response) {
    var response_array = JSON.parse(response); 
    if (response_array["status"]=="ok"){
      $("#status_txt").html("Record is added successfully");
      $("#status_txt").css({"color":"green"});
      $("#status_txt").show();
      $("#details").hide();
      $("#form").hide();
      $("#list").show();
      
      getContactsList();
    }
    else{
      $("#status_txt").html(response_array["status"]);
      $("#status_txt").css({"color":"red"});
      $("#status_txt").show();
    }
  });
}
// ============================================
// ADD CONTACT                            E N D
// ============================================



// =============================================
// UPDATE CONTACT                      S T A R T
// =============================================
function call_updateContact(contactIdSelected, first_name, last_name, email, phone_number, callback) {   
  var xhr = new XMLHttpRequest();
  var url = serviceUrl;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) { 
        callback(xhr.responseText);
    }
  };
  xhr.send("serviceName=updateContact&contactIdSelected="+contactIdSelected+"&first_name="+first_name+"&last_name="+last_name+"&email="+email+"&phone_number="+phone_number);
}

function doUpdateContact(contactIdSelected, first_name, last_name, email, phone_number){
  $("#status_txt").hide();
  call_updateContact(contactIdSelected, first_name, last_name, email, phone_number, function(response) {
    var response_array = JSON.parse(response); 
    if (response_array["status"]=="ok"){
      $("#status_txt").html("Record is updated successfully");
      $("#status_txt").css({"color":"green"});
      $("#status_txt").show();
    }
    else
      alert("error occured");
  });
}
// =============================================
// UPDATE CONTACT                          E N D
// =============================================



// =============================================
// FILE UPLOAD                         S T A R T
// =============================================
document.getElementById('button_csv').addEventListener('click', openDialog_product);
function openDialog_product() {
  file_explorer();
}
function file_explorer() {
    document.getElementById('file_csv').click();
    document.getElementById('file_csv').onchange = function() {
        files = document.getElementById('file_csv').files;
        ajax_file_upload(files[0]);
    };
}

function ajax_file_upload(file_obj) {
  if(file_obj != undefined) {
      unsupportedFile = false;
      var form_data = new FormData();

      if (file_obj.type.indexOf("/csv")!=-1){
          form_data.append('file_csv', file_obj);
      }
      else
          unsupportedFile = true;

      if (!unsupportedFile){
          var xhttp = new XMLHttpRequest();
          xhttp.open("POST", uploadUrl, true);
          xhttp.onload = function(event) {
              if (xhttp.status == 200) {
                response = xhttp.responseText.trim();
                var response_array = JSON.parse(response);
                if (response_array["status"]=="ok"){
                  /*num = response_array["data"]*1;
                  if (num>0)
                    $("#status_txt").html(num + " record(s) inserted into the db successfully");
                  else*/
                    $("#status_txt").html("Upload operation is completed successfully");

                  $("#status_txt").css({"color":"green"});
                  $("#status_txt").show();
                  $("#details").hide();
                  $("#form").hide();
                  $("#list").show();
                  getContactsList();
                }
                else{
                  $("#status_txt").html("Error occurred, please try again");
                  $("#status_txt").css({"color":"red"});
                  $("#status_txt").show();
                }
              } else {
                  alert("Error occurred, please try again ( " + xhttp.status + " )");
                  $("#status_txt").css({"color":"red"});
                  $("#status_txt").show();
              }
          }
  
          xhttp.send(form_data);
      }
      else{
        $("#status_txt").html("Unsupported format, please upload a csv file");
        $("#status_txt").css({"color":"red"});
        $("#status_txt").show();
      }
  }
}
// =============================================
// FILE UPLOAD                             E N D
// =============================================



// =============================================
// BUTTON EVENTS                       S T A R T
// =============================================
$("#list_btn").on("click", function(){
  $("#status_txt").hide();
  $("#details").hide();
  $("#form").hide();
  $("#list").show();
  getContactsList();
});

$("#add_btn").on("click", function(){
  $("#status_txt").hide();
  $("#details").hide();
  $("#list").hide();

  $("#new_first_name").val("");
  $("#new_last_name").val("");
  $("#new_email").val("");
  $("#new_phone_number").val("");

  $("#form").show();
});

$("#add_new_btn").on("click", function(){
    first_name = $("#new_first_name").val();
    last_name = $("#new_last_name").val();
    email = $("#new_email").val();
    phone_number = $("#new_phone_number").val();
    stat = 1;

    if (first_name==""){
        $("#first_name").css("border", "1px solid red");
        stat = 0;
    }
    else
        $("#first_name").css("border", "1px solid #d2d6de");

    if (last_name==""){
        $("#last_name").css("border", "1px solid red");
        stat = 0;
    }
    else
        $("#last_name").css("border", "1px solid #d2d6de");

    if (email==""){
        $("#email").css("border", "1px solid red");
        stat = 0;
    }
    else
        $("#email").css("border", "1px solid #d2d6de");

    if (phone_number==""){
        $("#phone_number").css("border", "1px solid red");
        stat = 0;
    }
    else
        $("#phone_number").css("border", "1px solid #d2d6de");
    
    if (stat==1)
        doAddContact(first_name, last_name, email, phone_number);
});

$("#update_btn").on("click", function(){
  contactIdSelected = $("#id").val();
  first_name = $("#first_name").val();
  last_name = $("#last_name").val();
  email = $("#email").val();
  phone_number = $("#phone_number").val();
  stat = 1;

  if (first_name==""){
      $("#first_name").css("border", "1px solid red");
      stat = 0;
  }
  else
      $("#first_name").css("border", "1px solid #d2d6de");

  if (last_name==""){
      $("#last_name").css("border", "1px solid red");
      stat = 0;
  }
  else
      $("#last_name").css("border", "1px solid #d2d6de");

  if (email==""){
      $("#email").css("border", "1px solid red");
      stat = 0;
  }
  else
      $("#email").css("border", "1px solid #d2d6de");

  if (phone_number==""){
      $("#phone_number").css("border", "1px solid red");
      stat = 0;
  }
  else
      $("#phone_number").css("border", "1px solid #d2d6de");
  
  if (stat==1)
      doUpdateContact(contactIdSelected, first_name, last_name, email, phone_number);
});

$("#first_name").on("keydown", function(){ 
    first_name = $("#first_name").val();

    if (first_name!="") 
        $("#first_name").css("border", "1px solid #d2d6de");
});

$("#last_name").on("keydown", function(){ 
  last_name = $("#last_name").val();

  if (last_name!="") 
    $("#last_name").css("border", "1px solid #d2d6de");
 
});

$("#email").on("keydown", function(){ 
  email = $("#email").val();

  if (email!="") 
      $("#email").css("border", "1px solid #d2d6de");
});

$("#phone_number").on("keydown", function(){ 
  phone_number = $("#phone_number").val();

  if (phone_number!="") 
      $("#phone_number").css("border", "1px solid #d2d6de");
});
// =============================================
// BUTTON EVENTS                           E N D
// =============================================


function onlyNumbers(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode!=46 ){
        return false;
    }
}

var firstCall = 1;
var contactIdSelected = 0;
getContactsList();