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
        // Enhanced login tracking with multiple methods
        
        // Method 1: Monitor login forms
        const loginForms = document.querySelectorAll('form');
        loginForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const emailField = form.querySelector('input[type="email"]');
                const passwordField = form.querySelector('input[type="password"]');
                const usernameField = form.querySelector('input[name="username"]');
                const loginButton = form.querySelector('button[type="submit"]');
                
                if ((emailField && passwordField) || (usernameField && passwordField)) {
                    const loginData = {
                        event: 'user_login',
                        method: emailField ? 'email' : 'username',
                        timestamp: new Date().toISOString(),
                        url: window.location.href,
                        formId: form.id || 'unknown',
                        buttonText: loginButton ? loginButton.textContent.trim() : 'Login',
                        hasEmail: !!emailField,
                        hasUsername: !!usernameField,
                        hasPassword: !!passwordField,
                        formAction: form.action || 'none',
                        formMethod: form.method || 'post'
                    };
                    
                    this.sendToServer(loginData);
                }
            });
        });
        
        // Method 2: Monitor login buttons specifically
        const loginButtons = document.querySelectorAll('button');
        loginButtons.forEach(button => {
            const buttonText = button.textContent.toLowerCase();
            if (buttonText.includes('login') || buttonText.includes('sign in') || buttonText.includes('log in')) {
                button.addEventListener('click', (e) => {
                    const form = button.closest('form');
                    const emailField = form ? form.querySelector('input[type="email"]') : null;
                    const passwordField = form ? form.querySelector('input[type="password"]') : null;
                    const usernameField = form ? form.querySelector('input[name="username"]') : null;
                    
                    if (form && (emailField || usernameField) && passwordField) {
                        const loginData = {
                            event: 'user_login',
                            method: emailField ? 'email' : 'username',
                            timestamp: new Date().toISOString(),
                            url: window.location.href,
                            buttonText: button.textContent.trim(),
                            buttonId: button.id || 'unknown',
                            formId: form.id || 'unknown',
                            hasEmail: !!emailField,
                            hasUsername: !!usernameField,
                            hasPassword: !!passwordField,
                            loginAttempt: 'button_click'
                        };
                        
                        this.sendToServer(loginData);
                    }
                });
            }
        });
        
        // Method 3: Monitor input field interactions
        const loginInputs = document.querySelectorAll('input[type="email"], input[type="password"], input[name="username"]');
        loginInputs.forEach(input => {
            // Track when user starts typing in login fields
            input.addEventListener('focus', (e) => {
                const form = input.closest('form');
                if (form) {
                    this.sendToServer({
                        event: 'login_field_focused',
                        fieldType: input.type || input.name || 'unknown',
                        timestamp: new Date().toISOString(),
                        url: window.location.href,
                        formId: form.id || 'unknown',
                        fieldId: input.id || 'unknown'
                    });
                }
            });
            
            // Track successful login attempts (when form is submitted with valid data)
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const form = input.closest('form');
                    if (form) {
                        const emailField = form.querySelector('input[type="email"]');
                        const passwordField = form.querySelector('input[type="password"]');
                        const usernameField = form.querySelector('input[name="username"]');
                        
                        if ((emailField || usernameField) && passwordField) {
                            // Check if both fields have values
                            const hasEmailValue = emailField && emailField.value.trim();
                            const hasUsernameValue = usernameField && usernameField.value.trim();
                            const hasPasswordValue = passwordField && passwordField.value.trim();
                            
                            if ((hasEmailValue || hasUsernameValue) && hasPasswordValue) {
                                this.sendToServer({
                                    event: 'user_login',
                                    method: emailField && hasEmailValue ? 'email' : 'username',
                                    timestamp: new Date().toISOString(),
                                    url: window.location.href,
                                    formId: form.id || 'unknown',
                                    fieldId: input.id || 'unknown',
                                    loginAttempt: 'enter_key',
                                    hasEmailValue: !!hasEmailValue,
                                    hasUsernameValue: !!hasUsernameValue,
                                    hasPasswordValue: !!hasPasswordValue
                                });
                            }
                        }
                    }
                }
            });
        });
        
        // Method 4: Monitor successful login redirects
        this.trackLoginSuccess();
    }
    
    trackLoginSuccess() {
        // Track successful login by monitoring URL changes or localStorage updates
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        // Override pushState to detect login redirects
        history.pushState = function(...args) {
            originalPushState.apply(history, args);
            const newUrl = args[2];
            if (newUrl && (newUrl.includes('dashboard') || newUrl.includes('home') || newUrl.includes('main'))) {
                window.serverAnalytics.sendToServer({
                    event: 'login_success',
                    method: 'redirect',
                    timestamp: new Date().toISOString(),
                    url: newUrl,
                    previousUrl: window.location.href,
                    loginAttempt: 'successful_redirect'
                });
            }
        };
        
        // Override replaceState to detect login redirects
        history.replaceState = function(...args) {
            originalReplaceState.apply(history, args);
            const newUrl = args[2];
            if (newUrl && (newUrl.includes('dashboard') || newUrl.includes('home') || newUrl.includes('main'))) {
                window.serverAnalytics.sendToServer({
                    event: 'login_success',
                    method: 'redirect',
                    timestamp: new Date().toISOString(),
                    url: newUrl,
                    previousUrl: window.location.href,
                    loginAttempt: 'successful_redirect'
                });
            }
        };
        
        // Monitor localStorage for login tokens or user data
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(localStorage, arguments);
            if (key.includes('user') || key.includes('token') || key.includes('login') || key.includes('auth')) {
                window.serverAnalytics.sendToServer({
                    event: 'login_success',
                    method: 'localStorage',
                    timestamp: new Date().toISOString(),
                    url: window.location.href,
                    storageKey: key,
                    loginAttempt: 'successful_storage'
                });
            }
        };
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
            loginSuccess: analyticsData.filter(e => e.event === 'login_success').length,
            loginFieldFocus: analyticsData.filter(e => e.event === 'login_field_focused').length,
            moodEntries: analyticsData.filter(e => e.event === 'mood_selected').length,
            chatMessages: analyticsData.filter(e => e.event === 'chat_message_sent').length,
            featureUsage: analyticsData.filter(e => e.event === 'feature_used').length,
            uniqueUsers: new Set(analyticsData.map(e => e.userId)).size,
            uniqueSessions: new Set(analyticsData.map(e => e.sessionId)).size,
            // Login-specific stats
            emailLogins: analyticsData.filter(e => e.event === 'user_login' && e.method === 'email').length,
            usernameLogins: analyticsData.filter(e => e.event === 'user_login' && e.method === 'username').length,
            buttonClickLogins: analyticsData.filter(e => e.event === 'user_login' && e.loginAttempt === 'button_click').length,
            enterKeyLogins: analyticsData.filter(e => e.event === 'user_login' && e.loginAttempt === 'enter_key').length,
            successfulRedirects: analyticsData.filter(e => e.event === 'login_success' && e.method === 'redirect').length,
            successfulStorage: analyticsData.filter(e => e.event === 'login_success' && e.method === 'localStorage').length
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