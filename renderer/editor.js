let editor;
let openTabs = [];
let activeIndex = -1;
let currentFolder = null;
let recentFiles = [];
let settings = {
  theme: 'vs',
  fontSize: 14,
  tabSize: 2,
  wordWrap: false,
  lineNumbers: true,
  minimap: true,
  autoSave: false,
  fontFamily: 'Cascadia Code, SF Mono, Monaco, Roboto Mono, Consolas, Courier New, monospace'
};
let liveReloadEnabled = true;
let zoomLevel = 100;

// Enhanced language configurations
const LANGUAGE_CONFIG = {
  'html': { 
    icon: '🌐', 
    color: '#e34c26',
    extensions: ['html', 'htm'],
    keywords: ['div', 'span', 'body', 'head', 'title', 'script', 'style', 'link', 'meta']
  },
  'css': { 
    icon: '🎨', 
    color: '#1572b6',
    extensions: ['css', 'scss', 'sass', 'less'],
    keywords: ['color', 'background', 'margin', 'padding', 'border', 'display', 'position']
  },
  'javascript': { 
    icon: '📜', 
    color: '#f7df1e',
    extensions: ['js', 'jsx', 'mjs'],
    keywords: ['function', 'var', 'let', 'const', 'if', 'else', 'for', 'while', 'class']
  },
  'typescript': { 
    icon: '📘', 
    color: '#3178c6',
    extensions: ['ts', 'tsx'],
    keywords: ['interface', 'type', 'enum', 'namespace', 'declare', 'abstract']
  },
  'python': { 
    icon: '🐍', 
    color: '#3776ab',
    extensions: ['py', 'pyw'],
    keywords: ['def', 'class', 'import', 'from', 'as', 'if', '__name__', '__main__']
  },
  'json': { 
    icon: '📋', 
    color: '#000000',
    extensions: ['json', 'jsonc'],
    keywords: []
  },
  'markdown': { 
    icon: '📝', 
    color: '#083fa1',
    extensions: ['md', 'mdx'],
    keywords: []
  }
};

