import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import api from '../services/api';
import '../styles.css';

const FinanceManagement = () => {
    const [records, setRecords] = useState([]);
    const [type, setType] = useState('Receita');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await api.get('/api/financial-records', { withCredentials: true });
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching financial records:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecord = {
            type,
            name,
            amount: parseFloat(amount),  // Convertendo para número
            date
        };
        try {
            await api.post('/api/financial-record', newRecord, { withCredentials: true });
            setSuccessMessage('Registro adicionado com sucesso!');
            fetchRecords();
            // Limpar o formulário após o registro
            setType('Receita');
            setName('');
            setAmount('');
            setDate('');
            setError('');
            setTimeout(() => {
                setSuccessMessage('');
            }, 10000);
        } catch (error) {
            setError('Erro ao registrar. Tente novamente.');
            console.error('Error registering record:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/financial-record/${id}`, { withCredentials: true });
            setSuccessMessage('Registro excluído com sucesso!');
            fetchRecords();
            setTimeout(() => {
                setSuccessMessage('');
            }, 10000);
        } catch (error) {
            setError('Erro ao excluir registro. Tente novamente.');
            console.error('Error deleting record:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };
    

    return (
        <div className="financial-management">
            <h2>Gestão Financeira</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tipo:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Receita">Receita</option>
                        <option value="Despesa">Despesa</option>
                    </select>
                </div>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Valor:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Data:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <button type="submit">Adicionar Registro</button>
            </form>
            <h3>Últimos 10 Registros</h3>
            <table className="financial-table">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {records && records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.type}</td>
                            <td>{record.name}</td>
                            <td>{record.amount}</td>
                            <td>{formatDate(record.date)}</td>
                            <td>
                                <button
                                    className="delete"
                                    onClick={() => setDeleteConfirmation(record.id)}
                                >
                                    
                                    <FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {deleteConfirmation && (
                <div className="confirmation-dialog">
                    <p>Tem certeza que deseja excluir este registro?</p>
                    <button
                        onClick={() => {
                            handleDelete(deleteConfirmation);
                            setDeleteConfirmation(null);
                        }}
                    >
                        Sim
                    </button>
                    <button onClick={() => setDeleteConfirmation(null)}>Não</button>
                </div>
            )}
        </div>
    );
};

export default FinanceManagement;