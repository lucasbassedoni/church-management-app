import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles.css';

const EditProfile = () => {
    const { user } = useAuth();
    const [name, setName] = useState(user.name);
    const [birthDate, setBirthDate] = useState(user.birthDate);
    const [baptismDate, setBaptismDate] = useState(user.baptismDate);
    const [address, setAddress] = useState(user.address);
    const [phone, setPhone] = useState(user.phone);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        document.title = 'Church Management - Dashboard';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = { id: user.id, name, birthDate, baptismDate, address, phone };

        try {
            const response = await api.put('/update', updatedUser);
            console.log('User updated:', response.data);
            setSuccess('Dados atualizados com sucesso.');
            setError('');
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Erro ao atualizar dados. Tente novamente.');
            setSuccess('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Perfil</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
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
                <label>Data Nascimento:</label>
                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Data Batismo: <small><b>(opcional)</b></small></label>
                <input
                    type="date"
                    value={baptismDate}
                    onChange={(e) => setBaptismDate(e.target.value)}
                />
            </div>
            <div>
                <label>Endereço:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Celular:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Atualizar</button>
        </form>
    );
};

export default EditProfile;