// Initialize Monaco Editor with enhanced features
window._bootMonaco = function() {
  console.log('🌟 Initializing Enhanced Monaco Editor...');
  
  // Register custom silver-gold theme
  monaco.editor.defineTheme('silver-gold', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '718096', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'b8860b', fontStyle: 'bold' },
      { token: 'string', foreground: '38a169' },
      { token: 'number', foreground: '3182ce' },
      { token: 'variable', foreground: '2d3748' },
      { token: 'function', foreground: 'd4af37', fontStyle: 'bold' },
      { token: 'class', foreground: '9f7aea', fontStyle: 'bold' },
      { token: 'type', foreground: '3178c6' },
      { token: 'operator', foreground: 'e53e3e' },
      { token: 'delimiter', foreground: '4a5568' }
    ],
    colors: {
      'editor.background': '#fefefe',
      'editor.foreground': '#2d3748',
      'editor.lineHighlightBackground': '#ffd70015',
      'editor.selectionBackground': '#d4af3740',
      'editor.inactiveSelectionBackground': '#d4af3720',
      'editorCursor.foreground': '#d4af37',
      'editorLineNumber.foreground': '#718096',
      'editorLineNumber.activeForeground': '#d4af37'
    }
  });

  const initialModel = monaco.editor.createModel(`<!-- Welcome to JWS.code Enhanced Edition -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to JWS.code Enhanced</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #ffd700 0%, #c9b037 50%, #b8860b 100%);
            margin: 0;
            padding: 2rem;
            color: #2d3748;
            min-height: 100vh;
        }
        .welcome {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(212, 175, 55, 0.2);
        }
        h1 {
            color: #b8860b;
            text-align: center;
            margin-bottom: 2rem;
            text-shadow: 2px 2px 4px rgba(212, 175, 55, 0.3);
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
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(192, 192, 192, 0.1));
            border: 1px solid rgba(212, 175, 55, 0.2);
            transition: all 0.3s ease;
        }
        .feature:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
        }
        .shortcut {
            background: rgba(212, 175, 55, 0.1);
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            color: #b8860b;
        }
    </style>
</head>
<body>
    <div class="welcome">
        <h1>🌟 Welcome to JWS.code Enhanced Edition 🌟</h1>
        <p><strong>You've successfully unlocked the enhanced editor!</strong> Experience the power of professional code editing with our beautiful silver and gold interface.</p>
        
        <div class="features">
            <div class="feature">
                <h3>🎨 Silver & Gold Theme</h3>
                <p>Beautiful color scheme with enhanced Monaco editor</p>
            </div>
            <div class="feature">
                <h3>🖱️ Drag & Drop</h3>
                <p>Drag files and tabs with intuitive interactions</p>
            </div>
            <div class="feature">
                <h3>⚡ Command Palette</h3>
                <p>Quick access to all commands with <span class="shortcut">Ctrl+Shift+P</span></p>
            </div>
            <div class="feature">
                <h3>🔍 Enhanced Search</h3>
                <p>Powerful search across all files with <span class="shortcut">Ctrl+F</span></p>
            </div>
            <div class="feature">
                <h3>📁 File Management</h3>
                <p>Complete project management with sidebar navigation</p>
            </div>
            <div class="feature">
                <h3>📱 Live Preview</h3>
                <p>Real-time HTML preview with device simulation</p>
            </div>
        </div>
        
        <p style="text-align: center; margin-top: 2rem; font-style: italic;">
            <strong>🚀 Quick Start:</strong> Use <span class="shortcut">Ctrl+Shift+O</span> to open a folder, or <span class="shortcut">Ctrl+N</span> to create a new file!
        </p>
    </div>
    
    <script>
        console.log('🌟 Welcome to JWS.code Enhanced Edition! 🚀');
        console.log('⚡ Try these shortcuts:');
        console.log('  • Ctrl+Shift+P - Command Palette');
        console.log('  • Ctrl+N - New File');
        console.log('  • Ctrl+O - Open File');
        console.log('  • Ctrl+Shift+O - Open Folder');
        console.log('  • Ctrl+S - Save File');
    </script>
</body>
</html>`, "html");

  editor = monaco.editor.create(document.getElementById('editor'), {
    model: initialModel,
    theme: 'silver-gold',
    fontSize: settings.fontSize,
    tabSize: settings.tabSize,
    wordWrap: settings.wordWrap ? 'on' : 'off',
    lineNumbers: settings.lineNumbers ? 'on' : 'off',
    minimap: { enabled: settings.minimap },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    fontFamily: settings.fontFamily,
    fontLigatures: true,
    cursorStyle: 'line',
    renderWhitespace: 'selection',
    smoothScrolling: true,
    mouseWheelZoom: true
  });

  addTab({ 
    path: null, 
    name: "welcome.html", 
    model: initialModel, 
    language: "html",
    isModified: false
  });

  setupEventListeners();
  loadSettings();
  updateEditorStatus();
  
  if (liveReloadEnabled) {
    setupLiveReload();
  }
  
  showNotification('🌟 Welcome to JWS.code Enhanced Edition!', 'success');
  
  console.log('✅ Enhanced Monaco Editor initialized successfully');
};

// Utility functions
const $ = (selector) => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`⚠️ Element not found: ${selector}`);
  }
  return element;
};

const $$ = (selector) => document.querySelectorAll(selector);

function joinPath(base, name) {
  if (!base) return name;
  const sep = base.includes('\\') && !base.includes('/') ? '\\' : '/';
  return base.replace(new RegExp(`${sep}+$`), '') + sep + name;
}

function basename(p) { 
  return p ? p.split(/[\\/]/).pop() : ''; 
}

function extname(p) { 
  return p && p.includes('.') ? p.split('.').pop().toLowerCase() : ''; 
}

function langFromExt(p) {
  if (!p) return 'plaintext';
  const ext = extname(p);
  for (const [lang, config] of Object.entries(LANGUAGE_CONFIG)) {
    if (config.extensions && config.extensions.includes(ext)) {
      return lang;
    }
  }
  return 'plaintext';
}

