
$(document).ready(function()
{ 
	if ($("#alertSuccess").text().trim() == "") 
	{ 
		$("#alertSuccess").hide(); 
	} 
	$("#alertError").hide(); 
}); 

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) 
{ 
	// Clear alerts---------------------
	 $("#alertSuccess").text(""); 
	 $("#alertSuccess").hide(); 
	 $("#alertError").text(""); 
	 $("#alertError").hide(); 
	 
	 // Form validation-------------------
	 var status = validateFundForm(); 
	 if (status != true) 
	 { 
		 $("#alertError").text(status); 
		 $("#alertError").show(); 
		 return; 
	 } 
	 
	// If valid------------------------
	 var type = ($("#hidFundIDSave").val() == "") ? "POST" : "PUT";
	 $("#formFund").submit();
	 
	 $.ajax( 
			 { 
			 url : "FundAPI", 
			 type : type, 
			 data : $("#formFund").serialize(), 
			 dataType : "text", 
			 complete : function(response, status) 
			 { 
			 onFundSaveComplete(response.responseText, status); 
			 } 
			 }); 
});

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
	$("#hidFundIDSave").val($(this).data("FundID"));
	//$("#hidFundIDSave").val($(this).closest("tr").find('#hidFundIDUpdate').val()); 
	$("#ProductId").val($(this).closest("tr").find('td:eq(0)').text()); 
	$("#ProductName").val($(this).closest("tr").find('td:eq(1)').text()); 
	$("#FName").val($(this).closest("tr").find('td:eq(2)').text()); 
	$("#Amount").val($(this).closest("tr").find('td:eq(3)').text()); 
}); 

// DELETE==========================================
$(document).on("click", ".btnRemove", function(event)
{ 
	$.ajax( 
	{ 
		url : "FundAPI", 
		type : "DELETE", 
		data : "FundID=" + $(this).data("FundID"),
		dataType : "text", 
		complete : function(response, status) 
		{ 
			onFundDeleteComplete(response.responseText, status); 
		} 
	}); 
});

// CLIENT-MODEL================================================================
function validateFundForm() 
{ 
	// Product Id
	if ($("#ProductId").val().trim() == "") 
	{ 
		return "Insert Product ID."; 
	} 
	
	// NAME
	if ($("#ProductName").val().trim() == "") 
	{ 
		return "Insert Product Name."; 
	}
	
	//Funder Name
	if ($("#FName").val().trim() == "") 
	{ 
		return "Insert Funder Name."; 
	} 

	// DESCRIPTION------------------------
	if ($("#Amount").val().trim() == "") 
	{ 
		return "Insert Fund Amount."; 
	} 
	return true; 
	
}

function onFundSaveComplete(response, status)
{ 
	if(status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") 
		{ 
			$("#alertSuccess").text("Successfully saved."); 
			$("#alertSuccess").show(); 
			$("#divFundGrid").html(resultSet.data); 
		} 
		else if (resultSet.status.trim() == "error") 
		{ 
			$("#alertError").text(resultSet.data); 
			$("#alertError").show(); 
		}
	}
	else if (status == "error")
	{ 
		$("#alertError").text("Error while saving."); 
		$("#alertError").show(); 
	} else
	{ 
		$("#alertError").text("Unknown error while saving.."); 
		$("#alertError").show(); 
	}
	
	$("#hidFundIDSave").val(""); 
	$("#formFund")[0].reset(); 
}

function onFundDeleteComplete(response, status)
{ 
	if (status == "success") 
	{ 
		var resultSet = JSON.parse(response); 
		if (resultSet.status.trim() == "success") 
		{ 
			$("#alertSuccess").text("Successfully deleted."); 
			$("#alertSuccess").show(); 
			$("#divFundGrid").html(resultSet.data); 
		} 
		else if (resultSet.status.trim() == "error") 
		{ 
			$("#alertError").text(resultSet.data); 
			$("#alertError").show(); 
		} 
	 } 
	 else if (status == "error") 
	 { 
		 $("#alertError").text("Error while deleting."); 
		 $("#alertError").show(); 
	 } 
	 else
	 { 
		 $("#alertError").text("Unknown error while deleting.."); 
		 $("#alertError").show(); 
	 } 
}

