var selectAcademicYear = function(){
    $('#academicyear').change(function() {
  $("#eduyear").html($('.selectpicker option:selected').val());
  window.localStorage["eduyear"]=$('.selectpicker option:selected').val();
  eduyear=$('.selectpicker option:selected').val();
  $('#academicyear').hide();
  location.reload();
 
});
}

$('#eduyear').click(function() {
  if ($('#academicyear').is(":hidden")) {
    //code
    $('#academicyear').show();
  }
 
});



selectAcademicYear();
$('#academicyear').hide();