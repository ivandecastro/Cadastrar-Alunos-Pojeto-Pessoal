//Criando o array dos alunos com localStorage para armazela-los.
const alunos = JSON.parse(localStorage.getItem('alunos')) || []; //Array dos alunos.

const logs = () => { //Função para mostrar o array de alunos e o tamanho do array.
    console.log(alunos);
    console.log(alunos.length);
}

const formatarNome = (nome) => { //Função para formatar o nome do aluno.
    return nome.toLowerCase()[0].toUpperCase() + nome.slice(1);
}

const cadastroPermitido = (mensagem) => { //Função para perguntar se o usuário deseja fazer o cadastro de um aluno.
    let confirmação = confirm(mensagem);
    return confirmação;
}

//Essa função é responsável por criar o aluno e adicionar as informações dele ao array de alunos.
const criarAluno = (name, gender, math, portuguese, history) => {
    //Adicionando as informações dos alunos à lista.
    const aluno = {
        nome: formatarNome(name), //Guarda o nome do aluno.
        sexo: gender, //Guarda o sexo do aluno.
        notas: { //Guarda as notas.
            matematica: Number(math), //Nota Matemática.
            portugues: Number(portuguese), //Nota Português.
            historia: Number(history) //Nota História.
        }
    };
    alunos.push(aluno);
    return aluno;
}

const cadastro = (confirmacao) => { //Essa função é responsável por fazer o cadastro dos alunos.
    //Criando variáveis para a confirmação das informações.
    let confirmarPeloNome;

    //Enquanto o cadrastro não for cancelado os cadastros continuarão.
    while (confirmacao === true) {

        //Informações dos alunos: nome, sexo e notas.
        const alunoACadastrar = prompt('Qual o nome do aluno(a)?');

        //Confirmar o nome do Aluno.
        if (alunoACadastrar === '') {
            alert('Por favor, digite o nome de um aluno.');
            return cadastro(true);
        } else if (alunoACadastrar === null) { //Verificar se a pessoa não clicou no botão por acidente.

            confirmarPeloNome = confirm('Deseja cancelar o cadastro do aluno?')//Confirmando o cancelamento do cadastro.

            //If para saber se a pessoa deseja cancelar o cadastro.
            if (confirmarPeloNome === true) {
                break; //Caso queira cancelar, o código para.
            } else {
                return cadastro(true); //Caso não queira cancelar, o código continua.
            }
        }

        const sexoAluno = generoAluno(); //Chamando a função para perguntar o sexo do aluno.

        let nota1 = obterNotaValida('Matemática', sexoAluno); //Nota em matemática.
        let nota2 = obterNotaValida('Português', sexoAluno);   //Nota em português.
        let nota3 = obterNotaValida('História', sexoAluno); //Nota em história.
        //Fim da coleta de informações dos alunos.

        //Adicionando as informações dos alunos à lista.
        criarAluno(alunoACadastrar, sexoAluno, nota1, nota2, nota3);

        localStorage.setItem('alunos', JSON.stringify(alunos)); //Salvando as informações de cada aluno 
        //no localStorage.

        //Chamando a função novamente.
        const alunoNovo = cadastroPermitido('Deseja fazer o cadastro de mais um aluno?');

        if (alunoNovo === false) { //Caso não queira continuar o cadastro, o código para.
            break;
        } else {
            return cadastro(true); //Caso queira continuar o cadastro, o código continua.
        }
    }

    let aprovados = 0; //Variável dos alunos aprovados.
    let reprovados = 0; //Variável dos alunos reprovados.

    //Variável da maior média.
    let maiorMedia = 0;
    let melhorAluno = '';

    //For para calcular a média dos alunos.
    for (let i = 0; i < alunos.length; i++) {
        //Coletando as variáveis de cada aluno: nome do aluno e notas.
        let aluno = alunos[i];
        let notas = Object.values(aluno.notas);

        const media = calcularMedia(notas); //Chamando a função de calcular a média.

        //If para mostrar qual o aluno que teve a maior média.
        if (media > maiorMedia) {
            maiorMedia = media;
            melhorAluno = aluno.nome;
        }

        exibirAlunos(aluno, media); //Chamando a função para mostrar os alunos cadastrados.
        adicionarAlunosNaLista(alunos); //Adicionando os alunos cadastrados à lista.

        //Ternário para contar quantos alunos foram aprovados e quantos foram reprovados.
        media >= 6 ? aprovados++ : reprovados++;
    }

    //Chamando a função para mostrar os alunos cadastrados.
    const [apd, rpd, mL] = logAluno(aprovados, reprovados, melhorAluno, maiorMedia);

    if (aprovados != 0 || reprovados != 0) { //If para evitar que esses logs sejam chamados sem um cadastro.
        console.log(apd);
        console.log(rpd);
    }

    if (maiorMedia != 0 && melhorAluno != '') {  //If para evitar que esse alert seja chamado sem um cadastro.
        alert(`${mL}`);
    }
}

