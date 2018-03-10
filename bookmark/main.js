//will listen for form submit
document.getElementById('bmark').addEventListener('submit', saveBookmark);

function getFormID() {
    return 'bmark';
}

function saveBookmark(e){
    console.log("SaveBookmark Running");
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    var bookmark={
        name:siteName,
        url:siteURL
    }
    //Local storage implamentation
    if(localStorage.getItem('bookmarks') === null){
        console.log("Local");
        
        var bookmarks=[];
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    fetchBookmarks();
    //clearing the form
    document.getElementById('bmark').reset();
    
    //preventinf form from submiting
    e.preventDefault();    
}
//Resetting the form


function fetchBookmarks() {
    // console.log("FTCH");
    
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var result = document.getElementById("bookmarkResults");
    result.innerHTML='';
    for(i=0;i<bookmarks.length; i++){
        // console.log("loppFB");
        
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        result.innerHTML += '<div class="row my-1">'+
                            '<div class="bkmrk col-md-4 offset-md-4 col-lg-4 offset-lg-4" style="background: lightGrey; border-radius: 15px;">'+
                            '<h3>'+name+
                            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger float-right" href="#">Delete</a> ' +
                            ' <a class="btn btn-default float-right" target="_blank" href="' + url + '">Visit</a> ' +
                            '</h3>' +'</div>'+'</div>';
    }

}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url==url){
            bookmarks.splice(i,1);
        }
    }
    //reset back
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}