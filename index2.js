// book constructor
function Book(name, author, type, tm) {
    this.name = name;
    this.author = author;
    this.type = type;
    this.tm = tm;
}

let f = 1;

showNotes();

function validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false
    }
    else {
        return true;
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

let df = document.getElementById('draft');
df.addEventListener('click', libraryFormDraft);

let toggle = document.getElementById("toggle");

toggle.addEventListener("click",togglefn);
function togglefn() {
    console.log("togle is working");
    if(f==1)
    {
        f=0;
        showdraft();
    }
    else
    {
        f=1;
        showNotes();
    }
}

// add to draft
function libraryFormDraft(e) 
{
    f=0;
    showdraft()
    console.log("draft is click");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let other = document.getElementById('other');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    else {
        type = other.value;
    }
    let ck = new Date();
    date = ck.toLocaleDateString(undefined, options);
    // time = ck.getHours() + ':' + ck.getMinutes() + ':' + ck.getSeconds();
    let hr = ck.getHours();
    hr = hr.toString();
    let mn = ck.getMinutes();
    mn = mn.toString();
    let sec = ck.getSeconds();
    sec = sec.toString();
    if (hr.length == 1) {
        hr = '0' + hr;
    }
    if (mn.length == 1) {
        mn = '0' + mn;
    }
    if (sec.length == 1) {
        sec = '0' + sec;
    }
    time = hr + ':' + mn + ':' + sec;
    tm = time + "<br>" + date;

    let book = new Book(name, author, type, tm);
    console.log(book);
    let notesdraft = localStorage.getItem("notesdraft");
    if (notesdraft == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesdraft);
    }
    let msg = document.getElementById("message");
    if (validate(book)) {
        notesObj.push(book);
        msg.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Messge:</strong> Your book has been successfully added in draft
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
        </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 1000);

    }
    else {

        msg.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Messge:</strong> Sorry you cannot add this book in draft
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
        </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 1000);
    }
    // notesObj.push(book);
    localStorage.setItem("notesdraft", JSON.stringify(notesObj));
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
    e.preventDefault();
    f=0;
    showdraft()
        
}




// add to publish section
function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let other = document.getElementById('other');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    else {
        type = other.value;
    }
    let ck = new Date();
    date = ck.toLocaleDateString(undefined, options);
    // time = ck.getHours() + ':' + ck.getMinutes() + ':' + ck.getSeconds();
    let hr = ck.getHours();
    hr = hr.toString();
    let mn = ck.getMinutes();
    mn = mn.toString();
    let sec = ck.getSeconds();
    sec = sec.toString();
    if (hr.length == 1) {
        hr = '0' + hr;
    }
    if (mn.length == 1) {
        mn = '0' + mn;
    }
    if (sec.length == 1) {
        sec = '0' + sec;
    }
    time = hr + ':' + mn + ':' + sec;
    tm = time + "<br>" + date;




    let book = new Book(name, author, type, tm);
    console.log(book);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let msg = document.getElementById("message");
    if (validate(book)) {
        notesObj.push(book);
        msg.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Messge:</strong> Your book has been successfully added
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
        </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 1000);

    }
    else {

        msg.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Messge:</strong> Sorry you cannot add this book
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
        </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 1000);
    }
    // notesObj.push(book);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
    e.preventDefault();
    f=1;
    showNotes();
}





function showNotes() {
    let pup=document.getElementById('pup');
    pup.innerHTML="Your books in published section";
    notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody');
    tableNT = document.getElementById('tableNT');
    html = "";
    notesObj.forEach(function (element, index) {
        let uiString = `<tr>
                            <td>${index + 1}</td>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                            <td>${element.tm}</td>
                            <td><button id="${index}"onclick="modifyNote(this.id)" class="btn btn-primary">Modify Notes</button></td>
                            <td><button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button></td>
                            
                        </tr>`;
        html += uiString;

    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        tableBody.innerHTML = html;
        tableNT.innerHTML = "";
    } else {
        tableBody.innerHTML = html;
        tableNT.innerHTML = `Nothing to show! Use "Add Book" section above to add a book.`;

    }
}



function showdraft() {
    let pup=document.getElementById('pup');
    pup.innerHTML="Your books in draft section";
    notes = localStorage.getItem("notesdraft");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody');
    tableNT = document.getElementById('tableNT');
    html = "";
    notesObj.forEach(function (element, index) {
        let uiString = `<tr>
                            <td>${index + 1}</td>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                            <td>${element.tm}</td>
                            <td><button id="${index}"onclick="modifydraft(this.id)" class="btn btn-primary">Modify Draft</button></td>
                            <td><button id="${index}"onclick="deletedraft(this.id)" class="btn btn-primary">Delete Draft</button></td>
                            
                        </tr>`;
        html += uiString;

    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        tableBody.innerHTML = html;
        tableNT.innerHTML = "";
    } else {
        tableBody.innerHTML = html;
        tableNT.innerHTML = `Nothing to show! Use "Add Draft" section above to add a book.`;

    }
}


function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    f=1;
    showNotes();
}
function deletedraft(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notesdraft");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notesdraft", JSON.stringify(notesObj));
    f=0;
    showdraft();
}


function modifyNote(index) {
    // console.log("modifying notes");s
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    document.getElementById('bookName').value = notesObj[index].name;
    document.getElementById('author').value = notesObj[index].author;
    let type = notesObj[index].type;
    // console.log(type);
    if (type == "fiction") {
        $("#fiction").prop("checked", true);
    }
    else if (type == "programming") {
        $("#programming").prop("checked", true);
    }
    else if (type == "cooking") {
        $("#cooking").prop("checked", true);
    }
    else {
        $("#other").prop("checked", true);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    f=1;
    showNotes();
}


function modifydraft(index) {
    // console.log("modifying notes");s
    let notes = localStorage.getItem("notesdraft");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    document.getElementById('bookName').value = notesObj[index].name;
    document.getElementById('author').value = notesObj[index].author;
    let type = notesObj[index].type;
    // console.log(type);
    if (type == "fiction") {
        $("#fiction").prop("checked", true);
    }
    else if (type == "programming") {
        $("#programming").prop("checked", true);
    }
    else if (type == "cooking") {
        $("#cooking").prop("checked", true);
    }
    else {
        $("#other").prop("checked", true);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notesdraft", JSON.stringify(notesObj));
    f=0;
    showdraft();
}