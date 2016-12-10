document.addEventListener('DOMContentLoaded', function() {
	var Notes1 = document.getElementById('pageNotes'); 
	var Notes2 = document.getElementById('domainNotes'); 
	var Notes3 = document.getElementById('generalNotes'); 
	
	var Title1 = document.getElementById('pageTitle');  
	var Title2 = document.getElementById('domainTitle');  
	var Title3 = document.getElementById('GeneralTitle');  
	
	var rmNote1 = document.getElementById('removePageNote');  
	var rmNote2 = document.getElementById('removeDomainNote');  
	var rmNote3 = document.getElementById('removeGeneralNote');  
	
	var notes_global;
	
	function log(t){
		chrome.extension.getBackgroundPage().console.log(t);
	}
	function loadNotes(){
		log('loading notes');
		var notes;
		chrome.storage.sync.get(notes, function (items){
			notes = items['notes'];
			if (notes == undefined)
				notes = {};
			log(notes)
			if (notes[Title1.innerHTML] == undefined)
				notes[Title1.innerHTML] = 'Notes';
			if (notes[Title2.innerHTML] == undefined)
				notes[Title2.innerHTML] = 'Notes';
			if (notes[Title3.innerHTML] == undefined)
				notes[Title3.innerHTML] = 'Notes';
			
			Notes1.value = notes[Title1.innerHTML];
			Notes2.value = notes[Title2.innerHTML];
			Notes3.value = notes[Title3.innerHTML];
		});
	}
	
	function storeNotes(x){
		log('storing notes');
		log(x);
		chrome.storage.sync.set({notes: x});
	}
	
	function updateNote(u, n){
		var notes;
		chrome.storage.sync.get(notes, function (items){
			notes = items['notes'];
			if (notes == undefined)
				notes = {};
			if (n=='Notes')
				delete notes[u];
			else
				notes[u] = n;
			
			storeNotes(notes);
		});
	}
	
	
	chrome.tabs.getSelected(null, function(tab) {
		var url = new URL(tab.url);
		Title1.innerHTML = url.href;
		Title2.innerHTML = url.hostname;
		Title3.innerHTML = 'General';
		loadNotes();
		
    });
	Notes1.addEventListener('focus', function() {
		if(Notes1.value=='Notes'){
			Notes1.value = '';
		}
	}, false);
	Notes1.addEventListener('blur', function() {
		if(Notes1.value==''){
			Notes1.value = 'Notes';
		}
		updateNote(Title1.innerHTML, Notes1.value);
	}, false);

	Notes2.addEventListener('focus', function() {
		if(Notes2.value=='Notes'){
			Notes2.value = '';
		}
	}, false);
	Notes2.addEventListener('blur', function() {
		if(Notes2.value==''){
			Notes2.value = 'Notes';
		}
		updateNote(Title2.innerHTML, Notes2.value);
	}, false);

	Notes3.addEventListener('focus', function() {
		if(Notes3.value=='Notes'){
			Notes3.value = '';
		}
	}, false);
	Notes3.addEventListener('blur', function() {
		if(Notes3.value==''){
			Notes3.value = 'Notes';
		}
		updateNote(Title3.innerHTML, Notes3.value);
	}, false);
	
	rmNote1.addEventListener('click', function() {
		Notes1.value = 'Notes';
		updateNote(Title1.innerHTML, Notes1.value);		
	}, false);
	rmNote2.addEventListener('click', function() {
		Notes2.value = 'Notes';
		updateNote(Title2.innerHTML, Notes2.value);		
	}, false);
	rmNote3.addEventListener('click', function() {
		Notes3.value = 'Notes';
		updateNote(Title3.innerHTML, Notes3.value);		
	}, false);
}, false);
