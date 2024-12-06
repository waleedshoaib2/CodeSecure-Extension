console.log("CodeSafe content script loaded!");

function checkCSP() {
  const csp = document.securityPolicy?.policy || "";
  const issues = [];

  if (!csp) {
    issues.push("⚠️ No Content Security Policy (CSP) header detected.");
  } else {
    if (csp.includes("unsafe-inline")) {
      issues.push("⚠️ CSP allows 'unsafe-inline', which can lead to XSS.");
    }
    if (csp.includes("*")) {
      issues.push("⚠️ CSP uses wildcard '*', which is insecure.");
    }
  }

  console.log("CSP Check Complete:", issues);
  return issues;
}

function checkCookies() {
  const issues = [];
  const cookies = document.cookie.split(";");

  cookies.forEach((cookie) => {
    if (!cookie.includes("Secure")) {
      issues.push(`⚠️ Cookie "${cookie.trim()}" is not marked Secure.`);
    }
    if (!cookie.includes("HttpOnly")) {
      issues.push(`⚠️ Cookie "${cookie.trim()}" is not marked HttpOnly.`);
    }
  });

  console.log("Cookie Check Complete:", issues);
  return issues;
}

function checkMixedContent() {
  const issues = [];
  const elements = Array.from(document.querySelectorAll("[src], [href]"));

  elements.forEach((el) => {
    const srcOrHref = el.getAttribute("src") || el.getAttribute("href");
    if (srcOrHref && srcOrHref.startsWith("http://")) {
      const elementInfo = `<${el.tagName.toLowerCase()} src/href="${srcOrHref}">`;
      issues.push(`⚠️ Mixed content detected in: ${elementInfo}`);
    }
  });

  console.log("Mixed Content Check Complete:", issues);
  return issues;
}

function checkInlineEventHandlers() {
  const issues = [];
  const elements = Array.from(document.querySelectorAll("*"));

  elements.forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.startsWith("on")) {
        const elementInfo = `<${el.tagName.toLowerCase()} ${attr.name}="${attr.value}">`;
        issues.push(`⚠️ Inline event handler detected: ${elementInfo}`);
      }
    });
  });

  console.log("Inline Event Handlers Check Complete:", issues);
  return issues;
}

function checkThirdPartyScripts() {
  const issues = [];
  const scripts = Array.from(document.querySelectorAll("script[src]"));

  scripts.forEach((script) => {
    const src = script.getAttribute("src");
    if (src && !src.startsWith(window.location.origin)) {
      issues.push(`⚠️ Third-party script detected: ${src}`);
    }
  });

  console.log("Third-Party Scripts Check Complete:", issues);
  return issues;
}

function scanSecurityIssues() {
  const issues = [];
  issues.push(...checkCSP());
  issues.push(...checkCookies());
  issues.push(...checkMixedContent());
  issues.push(...checkInlineEventHandlers());
  issues.push(...checkThirdPartyScripts());
  return issues;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);

  if (message.action === "scan") {
    const results = scanSecurityIssues();
    console.log("Scan completed. Sending response:", results);
    sendResponse({ results });
  }
});
