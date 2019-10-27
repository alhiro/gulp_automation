$(function () {
  var currentDate = new Date(); 
  var pathArray = window.location.pathname.split('/');
  var page = "views/pages/" + pathArray[0] + ".html";

  if (pathArray[0] !== "") {
    $("#homepage").load(page, function (response, status, xhr) {
      if (status == "error") {
        $("#homepage").load("views/pages/home.html?uid=" + currentDate.valueOf());
      }
    });
  } else {
    $("#homepage").load("views/pages/home.html");
  }
});

$(function () {
  $("#header").load("views//shared/header.html");
});

$(function () {
  $("#footer").load("views//shared/footer.html");
});