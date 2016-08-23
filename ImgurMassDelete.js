/* The ids of the selected favorites. */
var selectionIds = [];

$(".post").click(function(event) {
	/* Stop the default click event. */
	event.preventDefault();
	
	/* The this keyword is the div */
	/* Checking the classlist is just for a toggle */
	if(this.classList.contains("selected")){
		deselect(this);
	} else {
		select(this);
	}
	console.log(selectionIds);
});

function select(div){
	var anchorElem = div.getElementsByClassName("image-list-link")[0];
	div.classList.add("selected");
	div.style.borderColor = "#F39814";
	
	var id = anchorElem.href.substr(anchorElem.href.lastIndexOf("/") + 1);
	/* Push the id into the array. */
	if(selectionIds.indexOf(id) == -1){
		selectionIds.push(id);
	}
}

function deselect(div){
	var anchorElem = div.getElementsByClassName("image-list-link")[0];
	div.classList.remove("selected");
	div.style.borderColor = "#444442";
	
	var id = anchorElem.href.substr(anchorElem.href.lastIndexOf("/") + 1);
	
	/* Remove the id from the array. */
	if(selectionIds.indexOf(id) > -1){
		selectionIds.splice(selectionIds.indexOf(id), 1);
	}
}

function getStoredIds(){
	var storedIds = [];
	
	chrome.storage.sync.get("imgurMassDeleteFavorites", function (obj) {
		var storedValObj = obj.imgurMassDeleteFavorites;
		storedIds = storedValObj ? storedValObj.val : [];
	});
	
	return storedIds;
}

function addToStorage(id){
	var storedIds = getStoredIds();
	
	if(!storedIds.includes(id)){
		storedIds.push(id);
		
		var saveObj = { val: storedIds };
		chrome.storage.sync.set({ 'imgurMassDeleteFavorites': saveObj });
	}
}

function removeFromStorage(id){
	var storedIds = getStoredIds();
	
	if(storedIds.includes(id)){
		storedIds.splice(storedIds.indexOf(id), 1);
		
		var saveObj = { val: storedIds };
		chrome.storage.sync.set({ 'imgurMassDeleteFavorites': saveObj });
	}
}

function unfavorite(){
	var storedIds = getStoredIds();
	var id = window.location.pathname.substr(window.location.pathname.lastIndexOf("/") + 1);
	
	/* Combine stuff from RepostStatistics' script? */
	
	if(storedIds.includes(id)){
		
	} else {
		$('.navNext').click();
	}
}

function reselectFromStorage(){
	var storedIds = getStoredIds();
	
	/* select the images by stored id */
	$.each(storedIds, function(i, val){
		/* Get the div */
		var div = $('a[href="/account/favorites/' + val + '"]').parent();
		select(div[0]);
	});
}