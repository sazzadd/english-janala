console.log("hallo world");

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
loadLessons();

// removeActiveBtn

const removeActiveBtn = () => {
  const lessonsBtn = document.querySelectorAll(".lesson-btn");
  lessonsBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((json) => {
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      console.log(clickBtn);

      // removeActiveBtn class
      removeActiveBtn();
      clickBtn.classList.add("active");

      displayLevelWord(json.data);
    });
};

displayLevelWord = (words) => {
  // console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    
    <div class="col-span-full py-10"><span class="text-center flex justify-center">
            <i
              class="fa-solid text-7xl text-yellow-300 mb-5 text-center fa-triangle-exclamation"
            ></i
          ></span>


          <h6 class="text-xl font-bangla text-center mb-5">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </h6>
          <h2 class="text-4xl font-bangla text-center">
            নেক্সট Lesson এ যান
          </h2>
        </div>`;
  }
  // loadWordDetail(${word.id})
  words.forEach((word) => {
    // console.log(word);
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
         <div
          wordCard
          class="bg-white rounded-xl shadow-sm text-center py-18 px-5 space-y-4"
        >
          <h3 class="light-black font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h3>
          <p class="font-semibold">meaning /pronunciation</p>
          <div class="font-medium text-2xl font-bangla">${word.meaning ? word.meaning : " শব্দার্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}</div>
          <div class="flex justify-between">
          
          <button id="" onclick ="loadWordDetail(${word.id})" class="btn bg-[#1a90ff18] hover:bg-[#1a90ff70]"><i class="fa-solid fa-circle-info"></i></button>
          
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

     <button  id="lesson-btn-${lesson.level_no}" onclick= "loadLevelWord( ${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary" href="">
                <i class="fa-solid fa-book-open"></i>
               lesson - ${lesson.level_no}
              </button>
    
    
    
    `;

    levelContainer.appendChild(btnDiv);
  }
};

const loadWordDetail = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((json) => displayWordDetail(json.data));
};

const createSynonyms = (arr) => {
  console.log(arr);
  if (!arr || arr.length === 0) {
    return `<span class="text-gray-400">No synonyms available</span>`;
  }

  const synonymElements = arr.map((item) => {
    return ` <span class="bg-[#378fd729] my-2 px-3 py-2 mt-2 rounded">
                ${item}</span
              >`;
  });

  return synonymElements.join(" ");
};

const displayWordDetail = (word) => {
  console.log(word);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = ` <div class="p-[5px] border border-[#95b7e698] rounded">
            <div class="space-y-2 p-6">
              <h3 class="text-3xl font-semibold">
                ${word.meaning} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
              </h3>
              <h4 class="text-[18px] font-semibold">Meaning</h4>
              <p class="text-[20px] font-bangla">${word.meaning}</p>
              <h4 class="text-[18px] font-semibold">Example</h4>
              <p class="text-[18px]">
               ${word.sentence}
              </p>
              <p class="font-bangla my-3">সমার্থক শব্দ গুলো</p>

              <div>
              ${createSynonyms(word.synonyms)}

              
              
              </div>

             
               </div>
          </div>`;
  document.getElementById("word_details_modal").showModal();
};
// loadWordDetail();
