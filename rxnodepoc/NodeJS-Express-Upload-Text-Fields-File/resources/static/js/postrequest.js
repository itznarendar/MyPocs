$(document).ready( () => {
    $("#btnSubmit").click((event) => {
        //stop submit the form, we will post it manually.
        event.preventDefault();
        doAjax();
    });
 
});
 
function doAjax() {
	var form = $('#applicationForm')[0];
	var data = new FormData(form);
	
	//var formData = new FormData();
		/*formData.append('firstname', $('input[name=firstname]').val());
		formData.append('lastname', $('input[name=lastname]').val());
		formData.append('email', $('input[name=email]').val());
		formData.append('phone',$('input[name=phone]').val());
		formData.append('resume', $('input[type=file]').file);*/
	

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/upload/application",
        data: data,
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        success: (data) => {
            $("#confirmMsg").text(data);
			
			//reset form
			
        },
        error: (e) => {
            $("#confirmMsg").text(e.responseText);
        }
    });
}