import React, { useState } from 'react';
import api from '../services/api';

function ChangePasswordForm({ handleBackToOverview }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmNewPassword) {
            setError('A senhas (nova) não coincidem.');
            return;
        }

        try {
            const response = await api.post('/api/auth/change-password', {
                currentPassword,
                newPassword,
            });
            if (response.status === 200) {
                setSuccess('Senha alterada com sucesso!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            }
        } catch (error) {
            setError('Erro ao alterar a senha. Verifique sua senha atual e tente novamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Senha Atual:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Nova Senha:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Confirme a Nova Senha:</label>
                <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <button type="submit">Alterar Senha</button>
            <button type="button" className="voltar" onClick={handleBackToOverview}>Voltar</button>
        </form>
    );
}

export default ChangePasswordForm;
