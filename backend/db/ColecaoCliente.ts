import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import Cliente from "../../src/core/Cliente";
import ClienteRepositorio from "../../src/core/ClienteRepositorio";
import db from "../config";

const ColecaoClienteRef = collection(db, "cliente")

class ColecaoCliente {
    addCliente = (novoCliente: Cliente) => {
        const cliente = {
            nome: novoCliente.nome,
            idade: novoCliente.idade,
        }
        return addDoc(ColecaoClienteRef, cliente);
    }

    salvar = (updateCliente: Cliente) => {
        const cliente = {
            nome: updateCliente.nome,
            idade: updateCliente.idade,
        }
        const clienteDoc = doc(db, "cliente", updateCliente.id);
        return updateDoc(clienteDoc, cliente);
    }

    excluir = (id) => {
        const clienteDoc = doc(db, "cliente", id);
        return deleteDoc(clienteDoc);
    }

    obterTodos = () => {
        return getDocs(ColecaoClienteRef);
    }

    getCliente = (id) => {
        const clienteDoc = doc(db, "cliente", id);
        return getDoc(clienteDoc);
    }
}

export default new ColecaoCliente();









// export default class ColecaoCliente implements ClienteRepositorio {

//     async salvar(cliente: Cliente): Promise<Cliente> {
//         return null;
//     }

//     async excluir(cliente: Cliente): Promise<void> {
//         return null;
//     }

//     async obterTodos(): Promise<Cliente[]> {
//         return null
//     }

//     private colecao() {
//         return getClientes(db);
//     }
    
// }

// async function getClientes(db) {
//     const namesCol = collection(db, 'cliente');
//     const nameSnapshot = await getDocs(namesCol);
//     const nameList = nameSnapshot.docs.map(doc => doc.data());
//     const teste = nameSnapshot.query.converter.toFirestore(Cliente)
//     return nameList;
//   }