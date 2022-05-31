import { useEffect, useState } from "react";
import ColecaoCliente from "../../backend/db/ColecaoCliente";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";

export default function Home() {

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [visivel, setvisivel] = useState<'tabela' | 'formulario'>('tabela');

  const [clientes, setClientes] = useState([])


  useEffect(() => {
    obterTodos();
  }, [])

  const obterTodos = async() => {
    const data = await ColecaoCliente.obterTodos();
    setClientes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    setvisivel('tabela');
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setvisivel('formulario');
  }

  async function clienteExcluido(cliente: Cliente) {
    await ColecaoCliente.excluir(cliente.id);
    obterTodos();
  }

  function novoCliente( ) {
    setCliente(Cliente.vazio());
    setvisivel('formulario');
  }

  async function salvarCliente(cliente: Cliente) {
    console.log(cliente);
    try {
      if(cliente.id === null) {
        await ColecaoCliente.addCliente(cliente);
      } else {
        await ColecaoCliente.salvar(cliente);
      }
      obterTodos();
    } catch (err) {
      console.log(err);
    }

    setvisivel('tabela');
  }

  return (
    <div className={`flex h-screen justify-center items-center bg-gradient-to-r from-purple-500 to-cyan-500 text-white`}>
      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (
        <>
        <div className="flex justify-end">
          <Botao onClick={novoCliente} cor="green" className="mb-4">Novo Cliente</Botao>
        </div>
        <Tabela clientes={clientes} 
          clienteSelecionado={clienteSelecionado}
          clienteExcluido={clienteExcluido}
          ></Tabela>
          </>
        ) : (
          <Formulario cancelado={() => setvisivel('tabela')} clienteMudou={salvarCliente} cliente={cliente}></Formulario>
          )}
          
      </Layout>
    </div>
  )
}
