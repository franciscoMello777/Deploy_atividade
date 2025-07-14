document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('cadastroForm');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;

        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: nome, email, password })
            });

            if (res.ok) {
                alert("Usuário criado com sucesso!");
                window.location.href = "login.html";
            } else {
                const data = await res.json();
                alert(data.message || "Erro ao registrar usuário");
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
            console.error("Erro ao criar usuário:", error);
        }
    });
});