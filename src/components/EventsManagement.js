import React, { useState, useEffect } from 'react';
import '../styles.css';
import { FaPencilAlt,FaTrash } from 'react-icons/fa';
import api from '../services/api';

const EventsManagement = ({ scrollToTop }) => {
    const [events, setEvents] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [editingEvent, setEditingEvent] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await api.get('/api/events', { withCredentials: true });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = { name, date, time, location };
        try {
            if (editingEvent) {
                newEvent.id = editingEvent.id;
                await api.put(`/api/event/${editingEvent.id}`, newEvent, { withCredentials: true });
                setSuccessMessage('Evento atualizado com sucesso!');
            } else {
                await api.post('/api/event', newEvent, { withCredentials: true });
                setSuccessMessage('Evento adicionado com sucesso!');
            }
            fetchEvents();
            setName('');
            setDate('');
            setTime('');
            setLocation('');
            setEditingEvent(null);
            setError('');
            setTimeout(() => {
                setSuccessMessage('');
            }, 10000);
        } catch (error) {
            setError('Erro ao registrar evento. Tente novamente.');
            console.error('Error registering event:', error);
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setName(event.name);
        setDate(formatDate(event.date));
        setTime(formatTime(event.time));
        setLocation(event.location);
        scrollToTop();
    };

    const handleDelete = async (id) => {
            try {
                await api.delete(`/api/event/${id}`, { withCredentials: true });
                setSuccessMessage('Evento excluído com sucesso!');
                fetchEvents();
                setTimeout(() => {
                    setSuccessMessage('');
                }, 10000);
            } catch (error) {
                setError('Erro ao excluir evento. Tente novamente.');
                console.error('Error deleting event:', error);
            }
        
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDateShow = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    const formatTime = (timeString) => {
        if (timeString.includes('T')) {
            return timeString.split('T')[1].split(':').slice(0, 2).join(':');
        }
        return timeString.split(':').slice(0, 2).join(':');
    };

    return (
        <div className="events-management">
            <h2>Gestão de Eventos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome do Evento:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                <div>
                    <label>Hora:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Local:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <button type="submit">{editingEvent ? 'Atualizar Evento' : 'Adicionar Evento'}</button>
            </form>
            <h3>Últimos 10 Eventos</h3>
            <table className="events-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Local</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {events && events.map((event, index) => (
                        <tr key={index}>
                            <td>{event.name}</td>
                            <td>{formatDateShow(event.date)}</td>
                            <td>{formatTime(event.time)}</td>
                            <td>{event.location}</td>
                            <td>
                                <button onClick={() => handleEdit(event)}><FaPencilAlt /></button>
                                <button
                                    className="delete"
                                    onClick={() => setDeleteConfirmation(event.id)}
                                >
                                    
                                    <FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {deleteConfirmation && (
                <div className="confirmation-dialog">
                    <p>Tem certeza que deseja excluir este evento?</p>
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

export default EventsManagement;
