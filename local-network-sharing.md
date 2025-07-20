# 🌐 Local Network Sharing Guide

## **Share MindEase on Your Local Network**

### **What This Does:**
- Makes MindEase accessible to devices on your **same WiFi network**
- Good for sharing with family, roommates, or office colleagues
- **NOT accessible from the internet** (only local network)

---

## **🚀 Method 1: Using Live Server (Easiest)**

### **If you're using VS Code with Live Server:**

1. **Find Your Local IP Address:**
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. **Look for your IP address:**
   - Usually starts with `192.168.` or `10.0.`
   - Example: `192.168.1.100`

3. **Share the URL:**
   ```
   http://192.168.1.100:5500/index.html
   ```

### **Configure Live Server for Network Access:**

1. **In VS Code:**
   - Go to Settings (Ctrl/Cmd + ,)
   - Search for "Live Server"
   - Find "Live Server › Settings: Host"
   - Change from `127.0.0.1` to `0.0.0.0`

2. **Restart Live Server:**
   - Stop the server
   - Start it again
   - Now it will be accessible on your network

---

## **🔧 Method 2: Using Python Server**

### **If you have Python installed:**

1. **Open terminal/command prompt**
2. **Navigate to your MindEase folder:**
   ```bash
   cd "C:\Users\Rounak\OneDrive\Desktop\WEATHER\MH&W"
   ```

3. **Start Python server:**
   ```bash
   # Python 3
   python -m http.server 8000 --bind 0.0.0.0
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

4. **Find your IP address:**
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

5. **Share the URL:**
   ```
   http://YOUR_IP_ADDRESS:8000/index.html
   ```

---

## **📱 Method 3: Using Node.js Server**

### **If you have Node.js installed:**

1. **Install a simple server:**
   ```bash
   npm install -g http-server
   ```

2. **Start the server:**
   ```bash
   http-server -p 8080 -a 0.0.0.0
   ```

3. **Share the URL:**
   ```
   http://YOUR_IP_ADDRESS:8080/index.html
   ```

---

## **🎯 How to Find Your IP Address**

### **Windows:**
1. Open Command Prompt
2. Type: `ipconfig`
3. Look for "IPv4 Address" under your WiFi adapter
4. Example: `192.168.1.100`

### **Mac:**
1. Open System Preferences → Network
2. Select your WiFi connection
3. Your IP address is shown there
4. Example: `192.168.1.100`

### **Linux:**
1. Open terminal
2. Type: `ifconfig` or `ip addr`
3. Look for your WiFi interface
4. Example: `192.168.1.100`

---

## **🔗 Example Sharing URLs**

### **For Family/Roommates:**
```
Hey! I created a mental health app. You can try it on our WiFi:
http://192.168.1.100:5500/index.html

It's only accessible when you're connected to our home WiFi.
```

### **For Office Colleagues:**
```
Check out this mental health app I built:
http://192.168.1.100:5500/index.html

Works on our office network - great for stress relief during breaks!
```

---

## **⚠️ Limitations of Local Network Sharing**

### **❌ What Doesn't Work:**
- **Internet access** - Only works on same WiFi
- **Mobile data** - Won't work when not on WiFi
- **Different locations** - Only works in same building/network
- **Permanent access** - Stops when you turn off your computer

### **✅ What Works:**
- **Same WiFi network** - All devices on your network
- **Family sharing** - Perfect for home use
- **Office sharing** - Great for workplace testing
- **Quick testing** - Fast way to test with others

---

## **🔄 Comparison: Local vs Web Deployment**

| Feature | Local Network | Web Deployment |
|---------|---------------|----------------|
| **Access** | Same WiFi only | Worldwide |
| **Setup** | Easy | Easy |
| **Permanent** | No (stops when PC off) | Yes (24/7) |
| **Mobile** | Only on WiFi | Anywhere |
| **Professional** | No | Yes |
| **Sharing** | Limited | Unlimited |

---

## **💡 Recommendation**

### **For Testing/Development:**
- Use local network sharing
- Perfect for getting feedback from family/friends
- Quick and easy setup

### **For Public Sharing:**
- Deploy to web (Netlify/GitHub Pages/Vercel)
- Accessible to everyone, everywhere
- Professional and permanent

---

## **🎉 Quick Start for Local Sharing**

1. **Find your IP:** `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. **Start server:** Use Live Server or Python/Node.js
3. **Share URL:** `http://YOUR_IP:PORT/index.html`
4. **Test:** Have someone on your WiFi try the link

**Example:** `http://192.168.1.100:5500/index.html`

---

**🌐 Local network sharing is perfect for testing, but web deployment is needed for worldwide access!** 🚀 