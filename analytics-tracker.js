// MindEase Analytics Tracker
// This script tracks user activity and sends data to the analytics dashboard

class MindEaseAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.pageViews = 0;
        this.actions = [];
        this.init();
    }

    init() {
        // Track page view
        this.trackPageView();
        
        // Track user interactions
        this.trackUserInteractions();
        
        // Track session duration
        this.trackSessionDuration();
        
        // Send data periodically
        this.startPeriodicTracking();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    trackPageView() {
        this.pageViews++;
        this.logAction('page_view', {
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        });
        
        // Update total visitors in localStorage
        let totalVisitors = parseInt(localStorage.getItem('mindease_total_visitors')) || 0;
        totalVisitors++;
        localStorage.setItem('mindease_total_visitors', totalVisitors);
    }

    trackUserInteractions() {
        // Track login events
        this.trackLoginEvents();
        
        // Track mood tracking events
        this.trackMoodEvents();
        
        // Track chat events
        this.trackChatEvents();
        
        // Track mobile usage
        this.trackMobileUsage();
    }

    trackLoginEvents() {
        // Listen for login form submissions
        const loginForms = document.querySelectorAll('form[data-analytics="login"]');
        loginForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                this.logAction('user_login', {
                    method: 'form',
                    timestamp: new Date().toISOString()
                });
                
                // Update total logins
                let totalLogins = parseInt(localStorage.getItem('mindease_total_logins')) || 0;
                totalLogins++;
                localStorage.setItem('mindease_total_logins', totalLogins);
            });
        });

        // Track guest logins
        const guestButtons = document.querySelectorAll('[data-analytics="guest-login"]');
        guestButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.logAction('guest_login', {
                    timestamp: new Date().toISOString()
                });
                
                let totalLogins = parseInt(localStorage.getItem('mindease_total_logins')) || 0;
                totalLogins++;
                localStorage.setItem('mindease_total_logins', totalLogins);
            });
        });
    }

    trackMoodEvents() {
        // Track mood selections
        const moodButtons = document.querySelectorAll('[data-analytics="mood-select"]');
        moodButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const mood = e.target.getAttribute('data-mood') || e.target.textContent;
                this.logAction('mood_selected', {
                    mood: mood,
                    timestamp: new Date().toISOString()
                });
                
                // Update mood entries count
                let moodEntries = parseInt(localStorage.getItem('mindease_mood_entries')) || 0;
                moodEntries++;
                localStorage.setItem('mindease_mood_entries', moodEntries);
            });
        });

        // Track mood form submissions
        const moodForms = document.querySelectorAll('form[data-analytics="mood-form"]');
        moodForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                this.logAction('mood_submitted', {
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    trackChatEvents() {
        // Track chat message sends
        const chatInputs = document.querySelectorAll('[data-analytics="chat-input"]');
        chatInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && input.value.trim()) {
                    this.logAction('chat_message_sent', {
                        message_length: input.value.length,
                        timestamp: new Date().toISOString()
                    });
                    
                    // Update chat messages count
                    let chatMessages = parseInt(localStorage.getItem('mindease_chat_messages')) || 0;
                    chatMessages++;
                    localStorage.setItem('mindease_chat_messages', chatMessages);
                }
            });
        });

        // Track chat button clicks
        const chatButtons = document.querySelectorAll('[data-analytics="chat-send"]');
        chatButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.logAction('chat_button_clicked', {
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    trackMobileUsage() {
        // Check if user is on mobile
        if (window.innerWidth <= 768) {
            this.logAction('mobile_access', {
                screen_width: window.innerWidth,
                screen_height: window.innerHeight,
                timestamp: new Date().toISOString()
            });
        }
    }

    trackSessionDuration() {
        // Track when user leaves the page
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Date.now() - this.startTime;
            this.logAction('session_end', {
                duration: sessionDuration,
                page_views: this.pageViews,
                timestamp: new Date().toISOString()
            });
            
            // Store session data
            this.storeSessionData(sessionDuration);
        });
    }

    storeSessionData(duration) {
        // Store session duration for analytics
        const sessions = JSON.parse(localStorage.getItem('mindease_sessions') || '[]');
        sessions.push({
            duration: duration,
            pageViews: this.pageViews,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 sessions
        if (sessions.length > 100) {
            sessions.splice(0, sessions.length - 100);
        }
        
        localStorage.setItem('mindease_sessions', JSON.stringify(sessions));
        
        // Calculate average session duration
        const avgDuration = sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length;
        localStorage.setItem('mindease_avg_session_duration', Math.round(avgDuration / 60000)); // Convert to minutes
    }

    logAction(action, data) {
        const actionData = {
            action: action,
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...data
        };
        
        this.actions.push(actionData);
        
        // Store actions in localStorage
        const storedActions = JSON.parse(localStorage.getItem('mindease_actions') || '[]');
        storedActions.push(actionData);
        
        // Keep only last 1000 actions
        if (storedActions.length > 1000) {
            storedActions.splice(0, storedActions.length - 1000);
        }
        
        localStorage.setItem('mindease_actions', JSON.stringify(storedActions));
    }

    startPeriodicTracking() {
        // Send data every 30 seconds
        setInterval(() => {
            this.sendAnalyticsData();
        }, 30000);
    }

    sendAnalyticsData() {
        // In a real implementation, this would send data to a server
        // For now, we'll just store it locally
        const analyticsData = {
            sessionId: this.sessionId,
            pageViews: this.pageViews,
            actions: this.actions,
            timestamp: new Date().toISOString()
        };
        
        // Store analytics data
        const analyticsHistory = JSON.parse(localStorage.getItem('mindease_analytics_history') || '[]');
        analyticsHistory.push(analyticsData);
        
        // Keep only last 100 entries
        if (analyticsHistory.length > 100) {
            analyticsHistory.splice(0, analyticsHistory.length - 100);
        }
        
        localStorage.setItem('mindease_analytics_history', JSON.stringify(analyticsHistory));
        
        // Clear actions for this session
        this.actions = [];
    }

    // Public methods for manual tracking
    trackCustomEvent(eventName, data = {}) {
        this.logAction(eventName, data);
    }

    trackGoal(goalName, value = 1) {
        this.logAction('goal_completed', {
            goal: goalName,
            value: value,
            timestamp: new Date().toISOString()
        });
    }

    getAnalyticsData() {
        return {
            totalVisitors: parseInt(localStorage.getItem('mindease_total_visitors')) || 0,
            totalLogins: parseInt(localStorage.getItem('mindease_total_logins')) || 0,
            moodEntries: parseInt(localStorage.getItem('mindease_mood_entries')) || 0,
            chatMessages: parseInt(localStorage.getItem('mindease_chat_messages')) || 0,
            avgSessionDuration: parseInt(localStorage.getItem('mindease_avg_session_duration')) || 0,
            actions: JSON.parse(localStorage.getItem('mindease_actions') || '[]'),
            sessions: JSON.parse(localStorage.getItem('mindease_sessions') || '[]')
        };
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mindeaseAnalytics = new MindEaseAnalytics();
});

// Make analytics available globally
window.MindEaseAnalytics = MindEaseAnalytics; 