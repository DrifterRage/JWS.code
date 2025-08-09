# JWS.code - Professional Code Editor

<div align="center">
  <img src="assets/logo.png" alt="JWS.code Logo" width="128" height="128">
  
  **A modern, feature-rich code editor built with Electron and Monaco Editor**
  
  [![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/jwscode/jws-code-editor)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/jwscode/jws-code-editor/releases)
</div>

## ✨ Features

### 🎨 **Modern Interface**
- Beautiful dark/light themes with smooth animations
- Responsive design that adapts to different screen sizes
- Intuitive navigation with tabbed editing
- Professional status bar with real-time information

### 📝 **Powerful Editor**
- **Monaco Editor** - The same editor that powers VS Code
- Syntax highlighting for 50+ programming languages
- IntelliSense autocompletion and error detection
- Multi-cursor editing and advanced search/replace
- Code formatting and auto-indentation
- Minimap for quick navigation

### 🚀 **Live Preview**
- Real-time HTML preview with instant updates
- Device simulation (Mobile, Tablet, Desktop)
- Console output monitoring
- Auto-refresh on file changes
- External browser integration

### 📁 **Project Management**
- File explorer with tree view
- Recent projects tracking
- Project templates (React, HTML5, Express, etc.)
- ZIP export functionality
- Folder-based project organization

### 🔧 **Developer Tools**
- Global search across project files
- Customizable settings and preferences
- Keyboard shortcuts and menu integration
- Plugin-ready architecture
- Auto-save functionality

### 🔒 **Security**
- Password-protected access
- Sandboxed renderer processes
- Context isolation for enhanced security
- No remote module access

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Windows 10/11**, **macOS 10.14+**, or **Linux** (Ubuntu 18.04+)

### Installation

