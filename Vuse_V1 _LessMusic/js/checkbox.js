var box = document.getElementById("CheckBox");
box.addEventListener("change", function() {
  event.preventDefault();
  
  console.log(box.checked)
  if (box.checked == true){
    checkboxTicked = true;
  } 
  else {
    checkboxTicked = false;
  }
});