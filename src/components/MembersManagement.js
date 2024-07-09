import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles.css';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import InputMask from 'react-input-mask';

function MembersManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [editingMember, setEditingMember] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        document.title = 'Church Management - Gerenciamento de Membros';

        const fetchMembers = async () => {
            try {
                const response = await api.get('/users'); // Endpoint para buscar os membros
                setMembers(response.data);
                setFilteredMembers(response.data.slice(0, 10)); // Mostrar os 10 últimos membros
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = members.filter(member => member.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredMembers(filtered.slice(0, 10)); // Mostrar os 10 membros filtrados
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/users/${id}`); // Endpoint para excluir o membro
            setMembers(members.filter(member => member.id !== id));
            setFilteredMembers(filteredMembers.filter(member => member.id !== id));
            setSuccessMessage('Membro excluído com sucesso!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 10000);
        } catch (error) {
            console.error('Error deleting member:', error);
        }
        setShowConfirmation(false);
    };

    const handleEdit = (member) => {
        setEditingMember(member);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/users/${editingMember.id}`, editingMember); // Endpoint para atualizar o membro
            const updatedMembers = members.map(member => (member.id === editingMember.id ? editingMember : member));
            setMembers(updatedMembers);
            setFilteredMembers(updatedMembers.slice(0, 10));
            setEditingMember(null);
            setSuccessMessage('Dados do membro atualizados com sucesso!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 10000);
        } catch (error) {
            console.error('Error updating member:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingMember({ ...editingMember, [name]: value });
    };

    return (
        <div className="members-management">
            <h2>Gerenciamento de Membros</h2>
            <div className="search-bar">
                <label>Buscar</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Digite o nome do membro"
                />
                <button>Buscar</button>
            </div>
            {editingMember && (
                <div className="edit-member-form">
                    <h3>Editar Membro</h3>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="name"
                                value={editingMember.name}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={editingMember.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Telefone:</label>
                            <InputMask
                    mask="(99) 99999-9999"
                    value={editingMember.phone}
                    onChange={handleChange}
                    required
                >
                    {() => <input type="text" name="phone" required/>}
                </InputMask>
                        </div>
                        <div>
                            <label>Status:</label>
                            <select
                                name="status"
                                value={editingMember.status}
                                onChange={handleChange}
                            >
                                <option value="Membro">Membro</option>
                                <option value="Visitante">Visitante</option>
                            </select>
                        </div>
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={() => setEditingMember(null)}>Cancelar</button>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </form>
                </div>
            )}
            {showConfirmation && (
                <div className="confirmation-dialog">
                    <p>Tem certeza que deseja excluir este membro?</p>
                    <button onClick={() => handleDelete(memberToDelete) }>Sim</button>
                    <button style={{ marginLeft: '40px' }} onClick={() => setShowConfirmation(false)}>Não</button>
                </div>
            )}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="members-list">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map(member => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.phone}</td>
                                <td>{member.status}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => handleEdit(member)}><FaPencilAlt /></button>
                                        <button className="delete" onClick={() => { setShowConfirmation(true); setMemberToDelete(member.id); }}><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MembersManagement;