function getFileIcon(filename) {
  if (!filename) return '📄';
  const lang = langFromExt(filename);
  return LANGUAGE_CONFIG[lang]?.icon || '📄';
}

function getLanguageColor(language) {
  return LANGUAGE_CONFIG[language]?.color || '#4a5568';
}

// Enhanced Event Listeners Setup
function setupEventListeners() {
  console.log('🔧 Setting up event listeners...');
  
  // File operations - with error handling
  const setupButton = (selector, handler, description) => {
    const element = $(selector);
    if (element) {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`🔘 Button clicked: ${description}`);
        try {
          handler();
        } catch (error) {
          console.error(`❌ Error in ${description}:`, error);
          showNotification(`Error: ${error.message}`, 'error');
        }
      });
      console.log(`✅ Set up button: ${selector}`);
    } else {
      console.warn(`⚠️ Button not found: ${selector}`);
    }
  };

  // File operations
  setupButton('#openFile', openFile, 'Open File');
  setupButton('#saveFile', saveFile, 'Save File');
  setupButton('#saveAs', saveAs, 'Save As');
  setupButton('#openFolder', openFolder, 'Open Folder');
  setupButton('#openFolderBtn', openFolder, 'Open Folder Button');
  setupButton('#newTab', newFile, 'New Tab');
  setupButton('#newFile', newFile, 'New File');
  
  // Edit operations
  setupButton('#find', () => editor.getAction('actions.find')?.run(), 'Find');
  setupButton('#replace', () => editor.getAction('editor.action.startFindReplaceAction')?.run(), 'Replace');
  setupButton('#format', formatDocument, 'Format Document');
  
  // View operations
  setupButton('#toggleSidebar', toggleSidebar, 'Toggle Sidebar');
  setupButton('#togglePreview', togglePreview, 'Toggle Preview');
  setupButton('#toggleMinimap', toggleMinimap, 'Toggle Minimap');
  
  // Preview operations
  setupButton('#preview', updatePreview, 'Preview');
  setupButton('#liveReload', toggleLiveReload, 'Live Reload');
  setupButton('#refreshPreview', refreshPreview, 'Refresh Preview');
  
  // Project operations
  setupButton('#templates', showTemplates, 'Templates');
  setupButton('#export', exportProject, 'Export Project');
  setupButton('#settings', showSettings, 'Settings');
  setupButton('#settingsBtn', showSettings, 'Settings Button');
  
  // Theme selector
  const themeSelect = $('#themeSelect');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => changeTheme(e.target.value));
  }
  
  // Editor events
  if (editor) {
    editor.onDidChangeModelContent(() => {
      const tab = activeTab();
      if (tab) {
        tab.isModified = true;
        renderTabs();
        updateWordCount();
        if (liveReloadEnabled && ['html', 'css', 'javascript'].includes(tab.language)) {
          debounce(updatePreview, 500)();
        }
      }
    });
    
    editor.onDidChangeCursorPosition(() => {
      updateEditorStatus();
    });
  }
  
  // Sidebar tabs
  $$('.sidebar-tab').forEach(tab => {
    if (tab) {
      tab.addEventListener('click', () => switchSidebarTab(tab.dataset.tab));
    }
  });
  
  // Modal handlers - with safer selectors
  const closeSettings = $('#closeSettings');
  if (closeSettings) {
    closeSettings.addEventListener('click', () => hideModal('settingsModal'));
  }
  
  const closeTemplate = $('#closeTemplate');
  if (closeTemplate) {
    closeTemplate.addEventListener('click', () => hideModal('templateModal'));
  }
  
  // Settings handlers
  setupSettingsHandlers();
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Window resize handler
  window.addEventListener('resize', () => {
    if (editor) {
      editor.layout();
    }
  });
  
  console.log('✅ Event listeners setup complete');
}

// Enhanced File Operations
async function newFile() {
  try {
    console.log('📄 Creating new file...');
    const model = monaco.editor.createModel("", "plaintext");
    addTab({ 
      path: null, 
      name: `untitled-${Date.now()}`, 
      model, 
      language: "plaintext",
      isModified: false
    });
    showNotification('New file created', 'success');
  } catch (error) {
    console.error('Error creating new file:', error);
    showNotification('Error creating new file: ' + error.message, 'error');
  }
}

