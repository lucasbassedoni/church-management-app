import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaDollarSign, FaCalendarAlt, FaLayerGroup, FaComment, FaBars, FaUserCircle } from 'react-icons/fa';
import '../styles.css';
import { useAuth } from '../context/AuthContext';
import Overview from './Overview';
import ChangePasswordForm from './ChangePasswordForm';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [view, setView] = useState('overview');
    const { logout, userName } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Church Management - Dashboard';
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleChangePassword = () => {
        setView('changePassword');
    };

    const handleBackToOverview = () => {
        setView('overview');
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
                        <button onClick={handleChangePassword}>Alterar Senha</button>
                        <button onClick={handleLogout}>Sair</button>
                    </div>
                </div>
            </header>
            <aside className="Dashboard-sidebar">
                <h2>Menu</h2>
                <ul>
                    <li>
                        <Link onClick={handleBackToOverview}>
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
                {view === 'overview' && <Overview />}
                {view === 'changePassword' && <ChangePasswordForm handleBackToOverview={handleBackToOverview} />}
            </main>
        </div>
    );
}

export default Dashboard;
