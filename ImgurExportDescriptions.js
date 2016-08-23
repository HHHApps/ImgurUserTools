var header = $('.post-header');
header.append('<button type="button" id="exportMeta">Export Meta</button>');

$('#exportMeta').click(function(){
	var metaText = [];
	var metaTags = $('.post-image-meta');
	$.each(metaTags, function(i, tag){
		metaText.push(tag.innerText);
	});
	makeTextFile(metaText);
});

function makeTextFile(text) {
	var textFileAsBlob = new Blob(text, {type:'text/plain'});
	var fileNameToSaveAs = $('.post-title')[0].innerText;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
	
    downloadLink.click();
};