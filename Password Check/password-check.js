function checkPasswordStrength(password) {
    let strength = 0;
    let suggestions = [];

    // Check length
    if (password.length >= 8) {
        strength++;
    } else {
        suggestions.push("Make your password at least 8 characters long.");
    }

    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
        strength++;
    } else {
        suggestions.push("Add lowercase letters.");
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
        strength++;
    } else {
        suggestions.push("Add uppercase letters.");
    }

    // Check for numbers
    if (/[0-9]/.test(password)) {
        strength++;
    } else {
        suggestions.push("Include at least one number.");
    }

    // Check for special characters
    if (/[@$!%*?&]/.test(password)) {
        strength++;
    } else {
        suggestions.push("Use special characters like @$!%*?&.");
    }

    let strengthMessage;
    if (strength <= 2) {
        strengthMessage = "Weak";
    } else if (strength === 3) {
        strengthMessage = "Moderate";
    } else if (strength >= 4) {
        strengthMessage = "Strong";
    }

    return {
        strength: strengthMessage,
        suggestions: suggestions.length > 0 ? suggestions : ["Your password is strong!"]
    };
}

function checkPassword() {
    const passwordInput = document.getElementById("password-input").value;
    const result = checkPasswordStrength(passwordInput);
    
    document.querySelector(".strength-details").innerHTML = `
        <p><strong>Password Strength:</strong> ${result.strength}</p>
        <p><strong>Suggestions:</strong> ${result.suggestions.join(" ")}</p>
    `;
}