#### Option 1: Download Pre-built Binaries
1. Visit the [Releases page](https://github.com/jwscode/jws-code-editor/releases)
2. Download the appropriate installer for your platform:
   - **Windows**: `JWS.code Setup 2.0.0.exe`
   - **macOS**: `JWS.code-2.0.0.dmg`
   - **Linux**: `JWS.code-2.0.0.AppImage`
3. Run the installer and follow the setup wizard

#### Option 2: Build from Source
```bash
# Clone the repository
git clone https://github.com/jwscode/jws-code-editor.git
cd jws-code-editor

# Install dependencies
npm install

# Start development server
npm run dev

# Or build for production
npm run build
```

## 🔑 Access Codes

The application is protected by access codes. Use any of the following:
- `tworoadsdayz` (default)
- `jwscode2024`
- `developer123`

## 📖 Usage Guide

### First Launch
1. **Login**: Enter one of the access codes to unlock the editor
2. **Welcome Screen**: You'll see a welcome tab with basic HTML content
3. **Open Project**: Use `File > Open Folder` to open your project directory

### Creating Your First Project
1. **Open Folder**: Choose or create a new folder for your project
2. **New File**: Click the `+` button or use `Ctrl+N` to create a new file
3. **Choose Template**: Use `Project > New from Template` for quick starts
4. **Start Coding**: Begin writing your code with full syntax highlighting

### Live Preview
1. **HTML Files**: Automatically detected and previewed in the right panel
2. **Device Testing**: Use the device selector to test different screen sizes
3. **Live Reload**: Changes are reflected instantly in the preview
4. **Console**: Monitor JavaScript console output in the preview panel

### Project Templates

#### 🌐 Basic Website
- `index.html` with modern HTML5 structure
- `style.css` with responsive design patterns
- `script.js` with modern JavaScript features

#### ⚛️ React App
- Functional component with hooks
- Modern React patterns and best practices
- CSS modules ready

#### 📄 Landing Page
- Professional landing page template
- Mobile-responsive design
- Modern CSS Grid and Flexbox

#### 📊 Dashboard
- Admin dashboard layout
- Data visualization ready
- Component-based structure

## ⌨️ Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| New File | `Ctrl+N` | `Cmd+N` |
| Open File | `Ctrl+O` | `Cmd+O` |
| Open Folder | `Ctrl+Shift+O` | `Cmd+Shift+O` |
| Save | `Ctrl+S` | `Cmd+S` |
| Save As | `Ctrl+Shift+S` | `Cmd+Shift+S` |
| Find | `Ctrl+F` | `Cmd+F` |
| Replace | `Ctrl+H` | `Cmd+H` |
| Toggle Sidebar | `Ctrl+B` | `Cmd+B` |
| Toggle Preview | `Ctrl+Shift+V` | `Cmd+Shift+V` |
| Settings | `Ctrl+,` | `Cmd+,` |
| Close Tab | `Ctrl+W` | `Cmd+W` |
| Command Palette | `Ctrl+P` | `Cmd+P` |

## ⚙️ Settings & Customization

### Editor Settings
- **Theme**: Dark, Light, High Contrast
- **Font Size**: 10px - 24px
- **Tab Size**: 2, 4, 8 spaces
- **Word Wrap**: Enable/disable text wrapping
- **Line Numbers**: Show/hide line numbers
- **Minimap**: Toggle code minimap
- **Auto Save**: Automatic file saving

### Preview Settings
- **Live Reload**: Toggle automatic preview updates
- **Device Simulation**: Mobile, Tablet, Desktop views
- **Console Monitoring**: Show/hide console output

### Project Settings
- **Recent Projects**: Access up to 10 recent projects
- **Auto-open**: Restore last opened project on startup
- **File Associations**: Default file type handling

## 🔌 Extensibility

JWS.code is built with extensibility in mind:

### Custom Themes
Add your own themes by modifying the CSS variables:
```css
:root {
  --bg-primary: #your-color;
  --text-primary: #your-color;
  --accent-primary: #your-color;
}
```

### Language Support
Monaco Editor supports 50+ languages out of the box. Additional language support can be added via Monaco's language services.

### Templates
Create custom project templates by adding them to the templates directory:
```javascript
// custom-template.js
module.exports = {
  name: "My Template",
  description: "Custom project template",
  files: [
    {
      name: "index.html",
      content: "<!-- Your template content -->"
    }
  ]
};
```

## 🛠️ Development

### Project Structure
```
jws-code-editor/
├── main.js              # Main Electron process
├── preload/             # Preload scripts
│   ├── preload_login.js
│   └── preload_editor.js
├── renderer/            # Renderer scripts
│   └── editor.js
├── assets/              # Static assets
├── build/               # Build configuration
├── templates/           # Project templates
└── dist/                # Build output
```

### Building for Different Platforms

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux

# All platforms
npm run build
```

### Development Scripts

```bash
# Start in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Clean build directory
npm run clean
```

## 🐛 Troubleshooting

### Common Issues

#### App Won't Start
- Ensure Node.js and npm are properly installed
- Try deleting `node_modules` and running `npm install` again
- Check for antivirus software blocking the application

#### Files Won't Open
- Verify file permissions in the target directory
- Check if the file is already open in another application
- Ensure the file encoding is UTF-8

#### Preview Not Working
- Check if the HTML file has valid syntax
- Verify that relative paths to CSS/JS files are correct
- Clear browser cache in the preview panel

#### Performance Issues
- Close unused tabs to free up memory
- Disable minimap for large files
- Reduce font size if experiencing lag

### Getting Help

1. **Documentation**: Check this README and inline help
2. **Issues**: [Report bugs](https://github.com/jwscode/jws-code-editor/issues) on GitHub
3. **Discussions**: Join the [community discussions](https://github.com/jwscode/jws-code-editor/discussions)
4. **Email**: Contact [support@jwscode.dev](mailto:support@jwscode.dev)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Reporting Bugs
1. Check existing issues to avoid duplicates
2. Use the bug report template
3. Include steps to reproduce the issue
4. Provide system information and screenshots

### Suggesting Features
1. Check the roadmap for planned features
2. Use the feature request template
3. Explain the use case and benefits
4. Provide mockups or examples if possible

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Monaco Editor** - Microsoft's powerful code editor
- **Electron** - Cross-platform desktop app framework
- **Contributors** - All the amazing people who help improve JWS.code

## 🗺️ Roadmap

### Version 2.1.0 (Q2 2024)
- [ ] Plugin system for extensions
- [ ] Integrated terminal
- [ ] Git integration
- [ ] Code snippets manager

### Version 2.2.0 (Q3 2024)
- [ ] Collaborative editing
- [ ] Cloud sync
- [ ] Mobile companion app
- [ ] Advanced debugging tools

### Version 3.0.0 (Q4 2024)
- [ ] AI-powered code completion
- [ ] Visual form builder
- [ ] Database integration
- [ ] Performance monitoring

---

<div align="center">
  <p>Made with ❤️ by <strong>Jonathan South</strong></p>
  <p>
    <a href="https://jwscode.dev">Website</a> •
    <a href="https://github.com/jwscode">GitHub</a> •
    <a href="https://twitter.com/jwscode">Twitter</a> •
    <a href="mailto:hello@jwscode.dev">Email</a>
  </p>
</div>