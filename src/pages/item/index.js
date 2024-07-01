import React, {useState, useEffect} from 'react';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import './style.css';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import api from '../../services/api';

export default function Item(){
const[items, setItems] = useState([]);
const history = useHistory();
 
useEffect(() => {
    fetchItems();
    
},[])

async function fetchItems(){

    const response = await api.get(`api`).then(response =>{
            setItems(response.data);
    });
}
 
async function editItem(id){
    try {
        history.push(`item/new/${id}`);
        window.location.reload();
    } catch (err) {
        alert('Falha ao editar o item!')
    }
}

    async function deleteItem(id){
        try {
            await api.delete(`api/${id}`);
            setItems(items.filter(item => item.id !== id));
            window.location.reload();
        }  catch (err) {
            alert('Falha ao deletar o item!')
        }
    }

    return(
        <div className="item-container">
            <header>
                <img src={logo} alt='Logo'/>
                <span>Bem vindo, <strong>Rafael</strong></span>
                <Link className='button' to='item/new/0'>Adicionar novo item</Link>
            </header>
 
            <h1>Lista de desejos</h1>
            <ul>
                {items.map(item =>(
                  <li key={item.id}>
                    <strong>Nome do item</strong>
                    <p>{item.itemName}</p>

                    <strong>Marketplace</strong>
                    <p>{item.marketplace}</p>
                    <strong>Link</strong>
                    <p><a href={item.link} target="_blank" rel="noopener noreferrer">Link do produto</a></p>
                    <strong>Valor</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.price)}</p>

                    <button onClick={() =>{editItem(item.key)}} type='button'>
                        <FiEdit size={20} color="#251fc5"/>
                    </button>
                    
                    <button type="button" onClick={() => deleteItem(item.key)}>
                        <FiTrash2 size={20} color="#ff7f7f"/>
                    </button> 
                  </li>  
                ))}
            </ul>
        </div>
    );
} 