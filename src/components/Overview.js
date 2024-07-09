import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const Overview = () => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/dashboard', { withCredentials: true });
                setDashboardData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    if (!dashboardData) {
        return <div>Loading...</div>;
    }

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
                        {dashboardData.recent_users.map((user, index) => (
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
                            {dashboardData.birthday_users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.day}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Overview;