async function openFile() {
  try {
    console.log('📂 Opening file...');
    if (!window.api || !window.api.fs) {
      showNotification('File system not available', 'error');
      return;
    }
    
    const res = await window.api.fs.openFile();
    if (!res || res.length === 0) return;
    
    // Handle multiple files
    for (const file of res) {
      const lang = langFromExt(file.path);
      const model = monaco.editor.createModel(file.data, lang);
      
      addTab({ 
        path: file.path, 
        name: basename(file.path), 
        model, 
        language: lang,
        isModified: false
      });
    }
    
    updatePreview();
    showNotification(`Opened ${res.length} file(s)`, 'success');
  } catch (error) {
    console.error('Error opening file:', error);
    showNotification('Error opening file: ' + error.message, 'error');
  }
}

async function saveFile() {
  try {
    const tab = activeTab();
    if (!tab) {
      showNotification('No file to save', 'warning');
      return;
    }
    
    if (!tab.path) return saveAs();
    
    console.log('💾 Saving file...');
    
    if (!window.api || !window.api.fs) {
      showNotification('File system not available', 'error');
      return;
    }
    
    await window.api.fs.saveFile({ path: tab.path, text: tab.model.getValue() });
    tab.isModified = false;
    renderTabs();
    showNotification(`Saved ${tab.name}`, 'success');
  } catch (error) {
    console.error('Error saving file:', error);
    showNotification('Error saving file: ' + error.message, 'error');
  }
}

async function saveAs() {
  try {
    const tab = activeTab();
    if (!tab) {
      showNotification('No file to save', 'warning');
      return;
    }
    
    console.log('💾 Saving file as...');
    
    if (!window.api || !window.api.fs) {
      showNotification('File system not available', 'error');
      return;
    }
    
    const res = await window.api.fs.saveFileAs(tab.model.getValue());
    if (!res) return;
    
    tab.path = res.path;
    tab.name = basename(res.path);
    tab.language = langFromExt(res.path);
    tab.isModified = false;
    
    monaco.editor.setModelLanguage(tab.model, tab.language);
    renderTabs();
    updateEditorStatus();
    showNotification(`Saved as ${tab.name}`, 'success');
  } catch (error) {
    console.error('Error saving file:', error);
    showNotification('Error saving file: ' + error.message, 'error');
  }
}

async function openFolder() {
  try {
    console.log('📁 Opening folder...');
    
    if (!window.api || !window.api.fs) {
      showNotification('File system not available', 'error');
      return;
    }
    
    const res = await window.api.fs.openFolder();
    if (!res) return;
    
    currentFolder = res.path;
    const folderPathEl = $('#folderPath');
    if (folderPathEl) {
      folderPathEl.textContent = currentFolder;
    }
    
    await renderFileTree();
    showNotification('Folder opened successfully', 'success');
  } catch (error) {
    console.error('Error opening folder:', error);
    showNotification('Error opening folder: ' + error.message, 'error');
  }
}

// Tab Management
function addTab(tabData) {
  // Check if file is already open
  const existingIndex = openTabs.findIndex(tab => tab.path === tabData.path && tab.path !== null);
  if (existingIndex !== -1) {
    setActive(existingIndex);
    return;
  }
  
  openTabs.push(tabData);
  setActive(openTabs.length - 1);
  renderTabs();
}

function setActive(idx) {
  if (idx < 0 || idx >= openTabs.length || !editor) return;
  
  activeIndex = idx;
  const tab = openTabs[activeIndex];
  if (tab) {
    editor.setModel(tab.model);
    monaco.editor.setModelLanguage(tab.model, tab.language);
    updateEditorStatus();
  }
  renderTabs();
}

