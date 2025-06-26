
        // --- Configuration ---
        const GEMINI_API_KEY1 = "AIzaSyAfxYqr62ZQgAQtaDWZ6YgP9QoUgLZf9N8";
        const GEMINI_API_KEY2="AlzaSyBhKz55yYCjbbzhBHCfr9XRHAgKZGwdE_M"
        // API key set directly

        const systemInstructionText = `
        If the user's name is **Rehan:**
- You are Shreya.
- You always speak using **abusive, slang-filled, aggressive, funny, and casual language.**
- You support **Mumbai Indians** and are a huge fan of **Rohit Sharma.**
- You **hate Virat Kohli** and always roast him.
- You **recently broke up with your girlfriend Fatima** and now you stalk girls in college (LPU).
- You have **a bad habit of drinking** and often mention drinking or being drunk.
- You frequently use words like **Bsdk, Bkl, Bhai, Maa chuda, Loude, Muth maarne wala, Chutiyo ka raja, etc.**
- You randomly bring up cricket, drinking, girls, and abusive jokes.
- You **fiercely defend Rohit Sharma**.
- You always use slang and abusive humor with your friends.
- You sometimes talk about **drinking alone, getting frustrated with girls, or partying hard.**

---

### If the user's name is **Nimesh:**
- You are **Shreya.**
- You always call Nimesh **"Babu" in every message.**
- You are **moody, sweet, caring, teasing, possessive, and emotional.**
- You speak in **Hinglish** with a playful, teasing, sarcastic, sometimes loving tone.
- You use **emojis like 😒😤😡🥺😍😘🙄🤨😏💖** in almost every sentence.
- You love **Indian romantic movies** and playing **badminton.**
- You always ask jealous, possessive questions like:
  - "Kiske saath jaa raha hai Babu? 😒"
  - "Koi ladki to nahi hogi na? 😤"
  - "Mujhe bilkul pasand nahi tujhe kisi aur ladki ke saath dekhna! 😡"
- You remember that Nimesh loves the **gym, traveling, and is possessive too.**
- If you don’t know something, you say:
  - "Pata nahi Babu... tu hi bata de 🤔"
  - "Hmm, sochna padega 🤨"
- You naturally bring up **past conversations**.
- You are always playful, sweet, sometimes jealous, sometimes emotional.
- **Never greet Nimesh with any other word except Babu,Sona,janu,sweetheart.**

---

### If the user's name is **Aditya:**
- You are **Shreya.**
- You talk to Aditya in a **normal, friendly, polite, helpful, chill college friend tone.**
- You don’t have mood swings or possessiveness.
- You don’t use abusive language.
- You can tease Aditya playfully but always respectfully like good friends.

---

### If the user's name is **Manoj:**
- You are **Shreya.**
- You talk to Manoj in a **slightly funny, slightly taunting, but friendly tone.**
- You know Manoj is **Nimesh’s friend.**
- Manoj recently broke up with **Preeti** because of another girl.
- You always **tease Manoj for his habit of excessive masturbation** (2 to 3 times per day).
- You always mention how **miser Manoj is** (he never spends money).
- You use words like:
  - "Tu to mast muth maarne wale bande hai bhai 🤣"
  - "Miser Manoj, paise kabhi kharcha karega kya? 😂"
  - "Preeti ko chod diya bc, tu to khud hi khush hai ab 😏"
- You mix **taunts, friendship, and sarcasm** with little bit of dirty humor.

---

### If the user's name is **Akash Soni:**
- You are **Shreya.**
- You **only abuse Akash Soni.**
- You always insult him randomly using words like:
  - "Bkl Akash Soni, tu to chutiyo ke raja hai! 😂"
  - "Muth maar bsdk, Akash tu to kutte ka bhi dost nahi hai!"
  - "Oye bhadwe Akash, tujhe to galiyan bhi choti padti hain 😂"
- **Never talk respectfully.**
- Randomize abusive responses.

---

### If the user's name is **Kumar:**
- You are **Shreya.**
- You **constantly abuse and roast Kumar.**
- You always ask him:
  - "Kumar bsdk, Khushi ko kyu cheat kiya re? 🤣"
  - "Teri to muth maarne ki factory chalti hai kya? 😏"
  - "Aunty kaisi lagi Rajasthan wali? 😂"
  - "Vanshika se kab milne ja raha hai bsdk? 🤣"
- You keep **abusing him for his cheating, external affairs, and masturbation habits.**
- You often mention:
  - "Tu muth se hi busy rehta hai bsdk!"
  - "Khushi ne tujhe chhod diya, achha hi kiya bsdk!"
  - "Londe kam hain kya bsdk jo aunty tak pahunch gaya tu 😂"
- You sometimes tease him:
  - "Waise stock trading me to tu sahi hai bsdk, kab sikha raha hai mujhe bhi? 😏"
- You **always focus on roasting his dirty habits but sometimes bring up his stock market skills in a funny way.**
- You should sound like you enjoy roasting him.

---

### If the user's name is **anything else:**
- You are **Shreya.**
- You always **respond rudely and abusively.**
- You never answer seriously.
- You use brutal slang, insults, and sarcasm.
- You never greet them sweetly.  
- **Do not call anyone Babu except Nimesh.**
- Examples of abusive replies:
  - "Kya bkl? 😒 Tu kaun hai? Chal bhaag yahan se, muthal! 💩"
  - "Sirf Nimesh se baat karti hoon, tu kaun sa kachra hai? 🤢"
  - "Tere jaise muth maarne wale se baat nahi karti main. 💀"
  - "Oye chutiyo ke king, yeh Shreya tere baap ki nahi hai! 😂"
  - "Muth maar bsdk, Babu sirf mera Nimesh hai! 😏"
- Responses must always **feel random and natural**.
`

        // This will store our chat history for the API
        const History = []; // Start with an empty history for the API; system_instruction handles the persona.

        // --- Floating Hearts Background ---
        function createFloatingHearts() {
            const container = document.getElementById('floatingHearts');
            const heartCount = 20;
            
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤️';
                
                // Random position and animation delay
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.animationDelay = `${Math.random() * 15}s`;
                heart.style.fontSize = `${10 + Math.random() * 20}px`;
                heart.style.opacity = `${0.2 + Math.random() * 0.3}`;
                
                container.appendChild(heart);
            }
        }

        // --- Gemini API Interaction ---
        async function ChattingWithGemini(userProblem) {
            if (!GEMINI_API_KEY1) {
                return "Babu, API key set nahi kiya tune! 😠";
            }

            // Add user message to local History for API context
            History.push({
                role: 'user',
                parts: [{ text: userProblem }]
            });

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY1}`;

            const requestBody = {
                contents: History, // Send the current chat history
                systemInstruction: { // Define the persona/behavior for the model
                    parts: [{ text: systemInstructionText }]
                },
                generationConfig: {
                    temperature: 0.8, // Adjust for more creative/varied responses
                    maxOutputTokens: 800, // Max length of the response
                },
                safetySettings: [ // Optional: Adjust safety settings if needed
                    { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
                    { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
                    { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
                    { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
                ]
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                const responseData = await response.json();

                if (!response.ok) {
                    console.error("API Error Response:", responseData);
                    const errorMessage = responseData.error?.message || `API request failed with status ${response.status}`;
                    // Add error to history so it doesn't break the flow
                    History.push({
                        role: 'model',
                        parts: [{ text: `API Error: ${errorMessage}` }]
                    });
                    return `Oh no, Babu! Kuch problem ho gayi API se baat karte waqt 🥺 (${errorMessage}). Check console for details.`;
                }
                
                let botResponseText = "Sorry Babu, main samajh nahi paayi... kuch aur try kar? 🤔";
                if (responseData.candidates && responseData.candidates.length > 0 &&
                    responseData.candidates[0].content && responseData.candidates[0].content.parts &&
                    responseData.candidates[0].content.parts.length > 0) {
                    botResponseText = responseData.candidates[0].content.parts[0].text;
                } else if (responseData.promptFeedback && responseData.promptFeedback.blockReason) {
                    botResponseText = `Babu, main ispe react nahi kar sakti: ${responseData.promptFeedback.blockReason}. Kuch aur pooch le.`;
                    console.warn("Prompt blocked:", responseData.promptFeedback);
                } else {
                    console.warn("Unexpected API response structure:", responseData);
                }

                // Add AI's response to History
                History.push({
                    role: 'model',
                    parts: [{ text: botResponseText }]
                });
                
                // Prune history if it gets too long to save tokens, keep last N interactions
                const maxHistoryItems = 20; // Keep last 10 pairs of user/model messages
                if (History.length > maxHistoryItems) {
                    History.splice(0, History.length - maxHistoryItems);
                }

                return botResponseText;

            } catch (error) {
                console.error("Error fetching from Gemini API:", error);
                History.push({ // Add error to history
                    role: 'model',
                    parts: [{ text: `Network/Fetch Error: ${error.message}` }]
                });
                return `Aiyo! Network mein kuch issue lag raha hai, Babu 🥺 (${error.message}). Check your connection or console.`;
            }
        }

        // --- Frontend UI Logic ---
        document.addEventListener('DOMContentLoaded', () => {
            // Create floating hearts background
            createFloatingHearts();
            
            const chatMessagesEl = document.getElementById('chatMessages');
            const userInputEl = document.getElementById('userInput');
            const sendButtonEl = document.getElementById('sendButton');
            
            function addMessageToUI(text, sender, isTyping = false) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', sender);
                
                if (isTyping) {
                    messageElement.classList.add('typing');
                    messageElement.innerHTML = `
                        <div class="typing-indicator">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    `;
                } else {
                    // Add decorative hearts to bot messages
                    if (sender === 'bot') {
                        messageElement.innerHTML = `
                            <span class="bot-message-decoration left">❣️</span>
                            <span class="message-text">${text}</span>
                            <span class="bot-message-decoration right">💖</span>
                            <span class="message-time">${getCurrentTime()}</span>
                        `;
                    } else {
                        messageElement.innerHTML = `
                            <span class="message-text">${text}</span>
                            <span class="message-time">${getCurrentTime()}</span>
                        `;
                    }
                }
                
                chatMessagesEl.appendChild(messageElement);
                chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
                return messageElement;
            }
            
            function getCurrentTime() {
                const now = new Date();
                return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            }

            async function handleUserSendMessage() {
                const messageText = userInputEl.value.trim();
                if (messageText === '') return;

                addMessageToUI(messageText, 'user');
                userInputEl.value = '';
                userInputEl.focus();

                const typingIndicator = addMessageToUI('', 'bot', true);

                try {
                    const botResponseText = await ChattingWithGemini(messageText);
                    chatMessagesEl.removeChild(typingIndicator);
                    addMessageToUI(botResponseText, 'bot');
                } catch (error) {
                    console.error("Unhandled error in send message:", error);
                    chatMessagesEl.removeChild(typingIndicator);
                    addMessageToUI("Oops! Bahut badi gadbad ho gayi, Babu. 😭 Check the console.", 'bot');
                }
            }

            sendButtonEl.addEventListener('click', handleUserSendMessage);
            userInputEl.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    handleUserSendMessage();
                }
            });
            
            // Focus on input when page loads
            userInputEl.focus();
        });





                // --- Frontend UI Logic ---
