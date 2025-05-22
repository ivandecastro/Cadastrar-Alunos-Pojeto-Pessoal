// ==============================
// Variáveis e LocalStorage
// ==============================

const alunos = JSON.parse(localStorage.getItem('alunos')) || []; //Array dos alunos.


// ==============================
// Funções Utilitárias
// ==============================

const dataAtual = () => {
    const agora = new Date();
    return agora.toLocaleDateString() + ' - ' + agora.toLocaleTimeString();
}


const logs = () => {
    console.log(alunos);
    console.log(alunos.length);
}

const formatarNome = (nome) => nome.toLowerCase()[0].toUpperCase() + nome.slice(1);

const nomeInvalido = (nome) => !nome || nome.trim() === '';

const statusAluno = (media, sexo) => media >= 6 ? `aprovad${obterArtigoPorGenero(sexo)[2]}`
    : `reprovad${obterArtigoPorGenero(sexo)[2]}`;

const cadastroPermitido = (mensagem) => {
    let confirmação = confirm(mensagem);
    return confirmação;
}

const calcularMedia = (notas) => {
    let soma = 0;
    for (let j = 0; j < notas.length; j++) {
        soma += notas[j];
    }
    const calculoMedia = soma / notas.length;
    return calculoMedia;
}

const obterArtigoPorGenero = (sexo) => {
    if (sexo === 'Masculino') {
        return ['do aluno', 'O aluno', 'o'];
    } else if (sexo === 'Feminino') {
        return ['da aluna', 'A aluna', 'a'];
    } else {
        return ['de alune', 'E alune', 'e'];
    }
}

const generoAluno = () => {
    let alunoGenero = confirm('O sexo do aluno(a) é Masculino?');

    if (alunoGenero === true) {
        alunoGenero = 'Masculino';
    } else if (alunoGenero === false) {
        let confirmarFeminino = confirm('O sexo do aluno(a) é Feminino?');
        alunoGenero = confirmarFeminino === true ? 'Feminino' : 'Outros';
    }

    return alunoGenero;
}

const proibicoes = (verificarValor) => {
    return (
        verificarValor === '' ||
        verificarValor === null ||
        isNaN(verificarValor) ||
        Number(verificarValor) > 10 ||
        Number(verificarValor) < 0
    );
};

const obterNotaValida = (materia, genero) => {
    let nota;
    const [artigo] = obterArtigoPorGenero(genero);

    do {
        nota = prompt(`Digite a nota ${artigo} de 1 a 10 em: ${materia}.`);

        if (proibicoes(nota)) {
            alert('Por favor, digite uma nota válida.');
        }
    } while (proibicoes(nota));

    return Number(nota);
}


// ==============================
// Cadastro e Edição de Alunos
// ==============================

