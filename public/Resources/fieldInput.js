const inputs = document.querySelectorAll('.required-field input');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.parentNode.querySelector('.field-message').classList.add('show');
        } else {
            input.parentNode.querySelector('.field-message').classList.remove('show');
        }
    });
});