const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');

let mainWindow;
let loginWindow;

function createLoginWindow() {
  console.log('Creating login window...');
  
  loginWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: path.join(__dirname, 'preload_login.js')
    },
    resizable: true,
    center: true,
    show: false,
    frame: false,
    transparent: true,
    titleBarStyle: 'hidden'
  });

  // Load the login screen
  loginWindow.loadFile('login.html').then(() => {
    console.log('Login HTML loaded successfully');
  }).catch(err => {
    console.error('Failed to load login.html:', err);
  });

  loginWindow.once('ready-to-show', () => {
    console.log('Login window ready to show');
    loginWindow.show();
  });

  loginWindow.on('closed', () => {
    console.log('Login window closed');
    loginWindow = null;
    // If main window isn't open, quit the app
    if (!mainWindow) {
      app.quit();
    }
  });
}

function createMainWindow() {
  console.log('Creating main window...');
  
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, 'preload_editor.js')
    },
    show: false,
    titleBarStyle: 'hiddenInset'
  });

  // Load the main editor
  mainWindow.loadFile('editor.html').then(() => {
    console.log('Editor HTML loaded successfully');
  }).catch(err => {
    console.error('Failed to load editor.html:', err);
  });

  mainWindow.once('ready-to-show', () => {
    console.log('Main window ready to show');
    mainWindow.show();
    
    // Close login window
    if (loginWindow) {
      loginWindow.close();
      loginWindow = null;
    }
    
    // Open DevTools in development
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    console.log('Main window closed');
    mainWindow = null;
  });
}

// App event listeners
app.whenReady().then(() => {
  console.log('App ready, creating login window...');
  createLoginWindow();
  setupIpcHandlers();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createLoginWindow();
  }
});

// Handle launch editor message from login screen
ipcMain.on('launch-editor', () => {
  console.log('Received launch-editor message');
  createMainWindow();
});

// Setup IPC handlers for file system operations
function setupIpcHandlers() {
  console.log('Setting up IPC handlers...');

  // File operations
  ipcMain.handle('fs:openFile', async () => {
    try {
      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile', 'multiSelections'],
        filters: [
          { name: 'All Files', extensions: ['*'] },
          { name: 'Web Files', extensions: ['html', 'css', 'js', 'json'] },
          { name: 'Text Files', extensions: ['txt', 'md'] }
        ]
      });

      if (result.canceled) return null;

      const files = [];
      for (const filePath of result.filePaths) {
        const data = await fs.readFile(filePath, 'utf-8');
        files.push({ path: filePath, data });
      }

      return files;
    } catch (error) {
      console.error('Error opening file:', error);
      throw error;
    }
  });

  ipcMain.handle('fs:saveFile', async (event, { path: filePath, text }) => {
    try {
      await fs.writeFile(filePath, text, 'utf-8');
      return { success: true };
    } catch (error) {
      console.error('Error saving file:', error);
      throw error;
    }
  });

  ipcMain.handle('fs:saveFileAs', async (event, content) => {
    try {
      const result = await dialog.showSaveDialog(mainWindow, {
        filters: [
          { name: 'HTML Files', extensions: ['html'] },
          { name: 'CSS Files', extensions: ['css'] },
          { name: 'JavaScript Files', extensions: ['js'] },
          { name: 'JSON Files', extensions: ['json'] },
          { name: 'Text Files', extensions: ['txt'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (result.canceled) return null;

      await fs.writeFile(result.filePath, content, 'utf-8');
      return { path: result.filePath, success: true };
    } catch (error) {
      console.error('Error saving file as:', error);
      throw error;
    }
  });

  ipcMain.handle('fs:readFile', async (event, filePath) => {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return { content, success: true };
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  });

  ipcMain.handle('fs:openFolder', async () => {
    try {
      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
      });

      if (result.canceled) return null;

      return { path: result.filePaths[0] };
    } catch (error) {
      console.error('Error opening folder:', error);
      throw error;
    }
  });

  ipcMain.handle('fs:listDir', async (event, dirPath) => {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries.map(entry => ({
        name: entry.name,
        isDir: entry.isDirectory(),
        path: path.join(dirPath, entry.name)
      }));
    } catch (error) {
      console.error('Error listing directory:', error);
      throw error;
    }
  });

  // Authentication handler
  ipcMain.handle('auth:login', async (event, password) => {
    console.log('🔐 Authentication request received');
    // For demo purposes, accept any non-empty password
    const validCodes = ['tworoadsdayz', 'jwscode2024', 'developer123'];
    const isValid = validCodes.includes(password) || password.length > 0;
    
    console.log('🔑 Authentication result:', isValid ? 'SUCCESS' : 'FAILED');
    return { success: isValid, message: isValid ? 'Welcome!' : 'Invalid access code' };
  });

  console.log('✅ IPC handlers setup complete');
}

console.log('JWS.code Enhanced - Main process loaded');