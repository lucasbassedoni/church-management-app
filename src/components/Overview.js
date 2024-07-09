import React from 'react';

function Overview() {
    return (
        <>
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
                    <button>+ Novo Evento</button>
                    <ul>
                        <li>22 Nov - Reunião com Diáconos</li>
                        <li>23 Nov - Congresso de Mulheres</li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Overview;
