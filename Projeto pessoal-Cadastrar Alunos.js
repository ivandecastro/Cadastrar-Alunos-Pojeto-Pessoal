// ==============================
// Variáveis e LocalStorage
// ==============================

const alunos = JSON.parse(localStorage.getItem('alunos')) || []; //Array dos alunos.
//Verifica se o localStorage já possui alunos cadastrados, caso contrário, inicializa como um array vazio.
const salvarAlunosNoStorage = () => localStorage.setItem("alunos", JSON.stringify(alunos));


// ==============================
// Funções Utilitárias
// ==============================

const dataAtual = () => { //Formata a data atual para o padrão "dd/mm/aaaa - hh:mm:ss".
    const agora = new Date();
    return agora.toLocaleDateString() + ' - ' + agora.toLocaleTimeString();
}


const logs = () => { //Exibe os logs no console.
    console.log(alunos);
    console.log(alunos.length);
}

const formatarNome = (nome) => { //Formata o nome do aluno para o padrão "Nome Sobrenome".
    nome.toLowerCase()[0].toUpperCase() + nome.slice(1);
    const partes = nome.split(' ');
    for (let i = 0; i < partes.length; i++) { //Formata cada parte do nome.
        partes[i] = partes[i].charAt(0).toUpperCase() + partes[i].slice(1);
    }
    return partes.join(' ');
};

//Verifica se o nome é inválido (vazio ou apenas espaços em branco).
const nomeInvalido = (nome) => !nome || nome.trim() === '';

const statusAluno = (media, sexo) => media >= 6 ? `aprovad${obterArtigoPorGenero(sexo)[2]}`
    : `reprovad${obterArtigoPorGenero(sexo)[2]}`; //Verifica se o aluno foi aprovado ou reprovado com base na média.

const cadastroPermitido = (mensagem) => { //Exibe uma mensagem de confirmação para o usuário.
    let confirmação = confirm(mensagem);
    return confirmação;
}

const calcularMedia = (notas) => { //Calcula a média das notas do aluno.
    let soma = 0;
    for (let j = 0; j < notas.length; j++) { //Soma todas as notas.
        soma += notas[j];
    }
    const calculoMedia = soma / notas.length;
    return calculoMedia;
}

const obterArtigoPorGenero = (sexo) => { //Retorna o artigo definido e indefinido de acordo com o gênero do aluno.
    if (sexo === 'Masculino') {
        return ['do aluno', 'O aluno', 'o'];
    } else if (sexo === 'Feminino') {
        return ['da aluna', 'A aluna', 'a'];
    } else {
        return ['de alune', 'E alune', 'e'];
    }
}

const generoAluno = () => { //Verifica o gênero do aluno.
    let alunoGenero = confirm('O sexo do aluno(a) é Masculino?');

    if (alunoGenero === true) { //Se o aluno for do sexo masculino, atribui 'Masculino' à variável alunoGenero.
        alunoGenero = 'Masculino';
    } else if (alunoGenero === false) { //Se o aluno não for do sexo masculino, pergunta se é do sexo feminino.
        let confirmarFeminino = confirm('O sexo do aluno(a) é Feminino?');
        //Se o aluno for do sexo feminino, atribui 'Feminino' à variável alunoGenero.
        alunoGenero = confirmarFeminino === true ? 'Feminino' : 'Outros';
    }

    return alunoGenero;
}

//Verifica se o valor da nota é inválido (vazio, nulo, NaN ou fora do intervalo de 0 a 10).
const proibicoes = (verificarValor) => {
    return (
        verificarValor === '' ||
        verificarValor === null ||
        isNaN(verificarValor) ||
        Number(verificarValor) > 10 ||
        Number(verificarValor) < 0
    );
};

