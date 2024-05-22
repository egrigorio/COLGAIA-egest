import React from "react";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/funcionarios">Funcionários</a></li>
                <li><a href="/utilizadores">Utilizadores</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;