document.getElementById("scanButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
  
        // Dynamically inject the content script
        chrome.scripting.executeScript(
          {
            target: { tabId },
            files: ["scripts/content.js"],
          },
          () => {
            if (chrome.runtime.lastError) {
              console.error("Error injecting content script:", chrome.runtime.lastError.message);
              document.getElementById("results").textContent =
                "Error: Unable to connect to the page.";
            } else {
              console.log("Content script injected successfully.");
              // Send a message to the content script
              chrome.tabs.sendMessage(tabId, { action: "scan" }, (response) => {
                const resultsContainer = document.getElementById("results");
                resultsContainer.innerHTML = "";
  
                if (response?.results) {
                  response.results.forEach((issue) => {
                    const div = document.createElement("div");
                    div.textContent = issue;
                    resultsContainer.appendChild(div);
                  });
                } else {
                  resultsContainer.textContent = "No issues found or no response.";
                }
              });
            }
          }
        );
      } else {
        console.error("No active tab found.");
      }
    });
  });
  