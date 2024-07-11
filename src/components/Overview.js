import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles.css';

const Overview = () => {
    const [dashboardData, setDashboardData] = useState({
        total_users: 0,
        total_members: 0,
        total_non_baptized: 0,
        total_baptized: 0,
        recent_users: [],
        birthday_users: [],
        upcoming_events: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('api/dashboard', { withCredentials: true });
                setDashboardData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    const formatEventDate = (dateString) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('UTC', options).toUpperCase().split("  ").join(" ");
    };

    const formatTime = (timeString) => {
        if (timeString.includes('T')) {
            return timeString.split('T')[1].split(':').slice(0, 2).join(':');
        }
        return timeString.split(':').slice(0, 2).join(':');
    };

    return (
        <div className="overview">
            <section className="Dashboard-overview">
                <div className="Dashboard-card members">
                    <h3>Visitantes</h3>
                    <p>{dashboardData.total_users}</p>
                </div>
                <div className="Dashboard-card congregados">
                    <h3>Congregados</h3>
                    <p>{dashboardData.total_members}</p>
                </div>
                <div className="Dashboard-card nao-batizados">
                    <h3>Não Batizados</h3>
                    <p>{dashboardData.total_non_baptized}</p>
                </div>
                <div className="Dashboard-card batizados">
                    <h3>Batizados</h3>
                    <p>{dashboardData.total_baptized}</p>
                </div>
            </section>
            <section className="Dashboard-details">
                <div className="Dashboard-recent">
                    <h3>Cadastros Recentes</h3>
                    <ul>
                        {dashboardData.recent_users && dashboardData.recent_users.map((user, index) => (
                            <li key={index}>{user}</li>
                        ))}
                    </ul>
                </div>
                <div className="Dashboard-birthdays">
                    <h3>Aniversariantes do Mês</h3>
                    <table className="birthday-table">
                        <thead>
                            <tr>
                                <th>Dia</th>
                                <th>Nome</th>
                                <th>Idade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.birthday_users && dashboardData.birthday_users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.day}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="Dashboard-events">
                    <h3>Próximos Eventos</h3>
                    <div className="events-list">
                        {dashboardData.upcoming_events && dashboardData.upcoming_events.map((event, index) => (
                            <div key={index} className="event-card">
                                <div className="event-date">
                                    <span className="event-month">{formatEventDate(event.date).split(" ")[0]}</span>
                                    <span className="event-day">{formatEventDate(event.date).split(" ")[1]}</span>
                                </div>
                                <div className="event-details">
                                    <h4>{event.name}</h4>
                                    <p><FaClock /> &nbsp;{formatTime(event.time)}</p>
                                    <p><FaMapMarkerAlt /> &nbsp;{event.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Overview;
