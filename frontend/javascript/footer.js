//* FETCH FOOTER

fetch("../html/footer.html")
  .then(response => {
      return response.text()
  })
   .then(data => {
        document.getElementById("footer").innerHTML = data;
  });