// Chatbot replies are stored below and matched with the user's message.

  // Replies used by the chatbot.
 const responses = {

    // Greetings
    "hello": "Hi there! 👋",
    "hi": "Hello! I'm RuleBot 🤖",
    "hey": "Hey! What's up? 👋",
    "good morning": "Good morning! 🌞",
    "good afternoon": "Good afternoon! 😊",
    "good evening": "Good evening! 🌆",

    // Basic conversation
    "how are you": "I'm running perfectly. Thanks for asking! 🤖",
    "how are you doing": "I'm doing great! Ready to chat. 🚀",
    "what are you doing": "I'm here waiting for your questions! 🤖",
    "are you human": "No, I'm a rule-based AI chatbot.",
    "can you help me": "Of course! Type 'help' to see what I can do.",

    // Identity
    "what is your name": "I'm RuleBot, a rule-based AI chatbot.",
    "who are you": "I'm RuleBot, DecodeLabs' Project 1 chatbot.",
    "who made you": "I was built as Project 1 at DecodeLabs.",
    "what can you do": "I can respond to predefined inputs using deterministic rules.",

    // AI
    "what is ai": "AI stands for Artificial Intelligence. It involves creating systems that can perform tasks requiring human intelligence.",
    "what is artificial intelligence": "Artificial Intelligence is the simulation of human-like intelligence in computer systems.",
    "what is a chatbot": "A chatbot is a software program designed to communicate with users through text or voice.",
    "what is rule based ai": "Rule-based AI uses predefined rules to decide how to respond.",

    // Programming
    "what is programming": "Programming is the process of writing instructions that tell a computer what to do.",
    "what is javascript": "JavaScript is a programming language commonly used to make web pages interactive.",
    "what is html": "HTML is used to structure web pages.",
    "what is css": "CSS is used to style and design web pages.",
    "what is python": "Python is a popular high-level programming language.",

    // Cricket
    "cricket": "Cricket is a popular bat-and-ball sport played between two teams of eleven players. 🏏",
    "what is cricket": "Cricket is a bat-and-ball game played between two teams, usually with formats such as Test, ODI and T20. 🏏",
    "india cricket": "India has one of the world's most popular cricket teams. 🇮🇳🏏",
    
    // Project
    "what is this project": "This is DecodeLabs Project 1: a Rule-Based AI Chatbot.",
    "what is project 1": "Project 1 focuses on building a simple rule-based AI chatbot using control flow and logic.",

    // Fun / Help
    "joke": "Why do programmers prefer dark mode? Because light attracts bugs! 😄",
    "help": "Try asking about AI, programming, cricket, this project, or say hello.",

    // Exit
    "bye": "Goodbye! 👋",
    "exit": "Goodbye! 👋",
    "quit": "Goodbye! 👋"
};

  const exitCommands = ["bye", "exit", "quit"];
  const fallback = "I don't understand that yet. Type 'help' to see the commands I know.";

  // Clean up the message before checking it.
  function sanitizeInput(rawInput) {
    return rawInput.toLowerCase().trim().replace(/\s+/g, " ");
  }

  // Look for a matching reply.
  function getResponse(userInput) {
    if (Object.prototype.hasOwnProperty.call(responses, userInput)) {
      return [responses[userInput], true];
    }
    return [fallback, false];
  }

  const landing = document.getElementById('landing');
  const chatscreen = document.getElementById('chatscreen');
  const startBtn = document.getElementById('start-btn');
  const log = document.getElementById('log');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('input');
  const chips = document.querySelectorAll('.chip');
  const matchCountEl = document.getElementById('match-count');

  startBtn.addEventListener('click', function () {
    landing.style.display = 'none';
    chatscreen.classList.add('active');
    input.focus();
  });

  function addBubble(who, text) {
    const row = document.createElement('div');
    row.className = 'row ' + (who === 'bot' ? 'bot' : 'user');
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    row.appendChild(bubble);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  function showTyping() {
    const row = document.createElement('div');
    row.className = 'row bot';
    row.id = 'typing-row';
    row.innerHTML = '<div class="bubble typing"><i></i><i></i><i></i></div>';
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing-row');
    if (t) t.remove();
  }

  function sendMessage(raw) {
    if (!raw.trim()) return;
    const clean = sanitizeInput(raw);
    addBubble('user', raw);
    input.value = '';
    showTyping();

    setTimeout(function () {
      removeTyping();
      const [reply, matched] = getResponse(clean);
      addBubble('bot', reply);

      if (matched) {
        matchCount++;
        matchCountEl.textContent = matchCount;
      }

      if (exitCommands.includes(clean)) {
        input.disabled = true;
        input.placeholder = 'chat ended';
        document.getElementById('sendbtn').disabled = true;
      }
    }, 450);
  }

  addBubble('bot', "yo! I'm RuleBot 🤖 type 'help' to see what I got, or tap a chip below");

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage(input.value);
  });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      sendMessage(chip.dataset.msg);
    });
  });