const logAluno = (aprovados, reprovados, melhorAluno, maiorMedia) => { //Função para mostrar os alunos cadastrados.
    return [
        `A quantidade de alunos aprovados foi de: ${aprovados}`,
        `A quantidade de alunos reprovados foi de: ${reprovados}`,
        `O aluno(a) com a maior nota é: ${melhorAluno} com uma média de ${maiorMedia.toFixed(2)}.`
    ];
}

const artigoAluno = (sexo) => { //Função para indicar qual o sexo do aluno.
    if (sexo === 'Masculino') {
        return ['do aluno', 'O aluno', 'o'];
    } else if (sexo === 'Feminino') {
        return ['da aluna', 'A aluna', 'a'];
    } else {
        return ['de alune', 'E alune', 'e'];
    }
}

const generoAluno = () => { //Função para perguntar o sexo do aluno.
    let alunoGenero = confirm('O sexo do aluno(a) é Masculino?');

    if (alunoGenero === true) {
        alunoGenero = 'Masculino';
    } else if (alunoGenero === false) {
        let confirmarFeminino = confirm('O sexo do aluno(a) é Feminino?');
        alunoGenero = confirmarFeminino === true ? 'Feminino' : 'Outros';
    }

    return alunoGenero;
}

const proibicoes = (verificarValor) => { //Function para proibir os possíveis resultados das perguntas.
    return (
        verificarValor === '' ||
        verificarValor === null ||
        isNaN(verificarValor) ||
        Number(verificarValor) > 10 ||
        Number(verificarValor) < 0
    );
};

const obterNotaValida = (materia, genero) => { //Função para verificar se a nota é válida.
    let nota; //Variável da nota.
    const [artigo] = artigoAluno(genero); //Pegando o artigo que será utilizado. 

    do { //Looping para confirmarção da nota.
        nota = prompt(`Digite a nota ${artigo} de 1 a 10 em: ${materia}.`); //Pergunta qual a nota do aluno.

        //Garante que nota seja string válida para avaliação.
        if (proibicoes(nota)) {
            alert('Por favor, digite uma nota válida.');
        }
    } while (proibicoes(nota));

    return Number(nota); //Retornar a nota como número.
}

const calcularMedia = (notas) => { //Função para calcular a média dos alunos.
    let soma = 0; //Variável para somar as notas dos alunos.
    //Somando as notas de cada aluno.
    for (let j = 0; j < notas.length; j++) {
        soma += notas[j];
    }
    const calculoMedia = soma / notas.length; //Calculando a média
    return calculoMedia; //Retornando a média.
}

const exibirAlunos = (aluno, media) => { //Função para mostrar os alunos cadastrados.
    //Variáveis para especificar a frase da pergunta.
    const [artigo, artigo2, artigo3] = artigoAluno(aluno.sexo);

    //Checando se o aluno foi aprovado ou reprovado.
    const aprovado = media >= 6 ? `aprovad${artigo3}` : `reprovad${artigo3}`;

    //Alert do resultado.
    alert(`${artigo2} ${aluno.nome} foi ${aprovado} com uma média de: ${media.toFixed(2)} pontos.`);
}

const adicionarAlunosNaLista = (alunos) => { //Lista de todos os alunos que foram cadastrados.
    //Pegando a tag "ul" do html.
    const ul = document.getElementById("lista-alunos");
    ul.innerHTML = ""; // limpa a lista antes de adicionar.

    alunos.forEach((aluno) => { //Separa os alunos individualmente com suas respectivas notas.
        const li = document.createElement("li"); //Cria o elemento que será adicionado.
        const notas = Object.values(aluno.notas);
        const valorNotas = notas; //Coletando as notas do aluno.

        const [artigo, artigo2, artigo3] = artigoAluno(aluno.sexo); //Chama os artigos que serão utilizados.

        let status; //Variável para mostrar o status dos alunos.

        //Calcula a média dos alunos.
        const media = calcularMedia(valorNotas); //Calcula a média dos alunos.

        //Mostra se foi aprovado ou reprovado.
        if (media >= 6) {
            status = `Aprovad${artigo3 /*Definindo o gênero*/}`
        } else {
            status = `Reprovad${artigo3 /*Definindo o gênero*/}`
        }

        //Atribuindo um valor á oque será adicionado à lista.
        li.textContent = `${artigo2} ${aluno.nome} - Matemática: ${aluno.notas.matematica} - 
        Português: ${aluno.notas.portugues} - História: ${aluno.notas.historia}; Média: ${media.toFixed(2)} ==> ${status}`;
        ul.appendChild(li); //Adicionando os alunos à lista "ul".
    });
};

