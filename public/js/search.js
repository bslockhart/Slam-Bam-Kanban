
var div = document.getElementById("jobs");
var btn = document.getElementById("form1");
var template = document.querySelector("#my-template").innerHTML;

function jobs() {
  var jobSearch = document.getElementById("jobSearch");
  var area = document.getElementById("area");

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: `{"search_terms":"${jobSearch.value}","location":"${area.value}","page":"1"}`,
  };

  fetch("/api/jobs/", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        var card_html = template;
        card_html = card_html.replace("{href}", response[i].job_url);
        card_html = card_html.replace("{title}", response[i].job_title);
        card_html = card_html.replace("data-src", "src");

        var card = document.createElement("div");
        card.innerHTML = card_html;
        div.appendChild(card);
      }
    })
    .catch((err) => console.error(err));
}

function formSubmit(event) {
  event.preventDefault();
  console.log(event.target);
  jobs();
}

btn.addEventListener("submit", formSubmit);