# CodeSafe

**CodeSafe** is a Chrome extension designed to identify and promote awareness of potential security vulnerabilities on web pages. It helps developers and users secure their browsing experience by highlighting critical security issues such as insecure cookies, mixed content, weak Content Security Policies (CSP), and more.

---

## Features

- **Content Security Policy (CSP) Check**: Identifies missing or insecure CSP configurations.
- **Cookie Security**: Detects cookies without `Secure` and `HttpOnly` attributes.
- **Mixed Content Detection**: Highlights HTTP resources loaded on HTTPS pages.
- **Inline Event Handlers**: Warns about inline event handlers that could lead to security risks.
- **Third-party Script Check**: Lists externally hosted scripts for better control over potential risks.

---

## Installation

1. Clone or download the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click on **Load unpacked** and select the folder containing the extension files.
5. The CodeSafe extension icon will now appear in your Chrome toolbar.

---

## Usage

1. Click on the CodeSafe icon in the Chrome toolbar.
2. In the popup, click on the **"Scan Page"** button.
3. View the list of potential security issues in the popup.

---

## Code Overview

### Manifest
The `manifest.json` file defines the extension's metadata and permissions:
- **Permissions**: Active tabs and scripting for dynamic script execution.
- **Host Permissions**: Access to all URLs for comprehensive scanning.

### Popup
The `popup.html` provides a user interface with:
- A button to initiate the security scan.
- A dynamically updated results section for displaying detected issues.

### Content Script
The `content.js` performs security checks, including:
- CSP analysis.
- Cookie validation.
- Detection of mixed content, inline event handlers, and third-party scripts.

### Popup Script
The `popup.js`:
- Handles user interactions.
- Dynamically injects the content script into the active tab.
- Communicates with the content script to retrieve scan results.

---

## How It Works

1. **Dynamic Injection**: The content script (`content.js`) is injected into the current active tab upon clicking the scan button.
2. **Security Analysis**: The script scans the web page for various security issues.
3. **Results Display**: Issues are displayed in the extension popup in a user-friendly format.

---

## Future Enhancements

- Adding more comprehensive checks (e.g., XSS, CSRF).
- Providing suggestions for fixing detected vulnerabilities.
- Enhancing UI for better visualization of issues.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
