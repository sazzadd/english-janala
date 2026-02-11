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
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    console.log(word);
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
         <div
          wordCard
          class="bg-white rounded-xl shadow-sm text-center py-18 px-5 space-y-4"
        >
          <h3 class="light-black font-bold text-2xl">hello</h3>
          <p class="font-semibold">meaning /pronunciation</p>
          <div class="font-medium text-2xl font-bangla">"আগ্রহী / ইগার"</div>
          <div class="flex justify-between">
            <button class="btn bg-[#1a90ff18] hover:bg-[#1a90ff70]"><i class="fa-solid fa-circle-info"></i></button>

            <button class="btn bg-[#1a90ff18] hover:bg-[#1a90ff70]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
         
         
         
         
         `;
    wordContainer.append(wordCard);
  });
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
