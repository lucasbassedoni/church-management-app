import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import InputMask from 'react-input-mask';
import '../styles.css'; 

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const type = "1";
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [baptismDate, setBaptismDate] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (name.length < 5 || name.length > 50) {
            setError('O nome deve ter entre 5 e 50 caracteres.');
            return;
        }

        const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
        if (!nameRegex.test(name)) {
            setError('O nome deve conter apenas letras e espaços.');
            return;
        }

        if (address.length > 100) {
            setError('O endereço deve ter no máximo 100 caracteres.');
            return;
        }

        const newUser = { 
            name, 
            email,
            type, 
            password, 
            birthDate, 
            baptismDate, 
            address, 
            phone 
        };

        try {
            const response = await api.post('/register', newUser);
            console.log('User registered:', response.data);
            // Limpar o formulário após o registro
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setBirthDate('');
            setBaptismDate('');
            setAddress('');
            setPhone('');
            setError('');
            setSuccessMessage('Cadastro realizado com sucesso!');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('Email já cadastrado.');
            } else {
                setError('Erro ao registrar usuário. Tente novamente.');
            }
            console.error('Error registering user:', error);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={5}
                    maxLength={50}
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="O nome deve conter apenas letras e espaços."
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Senha:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Confirme a Senha:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    maxLength={100}
                />
            </div>
            <div>
                <label>Celular:</label>
                <InputMask
                    mask="(99) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                >
                    {() => <input type="text" />}
                </InputMask>
            </div>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <div className="button-container">
                <button type="submit">Cadastrar</button>
                <button type="button" className="voltar" onClick={handleLoginRedirect}>Voltar</button>
            </div>
        </form>
    );
}

export default Register;