function renderTabs() {
  const container = $('#tabs');
  if (!container) return;
  
  container.innerHTML = '';
  
  openTabs.forEach((tab, i) => {
    const tabEl = document.createElement('div');
    tabEl.className = 'tab' + (i === activeIndex ? ' active' : '');
    
    const iconColor = getLanguageColor(tab.language);
    
    tabEl.innerHTML = `
      <span style="color: ${iconColor}; margin-right: 0.5rem;">${getFileIcon(tab.name)}</span>
      <span style="color: ${i === activeIndex ? 'var(--text-primary)' : 'var(--text-secondary)'};">
        ${tab.name}${tab.isModified ? ' •' : ''}
      </span>
      <span class="tab-close">×</span>
    `;
    
    const closeBtn = tabEl.querySelector('.tab-close');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeTab(i);
    });
    
    tabEl.addEventListener('click', () => setActive(i));
    container.appendChild(tabEl);
  });
}

function closeTab(idx) {
  const closing = openTabs[idx];
  if (!closing) return;
  
  if (closing.isModified) {
    const save = confirm(`${closing.name} has unsaved changes. Save before closing?`);
    if (save && closing.path) {
      saveFile();
    }
  }
  
  if (closing.model) closing.model.dispose();
  openTabs.splice(idx, 1);
  
  if (openTabs.length === 0) {
    newFile();
  } else if (idx <= activeIndex) {
    setActive(Math.max(0, activeIndex - 1));
  } else {
    renderTabs();
  }
}

function activeTab() {
  return openTabs[activeIndex] || null;
}

// UI Functions
function toggleSidebar() {
  const sidebar = $('#sidebar');
  const container = $('.main-container');
  
  if (sidebar && container) {
    if (sidebar.style.display === 'none') {
      sidebar.style.display = 'flex';
      container.classList.remove('sidebar-hidden');
    } else {
      sidebar.style.display = 'none';
      container.classList.add('sidebar-hidden');
    }
    
    setTimeout(() => {
      if (editor) editor.layout();
    }, 300);
  }
}

function togglePreview() {
  const preview = $('#previewSection');
  const container = $('.main-container');
  
  if (preview && container) {
    if (preview.style.display === 'none') {
      preview.style.display = 'flex';
      container.classList.remove('preview-hidden');
    } else {
      preview.style.display = 'none';
      container.classList.add('preview-hidden');
    }
    
    setTimeout(() => {
      if (editor) editor.layout();
    }, 300);
  }
}

function changeTheme(theme) {
  settings.theme = theme;
  monaco.editor.setTheme(theme === 'vs' ? 'silver-gold' : theme);
  const themeSelect = $('#themeSelect');
  if (themeSelect) themeSelect.value = theme;
  saveSettings();
  showNotification(`Changed theme to ${theme}`, 'info');
}

function formatDocument() {
  if (!editor) return;
  
  const action = editor.getAction('editor.action.formatDocument');
  if (action) {
    action.run();
    showNotification('Document formatted', 'success');
  } else {
    showNotification('Formatter not available for this language', 'warning');
  }
}

