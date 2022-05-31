import { useState } from "react";
import Cliente from "../core/Cliente";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormaularioProps {
    cliente: Cliente
    clienteMudou?: (cliente : Cliente) => void
    cancelado?: () => void
}

export default function Foramulario(props: FormaularioProps) {
    const id = props.cliente?.id
    const [nome, setNome] = useState(props.cliente.nome ?? '')
    const [idade, setIdade] = useState(props.cliente.idade ?? 0)

    return (
        <div>
            {id ? (
                <Entrada somenteLeitura texto="Código" valor={id} className="mb-5"></Entrada>
            ) : false}           
            <Entrada texto="Nome" valor={nome} valorMudou={setNome} className="mb-5"></Entrada>
            <Entrada texto="Idade" tipo="number" valor={idade} valorMudou={setIdade}></Entrada>
            <div className="flex justify-end mt-7">
                <Botao onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))} cor="blue" className="mr-2">{id ? 'Alterar' : 'Salvar'}</Botao>
                <Botao onClick={props.cancelado}>Cancelar</Botao>
            </div>
        </div>
    )
}