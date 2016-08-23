var header = $('.textbox.thread-header');
header.append('<button type="button" id="exportConvo">Export</button>');

$('#exportConvo').click(function(){
	var messageContainers = $('.message-height.content')[0];
	makeTextFile(messageContainers.innerText);
});

function makeTextFile(text) {
	var textFileAsBlob = new Blob([text], {type:'text/plain'});
	var fileNameToSaveAs = $('.message-subject')[0].innerText;
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