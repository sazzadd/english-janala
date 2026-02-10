console.log("hallo world");

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
loadLessons();

const loadLevelWord = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((json) => displayLevelWord(json.data));
};

displayLevelWord = (words) => {
  console.log(words);
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = ""
    words.forEach((word) => {
         console.log(word)
    })

};

const displayLessons = (lessons) => {
  //   console.log(lessons);

  const levelContainer = document.getElementById("level-contaner");

  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.className = "flex justify-center";
    btnDiv.innerHTML = `

     <button onclick= "loadLevelWord( ${lesson.level_no})" class="btn btn-outline btn-primary" href="">
                <i class="fa-solid fa-book-open"></i>
               lesson - ${lesson.level_no}
              </button>
    
    
    
    `;

    levelContainer.appendChild(btnDiv);
  }
};