const obterNotaValida = (materia, genero) => { //Obtém a nota válida do aluno para a matéria especificada.
    let nota;
    const [artigo] = obterArtigoPorGenero(genero); //Obtém o artigo definido de acordo com o gênero do aluno.

    do { //Solicita a nota ao usuário.
        nota = prompt(`Digite a nota ${artigo} de 1 a 10 em: ${materia}.`);

        if (proibicoes(nota)) { //Verifica se a nota é inválida.
            alert('Por favor, digite uma nota válida.');
        }
    } while (proibicoes(nota)); //Repete o loop até que uma nota válida seja inserida.

    return Number(nota);
}

const verificarArrayVazio = (array) => { //Verifica se o array está vazio.
    const ul = document.getElementById("lista-alunos");
    const li = document.createElement("li"); //Cria um novo elemento de lista.

    if (array.length === 0) { //Se o array estiver vazio, exibe um texto na lista.
        li.textContent = 'Nenhum aluno cadastrado.';
        ul.appendChild(li); //Adiciona o elemento de lista à lista exibida na tela.
    }
}

// ==============================
// Cadastro e Edição de Alunos
// ==============================

const criarAluno = (name, gender, math, portuguese, history) => { //Cria um novo objeto aluno com os dados fornecidos.
    const aluno = { //Cria um novo objeto aluno.
        nome: formatarNome(name),
        sexo: gender,
        notas: {
            matematica: Number(math),
            portugues: Number(portuguese),
            historia: Number(history)
        },
        dataCadastro: dataAtual()
    };
    alunos.push(aluno);
    salvarAlunosNoStorage();
    return aluno;
}

const cadastro = (confirmacao) => { //Função de cadastro de alunos.
    let confirmarPeloNome;

    while (confirmacao === true) { //Enquanto a confirmação for verdadeira, continua o cadastro.
        const alunoACadastrar = prompt('Qual o nome do aluno(a)?');

        if (alunoACadastrar === '') { //Verifica se o nome é inválido.
            alert('Por favor, digite o nome de um aluno.');
            return cadastro(true);
        } else if (nomeInvalido(alunoACadastrar)) { //Verifica se o nome é inválido.
            confirmarPeloNome = confirm('Deseja cancelar o cadastro do aluno?');
            if (confirmarPeloNome === true) {
                break;
            } else {
                return cadastro(true);
            }
        }

        const sexoAluno = generoAluno(); //Obtém o gênero do aluno.
        let nota1 = obterNotaValida('Matemática', sexoAluno); //Obtém a nota de Matemática.
        let nota2 = obterNotaValida('Português', sexoAluno); //Obtém a nota de Português.
        let nota3 = obterNotaValida('História', sexoAluno); //Obtém a nota de História.

        criarAluno(alunoACadastrar, sexoAluno, nota1, nota2, nota3); //Cria o aluno com os dados fornecidos.

        const alunoNovo = cadastroPermitido('Deseja fazer o cadastro de mais um aluno?');
        if (alunoNovo === false) { //Se o usuário não quiser cadastrar mais um aluno, encerra o loop.
            break;
        } else {
            return cadastro(true);
        }
    }

    let aprovados = 0; //Contador de alunos aprovados.
    let reprovados = 0; //Contador de alunos reprovados.
    let maiorMedia = 0; //Maior média encontrada.
    let melhorAluno = ''; //Nome do aluno com a maior média.

    for (let i = 0; i < alunos.length; i++) { //Percorre todos os alunos cadastrados.
        let aluno = alunos[i]; //Obtém o aluno atual.
        let notas = Object.values(aluno.notas); //Obtém as notas do aluno.

        const media = calcularMedia(notas); //Calcula a média das notas do aluno.

        if (media > maiorMedia) { //Verifica se a média atual é maior que a maior média encontrada.
            maiorMedia = media;
            melhorAluno = aluno.nome;
        }

        exibirAlunos(aluno, media); //Exibe os dados do aluno.
        adicionarAlunosNaLista(alunos); //Adiciona o aluno à lista exibida na tela.

        media >= 6 ? aprovados++ : reprovados++; //Incrementa o contador de aprovados ou reprovados.
    }

    const [aprovado, reprovado, melhorEstudante] = logAluno(aprovados, reprovados, melhorAluno, maiorMedia);

    if (aprovados != 0 || reprovados != 0) { //Exibe os logs no console.
        console.log(aprovado);
        console.log(reprovado);
    }

    if (maiorMedia != 0 && melhorAluno != '') { //Exibe o aluno com a maior média.
        alert(`${melhorEstudante}`);
    }
}

