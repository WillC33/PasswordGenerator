function generatePassword() {
    const passwordLength = 32; // Desired password length
    const passwordChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={[}]:;?/>.<,';
    let password = '';

    try {
        const randomValues = new Uint32Array(passwordLength);
        window.crypto.getRandomValues(randomValues);

        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = randomValues[i] % passwordChars.length;
            password += passwordChars[randomIndex];
        }

        document.getElementById('password').value = password;
    }
    catch(e) {
        console.error(e);
        document.getElementById('label').innerText = 'Error: Could not generate';
    }
}


function copyToClipboard() {
    const textBox = document.getElementById('password');
    const text = textBox.value;
    const label = document.getElementById('copy-status')

    navigator.clipboard.writeText(text)
        .then(function() {
            label.innerText = 'Copied';
            setTimeout(function() {
                label.innerText = 'Password';
            }, 1200);
        })
        .catch((e) => {
            console.error(e);
            label.innerText = 'Error: Could not copy';
        });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('copy').addEventListener('click', copyToClipboard);
    document.getElementById('generate').addEventListener('click', generatePassword);
});
