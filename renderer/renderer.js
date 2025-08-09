// JWS.code Enhanced - Fixed Renderer Process
let editor;
let currentFile = null;
let tabs = [];
let currentTabId = 'welcome-tab';
let settings = {
  theme: 'vs',
  fontSize: 14,
  tabSize: 2,
  wordWrap: false,
  lineNumbers: true,
  minimap: true,
  autoSave: false
};

// Utility function to safely get elements
function safeGetElement(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`⚠️ Element not found: ${selector}`);
  }
  return element;
}

// Initialize Monaco Editor
function initializeEditor() {
  try {
    // Check if Monaco is available
    if (typeof monaco === 'undefined') {
      console.log('Monaco not yet available, will retry...');
      setTimeout(initializeEditor, 1000);
      return;
    }
    
    console.log('Initializing Monaco Editor...');
    
    // Clear the fallback content
    const editorElement = document.getElementById('editor');
    if (!editorElement) {
      console.error('Editor element not found!');
      return;
    }
    
    const placeholder = document.getElementById('editor-placeholder');
    if (placeholder) {
      placeholder.remove();
    }
    editorElement.innerHTML = '';
    
    // Create default editor
    editor = monaco.editor.create(editorElement, {
      value: getWelcomeContent(),
      language: 'html',
      theme: settings.theme,
      fontSize: settings.fontSize,
      wordWrap: settings.wordWrap ? 'on' : 'off',
      minimap: { enabled: settings.minimap },
      automaticLayout: true,
      scrollBeyondLastLine: false,
      renderWhitespace: 'selection',
      folding: true,
      lineNumbers: settings.lineNumbers ? 'on' : 'off',
      tabSize: settings.tabSize,
      insertSpaces: true,
      detectIndentation: false,
      fontFamily: 'Cascadia Code, SF Mono, Monaco, Roboto Mono, Consolas, Courier New, monospace'
    });

    // Initialize UI
    updateStatusBar();
    updateLanguageFromContent();
    
    // Set up event listeners
    setupEditorEventListeners();
    
    // Show success notification
    showNotification('Monaco Editor initialized successfully!', 'success');
    console.log('Monaco Editor initialized successfully!');
    
    // Update status
    const statusElement = safeGetElement('#editorMode');
    if (statusElement) {
      statusElement.textContent = 'Monaco Ready';
    }
    
  } catch (error) {
    console.error('Failed to initialize Monaco Editor:', error);
    showNotification('Running in basic mode: ' + error.message, 'warning');
    
    // Set up basic text editor fallback
    setupBasicEditor();
  }
}

