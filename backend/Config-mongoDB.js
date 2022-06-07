const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://<user>:<pass>@cluster0.djyeru1.mongodb.net/?retryWrites=true&w=majority"; //alterar <user> pro seu usuario e <pass> pra sua senha.

async function main() {
    const client = new MongoClient(uri);

    try {
        await client.connect();

        //await deleteListingBeforeDate(client, new Date("2019-02-15"));

        //await deleteListingByName(client, "Teste5");

        //await updateAllListingsProp(client);

        //await upsetListingByName(client, "Atualizado", {nome: "Teste5", id: 6, idade: 23});

        //await updateListingByName(client, "teste2", {nome: "Atualizado"});

        //await findListingsPass(client, "321", 1);

        // await findListings(client, {
        //     numeroMinimoDeIdade: 20,
        //     numeroMinimoDeID: 1,
        //     numeroMaximoDeResultado: 10
        // });

        //await findOneListingByName(client, "Everton");

        // await createListing(client, {
        //     id: "2",
        //     nome: "Teste",
        //     idade: "20",
        //     genero: "F",
        //     senha: "123"
        // })

        // await createMultipleListings(client, [
        //     {
        //         id: "3",
        //         nome: "teste2",
        //         idade: "30",
        //         genero: "M",
        //         senha: "456"
        //     },
        //     {
        //         id: "4",
        //         nome: "teste3",
        //         idade: "35",
        //         genero: "F",
        //         senha: "789"
        //     }
        // ]);

        //await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

//EXEMPLOS CRUD

//DELETES ==================================================

//DELETAR VARIAS LINHAS ANTES DE UMA DATA
async function deleteListingBeforeDate(client, date) {
    const result = await client.db("appweb").collection("users").deleteMany({ data: { $lt: date } });

    console.log(`${result.deletedCount} linhas foram deletadas`);
}

//DELETAR 1 LINHA POR NOME
async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("appweb").collection("users").deleteOne({nome: nameOfListing});

    console.log(`${result.deletedCount} linhas foram deletadas`);
}

//UPDATES ==================================================

//CRIA UM PARAMETRO CASO NÃO EXISTA (NA TABELA TODA)
async function updateAllListingsProp(client) {
    const result = await client.db("appweb").collection("users").updateMany({ endereco: {$exists: false} }, { $set: {endereco: "Indefinido"} })

    console.log(`${result.matchedCount} linhas foram alteradas.`);
    console.log(`${result.modifiedCount} linhas foram criadas.`);
}

//ATUALIZA PARAMETROS POR UM NOME MAS SE NÃO ENCONTRAR CRIA UM NOVO COM OS PARAMETROS PASSADOS
async function upsetListingByName(client, nameOfListing, updateListing) {
    const result = await client.db("appweb").collection("users").updateOne({ nome: nameOfListing }, { $set: updateListing }, { upsert: true });

    console.log(`${result.matchedCount} ...`);
    
    if(result.upsertedCount > 0) {
        console.log(`Um documento com o id ${result.upsertedId} foi alterado`);
    } else {
        console.log(`${result.modifiedCount} documentos foram alterados`);
    }
}

//ATUALIZA PARAMETROS POR NOME
async function updateListingByName(client, nameOfListing, updateListing) {
    const result = await client.db("appweb").collection("users").updateOne({ nome: nameOfListing }, { $set: updateListing });

    console.log(`${result.matchedCount} ...`);
    console.log(`${result.modifiedCount} coisas foram atualizadas.`);
}

//SELECTS ==================================================

//CONSULTA DE SENHA E ID AO BD
async function findListingsPass(client, senhaProp, idProp) {
    const result = await client.db("appweb").collection("users").findOne({senha: senhaProp, id: idProp});

    if(result) {
        console.log(`A consulta de ${result.nome} foi um sucesso!`);
        console.log(result);
    } else {
        console.log(`ID ou senha invalida.`);
    }
}

//VARIAS CONSULTAS AO BD COM CONDIÇÕES
async function findListings(client, {
    numeroMinimoDeIdade = 0,
    numeroMinimoDeID = 0,
    numeroMaximoDeResultado = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("appweb").collection("users").find({
        idade: { $gte: numeroMinimoDeIdade },
        id: { $gte: numeroMinimoDeID }
    }).sort({ id: 1 }).limit(numeroMaximoDeResultado); //.sort({ id: -1 }) para exibir do maior para o maior.

    const result = await cursor.toArray();

    if(result.length > 0) {
        console.log(`A consulta é > 0, com idade acima de ${numeroMinimoDeIdade} e id > ${numeroMinimoDeID}`);
        result.forEach((result, i) => {
            date = new Date(result.data).toDateString();
            console.log();            
            console.log(`${i + 1}. _id: ${result._id}`);
            console.log(`id: ${result.id}`);
            console.log(`nome: ${result.nome}`);
            console.log(`idade: ${result.idade}`);
            console.log(`genero: ${result.genero}`);
            console.log(`senha: ${result.senha}`);
        })
    } else {
        console.log(`Não foi encontrado nada com idade acima de ${numeroMinimoDeIdade} e id > ${numeroMinimoDeID}`);
    }
}

//CONSULTA DE UM NOME AO BD
async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("appweb").collection("users").findOne({nome: nameOfListing});

    if(result) {
        console.log(`A consulta de ${nameOfListing} foi um sucesso!`);
        console.log(result);
    } else {
        console.log(`Não existe nada com o nome ${nameOfListing} no BD`);
    }
}

//LISTAR TODOS OS BANCOS DE DADOS
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}

//CREATES ==================================================

//ADICIONAR 1 NOVA LINHA NA TABELA
async function createListing(client, newListing) {
    const result = await client.db("appweb").collection("users").insertOne(newListing);
    console.log(`Um novo usuário foi criado com o id: ${result.insertedId}`);
}

//ADICIONAR MULTIPLAS LINHAS NA TABELA
async function createMultipleListings(client, newListings) {
    const result = await client.db("appweb").collection("users").insertMany(newListings);
    console.log(`${result.insertedCount} novo usuario adicionado com id: ${result.insertedIds}`);
}