document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Exibe as informações no console (equivalente ao terminal)
    console.log("Nome:", name);
    console.log("Email:", email);

    
});
