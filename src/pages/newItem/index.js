import React, {useState,  useEffect} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import './styles.css';
import { FiArrowLeft } from "react-icons/fi";
import logo from '../../assets/logo.svg'
import api from '../../services/api';

export default function NewItem() {
    const { itemId } = useParams();
    const history = useHistory();

    const [itemName, setItemName] = useState('');
    const [marketplace, setMarketplace] = useState('');
    const [link, setLink] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() =>{
        if (itemId === '0') return; 
         else {
            loadBooks();     
        }
    }, [itemId]);

    async function loadBooks(){
        try {
            const response = await api.get(`api/${itemId}`);
            setItemName(response.data.itemName);
            setMarketplace(response.data.marketplace);
            setLink(response.data.link);
            setPrice(response.data.price);

        } catch (error) {
            alert('Failed! Try again!');
            history.push('/books')
        }
    }

    async function saveOrUpdate(e){
        e.preventDefault();

        const data = {itemName, marketplace, link, price};

        try {
            if(itemId === '0')
                await api.post('api', data);
            else{
                data.id = itemId;
                await api.put('api', data);
            }
        } catch (error) {
            alert('Falha! Tente novamente!')
        }
        history.push('/');
        window.location.reload();
    }

    return(
        <div className='new-item-container'>
           <div className='content'>
           <section className="form">
                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#251fc5"/>Home
                </Link>
                <h1>{itemId === '0' ? 'Adicionar' : 'Atualizar'} Item</h1>
                <p>Insira as informações do item e aperta em {itemId === '0' ? `'Adicionar'` : `'Atualizar'`}</p>
                <img src={logo} alt="Logo Image"/>                     
                     
            </section>
                <form onSubmit={saveOrUpdate}>
                <input placeholder='Nome do item'
                    value={itemName}
                    onChange={e=> setItemName(e.target.value)}
                />        
                <input placeholder='Marketplace'
                    value={marketplace}
                    onChange={e=> setMarketplace(e.target.value)}
                />     
                <input placeholder='Link'
                    value={link}
                    onChange={e=> setLink(e.target.value)}
                />     
                <input placeholder='Preço'
                    value={price}
                    onChange={e=> setPrice(e.target.value)}
                />

                <button className="button" type="submit">{itemId === '0' ? 'Adicionar' : 'Atualizar'}</button>
                </form>
           </div>
        </div>
    );
}
