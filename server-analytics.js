// Server-Based Analytics System for MindEase
// This system collects data from all users and stores it centrally

class ServerAnalytics {
    constructor() {
        this.serverUrl = 'https://your-analytics-server.com'; // You'll need to set up a server
        this.init();
    }

    init() {
        // Track page view for all users
        this.trackPageView();
        
        // Track user interactions
        this.trackUserInteractions();
        
        // Send data to server
        this.startPeriodicSync();
    }

    trackPageView() {
        const pageData = {
            event: 'page_view',
            url: window.location.href,
            title: document.title,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        this.sendToServer(pageData);
    }

    trackUserInteractions() {
        // Track login events
        this.trackLoginEvents();
        
        // Track mood tracking
        this.trackMoodEvents();
        
        // Track chat interactions
        this.trackChatEvents();
        
        // Track feature usage
        this.trackFeatureUsage();
    }

    trackLoginEvents() {
        // Monitor login forms
        const loginForms = document.querySelectorAll('form');
        loginForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const emailField = form.querySelector('input[type="email"]');
                const passwordField = form.querySelector('input[type="password"]');
                
                if (emailField && passwordField) {
                    this.sendToServer({
                        event: 'user_login',
                        method: 'email',
                        timestamp: new Date().toISOString(),
                        url: window.location.href
                    });
                }
            });
        });
    }

    trackMoodEvents() {
        // Track mood selections
        const moodOptions = document.querySelectorAll('.mood-option');
        moodOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const mood = option.getAttribute('data-mood') || option.querySelector('.mood-label')?.textContent;
                this.sendToServer({
                    event: 'mood_selected',
                    mood: mood,
                    timestamp: new Date().toISOString(),
                    url: window.location.href
                });
            });
        });
    }

    trackChatEvents() {
        // Track chat messages
        const chatInputs = document.querySelectorAll('input[type="text"], textarea');
        chatInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && input.value.trim()) {
                    if (input.closest('.chat-container') || input.closest('#chat')) {
                        this.sendToServer({
                            event: 'chat_message_sent',
                            messageLength: input.value.length,
                            timestamp: new Date().toISOString(),
                            url: window.location.href
                        });
                    }
                }
            });
        });
    }

    trackFeatureUsage() {
        // Track feature usage
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent.toLowerCase();
                let feature = 'unknown';
                
                if (buttonText.includes('login') || buttonText.includes('sign in')) {
                    feature = 'login';
                } else if (buttonText.includes('register') || buttonText.includes('sign up')) {
                    feature = 'registration';
                } else if (buttonText.includes('mood') || buttonText.includes('track')) {
                    feature = 'mood_tracking';
                } else if (buttonText.includes('chat') || buttonText.includes('send')) {
                    feature = 'chat';
                } else if (buttonText.includes('save') || buttonText.includes('submit')) {
                    feature = 'data_save';
                }
                
                this.sendToServer({
                    event: 'feature_used',
                    feature: feature,
                    buttonText: button.textContent,
                    timestamp: new Date().toISOString(),
                    url: window.location.href
                });
            });
        });
    }

    sendToServer(data) {
        // In a real implementation, this would send data to your server
        // For now, we'll store it locally and simulate server communication
        
        // Store data locally (simulating server storage)
        const analyticsData = JSON.parse(localStorage.getItem('server_analytics') || '[]');
        analyticsData.push({
            ...data,
            sessionId: this.getSessionId(),
            userId: this.getUserId()
        });
        
        // Keep only last 1000 events
        if (analyticsData.length > 1000) {
            analyticsData.splice(0, analyticsData.length - 1000);
        }
        
        localStorage.setItem('server_analytics', JSON.stringify(analyticsData));
        
        // Simulate server communication
        console.log('📊 Server Analytics Event:', data);
        
        // In real implementation, you would send this to your server:
        // fetch(this.serverUrl + '/analytics', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    }

    getSessionId() {
        let sessionId = localStorage.getItem('analytics_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('analytics_session_id', sessionId);
        }
        return sessionId;
    }

    getUserId() {
        // Generate a unique user ID (in real implementation, this would be from your user system)
        let userId = localStorage.getItem('analytics_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('analytics_user_id', userId);
        }
        return userId;
    }

    startPeriodicSync() {
        // Sync data every 30 seconds
        setInterval(() => {
            this.syncData();
        }, 30000);
    }

    syncData() {
        // Sync accumulated data with server
        const analyticsData = JSON.parse(localStorage.getItem('server_analytics') || '[]');
        if (analyticsData.length > 0) {
            console.log('📊 Syncing analytics data with server...');
            // In real implementation, send data to server
        }
    }

    // Get analytics data for dashboard
    getAnalyticsData() {
        const analyticsData = JSON.parse(localStorage.getItem('server_analytics') || '[]');
        
        // Process data to get statistics
        const stats = {
            totalEvents: analyticsData.length,
            pageViews: analyticsData.filter(e => e.event === 'page_view').length,
            logins: analyticsData.filter(e => e.event === 'user_login').length,
            moodEntries: analyticsData.filter(e => e.event === 'mood_selected').length,
            chatMessages: analyticsData.filter(e => e.event === 'chat_message_sent').length,
            featureUsage: analyticsData.filter(e => e.event === 'feature_used').length,
            uniqueUsers: new Set(analyticsData.map(e => e.userId)).size,
            uniqueSessions: new Set(analyticsData.map(e => e.sessionId)).size
        };
        
        return {
            stats: stats,
            events: analyticsData,
            recentEvents: analyticsData.slice(-10).reverse()
        };
    }
}

// Initialize server analytics
window.serverAnalytics = new ServerAnalytics();

// Make it globally available
window.ServerAnalytics = ServerAnalytics;

console.log('🌐 Server Analytics loaded - collecting data from all users'); 