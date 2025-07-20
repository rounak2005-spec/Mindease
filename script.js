document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const chatContainer = document.querySelector('.chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    const typingIndicator = document.createElement('div');

    // AI response categories
    const aiResponses = {
        greetings: [
            "Hello! I'm here to listen and help. How are you feeling today?",
            "Hi there! I'm your AI therapy companion. What's on your mind?",
            "Welcome! I'm here to support you. How can I help today?"
        ],
        anxiety: [
            "I hear that you're feeling anxious. Can you tell me more about what's causing this anxiety?",
            "Anxiety can be really challenging. What specific thoughts or situations are triggering these feelings?",
            "It's completely normal to feel anxious sometimes. What would help you feel more grounded right now?",
            "I understand anxiety can be overwhelming. Have you tried any breathing exercises or grounding techniques?",
            "Anxiety often comes from uncertainty. What aspects of your situation feel most uncertain to you?"
        ],
        sadness: [
            "I'm sorry you're feeling sad. Would you like to talk about what's been weighing on your mind?",
            "Sadness can feel overwhelming. What's been happening that's contributing to these feelings?",
            "Thank you for sharing that with me. What do you think might help you feel a bit better?",
            "It's okay to feel sad sometimes. What would feel supportive to you right now?",
            "Sadness often needs to be felt and acknowledged. How long have you been feeling this way?"
        ],
        stress: [
            "Stress can really take a toll on our well-being. What's been particularly stressful for you lately?",
            "I understand stress can be overwhelming. What specific situations are causing you the most stress?",
            "Stress affects us all differently. What coping strategies have worked for you in the past?",
            "When stress builds up, it can feel like everything is too much. What's one small thing that might help?",
            "Stress often comes from feeling like we have too much to handle. What feels most manageable right now?"
        ],
        anger: [
            "I can sense you're feeling angry. What's been frustrating you lately?",
            "Anger is a natural emotion. What triggered these feelings?",
            "It's okay to feel angry. What would help you express this anger in a healthy way?",
            "Anger often masks other emotions. What might be underneath the anger?",
            "When we're angry, it can be hard to think clearly. What do you need right now?"
        ],
        tired: [
            "It sounds like you're feeling really tired. How has your sleep been lately?",
            "Fatigue can affect everything in our lives. What's been most draining for you?",
            "Being tired can make everything feel harder. What would help you get some rest?",
            "Sometimes tiredness is physical, sometimes emotional. Which feels more present for you?",
            "Rest is essential for our well-being. What would feel most restorative to you?"
        ],
        default: [
            "I hear you. Can you tell me more about that?",
            "That sounds difficult. How has this been affecting you?",
            "Thank you for sharing. What would help you feel better?",
            "I'm here to listen. What else is on your mind?",
            "That's understandable. Have you noticed any patterns?",
            "What do you think might help in this situation?",
            "How long have you been dealing with this?",
            "What would you like to focus on right now?",
            "That sounds challenging. What support do you feel you need?",
            "I appreciate you sharing this with me. What's your biggest concern?"
        ]
    };

    // Function to get AI response based on message content
    function getAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
        } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
            return aiResponses.anxiety[Math.floor(Math.random() * aiResponses.anxiety.length)];
        } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down') || lowerMessage.includes('blue')) {
            return aiResponses.sadness[Math.floor(Math.random() * aiResponses.sadness.length)];
        } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
            return aiResponses.stress[Math.floor(Math.random() * aiResponses.stress.length)];
        } else if (lowerMessage.includes('angry') || lowerMessage.includes('mad') || lowerMessage.includes('frustrated') || lowerMessage.includes('irritated')) {
            return aiResponses.anger[Math.floor(Math.random() * aiResponses.anger.length)];
        } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('fatigue') || lowerMessage.includes('sleepy')) {
            return aiResponses.tired[Math.floor(Math.random() * aiResponses.tired.length)];
        } else {
            return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
        }
    }

    // Welcome message
    addMessageToChat('assistant', "Hello! I'm your AI therapy companion. How are you feeling today?");

    function addMessageToChat(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${role}-message`);
        messageDiv.textContent = content;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    async function getAIResponseWithDelay(userMessage) {
        // Create typing indicator
        typingIndicator.className = 'message ai-message';
        typingIndicator.textContent = '...';
        typingIndicator.style.animation = 'breathe 1.5s ease-in-out infinite';
        chatContainer.appendChild(typingIndicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        try {
            // Simulate processing time (500ms to 1.5s)
            const delay = 500 + Math.random() * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Remove typing indicator
            chatContainer.removeChild(typingIndicator);
            
            // Get AI response
            const reply = getAIResponse(userMessage);
            
            // Add AI response
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai-message';
            aiMessage.textContent = reply;
            aiMessage.style.animation = 'messageIn 0.4s forwards, breathe 6s ease-in-out infinite';
            chatContainer.appendChild(aiMessage);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } catch (error) {
            console.error("Error getting AI response:", error);
            
            // Remove typing indicator
            chatContainer.removeChild(typingIndicator);
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'message ai-message';
            errorMessage.textContent = "Sorry, I couldn't get a response right now.";
            chatContainer.appendChild(errorMessage);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    function handleUserInput() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.textContent = message;
            userMessage.style.animation = 'none';
            chatContainer.appendChild(userMessage);
            void userMessage.offsetWidth;
            userMessage.style.animation = 'messageIn 0.4s forwards';
            
            userInput.value = '';
            getAIResponseWithDelay(message);
        }
    }

    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });
});
