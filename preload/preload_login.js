const { contextBridge, ipcRenderer } = require('electron');

// Simple, reliable API exposure
contextBridge.exposeInMainWorld('api', {
  // Authentication
  auth: {
    login: (password) => {
      console.log('🔐 Preload: Sending login request for password:', password ? password.substring(0, 3) + '***' : 'undefined');
      return ipcRenderer.invoke('auth:login', password);
    }
  },
  
  // System information
  system: {
    platform: process.platform,
    versions: {
      electron: process.versions.electron,
      node: process.versions.node,
      chrome: process.versions.chrome
    },
    env: process.env.NODE_ENV || 'production'
  }
});

// Debug logging
console.log('🌟 Preload login script loaded successfully');
console.log('📡 Available APIs:', Object.keys(window.api || {}));

// Test API availability
window.addEventListener('DOMContentLoaded', () => {
  console.log('🔧 DOM loaded, testing API...');
  
  if (window.api) {
    console.log('✅ API is available');
    console.log('🔐 Auth object:', !!window.api.auth);
    console.log('🔑 Login function:', typeof window.api.auth.login);
  } else {
    console.error('❌ API is not available!');
  }
});

// Enhanced error handling
process.on('uncaughtException', (error) => {
  console.error('🚫 Preload uncaught exception:', error);
});

window.addEventListener('error', (event) => {
  console.error('🚫 Window error:', event.error);
});

console.log('✅ Preload script setup complete');