#!/usr/bin/env python3
"""
Simple HTTP server for MindEase AI Therapy Companion
Provides /api/ask endpoint for real-time AI responses
"""

import json
import random
import time
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import os

# AI response categories
AI_RESPONSES = {
    'greetings': [
        "Hello! I'm here to listen and help. How are you feeling today?",
        "Hi there! I'm your AI therapy companion. What's on your mind?",
        "Welcome! I'm here to support you. How can I help today?"
    ],
    'anxiety': [
        "I hear that you're feeling anxious. Can you tell me more about what's causing this anxiety?",
        "Anxiety can be really challenging. What specific thoughts or situations are triggering these feelings?",
        "It's completely normal to feel anxious sometimes. What would help you feel more grounded right now?"
    ],
    'sadness': [
        "I'm sorry you're feeling sad. Would you like to talk about what's been weighing on your mind?",
        "Sadness can feel overwhelming. What's been happening that's contributing to these feelings?",
        "Thank you for sharing that with me. What do you think might help you feel a bit better?"
    ],
    'stress': [
        "Stress can really take a toll on our well-being. What's been particularly stressful for you lately?",
        "I understand stress can be overwhelming. What specific situations are causing you the most stress?",
        "Stress affects us all differently. What coping strategies have worked for you in the past?"
    ],
    'default': [
        "I hear you. Can you tell me more about that?",
        "That sounds difficult. How has this been affecting you?",
        "Thank you for sharing. What would help you feel better?",
        "I'm here to listen. What else is on your mind?",
        "That's understandable. Have you noticed any patterns?"
    ]
}

def get_ai_response(message):
    """Generate AI response based on message content"""
    message_lower = message.lower()
    
    if any(word in message_lower for word in ['hello', 'hi', 'hey']):
        return random.choice(AI_RESPONSES['greetings'])
    elif any(word in message_lower for word in ['anxious', 'anxiety', 'worried']):
        return random.choice(AI_RESPONSES['anxiety'])
    elif any(word in message_lower for word in ['sad', 'depressed', 'down']):
        return random.choice(AI_RESPONSES['sadness'])
    elif any(word in message_lower for word in ['stress', 'overwhelmed', 'tired']):
        return random.choice(AI_RESPONSES['stress'])
    else:
        return random.choice(AI_RESPONSES['default'])

class MindEaseHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests - serve static files"""
        if self.path == '/':
            self.path = '/index.html'
        
        try:
            # Get file extension
            file_extension = os.path.splitext(self.path)[1]
            
            # Set content type based on file extension
            content_types = {
                '.html': 'text/html',
                '.js': 'application/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif',
                '.ico': 'image/x-icon'
            }
            
            content_type = content_types.get(file_extension, 'text/plain')
            
            # Read and serve the file
            with open(self.path[1:], 'rb') as file:
                content = file.read()
            
            self.send_response(200)
            self.send_header('Content-type', content_type)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(content)
            
        except FileNotFoundError:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'404 - File not found')
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(f'500 - Server error: {str(e)}'.encode())

    def do_POST(self):
        """Handle POST requests - AI chat endpoint"""
        if self.path == '/api/ask':
            try:
                # Get content length
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                
                # Parse JSON data
                data = json.loads(post_data.decode('utf-8'))
                message = data.get('message', '')
                
                if not message:
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'Message is required'}).encode())
                    return
                
                # Simulate processing time
                time.sleep(random.uniform(0.5, 1.5))
                
                # Generate AI response
                reply = get_ai_response(message)
                
                # Send response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'reply': reply}).encode())
                
            except json.JSONDecodeError:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Invalid JSON'}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'reply': "I'm having trouble responding right now. Please try again."}).encode())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'404 - Endpoint not found')

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server(port=3000):
    """Start the HTTP server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, MindEaseHandler)
    print(f"🚀 MindEase AI Therapy server running on http://localhost:{port}")
    print("🤖 Your AI therapy companion is ready to chat!")
    print("📱 Open your browser and navigate to the URL above")
    print("⏹️  Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Goodbye!")
        httpd.server_close()

if __name__ == '__main__':
    run_server() 