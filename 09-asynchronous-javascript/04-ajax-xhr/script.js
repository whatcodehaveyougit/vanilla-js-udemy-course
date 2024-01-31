const xhr = new XMLHttpRequest();

xhr.open("GET", "./movies.json");

// xhr.onreadystatechange = () => {
//   console.log(this);
// };

xhr.onreadystatechange = function () {
  console.log(this);

  if (this.readyState === 3 && this.status === 200) {
    console.log(JSON.parse(this.response));
    const res = JSON.parse(this.response);
    console.log(res);
    res.forEach((element) => {
      const div = document.createElement("li");
      div.innerHTML = element.title;
      document.querySelector("#results").appendChild(div);
    });
  }
};

xhr.send();
