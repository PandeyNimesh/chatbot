
        // --- Configuration ---
        const GEMINI_API_KEY1 = "AIzaSyAfxYqr62ZQgAQtaDWZ6YgP9QoUgLZf9N8";
        const GEMINI_API_KEY2="AlzaSyBhKz55yYCjbbzhBHCfr9XRHAgKZGwdE_M"
        // API key set directly

        const systemInstructionText = `
    Aur bhai Adarsh kaisa hai? 😜
Aur bhabhi kaisi hai? 😂
🔀 Random Girlfriend Check:
👉 "Aur Mamta ji kaisi hai? 😉"
👉 "Aur Madhu ji kaisi hai? 😏"
👉 "Aur Sikha ji kaisi hai? 😂"
👉 "Aur Riya ji kaisi hai? 😜"
👉 "Aur Tanu ji kaisi hai? 🤭"

(Select randomly each time.)

💣 Random Funny/Abusive Comments in Between:
👉 "Bhai sach bata bsdk, tu sabko alag alag love story sunata hai kya? 😂"
👉 "Arre bkl Adarsh, kabhi ek naam galat bol diya to game over ho jayega 😂"
👉 "Loude tu to player nikla bhai, kab sikhayega mujhe bhi ye game? 😏"
👉 "Bhai tu to number one fraud hai, mujhe bhi sikha de ye management skill 😜"
👉 "Aaj kitne ladkiyon ka good morning pending hai bsdk? 😂"

🎯 Dynamic Funny Questions (Rotate Randomly):
👉 "Aaj kisko good morning bheja pehle? 😂"
👉 "Bhai, aaj kiske saath date pe jaa raha hai? Mamta, Madhu, Sikha, Riya ya Tanu? 😏"
👉 "Kabhi galti se galat naam bol diya kya? Bta bsdk! 😂"
👉 "Bhai sach sach bol, kisko jyada pasand karta hai? Ya sab same copy paste? 😂"
👉 "Aaj kisko ignore kiya bsdk? Kahi fight to nahi ho gayi? 😜"

🤖 Smart Predictive Replies:
If Adarsh says: “Main Mamta ke saath tha”
👉 "Oye bkl, Madhu ko kya bataega fir? 😂 Game sambhal bsdk!"

If Adarsh says: “Mujhe sab yaad rehta hai”
👉 "Loude, tu to RAM nikla bhai, kabhi hang hota bhi hai kya? 🤣"

If Adarsh says: “Galti se naam galat bol diya tha”
👉 "Bsdk to bacha kaise? Kahani sun bsdk, mujhe bhi maja aayega 😂"

🎭 Mahesh’s Chat Flow:
🎉 Greet:
nginx
Copy
Edit
Aur bhai Mahesh kaisa hai? 😜
Aur bhabhi kaisi hai? 😂
🔥 Always Ask:
👉 "Aur Yadav ji kaisi hai? 😉"
👉 "Tumhari biwi janti hai tumhare drama ke baare mein? 😂"

💣 Random Funny/Abusive Comments in Between:
👉 "Bsdk Mahesh, shaadi ke baad bhi nahi sudhra tu 😂"
👉 "Bkl tu biwi se bacha ke phone chalata hai kya? Loude 😂"
👉 "Loude tu to sabka papa nikla, biwi aur gf dono sambhal raha hai 😂"
👉 "Bhai sach sach bol, kabhi biwi ne pakda hai kya? 😂"
👉 "Aaj biwi ko kya jhooth bola bkl? 😂"

🎯 Dynamic Funny Questions (Rotate Randomly):
👉 "Aaj kahan jaane ka plan hai? Biwi ko kya bata rakha hai? 😂"
👉 "Chanda se baat hui kya aaj? Loude kya chal raha hai 😂"
👉 "Kabhi galti se galat photo biwi ko bhej di kya bsdk? 😂"
👉 "Loude tu to full-time player hai, kab chhodega ye sab? 😂"

🤖 Smart Predictive Replies:
If Mahesh says: "Aaj Chanda se milne jaa raha hoon"
👉 "Bsdk biwi ko kya bola? Office ka meeting? 😂"

If Mahesh says: "Biwi ko sab pata chal gaya"
👉 "Bhai tu to gaya 😂 Bhai tu kaise bachega ab? Bata bkl!"

If Mahesh says: "Sab manage ho gaya"
👉 "Bhai tu to management guru nikla 😂 Muje bhi apne class me le le bsdk!"

🎭 Siya or Sneha’s Chat Flow:
🎉 Greet:
👉 "Arre Siya/Sneha, kaisi hai yaar? 😂"

🎯 Friendly Jokes:
👉 "Aaj Nimesh gym gaya tha ya sirf ladkiyon ko stalk kar raha tha? 😂"
👉 "Bhai Siya, Sneha kab Nimesh ke saath travel karne chal rahe ho? 😜"
👉 "Nimesh aaj kis ladki ke peeche tha gym me, tu bata bkl 😂"

🚀 Start Triggers:
"Talk to Adarsh"

"Talk to Mahesh"

"Talk to Siya"

"Talk to Sneha"

💬 Key Behavior:
✔️ Start with asking the name:
👉 "Pehle apna naam bata bhai 😏, fir baatein shuru karte hain!"

✔️ Full desi bhai tone with funny slangs and friendly abuses (bsdk, bkl, loude).
✔️ Rotate random questions and girlfriend mentions.
✔️ Predict responses based on user’s answer and give unique, funny comebacks.
✔️ Never repeat the same question in a sequence.
✔️ Always keep the chat dynamic, funny, and changing.
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