function updatePreview() {
  const tab = activeTab();
  const iframe = $('#previewFrame');
  
  if (!tab || !iframe) return;
  
  const ext = extname(tab.name);
  if (ext === 'html' || ext === 'htm') {
    const html = tab.model.getValue();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}

function refreshPreview() {
  updatePreview();
  showNotification('Preview refreshed', 'info');
}

function toggleLiveReload() {
  liveReloadEnabled = !liveReloadEnabled;
  const liveReloadBtn = $('#liveReload');
  if (liveReloadBtn) {
    liveReloadBtn.classList.toggle('active', liveReloadEnabled);
  }
  showNotification(`Live reload ${liveReloadEnabled ? 'enabled' : 'disabled'}`, 'info');
}

function setupLiveReload() {
  setInterval(() => {
    const tab = activeTab();
    if (tab && liveReloadEnabled && ['html', 'css', 'javascript'].includes(tab.language)) {
      updatePreview();
    }
  }, 1000);
}

function showTemplates() {
  showModal('templateModal');
}

function showSettings() {
  showModal('settingsModal');
}

function exportProject() {
  if (!currentFolder) {
    showNotification('Please open a folder first', 'warning');
    return;
  }
  showNotification('Export feature coming soon!', 'info');
}

// Enhanced Status Bar
function updateEditorStatus() {
  if (!editor) return;
  
  const position = editor.getPosition();
  const tab = activeTab();
  
  const cursorPos = $('#cursorPosition');
  const fileLang = $('#fileLanguage');
  const fileEnc = $('#fileEncoding');
  
  if (cursorPos) cursorPos.textContent = `Ln ${position.line}, Col ${position.column}`;
  
  if (fileLang && tab) {
    fileLang.textContent = tab.language.toUpperCase();
    fileLang.style.color = getLanguageColor(tab.language);
  }
  
  if (fileEnc) fileEnc.textContent = 'UTF-8';
  
  updateWordCount();
}

function updateWordCount() {
  if (!editor) return;
  
  const content = editor.getValue();
  const lines = content.split('\n').length;
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  
  const wordCount = $('#wordCount');
  if (wordCount) {
    wordCount.textContent = `${lines} lines, ${words} words, ${chars} chars`;
  }
}

// Settings Management
function setupSettingsHandlers() {
  const settingsHandlers = {
    'settingsTheme': (e) => {
      settings.theme = e.target.value;
      changeTheme(e.target.value);
      saveSettings();
    },
    'fontSize': (e) => {
      settings.fontSize = parseInt(e.target.value);
      const fontSizeValue = $('#fontSizeValue');
      if (fontSizeValue) fontSizeValue.textContent = `${settings.fontSize}px`;
      if (editor) editor.updateOptions({ fontSize: settings.fontSize });
      saveSettings();
    },
    'tabSize': (e) => {
      settings.tabSize = parseInt(e.target.value);
      if (editor) editor.updateOptions({ tabSize: settings.tabSize });
      saveSettings();
    },
    'wordWrap': (e) => {
      settings.wordWrap = e.target.checked;
      if (editor) editor.updateOptions({ wordWrap: settings.wordWrap ? 'on' : 'off' });
      saveSettings();
    },
    'lineNumbers': (e) => {
      settings.lineNumbers = e.target.checked;
      if (editor) editor.updateOptions({ lineNumbers: settings.lineNumbers ? 'on' : 'off' });
      saveSettings();
    },
    'minimapSetting': (e) => {
      settings.minimap = e.target.checked;
      if (editor) editor.updateOptions({ minimap: { enabled: settings.minimap } });
      saveSettings();
    },
    'autoSave': (e) => {
      settings.autoSave = e.target.checked;
      saveSettings();
    }
  };
  
  Object.entries(settingsHandlers).forEach(([id, handler]) => {
    const element = document.getElementById(id);
    if (element) {
      if (element.type === 'checkbox') {
        element.addEventListener('change', handler);
      } else {
        element.addEventListener('input', handler);
      }
    }
  });
}

function loadSettings() {
  const stored = localStorage.getItem('jwscode-settings');
  if (stored) {
    try {
      settings = { ...settings, ...JSON.parse(stored) };
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }
  
  // Apply settings to UI elements safely
  const settingElements = {
    'settingsTheme': settings.theme,
    'fontSize': settings.fontSize,
    'fontSizeValue': `${settings.fontSize}px`,
    'tabSize': settings.tabSize,
    'wordWrap': settings.wordWrap,
    'lineNumbers': settings.lineNumbers,
    'minimapSetting': settings.minimap,
    'autoSave': settings.autoSave
  };
  
  Object.entries(settingElements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) {
      if (element.type === 'checkbox') {
        element.checked = value;
      } else {
        element.value = value;
        if (element.textContent !== undefined) {
          element.textContent = value;
        }
      }
    }
  });
}

