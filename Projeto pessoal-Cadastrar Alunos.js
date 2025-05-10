//Criando o array dos alunos com localStorage para armazela-los.
const alunos = JSON.parse(localStorage.getItem('alunos')) || [];

//Chamando a função do botão.
const cadastrarAluno = () => {

    //Chamando o array dos alunos que serão cadastrados.
    alunos;
    //criando variáveis para a confirmação das informações.
    let confirmarPeloNome;
    let confirmação;

    // Pergunta para permissão de um novo cadastro.
    const cadastroPermitido = (cadastro) => {
        confirmação = confirm(cadastro);
    }

    // Perguntando
    cadastroPermitido('Deseja fazer o cadastro de um aluno?');

    //Enquanto o cadrastro não for cancelado os cadastros continuarão.
    const cadastro = () => {
        while (confirmação === true) {

            //Informações dos alunos: nome, sexo e notas.
            const alunoACadastrar = prompt('Qual o nome do aluno(a)?');

            //Confirmar o nome do Aluno.
            if (alunoACadastrar === '') {
                alert('Por favor, digite o nome de um aluno.');
                return cadastro();
            } else if (alunoACadastrar === null) { // verificar se a pessoa não clicou no botão por acidente
                confirmarPeloNome = confirm('Deseja cancelar o cadastro do aluno?') //confirmando o cancelamento do cadastro

                if (confirmarPeloNome === true) {
                    break;
                } else {
                    return cadastro();
                }
            }

            //perguntando o sexo do aluno.
            let sexoAluno = confirm('O sexo do aluno(a) é Masculino?');
            let artigo;

            //If para confirmar o sexo do aluno.
            if (sexoAluno === true) {
                sexoAluno = 'Masculino';
            } else if (sexoAluno === false) {
                sexoAluno = confirm('O sexo do aluno(a) é Feminino?');
                sexoAluno = sexoAluno === true ? 'Feminino' : 'Outros';
            }

            //If para confirmar o artigo correto do aluno.
            if (sexoAluno === 'Masculino') {
                artigo = 'do aluno';
            } else if (sexoAluno === 'Feminino') {
                artigo = 'da aluna';
            } else {
                artigo = 'do alune';
            }

            // Confirmar se a nota é === '' or === null or < 0.
            const obterNotaValida = (materia) => {
                let nota;

                do {
                    nota = prompt(`Digite a nota ${artigo} de 1 a 10 em: ${materia}.`);
                    const proibicoes = (nota === null || nota === '' || nota < 0 || nota > 10 || isNaN(nota));

                    // Garante que nota seja string válida para avaliação
                    if (proibicoes) {
                        alert('Por favor, digite uma nota válida.');
                    } else {
                        nota.trim();
                    }


                } while (
                    nota === null || // impede o cancelamento
                    nota === "" || // impede string vazia
                    isNaN(nota) || // impede letras ou símbolos
                    Number(nota) < 0 ||// impede nota negativa
                    Number(nota) > 10
                )

                return Number(nota);
            }

            let notaMatemática = obterNotaValida('Matemática');
            let notaPortugues = obterNotaValida('Português');
            let notaHistoria = obterNotaValida('História');
            //Fim da coleta de informações dos alunos.

            //Adicionando as informações dos alunos à lista.
            alunos.push({
                nome: alunoACadastrar,
                sexo: sexoAluno,
                notas: {
                    matematica: Number(notaMatemática),
                    portugues: Number(notaPortugues),
                    historia: Number(notaHistoria)
                }
            });

            localStorage.setItem('alunos', JSON.stringify(alunos));

            cadastroPermitido('deseja fazer o cadastro de mais um aluno?');
        }

        let aprovados = 0;
        let reprovados = 0;

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

            if (media > maiorMedia) {
                maiorMedia = media;
                melhorAluno = aluno.nome;
            }

            let artigo;
            let segundoArtigo;

            //If para mostrar o artigo adequado para cada aluno.
            if (aluno.sexo === 'Masculino') {
                artigo = 'O aluno';
                segundoArtigo = 'o';
            } else if (aluno.sexo === 'Feminino') {
                artigo = 'A aluna';
                segundoArtigo = 'a';
            } else {
                artigo = 'E alune';
                segundoArtigo = 'e';
            }

            //Checando se o aluno foi aprovado ou reprovado.
            const aprovado = media >= 6 ? `aprovad${segundoArtigo}` : `reprovad${segundoArtigo}`;

            //Alert do resultado.
            alert(`${artigo} ${aluno.nome} foi ${aprovado} com uma média de: ${media.toFixed(2)} pontos.`);

            //ternário para contar quais foram aprovados e quais foram reprovados.
            media >= 6 ? aprovados++ : reprovados++;
            //Mostrar quantos alunos foram aprovados e quantos foram reprovados.
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

    cadastro();
    console.log(alunos);
}

console.log(alunos);