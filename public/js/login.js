const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const res = await fetch("http://localhost:3000/api/usersLogin",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        if(res.ok){
            alert("Login realizado com sucesso");
            window.location.href = "home.html";
        } else{
            const data = await res.json();
            alert(data.message || "Erro ao realizar login");
        }
    } catch(error) {
        alert("Erro bizonho!");
        console.error("Erro ao entrar: ", error)
    }
})