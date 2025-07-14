const API_BASE_URL = 'http://localhost:3000/api/produtos';

// LISTAR TODOS OS PRODUTOS
document.getElementById('btnListarTodos').addEventListener('click', renderizarProdutos);

async function renderizarProdutos() {
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = ''; 

    try {
        const response = await fetch(API_BASE_URL);
        const produtos = await response.json();

        if (produtos.length === 0) {
            listaProdutos.innerHTML = '<li>Nenhum produto encontrado.</li>';
            return;
        }

        produtos.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `ID: ${produto.id}, Nome: ${produto.name}, Preço: R$${produto.preco}, Descrição: ${produto.descricao}`;
            listaProdutos.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        listaProdutos.innerHTML = '<li style="color:red;">Erro ao buscar produtos.</li>';
    }
}

// CADASTRO DE PRODUTO
document.getElementById('formCadastro').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const nome = event.target[0].value;
    const preco = parseFloat(event.target[1].value);
    const descricao = event.target[2].value;

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nome, preco: preco, descricao: descricao }),
        });

        if (response.ok) {
            alert('Produto cadastrado com sucesso!');
            event.target.reset(); 
        } else {
            const errorData = await response.json();
            alert(`Erro ao cadastrar produto: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
    }
});

// BUSCAR PRODUTO POR ID
document.getElementById('formBuscar').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const id = event.target[0].value;
    const resultadoDiv = document.getElementById('resultadoBusca');
    resultadoDiv.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            resultadoDiv.innerHTML = `<span style="color:red;">Erro: ${errorData.message}</span>`;
            return;
        }

        const produto = await response.json();
        resultadoDiv.innerHTML = `
            <strong>Produto encontrado:</strong><br>
            ID: ${produto.id}<br>
            Nome: ${produto.name}<br>
            Preço: R$${produto.preco}<br>
            Descrição: ${produto.descricao}
        `;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        resultadoDiv.innerHTML = `<span style="color:red;">Erro ao buscar produto.</span>`;
    }

    event.target.reset(); 
});

// EDITAR PRODUTO
document.getElementById('formEditar').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const id = event.target[0].value;
    const nome = event.target[1].value;
    const preco = parseFloat(event.target[2].value);
    const descricao = event.target[3].value;

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nome, preco: preco, descricao: descricao }),
        });

        if (response.ok) {
            alert('Produto editado com sucesso!');
            event.target.reset(); 
        } else {
            const errorData = await response.json();
            alert(`Erro ao editar produto: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro ao editar produto:', error);
    }
});

// DELETAR PRODUTO
document.querySelector('.delete').addEventListener('click', async function() {
    const id = document.getElementById('formEditar')[0].value; 

    if (!id) {
        alert('Informe o ID do produto que deseja deletar.');
        return;
    }

    const confirmacao = confirm(`Deseja realmente deletar o produto com ID ${id}?`);
    if (!confirmacao) return;

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Produto deletado com sucesso!');
            document.getElementById('formEditar').reset(); 
        } else {
            const errorData = await response.json();
            alert(`Erro ao deletar produto: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
    }
});
