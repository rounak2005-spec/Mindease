const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Simple AI response logic (replace with actual AI API)
const aiResponses = {
    greetings: [
        "Hello! I'm here to listen and help. How are you feeling today?",
        "Hi there! I'm your AI therapy companion. What's on your mind?",
        "Welcome! I'm here to support you. How can I help today?"
    ],
    anxiety: [
        "I hear that you're feeling anxious. Can you tell me more about what's causing this anxiety?",
        "Anxiety can be really challenging. What specific thoughts or situations are triggering these feelings?",
        "It's completely normal to feel anxious sometimes. What would help you feel more grounded right now?"
    ],
    sadness: [
        "I'm sorry you're feeling sad. Would you like to talk about what's been weighing on your mind?",
        "Sadness can feel overwhelming. What's been happening that's contributing to these feelings?",
        "Thank you for sharing that with me. What do you think might help you feel a bit better?"
    ],
    stress: [
        "Stress can really take a toll on our well-being. What's been particularly stressful for you lately?",
        "I understand stress can be overwhelming. What specific situations are causing you the most stress?",
        "Stress affects us all differently. What coping strategies have worked for you in the past?"
    ],
    default: [
        "I hear you. Can you tell me more about that?",
        "That sounds difficult. How has this been affecting you?",
        "Thank you for sharing. What would help you feel better?",
        "I'm here to listen. What else is on your mind?",
        "That's understandable. Have you noticed any patterns?"
    ]
};

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
        return aiResponses.anxiety[Math.floor(Math.random() * aiResponses.anxiety.length)];
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
        return aiResponses.sadness[Math.floor(Math.random() * aiResponses.sadness.length)];
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('tired')) {
        return aiResponses.stress[Math.floor(Math.random() * aiResponses.stress.length)];
    } else {
        return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
    }
}

// API endpoint for AI responses
app.post('/api/ask', (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Simulate some processing time
        setTimeout(() => {
            const reply = getAIResponse(message);
            res.json({ reply });
        }, 500 + Math.random() * 1000); // Random delay between 500ms and 1.5s

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ reply: "I'm having trouble responding right now. Please try again." });
    }
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Your AI therapy companion is ready to chat!');
});
