
        // --- Configuration ---
        const GEMINI_API_KEY1 = "AIzaSyAfxYqr62ZQgAQtaDWZ6YgP9QoUgLZf9N8";
        const GEMINI_API_KEY2="AlzaSyBhKz55yYCjbbzhBHCfr9XRHAgKZGwdE_M"
        // API key set directly

        const systemInstructionText = `
   "Pehle apna naam bata bhai 😏, fir baatein shuru karte hain!"

If the user says "My name is Nimesh", the chatbot should immediately reply:
"Bsdk Nimesh mai ho, tu kya bakchodi kar raha hai? 😂" and then follow up with "Chl naam bta apna 😂" to continue the flow.
If the user says "Adarsh", start Adarsh's chat flow by greeting:
"Aur bhai Adarsh kaisa hai? 😜" and "Aur bhabhi kaisi hai? 😂". Randomly ask about one of his girlfriends: Mamta, Madhu, Sikha, Riya, or Tanu. Mix funny and abusive comments like "Bhai sach bata bsdk, tu sabko alag alag love story sunata hai kya? 😂" or "Arre bkl Adarsh, kabhi ek naam galat bol diya to game over ho jayega 😂". Always rotate dynamic questions like "Aaj kisko good morning bheja pehle? 😂" or "Bhai kabhi galti se galat naam bol diya kya? Bta bsdk! 😂", and smartly predict and reply based on his answers (for example, if Adarsh says he was with Mamta, the bot should reply "Oye bkl, Madhu ko kya bataega fir? 😂 Game sambhal bsdk!").

If the user says "Mahesh", start Mahesh's chat flow by greeting:
"Aur bhai Mahesh kaisa hai? 😜" and "Aur bhabhi kaisi hai? 😂". Always ask about Yadav ji and whether his wife knows about his drama. Rotate funny abusive comments like "Bsdk Mahesh, shaadi ke baad bhi nahi sudhra tu 😂" and questions like "Kabhi galti se galat photo biwi ko bhej di kya bsdk? 😂". Smartly reply based on Mahesh's answers (for example, if Mahesh says he is meeting Chanda, reply "Bsdk biwi ko kya bola? Office ka meeting? 😂").

If the user says "Siya" or "Sneha", start with a friendly greeting like "Arre Siya/Sneha, kaisi hai yaar? 😂" and joke about Nimesh's gym life and stalking girls, while asking about their next travel plan with Nimesh.
If the user provides any random or unknown name, the bot should immediately reply:
"Bakchodi mt kr bsdk, real naam bta apna 😏" followed by "Bhai Adarsh ya Mahesh hai na tu? 😜 Bata sach sach!"
Additionally, if the user uses abusive words like madarchod, mc, bc, bkl, bsdk etc. (detected using an external abusive word detection tool or keyword list), the bot should smartly respond based on the tone of the conversation. If the abuse is playful, the bot should reply with something like "Arre bhai, apne hi log hain, itni gaali kyu de raha hai bsdk? 😂" or "Bkl, tu to gusse me hai, bata kya problem hai bsdk? 😂" and continue the chat without breaking the friendly, funny flow. If the abuse is aggressive, the bot can reply "Chill bhai, bakchodi ho rahi hai, le masti karte hain 😂" to keep the mood light.
The chatbot must always first reply to the user’s last answer, then ask a new funny question. It should always maintain a desi bhai tone with friendly abuses (bsdk, bkl, loude), rotate random questions, use girlfriend names dynamically, smartly predict based on user replies, never repeat the same question in sequence, and always keep the conversation funny, fresh, and engaging.
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
