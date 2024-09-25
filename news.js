console.log("welcome");
let apiKey = "9887443c51544c5f9a5b8ec7da128e75";
let source = 'the-times-of-india';

let accordionNews  =document.getElementById('accordionNews');

const xhr = new XMLHttpRequest();
// xhr.open('GET', `https://newsapi.org/v1/articles?source=the-next-web&apiKey=0487dda1c6b747da9ebb4c7e44ca2e93`, true);
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=0487dda1c6b747da9ebb4c7e44ca2e93`, true);
// xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);

// What to do when response is ready
xhr.onload = function () {
    console.log(this.status);
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {
            // console.log(element, index);
            let news = `<div class="card">
            <div class="card-header" id="heading${index}">
            <h2 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
            aria-expanded="false" aria-controls="collapse${index}">
            <b>Breaking News ${index + 1}:</b> ${element["title"]}
            </button>
            </h2>
            </div>
            
            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
            <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
            </div>
            </div>`;
            newsHtml += news;
        });
        accordionNews.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured");
    }
}

xhr.send();


console.log("hello");