const criarAluno = (name, gender, math, portuguese, history) => {
    const aluno = {
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
    return aluno;
}

const cadastro = (confirmacao) => {
    let confirmarPeloNome;

    while (confirmacao === true) {
        const alunoACadastrar = prompt('Qual o nome do aluno(a)?');

        if (nomeInvalido(alunoACadastrar)) {
            alert('Por favor, digite o nome de um aluno.');
            return cadastro(true);
        } else if (alunoACadastrar === null) {
            confirmarPeloNome = confirm('Deseja cancelar o cadastro do aluno?');
            if (confirmarPeloNome === true) {
                break;
            } else {
                return cadastro(true);
            }
        }

        const sexoAluno = generoAluno();
        let nota1 = obterNotaValida('Matemática', sexoAluno);
        let nota2 = obterNotaValida('Português', sexoAluno);
        let nota3 = obterNotaValida('História', sexoAluno);

        criarAluno(alunoACadastrar, sexoAluno, nota1, nota2, nota3);
        localStorage.setItem('alunos', JSON.stringify(alunos));

        const alunoNovo = cadastroPermitido('Deseja fazer o cadastro de mais um aluno?');
        if (alunoNovo === false) {
            break;
        } else {
            return cadastro(true);
        }
    }

    let aprovados = 0;
    let reprovados = 0;
    let maiorMedia = 0;
    let melhorAluno = '';

    for (let i = 0; i < alunos.length; i++) {
        let aluno = alunos[i];
        let notas = Object.values(aluno.notas);

        const media = calcularMedia(notas);

        if (media > maiorMedia) {
            maiorMedia = media;
            melhorAluno = aluno.nome;
        }

        exibirAlunos(aluno, media);
        adicionarAlunosNaLista(alunos);

        media >= 6 ? aprovados++ : reprovados++;
    }

    const [aprovado, reprovado, melhorEstudante] = logAluno(aprovados, reprovados, melhorAluno, maiorMedia);

    if (aprovados != 0 || reprovados != 0) {
        console.log(aprovado);
        console.log(reprovado);
    }

    if (maiorMedia != 0 && melhorAluno != '') {
        alert(`${melhorEstudante}`);
    }
}

const cadastrarAluno = () => {
    let confirmar = cadastroPermitido('Deseja fazer o cadastro de um aluno?');
    cadastro(confirmar);
    logs();
}

const editarAluno = () => {
    let nomeParaEditar = prompt("Digite o nome do aluno que deseja editar:");
    let confirmar;

    if (nomeParaEditar === null) {
        confirmar = confirm('Deseja cancelar a edição do aluno?');
        confirmar === true ? nomeParaEditar === 'Algum Aluno' : editarAluno();
        return;
    }

    if (nomeInvalido(nomeParaEditar)) {
        alert('Aluno não encontrado.');
        return editarAluno();
    }

    const indice = alunos.findIndex(aluno => aluno.nome.toLowerCase() === nomeParaEditar.toLowerCase());

    if (indice === -1) {
        alert('Aluno não encontrado.');
        return editarAluno();
    }

    const aluno = alunos[indice];
    let novoNome;

    do {
        novoNome = prompt(`Editar nome (${aluno.nome}):`, aluno.nome);

        if (nomeInvalido(novoNome)) {
            alert('Por favor, digite um nome.');
        }
    } while (nomeInvalido(novoNome));

    const novoSexo = generoAluno();
    const novaNotaMatematica = obterNotaValida('Matemática', novoSexo);
    const novaNotaPortugues = obterNotaValida('Português', novoSexo);
    const novaNotaHistoria = obterNotaValida('História', novoSexo);

    aluno.nome = formatarNome(novoNome);
    aluno.sexo = novoSexo;
    aluno.notas = {
        matematica: novaNotaMatematica,
        portugues: novaNotaPortugues,
        historia: novaNotaHistoria
    };
    aluno.dataCadastro = dataAtual();

    const [artigo] = obterArtigoPorGenero(aluno.sexo);

    alunos[indice] = aluno;
    localStorage.setItem('alunos', JSON.stringify(alunos));
    alert(`Informações ${artigo} ${aluno.nome} foram atualizadas com sucesso!`);

    adicionarAlunosNaLista(alunos);
    logs();
}


// ==============================
// Remoção de Alunos
// ==============================

const removerAluno = () => {
    let nomeParaRemover = prompt("Digite o nome do aluno que deseja remover:");
    let confirmar;

    if (nomeParaRemover === '') {
        alert('Aluno não encontrado');
        return removerAluno();
    }

    if (!nomeParaRemover) {
        alert('Por favor, Digite o nome de algum aluno cadastrado.');
        confirmar = confirm('Deseja cancelar a remoção de aluno.');
        confirmar === true ? nomeParaRemover === 'Algum Aluno' : removerAluno();
        return;
    }

    const indice = alunos.findIndex(aluno => aluno.nome.toLowerCase() === nomeParaRemover.toLowerCase());

    nomeRemovido(indice);

    const alunoNovo = cadastroPermitido('Deseja remover mais um aluno?');
    if (alunoNovo === true) {
        removerAluno();
    }
}

const nomeRemovido = (indice) => {
    if (indice !== -1) {
        const alunoRemovido = alunos.splice(indice, 1);
        localStorage.setItem('alunos', JSON.stringify(alunos));
        alert(`Aluno(a) ${formatarNome(alunoRemovido[0].nome)} foi removido(a) com sucesso`);
    } else {
        alert('Aluno não encontrado');
        return removerAluno();
    }

    adicionarAlunosNaLista(alunos);
    logs();
}


// ==============================
// Exibição de Alunos
// ==============================

const exibirAlunos = (aluno, media) => {
    const [artigo, artigo2, artigo3] = obterArtigoPorGenero(aluno.sexo);
    const aprovado = statusAluno(media, aluno.sexo);
    alert(`${artigo2} ${aluno.nome} foi ${aprovado} com uma média de: ${media.toFixed(2)} pontos.`);
}

const adicionarAlunosNaLista = (alunos) => {
    const ul = document.getElementById("lista-alunos");
    ul.innerHTML = "";

    alunos.forEach((aluno) => {
        const li = document.createElement("li");
        const notas = Object.values(aluno.notas);
        const valorNotas = notas;

        const [artigo, artigo2, artigo3] = obterArtigoPorGenero(aluno.sexo);
        let status;

        const media = calcularMedia(valorNotas);

        if (media >= 6) {
            status = statusAluno(media, aluno.sexo);
        } else {
            status = statusAluno(media, aluno.sexo);
        }

        li.textContent = `${artigo2} ${aluno.nome} - Matemática: ${aluno.notas.matematica} - 
        Português: ${aluno.notas.portugues} - História: ${aluno.notas.historia}; Média: ${media.toFixed(2)} ==> 
            ${formatarNome(status)} [${aluno.dataCadastro}]`;
        ul.appendChild(li);
    });
}


// ==============================
// Logs e Resumo Final
// ==============================

const logAluno = (aprovados, reprovados, melhorAluno, maiorMedia) => {
    return [
        `A quantidade de alunos aprovados foi de: ${aprovados}`,
        `A quantidade de alunos reprovados foi de: ${reprovados}`,
        `O aluno(a) com a maior nota é: ${melhorAluno} com uma média de ${maiorMedia.toFixed(2)}.`
    ];
}


// ==============================
// Inicialização
// ==============================

logs();