const cadastrarAluno = () => { //Função para iniciar o cadastro de alunos.
    let confirmar = cadastroPermitido('Deseja fazer o cadastro de um aluno?');
    cadastro(confirmar);
    logs();
}

const editarAluno = () => { //Função para editar os dados de um aluno.
    let nomeParaEditar = prompt("Digite o nome do aluno que deseja editar:");
    let confirmar;

    if (nomeParaEditar === null) { //Verifica se o nome é nulo.
        confirmar = confirm('Deseja cancelar a edição do aluno?');
        confirmar === true ? nomeParaEditar === 'Algum Aluno' : editarAluno();
        return;
    }

    if (nomeInvalido(nomeParaEditar)) { //Verifica se o nome é inválido.
        alert('Aluno não encontrado.');
        return editarAluno();
    }

    const indice = alunos.findIndex(aluno => aluno.nome.toLowerCase() === nomeParaEditar.toLowerCase());

    if (indice === -1) { //Verifica se o aluno foi encontrado.
        alert('Aluno não encontrado.');
        return editarAluno();
    }

    const aluno = alunos[indice]; //Obtém o aluno a ser editado.
    let novoNome; //Variável para armazenar o novo nome do aluno.

    do { //Solicita o novo nome do aluno.
        novoNome = prompt(`Editar nome (${aluno.nome}):`, aluno.nome);

        if (nomeInvalido(novoNome)) { //Verifica se o novo nome é inválido.
            alert('Por favor, digite um nome.');
        }
    } while (nomeInvalido(novoNome)); //Repete o loop até que um nome válido seja inserido.

    const novoSexo = generoAluno(); //Obtém o novo gênero do aluno.
    const novaNotaMatematica = obterNotaValida('Matemática', novoSexo); //Obtém a nova nota de Matemática.
    const novaNotaPortugues = obterNotaValida('Português', novoSexo); //Obtém a nova nota de Português.
    const novaNotaHistoria = obterNotaValida('História', novoSexo); //Obtém a nova nota de História.

    aluno.nome = formatarNome(novoNome); //Formata o novo nome do aluno.
    aluno.sexo = novoSexo; //Atualiza o gênero do aluno.
    aluno.notas = { //Atualiza as notas do aluno.
        matematica: novaNotaMatematica,
        portugues: novaNotaPortugues,
        historia: novaNotaHistoria
    };
    aluno.dataCadastro = dataAtual(); //Atualiza a data de cadastro do aluno.

    const [artigo] = obterArtigoPorGenero(aluno.sexo); //Obtém o artigo definido de acordo com o gênero do aluno.
    alunos[indice] = aluno; //Substitui o aluno antigo pelo novo no array de alunos.

    salvarAlunosNoStorage(); //Salva os dados atualizados no localStorage.
    alert(`Informações ${artigo} ${aluno.nome} foram atualizadas com sucesso!`);

    adicionarAlunosNaLista(alunos); //Adiciona o aluno à lista exibida na tela.
    logs(); //Exibe os logs no console.
}


// ==============================
// Remoção de Alunos
// ==============================

const removerAluno = () => { //Função para remover um aluno.
    let nomeParaRemover = prompt("Digite o nome do aluno que deseja remover:");
    let confirmar;

    if (nomeParaRemover === '') { //Verifica se o nome é inválido.
        alert('Aluno não encontrado');
        return removerAluno();
    }

    if (!nomeParaRemover) { //Verifica se o nome é nulo.
        alert('Por favor, Digite o nome de algum aluno cadastrado.');
        confirmar = confirm('Deseja cancelar a remoção de aluno.');
        confirmar === true ? nomeParaRemover === 'Algum Aluno' : removerAluno();
        return;
    }

    const indice = alunos.findIndex(aluno => aluno.nome.toLowerCase() === nomeParaRemover.toLowerCase());

    nomeRemovido(indice); //Chama a função para remover o aluno.

    //Verifica se deseja remover mais um aluno.
    const alunoNovo = cadastroPermitido('Deseja remover mais um aluno?');
    if (alunoNovo === true) { //Se o usuário quiser remover mais um aluno, chama a função novamente.
        removerAluno();
    }
}

