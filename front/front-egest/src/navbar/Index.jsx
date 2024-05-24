import React from "react";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/v/funcionario">Funcionários</a></li>
                <li><a href="/v/user">Utilizadores</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;