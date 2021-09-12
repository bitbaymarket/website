

function toc(){
  $("a[href^='#toc']").not(".processed").each( function () {
    $(this).addClass("processed");
	var par = $(this).closest(".cooked");
	var ToC =
		"<nav role='navigation' class='table-of-contents'>" +
		"<h2>Table of contents:</h2>" +
		"<ul>";

	var newLine, el, title, link;

	$(par).find("h2").each(function() {

	  el = $(this);
	  title = el.text();
	  id = title.replace(/\s+/g, '-').toLowerCase();
	  link = "#" + id; 
	  //el.attr("id",id);
	  $(el).before("<a name='"+id+"'></a>");

	  newLine =
		"<li>" +
		"<a href='" + link + "'>" +
		title +
		"</a>" +
		"</li>";

	  ToC += newLine;

	});

	ToC +=
	  "</ul>" +
	  "</nav>";

	//$(".contents").prepend(ToC);
	$(this).after(ToC);
	
  });         
}

$( document ).ajaxComplete(function() {
  //console.log("ajaxComplete" );
  toc();
});

$(function() {
  //console.log("ready" );
  toc();
});