const nomeRemovido = (indice) => { //Função para remover o aluno do array.
    if (indice !== -1) { //Verifica se o aluno foi encontrado.
        const alunoRemovido = alunos.splice(indice, 1);
        salvarAlunosNoStorage();
        alert(`Aluno(a) ${formatarNome(alunoRemovido[0].nome)} foi removido(a) com sucesso`);
    } else { //Se o aluno não for encontrado, exibe uma mensagem de erro.
        alert('Aluno não encontrado');
        return removerAluno();
    }

    adicionarAlunosNaLista(alunos); //Adiciona o aluno à lista exibida na tela.
    verificarArrayVazio(alunos); //Verifica se o array de alunos está vazio.
    logs(); //Exibe os logs no console.
}


// ==============================
// Exibição de Alunos
// ==============================

const exibirAlunos = (aluno, media) => { //Exibe os dados do aluno em um alerta.
    const [artigo, artigo2, artigo3] = obterArtigoPorGenero(aluno.sexo);
    const aprovado = statusAluno(media, aluno.sexo); //Obtém o status do aluno (aprovado ou reprovado).
    alert(`${artigo2} ${aluno.nome} foi ${aprovado} com uma média de: ${media.toFixed(2)} pontos.`);
}

const adicionarAlunosNaLista = (alunos) => { //Adiciona os alunos à lista exibida na tela.
    const ul = document.getElementById("lista-alunos");
    ul.innerHTML = "";

    alunos.forEach((aluno) => { //Percorre todos os alunos cadastrados.
        const li = document.createElement("li"); //Cria um novo elemento de lista.
        const notas = Object.values(aluno.notas); //Obtém as notas do aluno.
        const valorNotas = notas; //Converte as notas em um array de valores.

        const [artigo, artigo2, artigo3] = obterArtigoPorGenero(aluno.sexo);
        let status; //Variável para armazenar o status do aluno (aprovado ou reprovado).

        const media = calcularMedia(valorNotas); //Calcula a média das notas do aluno.

        if (media >= 6) { //Verifica se a média é maior ou igual a 6.
            status = statusAluno(media, aluno.sexo);
        } else {
            status = statusAluno(media, aluno.sexo);
        }

        li.textContent = `${artigo2} ${aluno.nome} - Matemática: ${aluno.notas.matematica} - 
        Português: ${aluno.notas.portugues} - História: ${aluno.notas.historia}; Média: ${media.toFixed(2)} ==> 
            ${formatarNome(status)} [${aluno.dataCadastro}]`; //Formata o texto a ser exibido na lista.
        ul.appendChild(li); //Adiciona o elemento de lista à lista exibida na tela.
    });
}


// ==============================
// Logs e Resumo Final
// ==============================

const logAluno = (aprovados, reprovados, melhorAluno, maiorMedia) => { //Função para exibir os logs no console.
    return [
        `A quantidade de alunos aprovados foi de: ${aprovados}`,
        `A quantidade de alunos reprovados foi de: ${reprovados}`,
        `O aluno(a) com a maior nota é: ${melhorAluno} com uma média de ${maiorMedia.toFixed(2)}.`
    ];
}


// ==============================
// Inicialização
// ==============================

logs(); //Exibe os logs no console.
window.onload = () => { //Função chamada quando a página é carregada.
    adicionarAlunosNaLista(alunos); //Adiciona os alunos à lista exibida na tela.
    verificarArrayVazio(alunos); //Verifica se o array de alunos está vazio.
} 