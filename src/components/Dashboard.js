import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaDollarSign, FaCalendarAlt, FaLayerGroup, FaComment, FaBars, FaUserCircle } from 'react-icons/fa';
import '../styles.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const { logout, userName } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`Dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <header className="Dashboard-header">
                <button className="menu-toggle" onClick={toggleSidebar}>
                    <FaBars size={24} />
                </button>
                <h1>Visão Geral</h1>
                <div className="user-info">
                    <FaUserCircle size={24} />
                    <span>{userName}</span>
                    <div className="user-menu">
                        <Link to="/profile">Alterar Dados</Link>
                        <button  onClick={handleLogout}>Sair</button>
                    </div>
                </div>
            </header>
            <aside className="Dashboard-sidebar">
                <h2>Menu</h2>
                <ul>
                    <li>
                        <Link to="/dashboard">
                            <FaHome size={24} />
                            <span>Visão Geral</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/members">
                            <FaUsers size={24} />
                            <span>Gerenciamento de Membros</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/finance">
                            <FaDollarSign size={24} />
                            <span>Gestão Financeira</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/events">
                            <FaCalendarAlt size={24} />
                            <span>Gestão de Eventos</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/groups">
                            <FaLayerGroup size={24} />
                            <span>Gestão de Grupos e Ministérios</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/communication">
                            <FaComment size={24} />
                            <span>Comunicação</span>
                        </Link>
                    </li>
                </ul>
            </aside>
            <main className="Dashboard-main">
                <section className="Dashboard-overview">
                    <div className="Dashboard-card members">
                        <h3>Membros</h3>
                        <p>7</p>
                    </div>
                    <div className="Dashboard-card congregados">
                        <h3>Congregados</h3>
                        <p>6</p>
                    </div>
                    <div className="Dashboard-card nao-batizados">
                        <h3>Não Batizados</h3>
                        <p>6</p>
                    </div>
                    <div className="Dashboard-card batizados">
                        <h3>Batizados</h3>
                        <p>7</p>
                    </div>
                </section>
                <section className="Dashboard-details">
                    <div className="Dashboard-recent">
                        <h3>Cadastros Recentes</h3>
                        <button>+ Cadastrar</button>
                        <ul>
                            <li>Roberto Amaral</li>
                            <li>Ana Maria</li>
                            <li>Renato Oliveira</li>
                            <li>Adriano Amaral</li>
                            <li>Adriana Silva</li>
                        </ul>
                    </div>
                    <div className="Dashboard-birthdays">
                        <h3>Aniversariantes do Mês</h3>
                        <ul>
                            <li>25 - João Antônio</li>
                            <li>24 - Ricardo Gomes</li>
                            <li>22 - Fernanda Gomes</li>
                            <li>20 - Ana Maria</li>
                            <li>10 - Roberto Amaral</li>
                        </ul>
                    </div>
                    <div className="Dashboard-events">
                        <h3>Próximos Eventos</h3>
                        <button>+ Cadastrar</button>
                        <ul>
                            <li>22 Nov - Reunião com Diáconos</li>
                            <li>23 Nov - Congresso de Mulheres</li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
