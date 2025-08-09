const { contextBridge, ipcRenderer } = require('electron');

console.log('🔧 Preload editor script starting...');

// Enhanced API exposure for the editor window
contextBridge.exposeInMainWorld('api', {
  // File System Operations
  fs: {
    // Basic file operations
    openFile: () => {
      console.log('🔧 API: openFile called');
      return ipcRenderer.invoke('fs:openFile');
    },
    saveFile: (data) => {
      console.log('🔧 API: saveFile called');
      return ipcRenderer.invoke('fs:saveFile', data);
    },
    saveFileAs: (content) => {
      console.log('🔧 API: saveFileAs called');
      return ipcRenderer.invoke('fs:saveFileAs', content);
    },
    readFile: (path) => {
      console.log('🔧 API: readFile called for:', path);
      return ipcRenderer.invoke('fs:readFile', path);
    },
    
    // Directory operations
    openFolder: () => {
      console.log('🔧 API: openFolder called');
      return ipcRenderer.invoke('fs:openFolder');
    },
    listDir: (path) => {
      console.log('🔧 API: listDir called for:', path);
      return ipcRenderer.invoke('fs:listDir', path);
    },
    
    // Project operations
    zipFolder: (path, options) => {
      console.log('🔧 API: zipFolder called');
      return ipcRenderer.invoke('fs:zipFolder', path, options);
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
  },
  
  // Utility Functions
  utils: {
    joinPath: (...paths) => {
      const path = require('path');
      return path.join(...paths);
    },
    
    basename: (filePath) => {
      const path = require('path');
      return path.basename(filePath);
    },
    
    dirname: (filePath) => {
      const path = require('path');
      return path.dirname(filePath);
    },
    
    extname: (filePath) => {
      const path = require('path');
      return path.extname(filePath);
    },
    
    formatDate: (date) => {
      return new Date(date).toLocaleDateString();
    },
    
    formatTime: (date) => {
      return new Date(date).toLocaleTimeString();
    },
    
    formatFileSize: (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  }
});

// Enhanced console logging for debugging
if (process.env.NODE_ENV === 'development') {
  contextBridge.exposeInMainWorld('devTools', {
    log: (...args) => console.log('[Editor Renderer]', ...args),
    warn: (...args) => console.warn('[Editor Renderer]', ...args),
    error: (...args) => console.error('[Editor Renderer]', ...args),
    
    // Performance monitoring
    performance: {
      mark: (name) => performance.mark(name),
      measure: (name, startMark, endMark) => performance.measure(name, startMark, endMark),
      getEntriesByType: (type) => performance.getEntriesByType(type),
      clearMarks: () => performance.clearMarks(),
      clearMeasures: () => performance.clearMeasures()
    }
  });
}

// Test API functionality on load
window.addEventListener('DOMContentLoaded', () => {
  console.log('🌟 Enhanced preload script loaded for editor');
  console.log('📍 Environment:', process.env.NODE_ENV);
  console.log('⚡ APIs exposed:', Object.keys(window.api || {}));
  
  // Test API availability
  setTimeout(() => {
    if (window.api) {
      console.log('✅ API is available in renderer');
      console.log('📂 File operations available:', !!window.api.fs);
      console.log('🔧 Utils available:', !!window.api.utils);
      
      // Test a simple API call
      console.log('🧪 Testing API functionality...');
    } else {
      console.error('❌ API not available in renderer!');
    }
  }, 1000);
});

// Enhanced error handling
process.on('uncaughtException', (error) => {
  console.error('🚫 Preload uncaught exception:', error);
});

window.addEventListener('error', (event) => {
  console.error('🚫 Window error in preload context:', event.error);
});

// Cleanup on unload
window.addEventListener('beforeunload', () => {
  console.log('🧹 Cleaning up preload resources...');
});

console.log('✅ Preload editor script setup complete');