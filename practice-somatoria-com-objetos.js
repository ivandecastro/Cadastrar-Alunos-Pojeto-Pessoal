// const alunos = [
//     {
//         nome: 'Eduardo',
//         notas: [1, 4, 5, 7]
//     },
//     {
//         nome: 'Ivan',
//         notas: [5, 6, 7, 9]
//     }
// ];

// //Aluno Ivan.
// const ivan = alunos[1].nome;
// const notaIvan = alunos[1].notas;
// let somaIvan = 0;

// //Calculando a soma das notas do aluno Ivan.
// for(let i = 0; i < notaIvan.length; i++) {
//     somaIvan += notaIvan[i];
// }

// //Fazendo a média das notas do aluno Ivan.
// const mediaIvan = somaIvan / notaIvan.length;

// //calcular se a média foi >= 6.
// //E mostrar se ele foi aprovado ou não.
// if (mediaIvan >= 6) {
//     console.log(`O aluno ${ivan}, está aprovado com uma média de: ${mediaIvan}`);
// } else {
//     console.log(`O aluno ${ivan}, está reprovado com uma média de: ${mediaIvan}`);
// }

// //Aluno Eduardo.
// const eduardo = alunos[0].nome;
// const notaEduardo = alunos[0].notas;
// let somaEduardo = 0;

// //Calculando a soma das notas do aluno Eduardo.
// for(let i = 0; i < notaEduardo.length; i++) {
//     somaEduardo += notaEduardo[i];
// }

// //Fazendo a média das notas do aluno Eduardo.
// const mediaEduardo = somaEduardo / notaEduardo.length;

// //calcular se a média foi >= 6.
// //E mostrar se ele foi aprovado ou não.
// if (mediaEduardo >= 6) {
//     console.log(`O aluno ${eduardo}, está aprovado com uma média de: ${mediaEduardo}`);
// } else {
//     console.log(`O aluno ${eduardo}, está reprovado com uma média de: ${mediaEduardo}`);
// }

// console.log("------------------------------------------------------------------");

// const alunos = [
//     {
//         nome: 'Eduardo',
//         notas: [1, 4, 5, 7]
//     },
//     {
//         nome: 'Ivan',
//         notas: [5, 6, 7, 9]
//     }
// ];

// for (let i = 0; i < alunos.length; i++) {
//     const aluno = alunos[i];
//     console.log(aluno.nome);
//     const notas = aluno.notas;
//     let soma = 0;

//     for (let j = 0; j < notas.length; j++) {
//         soma += notas[j];
//     }

//     const media = soma / notas.length;

//     if (media >= 6) {
//         console.log(`O aluno ${aluno.nome} está aprovado com média ${media}`);
//     } else {
//         console.log(`O aluno ${aluno.nome} está reprovado com média ${media}`);
//     }
// }

// console.log("------------------------------------------------------------------");

// const alunos = [
//     {
//         nome: 'Eduardo',
//         sexo: 'Masculino', 
//         notas: {
//             matematica: 1,
//             historia: 4,
//             portugues: 5
//         }
//     },
//     {
//         nome: 'Ivan',
//         sexo: 'Masculino',
//         notas: {
//             matematica: 9,
//             historia: 5,
//             portugues: 6
//         }
//     },
//     {
//         nome: 'Mariana',
//         sexo: 'Feminino',
//         notas: {
//             matematica: 9,
//             historia: 8,
//             portugues: 10
//         }
//     },
//     {
//         nome: `O'hara`,
//         sexo: 'Feminino', 
//         notas: {
//             matematica: 10,
//             historia: 10,
//             portugues: 10
//         }
//     }
// ];

// for(let i = 0; i < alunos.length; i++) {
//     const aluno = alunos[i];
//     const notas = Object.values(aluno.notas);
//     let soma = 0;

//     for(let j = 0; j < notas.length; j++) {
//         soma += notas[j];
//     }

//     const media = soma / notas.length;

//     const artigo = aluno.sexo === 'Feminino' ? 'A aluna' : 'O aluno';
//     const aprovado = media >= 6 ? 'aprovado(a)' : 'reprovado(a)';

//     console.log(`${artigo} ${aluno.nome} foi ${aprovado} com uma média de: ${media.toFixed(2)}`);
// }

// console.log("------------------------------------------------------------------");

// const alunos = [];

// function cadastroPermitido () {
//     confirmação = confirm();
// }

// cadastroPermitido();

// while (confirmação === true) {
//     const alunoACadastrar = prompt('Qual o nome do aluno?');
//     const sexoAluno = prompt('Qual o sexo do aluno?');
//     const notaMatemática = prompt('Qual a nota do aluno(a) em matemática?');
//     const notaPortugues = prompt('Qual a nota do aluno(a) em português?');
//     const notaHistoria = prompt('Qual a nota do aluno(a) em história?');

//     localStorage(alunos.push({
//         nome: alunoACadastrar,
//         sexo: sexoAluno,
//         notas: {
//             matematica: parseInt(notaMatemática),
//             portugues: parseInt(notaPortugues),
//             historia: parseInt(notaHistoria)
//         }
//     }));

//     cadastroPermitido();
// }


// for(let i = 0; i < alunos.length; i++) {
//         const aluno = alunos[i];
//         const notas = Object.values(aluno.notas);
//         let soma = 0;
//         let aprovados;

//         for(let j = 0; j < notas.length; j++) {
//             soma += notas[j];
//         }

//         const media = soma / notas.length;

//         const artigo = aluno.sexo === 'Feminino' ? 'A aluna' : 'O aluno';
//         const aprovado = media >= 6 ? 'aprovado(a)' : 'reprovado(a)';

//         const exibeAluno = `${artigo} ${aluno.nome} foi ${aprovado} com uma média de: ${media.toFixed(2)}`;
//         alert(exibeAluno);


//     }

//lista dos alunos.

// console.log("------------------------------------------------------------------");

//chamando o botão "Cadastrar aluno".
const cadastrarAluno = () => {
    
    //Criando o array dos alunos que serão cadastrados.
    const alunos = [];
    
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

            cadastroPermitido('deseja fazer o cadastro de mais um aluno?');
        }

        let aprovados = 0;
        let reprovados = 0;
        let maiorMedia;
        let melhorAluno;
        
        // let melhorMedia = alunos.Object.values(alunos.notas);

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
                artigo = 'O alune';
                segundoArtigo = 'e';
            }

            //Checando se o aluno foi aprovado ou reprovado.
            const aprovado = media >= 6 ? `aprovad${segundoArtigo}` : `reprovad${segundoArtigo}`;

            //Alert do resultado.
            alert(`${artigo} ${aluno.nome} foi ${aprovado} com uma média de: ${media.toFixed(1)} pontos.`);
            soma >= 18 ? aprovados++ : reprovados++;
        }

        console.log(`A quantidade de alunos aprovados foi de: ${aprovados}`);
        console.log(`A quantidade de alunos reprovados foi de: ${reprovados}`);
    }
    cadastro();
}