// ==UserScript==
// @name           Imgur Custom Navigation
// @description    Allows you to use custom keys like WASD to navigate Imgur.
// @match          http://imgur.com/gallery/*
// ==/UserScript==

/* We must add jQuery in order to use it in main. */
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js");
	script.addEventListener('load', function() {
		var newScript = document.createElement("script");
		newScript.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(newScript);
		}, false);
	document.body.appendChild(script);
}

function main(){
	/* A bool for the checkbox to enable/disable so you can make comments without having to worry about navigating away. */
	var navPaused = false;

	/* Create a div to contain the checkbox and insert it just above the comment section. */
	var pauseNavDiv = document.createElement("DIV");
	$(pauseNavDiv).append('<label>Pause navigation.</label><input type="checkbox" id="pauseNavCheckbox">');
	$('.post-pad')[0].insertBefore(pauseNavDiv, $('#comments-container')[0]);

	/* Create an event listener to listen for key presses and act on them. */
	document.addEventListener("keydown", function(event){
		/* A */
		if(event.keyCode == 65){
			if(!navPaused){
				/* We can just trigger the same event tied to the left arrow key. */
				var e = $.Event("keydown", { keyCode: 37 });
				$("body").trigger(e);
			}
		}
		
		/* D */
		if(event.keyCode == 68){
			if(!navPaused){
				/* We can just trigger the same event tied to the right arrow key. */
				var e = $.Event("keydown", { keyCode: 39 });
				$("body").trigger(e);
			}
		}
	}, false);

	/* A listener for the checkbox being toggled. */
	$('#pauseNavCheckbox').change(function(){
		navPaused = this.checked;
	});
}

addJQuery(main);