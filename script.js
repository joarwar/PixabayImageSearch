let inputColor = document.querySelector("#colors");
let inputText = document.querySelector(".userInput");
let exeButton = document.querySelector('#executeButton');
let next = document.querySelector("#next");
let previous = document.querySelector("#previous");
let pageNumber = 1;
let buttonclick = 0;
let change = document.querySelector("#colors"); // åtgärda så att man kan byta färg i dropdown och resultaten visas
let anycolor = document.querySelector("#nocolor"); // fixa bättre logik för ifsats om any color väljs

exeButton.onclick = function(event) {
    document.querySelector("#resultgrid").innerHTML=""
    buttonclick++;
    SearchPhotos();
}

function SearchPhotos(){
    let fetchUrl = "";
    if ( /* hitta logik för denna ifsats */){
        let params = new URLSearchParams({
            key: "25706674-b9c01a86dee6bf80ba5a5b48f",
            q: inputText.value,
            per_page: 10,
            page: pageNumber,
        });
        fetchUrl = "https://pixabay.com/api/?" + params.toString();
    }
    else {
        let params = new URLSearchParams({
            key: "25706674-b9c01a86dee6bf80ba5a5b48f",
            q: inputColor.options[inputColor.selectedIndex].value + " " + inputText.value,
            per_page: 10,
            page: pageNumber,
        });
        fetchUrl = "https://pixabay.com/api/?" + params.toString();
    }

fetch (fetchUrl)
    .then(function (data){
        return data.json();
    })
    .then(function (data){
        if (data.totalHits == 0){
            const thisTitle = document.createElement("li");
            thisTitle.innerHTML = "No results found";
            document.querySelector("#resultgrid").appendChild(thisTitle)
            return;
        }
        data.hits.forEach(obj => { 
            const thisTitle = document.createElement("li");
            thisTitle.innerHTML = "<img src=" + obj.previewURL + "></img><p>" + obj.user +"</p><p>" + obj.tags + "</p>";
            document.querySelector("#resultgrid").appendChild(thisTitle)});
    });
}
next.onclick = function(event) {
    if (buttonclick == 0){
        return;
    }
    else {
        pageNumber++;
        document.querySelector("#resultgrid").innerHTML=""
        SearchPhotos();
    }
}
previous.onclick = function(event){
    if (pageNumber == 1){
        return;
    }
    else {
        pageNumber--;
        document.querySelector("#resultgrid").innerHTML=""
        SearchPhotos();
    }
}