// Get welcome content
function getWelcomeContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to JWS.code Enhanced</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #ffd700 0%, #f4d03f 25%, #ffffff 50%, #c0c0c0 75%, #a8a8a8 100%);
            margin: 0;
            padding: 2rem;
            min-height: 100vh;
            color: #2d3748;
        }
        .welcome {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(212, 175, 55, 0.25);
            border: 2px solid rgba(212, 175, 55, 0.3);
            text-align: center;
        }
        h1 {
            color: #b8860b;
            margin-bottom: 2rem;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .feature {
            text-align: center;
            padding: 1.5rem;
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 12px;
            background: rgba(255, 215, 0, 0.05);
        }
        .feature-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="welcome">
        <h1>🌟 Welcome to JWS.code Enhanced Edition</h1>
        <p>Professional Code Editor with Silver & Gold Theme</p>
        
        <div class="features">
            <div class="feature">
                <div class="feature-icon">🎨</div>
                <h4>Beautiful Theme</h4>
                <p>Silver & Gold aesthetic</p>
            </div>
            
            <div class="feature">
                <div class="feature-icon">⚡</div>
                <h4>Monaco Editor</h4>
                <p>VS Code-like experience</p>
            </div>
            
            <div class="feature">
                <div class="feature-icon">👁️</div>
                <h4>Live Preview</h4>
                <p>Real-time preview</p>
            </div>
            
            <div class="feature">
                <div class="feature-icon">📁</div>
                <h4>File Management</h4>
                <p>Enhanced project explorer</p>
            </div>
        </div>
        
        <p style="margin-top: 2rem; font-style: italic; color: #718096;">
            Start coding by creating a new file or opening an existing project!
        </p>
    </div>
</body>
</html>`;
}

// Fallback basic editor
function setupBasicEditor() {
  const editorElement = document.getElementById('editor');
  if (!editorElement) return;
  
  editorElement.innerHTML = `
    <textarea id="basicEditor" style="
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding: 1rem;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      resize: none;
      background: linear-gradient(135deg, #ffffff 0%, #fdfbf7 25%, rgba(255, 215, 0, 0.08) 50%, #fdfbf7 75%, #ffffff 100%);
    ">${getWelcomeContent()}</textarea>
  `;
  
  const textarea = document.getElementById('basicEditor');
  if (textarea) {
    textarea.addEventListener('input', () => {
      updateBasicStatusBar();
    });
  }
  
  showNotification('Using basic text editor mode', 'info');
  
  const statusElement = safeGetElement('#editorMode');
  if (statusElement) {
    statusElement.textContent = 'Basic Mode';
  }
}

function updateBasicStatusBar() {
  const textarea = document.getElementById('basicEditor');
  if (textarea) {
    const lines = textarea.value.split('\n');
    const words = textarea.value.split(/\s+/).filter(w => w.length > 0).length;
    
    const cursorPos = safeGetElement('#cursorPosition');
    const wordCount = safeGetElement('#wordCount');
    
    if (cursorPos) cursorPos.textContent = `Ln ${lines.length}`;
    if (wordCount) wordCount.textContent = `${words} words`;
  }
}

// Setup editor event listeners
function setupEditorEventListeners() {
  if (!editor) return;
  
  // Listen for editor changes
  editor.onDidChangeModelContent(() => {
    updateStatusBar();
    updateLanguageFromContent();
    markTabAsModified();
  });

  // Listen for cursor position changes
  editor.onDidChangeCursorPosition(() => {
    updateCursorPosition();
  });
  
  // Listen for model changes (when switching files)
  editor.onDidChangeModel(() => {
    updateStatusBar();
    updateLanguageFromContent();
  });
}

// Setup UI event listeners with proper error handling
function setupUIEventListeners() {
  console.log('Setting up UI event listeners...');
  
  // Helper function to safely add event listeners
  function addSafeEventListener(selector, eventType, handler, description) {
    const element = safeGetElement(selector);
    if (element) {
      element.addEventListener(eventType, (e) => {
        e.preventDefault();
        try {
          handler(e);
        } catch (error) {
          console.error(`Error in ${description}:`, error);
          showNotification(`Error: ${error.message}`, 'error');
        }
      });
      console.log(`✅ Added listener for: ${selector}`);
    } else {
      console.warn(`⚠️ Could not add listener for: ${selector}`);
    }
  }
  
  // File menu
  addSafeEventListener('#newFile', 'click', createNewFile, 'New File');
  addSafeEventListener('#openFile', 'click', openFile, 'Open File');
  addSafeEventListener('#saveFile', 'click', saveFile, 'Save File');
  addSafeEventListener('#saveAs', 'click', saveAsFile, 'Save As');
  addSafeEventListener('#openFolder', 'click', openFolder, 'Open Folder');
  addSafeEventListener('#openFolderBtn', 'click', openFolder, 'Open Folder Button');
  
  // Edit menu
  addSafeEventListener('#undo', 'click', () => {
    if (editor) {
      editor.trigger('keyboard', 'undo', null);
    } else {
      showNotification('Undo requires Monaco Editor', 'info');
    }
  }, 'Undo');
  
  addSafeEventListener('#redo', 'click', () => {
    if (editor) {
      editor.trigger('keyboard', 'redo', null);
    } else {
      showNotification('Redo requires Monaco Editor', 'info');
    }
  }, 'Redo');
  
  addSafeEventListener('#format', 'click', formatDocument, 'Format Document');
  
  // View menu
  addSafeEventListener('#toggleSidebar', 'click', toggleSidebar, 'Toggle Sidebar');
  addSafeEventListener('#togglePreview', 'click', togglePreview, 'Toggle Preview');
  
  // Tools
  addSafeEventListener('#preview', 'click', togglePreview, 'Preview');
  addSafeEventListener('#beautify', 'click', formatDocument, 'Beautify');
  addSafeEventListener('#settingsBtn', 'click', () => {
    showNotification('Settings panel coming soon!', 'info');
  }, 'Settings');
  
  // Theme selector
  const themeSelect = safeGetElement('#themeSelect');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      changeTheme(e.target.value);
    });
  }
  
  // Tab actions
  addSafeEventListener('#newTab', 'click', createNewFile, 'New Tab');
  
  // About button
  addSafeEventListener('#about', 'click', () => {
    const modal = safeGetElement('#aboutModal');
    if (modal) {
      modal.classList.add('active');
    }
  }, 'About');
  
  // Close about modal
  addSafeEventListener('#closeAbout', 'click', () => {
    const modal = safeGetElement('#aboutModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }, 'Close About');
  
  console.log('✅ UI event listeners setup complete');
}

// File operations with API integration
async function createNewFile() {
  showNotification('Creating new file...', 'info');
  
  if (editor) {
    editor.setValue('<!-- New File -->\n<h1>Hello World!</h1>');
  } else {
    const textarea = safeGetElement('#basicEditor');
    if (textarea) {
      textarea.value = '<!-- New File -->\n<h1>Hello World!</h1>';
    }
  }
  
  showNotification('New file created!', 'success');
}

async function openFile() {
  try {
    console.log('📂 Opening file...');
    
    if (!window.api || !window.api.fs) {
      // Fallback to basic file input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.html,.css,.js,.json,.txt,.md';
      
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target.result;
            
            if (editor) {
              editor.setValue(content);
              const language = getLanguageFromFileName(file.name);
              monaco.editor.setModelLanguage(editor.getModel(), language);
            } else {
              const textarea = safeGetElement('#basicEditor');
              if (textarea) {
                textarea.value = content;
              }
            }
            
            showNotification(`Opened ${file.name}`, 'success');
          };
          reader.readAsText(file);
        }
      };
      
      input.click();
      return;
    }
    
    const result = await window.api.fs.openFile();
    if (result && result.length > 0) {
      const file = result[0]; // Use first file for now
      
      if (editor) {
        editor.setValue(file.data);
        const language = getLanguageFromFileName(file.path);
        monaco.editor.setModelLanguage(editor.getModel(), language);
      } else {
        const textarea = safeGetElement('#basicEditor');
        if (textarea) {
          textarea.value = file.data;
        }
      }
      
      showNotification(`Opened ${file.path}`, 'success');
    }
  } catch (error) {
    console.error('Error opening file:', error);
    showNotification('Error opening file: ' + error.message, 'error');
  }
}

async function saveFile() {
  try {
    let content = '';
    
    if (editor) {
      content = editor.getValue();
    } else {
      const textarea = safeGetElement('#basicEditor');
      if (textarea) {
        content = textarea.value;
      }
    }
    
    if (!window.api || !window.api.fs) {
      // Fallback to download
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.html';
      a.click();
      URL.revokeObjectURL(url);
      showNotification('File downloaded!', 'success');
      return;
    }
    
    const result = await window.api.fs.saveFileAs(content);
    if (result) {
      showNotification(`Saved as ${result.path}`, 'success');
    }
  } catch (error) {
    console.error('Error saving file:', error);
    showNotification('Error saving file: ' + error.message, 'error');
  }
}

async function saveAsFile() {
  await saveFile(); // For now, same as save
}

async function openFolder() {
  try {
    if (!window.api || !window.api.fs) {
      showNotification('Folder operations require full API access', 'warning');
      return;
    }
    
    const result = await window.api.fs.openFolder();
    if (result) {
      showNotification(`Opened folder: ${result.path}`, 'success');
      // TODO: Implement folder tree display
    }
  } catch (error) {
    console.error('Error opening folder:', error);
    showNotification('Error opening folder: ' + error.message, 'error');
  }
}

// Utility functions
function updateStatusBar() {
  if (!editor) return;
  
  const model = editor.getModel();
  if (model) {
    const lineCount = model.getLineCount();
    const wordCount = model.getValue().split(/\s+/).filter(word => word.length > 0).length;
    
    const wordCountElement = safeGetElement('#wordCount');
    if (wordCountElement) {
      wordCountElement.textContent = `${wordCount} words`;
    }
  }
}

function updateCursorPosition() {
  if (!editor) return;
  
  const position = editor.getPosition();
  if (position) {
    const positionElement = safeGetElement('#cursorPosition');
    if (positionElement) {
      positionElement.textContent = `Ln ${position.lineNumber}, Col ${position.column}`;
    }
  }
}

function updateLanguageFromContent() {
  if (!editor) return;
  
  const model = editor.getModel();
  if (model) {
    const languageElement = safeGetElement('#fileLanguage');
    if (languageElement) {
      languageElement.textContent = model.getLanguageId().toUpperCase();
    }
  }
}

function getLanguageFromFileName(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  const languageMap = {
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'js': 'javascript',
    'json': 'json',
    'ts': 'typescript',
    'tsx': 'typescript',
    'jsx': 'javascript',
    'py': 'python',
    'md': 'markdown',
    'txt': 'plaintext'
  };
  return languageMap[ext] || 'plaintext';
}

function toggleSidebar() {
  const mainContainer = safeGetElement('#mainContainer');
  if (mainContainer) {
    mainContainer.classList.toggle('sidebar-hidden');
    
    // Trigger resize for Monaco Editor
    setTimeout(() => {
      if (editor) {
        editor.layout();
      }
    }, 300);
    
    showNotification('Sidebar toggled', 'info');
  }
}

function togglePreview() {
  showNotification('Preview panel coming soon!', 'info');
}

function formatDocument() {
  if (editor) {
    const action = editor.getAction('editor.action.formatDocument');
    if (action) {
      action.run();
      showNotification('Document formatted', 'success');
    } else {
      showNotification('No formatter available for this language', 'warning');
    }
  } else {
    showNotification('Format requires Monaco Editor', 'info');
  }
}

function changeTheme(theme) {
  settings.theme = theme;
  if (editor) {
    monaco.editor.setTheme(theme);
  }
  showNotification(`Theme changed to ${theme}`, 'success');
}

function markTabAsModified() {
  // Tab modification logic would go here
}

// Notification system
function showNotification(message, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${message}`);
  
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 60px;
    right: 20px;
    padding: 0.8rem 1.2rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10001;
    max-width: 350px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    background: ${type === 'success' ? '#38a169' : type === 'error' ? '#e53e3e' : type === 'warning' ? '#dd6b20' : '#3182ce'};
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  console.log('JWS.code Enhanced - Renderer loaded');
  
  // Always set up UI event listeners first
  setupUIEventListeners();
  
  // Close modals when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });
  
  // Try to initialize Monaco after a delay
  setTimeout(() => {
    if (typeof monaco !== 'undefined') {
      initializeEditor();
    } else {
      console.log('Monaco not available, trying basic mode');
      setTimeout(() => {
        if (typeof monaco !== 'undefined') {
          initializeEditor();
        } else {
          setupBasicEditor();
        }
      }, 2000);
    }
  }, 1000);
  
  showNotification('JWS.code Enhanced loaded successfully!', 'success');
  console.log('Renderer initialization complete');
});

// Make functions available globally
window.initializeEditor = initializeEditor;
window.showNotification = showNotification;