const nomeRemovido = (indice) => { //Removendo o aluno escolhido.
    //If para indicar se o aluno existe no array "Alunos".
    if (indice !== -1) {
        const alunoRemovido = alunos.splice(indice, 1); //Remover o aluno.
        localStorage.setItem('alunos', JSON.stringify(alunos)); //Atualizar o localStorage dos alunos.
        alert(`Aluno(a) ${formatarNome(alunoRemovido[0].nome)} foi removido(a) com sucesso`); //Alert de confirmação.
    } else {
        alert('Aluno não encontrado'); //Alert de confirmação.
        return removerAluno(); //Retorna a pergunta.
    }

    adicionarAlunosNaLista(alunos); //Atualizando a lista "ul" do html com o aluno removido.
    logs(); //Mostra a lista de alunos após o cadastro.
}

const cadastrarAluno = () => { //Chamando a função do botão de Cadastro dos alunos do html.
    let confirmar = cadastroPermitido('Deseja fazer o cadastro de um aluno?');
    cadastro(confirmar); //Executando a função.
    logs(); //Mostra a lista de alunos após o cadastro.
}

const removerAluno = () => { //Pegando o botão de remover alunos do html.
    //Variável para perguntar o nome do aluno que será excluído.
    let nomeParaRemover = prompt("Digite o nome do aluno que deseja remover:");
    let confirmar;

    //If para verificar se o nome do aluno é igual - '' - . 
    if (nomeParaRemover === '') {
        alert('Aluno não encontrado');
        return removerAluno();
    }

    //If para impedir qualquer outro tipo de valor possível sem ser o nome.
    if (!nomeParaRemover) {
        alert('Por favor, Digite o nome de algum aluno cadastrado.');
        confirmar = confirm('Deseja cancelar a remoção de aluno.');
        confirmar === true ? nomeParaRemover === 'Algum Aluno' : removerAluno();
        return;
    }

    //Const dos Para definir qual aluno será removido analisando item por item do array 'Alunos'.
    const indice = alunos.findIndex(aluno => aluno.nome.toLowerCase() === nomeParaRemover.toLowerCase());

    nomeRemovido(indice); //Chamando a função para remover o aluno.
    const alunoNovo = cadastroPermitido('Deseja remover mais um aluno?'); //Pergunta se deseja remover mais um aluno.
    if (alunoNovo === true) { //Caso queira continuar o cadastro, o código continua.
        removerAluno(); //Chamando a função novamente.
    }
}

const editarAluno = () => { //Pegando o botão de editar alunos do html.
    //Variável para perguntar o nome do aluno que será editado.
    let nomeParaEditar = prompt("Digite o nome do aluno que deseja editar:");
    let confirmar;

    //If para verificar se o nome do aluno é igual - '' - . 
    if (nomeParaEditar === '') {
        alert('Aluno não encontrado');
        return editarAluno();
    }

    //If para impedir qualquer outro tipo de valor possível sem ser o nome.
    if (!nomeParaEditar) {
        alert('Por favor, Digite o nome de algum aluno cadastrado.');
        confirmar = confirm('Deseja cancelar a remoção de aluno.');
        confirmar === true ? nomeParaEditar === 'Algum Aluno' : editarAluno();
        return;
    }

    //Const dos Para definir qual aluno será editado analisando item por item do array 'Alunos'.
    const indice = alunos.findIndex(aluno => aluno.nome.toLowerCase() === nomeParaEditar.toLowerCase());
    let atualizarAluno = prompt('Digite o novo nome do aluno:'); //Pergunta o novo nome do aluno.
    let confirmarNome;

    //If para verificar se o nome do aluno é igual - '' - . 
    if (atualizarAluno === '') {
        alert('Aluno não encontrado');
        return editarAluno();
    }

    //If para impedir qualquer outro tipo de valor possível sem ser o nome.
    if (!atualizarAluno) {
        alert('Por favor, Digite o nome de algum aluno cadastrado.');
        confirmarNome = confirm('Deseja cancelar a edição de aluno.');
        confirmarNome === true ? atualizarAluno === 'Algum Aluno' : editarAluno();
        return;
    }

    //If para verificar se o aluno existe no array "Alunos".
    if (indice !== -1) {
        alunos[indice].nome = formatarNome(atualizarAluno); //Atualiza o nome do aluno.
        localStorage.setItem('alunos', JSON.stringify(alunos)); //Atualiza o localStorage dos alunos.
        alert(`O nome do aluno(a) foi atualizado com sucesso para: ${formatarNome(atualizarAluno)}`); //Alert de confirmação.
    } else {
        alert('Aluno não encontrado'); //Alert de confirmação.
        return editarAluno(); //Retorna a pergunta.
    }

    adicionarAlunosNaLista(alunos); //Atualizando a lista "ul" do html com o aluno editado.
    logs(); //Mostra a lista de alunos após o cadastro.
}

logs()//Mostrar o array de alunos. //Mostrar o tamanho do array de alunos.