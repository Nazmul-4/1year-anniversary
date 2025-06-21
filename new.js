// Will be used later for music, typing effects, and more
console.log("Ready for love! 💖");

// particles

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  // Random X and Y position across the page
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  // Random size, speed, and transparency
  heart.style.animationDuration = 8 + Math.random() * 5 + "s";
  heart.style.opacity = 0.3 + Math.random() * 0.7;
  heart.style.transform = `scale(${0.4 + Math.random() * 0.6}) rotate(45deg)`;
    
  document.querySelector(".hearts-container").appendChild(heart);

  // Remove heart after animation
  setTimeout(() => {
    heart.remove();
  }, 13000);
}

setInterval(createHeart, 300);


// audio

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

let isPlaying = false;
let fadeInterval;

function fadeIn(audio, targetVolume = 1.0, step = 0.02, interval = 100) {
  audio.volume = 0;
  audio.play();
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (audio.volume < targetVolume) {
      audio.volume = Math.min(audio.volume + step, targetVolume);
    } else {
      clearInterval(fadeInterval);
    }
  }, interval);
}

function fadeOut(audio, step = 0.02, interval = 100) {
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - step, 0);
    } else {
      audio.pause();
      clearInterval(fadeInterval);
    }
  }, interval);
}

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    fadeIn(music, 1.0);  // max volume
    musicBtn.textContent = "⏸ Pause Music";
  } else {
    fadeOut(music);
    musicBtn.textContent = "🎵 Play Music";
  }
  isPlaying = !isPlaying;
});

// watch

function updateLoveTimer() {
  const timerEl = document.getElementById("love-timer");
  const anniversaryDate = new Date("2024-06-22T00:00:00"); // Anniversary start date/time
  const now = new Date();

  const diffMs = now - anniversaryDate;

  if (diffMs < 0) {
    timerEl.textContent = "Our journey begins soon...";
    return;
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  timerEl.textContent = `1 Year of Love: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateLoveTimer, 1000);
updateLoveTimer();


// gallery

var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Reset the running time animation
}

// Start the initial animation 
resetTimeAnimation()

// timeline

// Timeline scroll reveal
function revealTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach(item => {
    const boxTop = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (boxTop < windowHeight - 100) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealTimeline);
window.addEventListener('load', revealTimeline);


// love letter
document.addEventListener("DOMContentLoaded", function () {
  const letterText = `My Dearest Love,

প্রিয় বিনু, 
তুমি আছো বলেই নিজেকে পৃথিবীর সব থেকে সুখি মানুষ মনে হয়, তুমি পূরণ করবে বলেই নিরদিধায় স্বপ্ন দেখে যাই...তুমি আছো বলেই এক আকাশ সমান আশা-অনভুতি নিয়ে অবলিলায় অপেক্ষা করে যাই...
সৌভাগ্যক্রমে আমি তোমাকে আমার সঙ্গী হিসেবে পেয়েছি, যেন আমার পার্থনারা অর্থপূর্ণ শব্দ পেয়েছে, যা আমি কখনো কল্পনাও করিনি তা এখন আমি অর্জন করেছি,, এই বিশেষ দিনে তোমার থেকে শুধু একটাই চাওয়া,
"আমার শেষ অবদি তুমিই থেকো!!",
💖`;

  let index = 0;
  const speed = 50; // typing speed (ms)
  const typedOutput = document.getElementById("typed-letter");

  function typeLetter() {
    if (index < letterText.length) {
      typedOutput.innerHTML += letterText.charAt(index);
      index++;
      setTimeout(typeLetter, speed);
    }
  }

  typeLetter();
});


// wish


  function submitReply() {
    const reply = document.getElementById('her-reply').value.trim();
    const confirmation = document.getElementById('reply-confirmation');

    if (reply) {
      confirmation.textContent = "Your sweet message has been received 💖";
      document.getElementById('her-reply').value = '';
    } else {
      confirmation.textContent = "Please write something, love 🌸";
    }
  }


  