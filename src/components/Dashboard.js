import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaDollarSign, FaCalendarAlt, FaLayerGroup, FaComment, FaBars, FaUserCircle } from 'react-icons/fa';
import '../styles.css';
import { useAuth } from '../context/AuthContext';
import Overview from './Overview';
import ChangePasswordForm from './ChangePasswordForm';
import MembersManagement from './MembersManagement';
import FinanceManagement from './FinanceManagement';
import EventsManagement from './EventsManagement';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [view, setView] = useState('overview');
    const { logout, userName } = useAuth();
    const navigate = useNavigate();
    const mainRef = useRef(null);

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

    const handleMembersManagement = () => {
        setView('membersManagement');
    };

    const handleFinanceManagement = () => {
        setView('financeManagement');
    };

    const handleEventsManagement = () => {
        setView('eventsManagement');
    };

    const scrollToTop = () => {
        if (mainRef.current) {
            mainRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
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
                        <Link onClick={handleMembersManagement}>
                            <FaUsers size={24} />
                            <span>Gerenciamento de Membros</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleFinanceManagement}>
                            <FaDollarSign size={24} />
                            <span>Gestão Financeira</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleEventsManagement}>
                            <FaCalendarAlt size={24} />
                            <span>Gestão de Eventos</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard">
                            <FaLayerGroup size={24} />
                            <span>Gestão de Grupos e Ministérios</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard">
                            <FaComment size={24} />
                            <span>Comunicação</span>
                        </Link>
                    </li>
                </ul>
            </aside>
            <main className="Dashboard-main" ref={mainRef}>
                {view === 'overview' && <Overview />}
                {view === 'changePassword' && <ChangePasswordForm handleBackToOverview={handleBackToOverview} />}
                {view === 'membersManagement' && <MembersManagement scrollToTop={scrollToTop} />}
                {view === 'financeManagement' && <FinanceManagement />}
                {view === 'eventsManagement' && <EventsManagement scrollToTop={scrollToTop} />}
            </main>
        </div>
    );
}

export default Dashboard;
