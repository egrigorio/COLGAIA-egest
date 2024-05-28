import React from 'react';
import api from '../api/api';

const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmar_password = e.target.confirmar_password.value;
    const response = await api.post('/registar', {username, password, confirmar_password}, {withCredentials: true});    
    console.log(response);

}
const Registar = () => {
    return (
/*         <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" id="username" placeholder="username"/>
                <input type="password" name="password" id="password" placeholder="password"/>
                <input type="password" name="confirmar_password" id="confirmar_password" placeholder="confirmar_password"/>
                <select name="cargo" id="cargo">
                    <option value="admin">admin</option>
                </select>
                <input type="submit" value="registar"/>
            </form>
        </div> */
        <body className="bg-light">
        <section className="p-3 p-md-4 p-xl-5">
          <div className="container mb-5 mt-5">
            <div className="row justify-content-center">
              <div className="col-12 col-xxl-11">
                <div className="card border-light-subtle shadow-sm">
                  <div className="row g-0">
                    <div className="col-12 col-md-6">
                      <img className="img-fluid rounded-image w-100 h-100 object-fit-cover" loading="lazy" src="./contents/styling/DECOR_1.jpg" alt="Welcome back you've been missed!" id="loginIMG" />
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <div className="col-12 col-lg-11 col-xl-10">
                        <div className="card-body p-3 p-md-4 p-xl-5">
                          <div className="row">
                            <div className="col-12">
                              <div className="mb-5">
                                <div className="text-center mb-4">
                                  <a href="#!">
                                    <img src="./contents/branding/2dLogo.png" alt="Songbird Logo" width="175" height="57"></img>
                                  </a>
                                </div>
                                <h4 className="text-center">Bem vindo de volta!</h4>
                              </div>
                            </div>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="row gy-3 overflow-hidden">
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input type="text" className="form-control" name="username" id="username" placeholder="username" required/>
                                  <label for="username" className="form-label">Username</label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input type="password" className="form-control" name="password" id="password" placeholder="password" required/>
                                  <label for="password" className="form-label">Password</label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input type="password" className="form-control" name="confirmar_password" id="confirmar_password" placeholder="confirmar_password" required/>
                                  <label for="confirmar_password" className="form-label">Confirmar Password</label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                    <select classNameName='form-select' name="cargo" id="cargo">
                                        <option value="admin">admin</option>
                                    </select>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="d-grid">
                                  <button className="btn btn-dark btn-lg" type="submit" value="registar">Registar</button>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-3">
                                <a href="register.php" className="link-secondary text-decoration-none">Criar Conta</a>
                                <a href="#!" className="link-secondary text-decoration-none">Esqueceu a Password?</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    );
};

export default Registar;