async function checkURL() {
    const urlInput = document.getElementById("urlInput");
    const resultDiv = document.getElementById("result");

    const url = urlInput.value.trim();
    if (!url) {
        alert("⚠️ Please enter a URL!");
        return;
    }

    resultDiv.innerHTML = "⏳ Checking URL safety...";
    resultDiv.style.display = "block";
    
    try {
        const response = await fetch("http://127.0.0.1:5001/check-url", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            resultDiv.innerHTML = `❌ ${data.error}`;
            resultDiv.classList.add("suspicious");
            return;
        }

        let resultHTML = `<strong>${data.status}</strong><br>`;
        
        if (data.warnings.length > 0) {
            resultHTML += `<ul class="warning-list">`;
            data.warnings.forEach(warning => {
                resultHTML += `<li>⚠️ ${warning}</li>`;
            });
            resultHTML += `</ul>`;
            resultDiv.className = "result suspicious";
        } else {
            resultDiv.className = "result safe";
        }

        if (data.safetyChecks.length > 0) {
            resultHTML += `<ul class="checks-list">`;
            data.safetyChecks.forEach(check => {
                resultHTML += `<li>✅ ${check}</li>`;
            });
            resultHTML += `</ul>`;
        }

        resultDiv.innerHTML = resultHTML;
    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerHTML = "⚠️ Error checking URL.";
        resultDiv.classList.add("suspicious");
    }
}

// Chatbot Functionality
async function sendMessage() {
    const chatInput = document.getElementById("chatInput");
    const chatBox = document.getElementById("chatBox");
    const userMessage = chatInput.value.trim();

    if (!userMessage) {
        alert("⚠️ Please enter a message!");
        return;
    }

    chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    chatInput.value = "";

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userMessage }),
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            chatBox.innerHTML += `<p><strong>Bot:</strong> ❌ ${data.error}</p>`;
        } else {
            chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<p><strong>Bot:</strong> ⚠️ Error processing request.</p>`;
    }
}