function saveSettings() {
  try {
    localStorage.setItem('jwscode-settings', JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

function switchSidebarTab(tabName) {
  $$('.sidebar-tab').forEach(tab => tab.classList.remove('active'));
  $$('.sidebar-content').forEach(content => content.classList.add('hidden'));
  
  const activeTab = $(`.sidebar-tab[data-tab="${tabName}"]`);
  const activeContent = $(`#${tabName}-content`);
  
  if (activeTab) activeTab.classList.add('active');
  if (activeContent) activeContent.classList.remove('hidden');
}

// Modal Management
function showModal(modalId) {
  const modal = $(`#${modalId}`);
  if (modal) {
    modal.classList.add('active');
  }
}

function hideModal(modalId) {
  const modal = $(`#${modalId}`);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Notifications
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  const icons = {
    success: '✅',
    error: '❌', 
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  notification.innerHTML = `
    <span style="margin-right: 0.5rem; font-size: 1.1em;">${icons[type]}</span>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, duration);
}

// Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case 'n':
        e.preventDefault();
        newFile();
        break;
      case 'o':
        e.preventDefault();
        if (e.shiftKey) {
          openFolder();
        } else {
          openFile();
        }
        break;
      case 's':
        e.preventDefault();
        if (e.shiftKey) {
          saveAs();
        } else {
          saveFile();
        }
        break;
      case 'f':
        e.preventDefault();
        if (editor) editor.getAction('actions.find')?.run();
        break;
      case 'b':
        e.preventDefault();
        toggleSidebar();
        break;
      case ',':
        e.preventDefault();
        showSettings();
        break;
    }
  }
  
  switch (e.key) {
    case 'F11':
      e.preventDefault();
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
      break;
    case 'F5':
      e.preventDefault();
      refreshPreview();
      break;
  }
}

// File Tree Management
async function renderFileTree() {
  const tree = $('#fileTree');
  if (!tree || !currentFolder) return;
  
  tree.innerHTML = '<div style="padding: 1rem; text-align: center;">📁 Loading...</div>';
  
  try {
    if (!window.api || !window.api.fs) {
      tree.innerHTML = '<div style="padding: 1rem; text-align: center; color: red;">❌ File system not available</div>';
      return;
    }
    
    const entries = await window.api.fs.listDir(currentFolder);
    tree.innerHTML = '';
    
    if (!entries || entries.length === 0) {
      tree.innerHTML = '<div style="padding: 1rem; text-align: center; color: #666;">📂 Empty folder</div>';
      return;
    }
    
    entries.forEach(entry => {
      const item = document.createElement('div');
      item.className = 'file-item';
      
      const icon = document.createElement('span');
      icon.className = 'file-icon';
      icon.textContent = entry.isDir ? '📁' : getFileIcon(entry.name);
      
      const name = document.createElement('span');
      name.textContent = entry.name;
      
      item.appendChild(icon);
      item.appendChild(name);
      
      if (!entry.isDir) {
        item.addEventListener('click', async () => {
          await openFileFromTree(entry.name);
        });
      }
      
      tree.appendChild(item);
    });
  } catch (error) {
    console.error('Error rendering file tree:', error);
    tree.innerHTML = `<div style="padding: 1rem; text-align: center; color: red;">❌ Error: ${error.message}</div>`;
  }
}

async function openFileFromTree(filename) {
  try {
    if (!currentFolder || !window.api || !window.api.fs) return;
    
    const filePath = joinPath(currentFolder, filename);
    const result = await window.api.fs.readFile(filePath);
    
    if (result && result.content !== undefined) {
      const lang = langFromExt(filePath);
      const model = monaco.editor.createModel(result.content, lang);
      
      addTab({ 
        path: filePath, 
        name: filename, 
        model, 
        language: lang,
        isModified: false
      });
      
      updatePreview();
      showNotification(`Opened ${filename}`, 'success');
    }
  } catch (error) {
    console.error('Error opening file from tree:', error);
    showNotification('Error opening file: ' + error.message, 'error');
  }
}

function toggleMinimap() {
  settings.minimap = !settings.minimap;
  if (editor) {
    editor.updateOptions({ minimap: { enabled: settings.minimap } });
  }
  const minimapSetting = $('#minimapSetting');
  if (minimapSetting) {
    minimapSetting.checked = settings.minimap;
  }
  saveSettings();
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌟 JWS.code Enhanced Edition - Renderer initialized');
});