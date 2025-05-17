//Criando o array dos alunos com localStorage para armazela-los.
const alunos = JSON.parse(localStorage.getItem('alunos')) || [];

//Pergunta para permissão de um novo cadastro.
const cadastroPermitido = (mensagem) => {
    let confirmação = confirm(mensagem);
    return confirmação;
}

const criarAluno = (name, gender, math, portuguese, history) => {
    //Adicionando as informações dos alunos à lista.
    const aluno = {
        nome: name, //Guarda o nome do aluno.
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

const cadastro = (confirmacao) => {
    //criando variáveis para a confirmação das informações.
    let confirmarPeloNome;

    //Enquanto o cadrastro não for cancelado os cadastros continuarão.
    while (confirmacao === true) {

        //Informações dos alunos: nome, sexo e notas.
        const alunoACadastrar = prompt('Qual o nome do aluno(a)?');

        //Confirmar o nome do Aluno.
        if (alunoACadastrar === '') {
            alert('Por favor, digite o nome de um aluno.');
            return cadastro(true);
        } else if (alunoACadastrar === null) { // verificar se a pessoa não clicou no botão por acidente

            confirmarPeloNome = confirm('Deseja cancelar o cadastro do aluno?') //confirmando o cancelamento do cadastro

            //if para saber se a pessoa deseja cancelar o cadastro.
            if (confirmarPeloNome === true) {
                break;
            } else {
                return cadastro();
            }
        }

        const sexoAluno = generoAluno();

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
        }
    }

    let aprovados = 0; //Variável dos alunos aprovados.
    let reprovados = 0; //Variável dos alunos reprovados.

    // Variável da maior média.
    let maiorMedia = 0;
    let melhorAluno = '';

    //For para calcular a média dos alunos.
    for (let i = 0; i < alunos.length; i++) {
        //coletando as variáveis de cada aluno: nome do aluno e notas.
        let aluno = alunos[i];
        let notas = Object.values(aluno.notas);
        let soma = 0;

        //Somando as notas de cada aluno.
        for (let j = 0; j < notas.length; j++) {
            soma += notas[j];
        }

        //calculando a média
        const media = soma / notas.length;

        //If para mostrar qual o aluno que teve a maior média.
        if (media > maiorMedia) {
            maiorMedia = media;
            melhorAluno = aluno.nome;
        }

        //Variáveis para especificar a frase da pergunta.
        const [artigo, artigo2, artigo3] = artigoAluno(aluno.sexo);

        //Checando se o aluno foi aprovado ou reprovado.
        const aprovado = media >= 6 ? `aprovad${artigo3}` : `reprovad${artigo3}`;

        //Alert do resultado.
        alert(`${artigo2} ${aluno.nome} foi ${aprovado} com uma média de: ${media.toFixed(2)} pontos.`);

        //ternário para contar quantos alunos foram aprovados e quantos foram reprovados.
        media >= 6 ? aprovados++ : reprovados++;

        adicionarAlunosNaLista(alunos); //Adicionando os alunos cadastrados à lista.
    }

    //If para evitar que esses logs sejam chamados sem um cadastro.
    if (aprovados != 0 && reprovados != 0) {
        console.log(`A quantidade de alunos aprovados foi de: ${aprovados}`);
        console.log(`A quantidade de alunos reprovados foi de: ${reprovados}`);
    }

    //If para evitar que esse alert seja chamado sem um cadastro.
    if (maiorMedia != 0 && melhorAluno != '') {
        alert(`O aluno(a) com a maior nota é: ${melhorAluno} com uma média de ${maiorMedia.toFixed(2)} pontos.`);
    }
}

//Função para indicar qual o sexo do aluno.
const artigoAluno = (sexo) => {
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

//Function para proibir os possíveis resultados das perguntas.
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
    let nota; //variável da nota.
    const [artigo] = artigoAluno(genero); //Pegando o artigo que será utilizado. 

    do { //looping para confirmarção da nota.
        nota = prompt(`Digite a nota ${artigo} de 1 a 10 em: ${materia}.`); //Pergunta qual a nota do aluno.

        // Garante que nota seja string válida para avaliação.
        if (proibicoes(nota)) {
            alert('Por favor, digite uma nota válida.');
        }
    } while (proibicoes(nota));

    return Number(nota); //retornar a nota como número.
}

//Lista de todos os alunos que foram cadastrados.
const adicionarAlunosNaLista = (alunos) => {
    //Pegando a tag "ul" do html
    const ul = document.getElementById("lista-alunos");
    ul.innerHTML = ""; // limpa a lista antes de adicionar

    alunos.forEach((aluno) => { //Separa os alunos individualmente com suas respectivas notas.
        const li = document.createElement("li"); //cria o elemento que será adicionado.
        const notas = Object.values(aluno.notas).join(" - ");

        const [artigo, artigo2, artigo3] = artigoAluno(aluno.sexo); //Chama os artigos que serão utilizados.

        let status; //Variável para mostrar o status dos alunos.

        //Calcula a média dos alunos.
        const media = (
            (aluno.notas.matematica + aluno.notas.portugues + aluno.notas.historia) / Object.values(aluno.notas).length
        ).toFixed(2);

        //Mostra se foi aprovado ou reprovado
        if (media >= 6) {
            status = `Aprovad${artigo3 /*Definindo o gênero*/}`
        } else {
            status = `Reprovad${artigo3 /*Definindo o gênero*/}`
        }

        //Atribuindo um valor á oque será adicionado à lista.
        li.textContent = `${artigo2} ${aluno.nome} - Matemática: ${aluno.notas.matematica} - 
        Português: ${aluno.notas.portugues} - História: ${aluno.notas.historia}; Média: ${media} ==> ${status}`;
        ul.appendChild(li); //Adicionando os alunos à lista "ul".
    });
};

//Chamando a função do botão de Cadastro dos alunos do html.
const cadastrarAluno = () => {
    let confirmar = cadastroPermitido('Deseja fazer o cadastro de um aluno?');
    cadastro(confirmar); //Executando a função.
    console.log(alunos); //Mostra a lista de alunos após o cadastro.
}

//Pegando o botão de remover alunos do html.
const removerAluno = () => {
    //Variável para perguntar o nome do aluno que será excluído.
    let nomeParaRemover = prompt("Digite o nome do aluno que deseja remover:");
    let confirmar;

    //if para verificar se o nome do aluno é igual - '' -. 
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

    //const dos Para definir qual aluno será removido analisando item por item do array 'Alunos'.
    const indice = alunos.findIndex(aluno => aluno.nome.toLowerCase() === nomeParaRemover.toLowerCase());

    //If para indicar se o aluno existe no array "Alunos".
    if (indice !== -1) {
        const alunoRemovido = alunos.splice(indice, 1); //Remover o aluno.
        localStorage.setItem('alunos', JSON.stringify(alunos)); //Atualizar o localStorage dos alunos.
        alert(`Aluno(a) ${alunoRemovido[0].nome} removido(a) com sucesso`); //Alert de confirmação.
    } else {
        alert('Aluno não encontrado'); //Alert de confirmação.
        return removerAluno(); //Retorna a pergunta.
    }


    (adicionarAlunosNaLista(alunos), console.log(alunos)); //Atualizando a lista "ul" do html com o aluno removido.
}

console.log(alunos); //Mostrar o array de alunos.
console.log(alunos.length); //Mostrar o tamanho do array de alunos. 