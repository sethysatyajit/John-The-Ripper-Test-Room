// script.js - John the Ripper Test Room (Enhanced)
(function() {
  'use strict';

  // ---------- DATASET (50 questions, 5 rooms x 10) ----------
  // Each question: { hash, type, answer, difficulty, wordlist (if hard) }
  const questionsData = [
    // ROOM 1: EASY (mostly easy, few hard with wordlist)
    { hash: '5d41402abc4b2a76b9719d911017c592', type: 'MD5', answer: 'hello', difficulty: 'easy' },
    { hash: '900150983cd24fb0d6963f7d28e17f72', type: 'MD5', answer: 'abc', difficulty: 'easy' },
    { hash: 'e99a18c428cb38d5f260853678922e03', type: 'MD5', answer: 'abc123', difficulty: 'easy' },
    { hash: '25d55ad283aa400af464c76d713c07ad', type: 'MD5', answer: '12345678', difficulty: 'easy' },
    { hash: '5f4dcc3b5aa765d61d8327deb882cf99', type: 'MD5', answer: 'password', difficulty: 'hard', wordlist: ['password','pass123','admin','letmein','qwerty','123456','password1','welcome','monkey','dragon','master','hello','freedom','whatever','trustno1','shadow','jordan','harley','buster','soccer','baseball','hunter','ranger','thunder','cookie','flower','sunshine','iloveyou'] },
    { hash: '5ebe2294ecd0e0f08eab7690d2a6ee69', type: 'MD5', answer: 'secret', difficulty: 'hard', wordlist: ['secret','hidden','classified','topsecret','private','confidential','secure','cryptic','mystery','enigma','shadow','stealth','covert','clandestine','obscure','esoteric','arcane','occult','unknown','secrets','password','key','cipher','code','encrypt','decrypt','hiddenkey','lock'] },
    { hash: 'e10adc3949ba59abbe56e057f20f883e', type: 'MD5', answer: '123456', difficulty: 'easy' },
    { hash: 'd8578edf8458ce06fbc5bb76a58c5ca4', type: 'MD5', answer: 'qwerty', difficulty: 'hard', wordlist: ['qwerty','azerty','qwertz','12345','qwerty1','qwertyuiop','asdfgh','zxcvbn','password','letmein','qwerty123','abc123','monkey','dragon','football','baseball','soccer','hockey','tennis','golf','master','sunshine','princess','qwerty!'] },
    { hash: '25f9e794323b453885f5181f1b624d0b', type: 'MD5', answer: '123456789', difficulty: 'easy' },
    { hash: 'fcea920f7412b5da7be0cf42b8c93759', type: 'MD5', answer: '1234567', difficulty: 'easy' },
    // ROOM 2: MEDIUM (mix types)
    { hash: '0192023a7bbd73250516f069df18b500', type: 'MD5', answer: 'admin123', difficulty: 'hard', wordlist: ['admin','admin123','administrator','root','superuser','sysadmin','adm1n','admin!','admin2023','password','passwd','secret','master','control','manage','user','login','secure','admin@123','root123','toor','r00t','adm','operator','manager','boss','chief'] },
    { hash: '7c6a180b36896a0a8c02787eeafb0e4c', type: 'MD5', answer: 'password1', difficulty: 'hard', wordlist: ['password1','password2','password123','passw0rd','p@ssword','pa$$word','password!','pass1234','password01','password12','pass12345','password3','password4','password5','password6','password7','password8','password9','password0','pwd123','pwd','secret','qwerty','letmein'] },
    { hash: 'b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3', type: 'SHA1', answer: 'letmein', difficulty: 'hard', wordlist: ['letmein','letmein123','letmein!','letmein1','letmein2','letmein3','access','open','enter','welcome','hello','password','qwerty','monkey','dragon','shadow','master','sunshine','princess','solo','trustno1','freedom','whatever','iloveyou','flower'] },
    { hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', type: 'SHA256', answer: 'password', difficulty: 'easy' },
    { hash: 'd033e22ae348aeb5660fc2140aec35850c4da997', type: 'SHA1', answer: 'admin', difficulty: 'easy' },
    { hash: 'ed9d3d832af899035363a69fd53cd3be8f71501c', type: 'SHA1', answer: 'shadow', difficulty: 'hard', wordlist: ['shadow','shadows','shadow1','shadow123','shadow!','shadow1234','darkness','night','hidden','secret','ghost','phantom','ninja','stealth','covert','hacker','cracker','cyber','root','toor','admin','password'] },
    { hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', type: 'SHA256', answer: '123456', difficulty: 'easy' },
    { hash: '65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5', type: 'SHA256', answer: 'qwerty', difficulty: 'hard', wordlist: ['qwerty','qwertyuiop','asdfgh','zxcvbn','password','123456','qwerty123','qwerty!','qwertz','azerty','qwerty1','qwerty2','qwerty3','qwerty4','qwerty5','qwerty6','qwerty7','qwerty8','qwerty9','qwerty0','qwerty!@#','qwerty1234'] },
    { hash: '25d55ad283aa400af464c76d713c07ad', type: 'MD5', answer: '12345678', difficulty: 'easy' },
    { hash: 'e807f1fcf82d132f9bb018ca6738a19f', type: 'MD5', answer: '1234567890', difficulty: 'easy' },
    // ROOM 3: HARDER
    { hash: '482c811da5d5b4bc6d497ffa98491e38', type: 'MD5', answer: 'password123', difficulty: 'hard', wordlist: ['password123','password1234','password12345','pass123','pass1234','pass12345','p@ssword','pa$$word','secret123','admin123','qwerty123','letmein123','welcome123','monkey123','dragon123','shadow123','master123','sunshine123','princess123','football123','baseball123','soccer123'] },
    { hash: '2d27b62c597ec858f6e7b54e7e58525e6a95e6d8', type: 'SHA1', answer: 'football', difficulty: 'hard', wordlist: ['football','football1','football123','football!','soccer','baseball','basketball','hockey','tennis','golf','rugby','cricket','volleyball','swimming','running','cycling','boxing','wrestling','sport','game','player','team','goal','score','winner'] },
    { hash: '000c285457fc971f862a79b786476c78812c8897063c6fa9c045f579a3b2d63f', type: 'SHA256', answer: 'monkey', difficulty: 'hard', wordlist: ['monkey','monkey1','monkey123','monkey!','monkey1234','monkeybusiness','ape','gorilla','chimp','banana','jungle','animal','zoo','wild','primate','macaque','baboon','spider','kingkong','donkey','funky','chunky'] },
    { hash: '8621ffdbc5698829397d97767ac13db3', type: 'MD5', answer: 'dragon', difficulty: 'hard', wordlist: ['dragon','dragon1','dragon123','dragonball','dragonfly','dragonz','dragon!','dragon1234','dragonfire','dragonlord','dragonheart','dragonmaster','wyvern','dragoon','draco','smaug','toothless','charizard'] },
    { hash: 'eb0a191797624dd3a48fa681d3061212', type: 'MD5', answer: 'master', difficulty: 'hard', wordlist: ['master','master1','master123','mastermind','masterkey','masterpiece','masterchief','masteryoda','master!','master1234','admin','root','super','boss','chief','lord','king','ruler','expert','pro','sensei','guru'] },
    { hash: 'e10adc3949ba59abbe56e057f20f883e', type: 'MD5', answer: '123456', difficulty: 'easy' },
    { hash: '5ebe2294ecd0e0f08eab7690d2a6ee69', type: 'MD5', answer: 'secret', difficulty: 'hard', wordlist: ['secret','secrets','secret1','secret123','topsecret','confidential','classified','private','hidden','unknown','mystery','enigma','code','cipher','key','lock','secure','password'] },
    { hash: 'c81e728d9d4c2f636f067f89cc14862c', type: 'MD5', answer: '2', difficulty: 'easy' },
    { hash: '356a192b7913b04c54574d18c28d46e6395428ab', type: 'SHA1', answer: '1', difficulty: 'easy' },
    { hash: '0716d9708d321ffb6a00818614779e779925365c', type: 'SHA1', answer: '17', difficulty: 'easy' },
    // ROOM 4: ADVANCED
    { hash: '21232f297a57a5a743894a0e4a801fc3', type: 'MD5', answer: 'admin', difficulty: 'easy' },
    { hash: 'e99a18c428cb38d5f260853678922e03', type: 'MD5', answer: 'abc123', difficulty: 'easy' },
    { hash: '25d55ad283aa400af464c76d713c07ad', type: 'MD5', answer: '12345678', difficulty: 'easy' },
    { hash: 'fcea920f7412b5da7be0cf42b8c93759', type: 'MD5', answer: '1234567', difficulty: 'easy' },
    { hash: '5f4dcc3b5aa765d61d8327deb882cf99', type: 'MD5', answer: 'password', difficulty: 'hard', wordlist: ['password','passw0rd','p@ssword','pa$$word','password1','password2','password123','secret','qwerty','admin','letmein','welcome','monkey','dragon','master','shadow','football','baseball','soccer','hockey','sunshine','princess','iloveyou','trustno1'] },
    { hash: 'b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3', type: 'SHA1', answer: 'letmein', difficulty: 'hard', wordlist: ['letmein','letmein123','letmein!','letmein1','access','enter','open','welcome','password','admin','secret'] },
    { hash: '7c4a8d09ca3762af61e59520943dc26494f8941b', type: 'SHA1', answer: '123456', difficulty: 'easy' },
    { hash: '65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5', type: 'SHA256', answer: 'qwerty', difficulty: 'hard', wordlist: ['qwerty','qwertyuiop','asdfgh','zxcvbn','password','123456','qwerty123'] },
    { hash: 'ed9d3d832af899035363a69fd53cd3be8f71501c', type: 'SHA1', answer: 'shadow', difficulty: 'hard', wordlist: ['shadow','shadows','shadow1','shadow123','dark','night','secret','hidden'] },
    { hash: '0192023a7bbd73250516f069df18b500', type: 'MD5', answer: 'admin123', difficulty: 'hard', wordlist: ['admin','admin123','administrator','root','super','sysadmin'] },
    // ROOM 5: MASTER
    { hash: '5f4dcc3b5aa765d61d8327deb882cf99', type: 'MD5', answer: 'password', difficulty: 'hard', wordlist: ['password','pass123','admin','letmein','qwerty','123456','password1','welcome','monkey','dragon','master','hello','freedom','whatever','trustno1','shadow'] },
    { hash: 'd8578edf8458ce06fbc5bb76a58c5ca4', type: 'MD5', answer: 'qwerty', difficulty: 'hard', wordlist: ['qwerty','azerty','qwertz','12345','qwerty1','qwertyuiop','asdfgh','zxcvbn','password','letmein'] },
    { hash: '5ebe2294ecd0e0f08eab7690d2a6ee69', type: 'MD5', answer: 'secret', difficulty: 'hard', wordlist: ['secret','hidden','classified','topsecret','private','confidential','secure','cryptic','mystery','enigma'] },
    { hash: 'd033e22ae348aeb5660fc2140aec35850c4da997', type: 'SHA1', answer: 'admin', difficulty: 'easy' },
    { hash: 'e10adc3949ba59abbe56e057f20f883e', type: 'MD5', answer: '123456', difficulty: 'easy' },
    { hash: '25f9e794323b453885f5181f1b624d0b', type: 'MD5', answer: '123456789', difficulty: 'easy' },
    { hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', type: 'SHA256', answer: '123456', difficulty: 'easy' },
    { hash: '2d27b62c597ec858f6e7b54e7e58525e6a95e6d8', type: 'SHA1', answer: 'football', difficulty: 'hard', wordlist: ['football','football1','football123','football!','soccer','baseball','basketball','hockey','tennis'] },
    { hash: '000c285457fc971f862a79b786476c78812c8897063c6fa9c045f579a3b2d63f', type: 'SHA256', answer: 'monkey', difficulty: 'hard', wordlist: ['monkey','monkey1','monkey123','monkey!','monkey1234','ape','gorilla','chimp','banana','jungle'] },
    { hash: '8621ffdbc5698829397d97767ac13db3', type: 'MD5', answer: 'dragon', difficulty: 'hard', wordlist: ['dragon','dragon1','dragon123','dragonball','dragonfly','dragonz','dragon!','dragon1234','dragonfire'] },
  ];

  const ROOMS = [];
  for (let i = 0; i < 5; i++) {
    ROOMS.push(questionsData.slice(i*10, i*10+10));
  }

  // ---------- STATE ----------
  let currentRoomIndex = 0;
  let currentQuestionIndex = 0;
  let roomSolved = new Array(5).fill().map(() => new Array(10).fill(false));
  let completedRooms = new Array(5).fill(false);

  // DOM elements
  const roomSelector = document.getElementById('room-selector');
  const challengePanel = document.getElementById('challenge-panel');
  const summaryPanel = document.getElementById('summary-panel');
  const roomGrid = document.getElementById('roomGrid');
  const globalStats = document.getElementById('globalStats');
  const roomTitle = document.getElementById('roomTitle');
  const progressIndicator = document.getElementById('progressIndicator');
  const hashTypeLabel = document.getElementById('hashTypeLabel');
  const hashDisplay = document.getElementById('hashDisplay');
  const wordlistContainer = document.getElementById('wordlistContainer');
  const wordlistBox = document.getElementById('wordlistBox');
  const answerInput = document.getElementById('answerInput');
  const submitBtn = document.getElementById('submitAnswerBtn');
  const nextBtn = document.getElementById('nextQuestionBtn');
  const resetRoomBtn = document.getElementById('resetRoomBtn');
  const messageBox = document.getElementById('messageBox');
  const backToRoomsBtn = document.getElementById('backToRoomsBtn');
  const summaryScore = document.getElementById('summaryScore');
  const answerKey = document.getElementById('answerKey');
  const summaryBackBtn = document.getElementById('summaryBackBtn');
  const copyHashBtn = document.getElementById('copyHashBtn');

  // Footer year
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Load from localStorage
  function loadProgress() {
    const saved = localStorage.getItem('johnRipperProgress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.roomSolved) roomSolved = data.roomSolved;
        if (data.completedRooms) completedRooms = data.completedRooms;
      } catch(e) {}
    }
  }
  function saveProgress() {
    localStorage.setItem('johnRipperProgress', JSON.stringify({ roomSolved, completedRooms }));
  }

  function renderRoomGrid() {
    roomGrid.innerHTML = '';
    const difficulties = ['EASY', 'MEDIUM', 'HARD', 'ADVANCED', 'MASTER'];
    ROOMS.forEach((room, idx) => {
      const solvedCount = roomSolved[idx].filter(v => v).length;
      const card = document.createElement('div');
      card.className = `room-card ${completedRooms[idx] ? 'completed' : ''}`;
      card.innerHTML = `
        <h3>ROOM ${idx+1}</h3>
        <div class="difficulty">${difficulties[idx]}</div>
        <div class="progress-badge">${solvedCount}/10 solved</div>
      `;
      card.addEventListener('click', () => enterRoom(idx));
      roomGrid.appendChild(card);
    });
    const totalSolved = roomSolved.flat().filter(v=>v).length;
    globalStats.innerHTML = `[ SYSTEM ] Total progress: ${totalSolved}/50 hashes cracked · ${completedRooms.filter(v=>v).length}/5 rooms completed`;
  }

  function enterRoom(roomIdx) {
    if (completedRooms[roomIdx]) {
      showRoomSummary(roomIdx);
      return;
    }
    currentRoomIndex = roomIdx;
    currentQuestionIndex = 0;
    for (let i=0; i<10; i++) {
      if (!roomSolved[roomIdx][i]) {
        currentQuestionIndex = i;
        break;
      }
    }
    switchPanel('challenge');
    loadQuestion();
  }

  function switchPanel(panelName) {
    roomSelector.classList.remove('active');
    challengePanel.classList.remove('active');
    summaryPanel.classList.remove('active');
    if (panelName === 'room') roomSelector.classList.add('active');
    if (panelName === 'challenge') challengePanel.classList.add('active');
    if (panelName === 'summary') summaryPanel.classList.add('active');
    if (panelName === 'room') renderRoomGrid();
  }

  function loadQuestion() {
    const room = ROOMS[currentRoomIndex];
    const q = room[currentQuestionIndex];
    roomTitle.textContent = `ROOM ${currentRoomIndex+1}: ${['WARM-UP','MEDIUM','HARD','ADVANCED','MASTER'][currentRoomIndex]}`;
    progressIndicator.textContent = `${currentQuestionIndex+1}/10`;
    hashTypeLabel.textContent = q.type;
    hashDisplay.textContent = q.hash;
    
    if (q.difficulty === 'hard' && q.wordlist) {
      wordlistContainer.style.display = 'block';
      wordlistBox.innerHTML = q.wordlist.map(w => `<span>${w}</span>`).join('');
    } else {
      wordlistContainer.style.display = 'none';
    }
    
    answerInput.value = '';
    messageBox.textContent = '';
    messageBox.className = 'message';
    nextBtn.disabled = true;
    
    if (roomSolved[currentRoomIndex][currentQuestionIndex]) {
      messageBox.textContent = '✓ Already cracked. Move to next.';
      messageBox.classList.add('success');
      nextBtn.disabled = false;
    }
    answerInput.focus();
  }

  function checkAnswer() {
    const room = ROOMS[currentRoomIndex];
    const q = room[currentQuestionIndex];
    const userAnswer = answerInput.value.trim();
    
    if (roomSolved[currentRoomIndex][currentQuestionIndex]) {
      messageBox.textContent = 'Already solved this one.';
      messageBox.classList.add('success');
      nextBtn.disabled = false;
      return;
    }
    
    if (userAnswer === q.answer) {
      roomSolved[currentRoomIndex][currentQuestionIndex] = true;
      saveProgress();
      messageBox.textContent = '✔ CORRECT! Hash cracked.';
      messageBox.classList.add('success');
      nextBtn.disabled = false;
      
      const allSolved = roomSolved[currentRoomIndex].every(v => v);
      if (allSolved && !completedRooms[currentRoomIndex]) {
        completedRooms[currentRoomIndex] = true;
        saveProgress();
        setTimeout(() => showRoomSummary(currentRoomIndex), 800);
      }
    } else {
      messageBox.textContent = '✘ INCORRECT. Try again.';
      messageBox.classList.remove('success');
    }
  }

  function nextQuestion() {
    const room = ROOMS[currentRoomIndex];
    let nextIdx = -1;
    for (let i = currentQuestionIndex+1; i < 10; i++) {
      if (!roomSolved[currentRoomIndex][i]) {
        nextIdx = i;
        break;
      }
    }
    if (nextIdx === -1) {
      if (!completedRooms[currentRoomIndex]) {
        completedRooms[currentRoomIndex] = true;
        saveProgress();
        showRoomSummary(currentRoomIndex);
      } else {
        showRoomSummary(currentRoomIndex);
      }
      return;
    }
    currentQuestionIndex = nextIdx;
    loadQuestion();
  }

  function resetRoom() {
    if (confirm('Reset current room progress? All solved hashes will be lost.')) {
      roomSolved[currentRoomIndex] = new Array(10).fill(false);
      completedRooms[currentRoomIndex] = false;
      saveProgress();
      currentQuestionIndex = 0;
      loadQuestion();
      renderRoomGrid();
    }
  }

  function showRoomSummary(roomIdx) {
    const room = ROOMS[roomIdx];
    const solvedCount = roomSolved[roomIdx].filter(v=>v).length;
    summaryScore.innerHTML = `Room ${roomIdx+1} · Score: ${solvedCount}/10`;
    
    let html = '<h3>// ANSWER KEY //</h3>';
    room.forEach((q, i) => {
      html += `<div class="answer-row"><span>${i+1}. [${q.type}] ${q.hash.substring(0,16)}…</span> <strong>→ ${q.answer}</strong> ${roomSolved[roomIdx][i] ? '✅' : '❌'}</div>`;
    });
    answerKey.innerHTML = html;
    switchPanel('summary');
  }

  // Copy hash functionality
  function copyHash() {
    const hash = hashDisplay.textContent;
    navigator.clipboard.writeText(hash).then(() => {
      messageBox.textContent = '📋 Hash copied to clipboard!';
      messageBox.classList.add('success');
      setTimeout(() => {
        if (messageBox.textContent.includes('copied')) {
          messageBox.textContent = '';
          messageBox.classList.remove('success');
        }
      }, 2000);
    }).catch(() => {
      messageBox.textContent = '❌ Copy failed';
    });
  }

  // Event listeners
  submitBtn.addEventListener('click', checkAnswer);
  nextBtn.addEventListener('click', nextQuestion);
  resetRoomBtn.addEventListener('click', resetRoom);
  backToRoomsBtn.addEventListener('click', () => {
    switchPanel('room');
    renderRoomGrid();
  });
  summaryBackBtn.addEventListener('click', () => {
    switchPanel('room');
    renderRoomGrid();
  });
  copyHashBtn.addEventListener('click', copyHash);

  answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkAnswer();
    }
  });

  // Initialize
  loadProgress();
  renderRoomGrid();
  switchPanel('room');
})();