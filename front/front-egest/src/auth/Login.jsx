import React from 'react';
import api from '../api/api';
import Swal from 'sweetalert2';

const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await api.post('/login', {username, password}, {withCredentials: true});
      console.log(response.status);
      if (response.status === 200) window.location.href = '/';
    } catch (error) {
      if (error.response.status === 404) Swal.fire('Erro', 'Usuário não encontrado', 'error');
    }
};

const Login = () => {
    return (
      <body className="bg-light">
        <section class="p-3 p-md-4 p-xl-5">
          <div class="container mb-5 mt-5">
            <div class="row justify-content-center">
              <div class="col-12 col-xxl-11">
                <div class="card border-light-subtle shadow-sm">
                  <div class="row g-0">
                    <div class="col-12 col-md-6">
                      <img class="img-fluid rounded-image w-100 h-100 object-fit-cover" loading="lazy" src="./contents/styling/DECOR_1.jpg" alt="Welcome back you've been missed!" id="loginIMG" />
                    </div>
                    <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <div class="col-12 col-lg-11 col-xl-10">
                        <div class="card-body p-3 p-md-4 p-xl-5">
                          <div class="row">
                            <div class="col-12">
                              <div class="mb-5">
                                <div class="text-center mb-4">
                                  <a href="#!">
                                    <img src="./contents/branding/2dLogo.png" alt="Songbird Logo" width="175" height="57"></img>
                                  </a>
                                </div>
                                <h4 class="text-center">Bem vindo de volta!</h4>
                              </div>
                            </div>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div class="row gy-3 overflow-hidden">
                              <div class="col-12">
                                <div class="form-floating mb-3">
                                  <input type="text" class="form-control" name="username" id="username" placeholder="username" required/>
                                  <label for="username" class="form-label">Username</label>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="form-floating mb-3">
                                  <input type="password" class="form-control" name="password" id="password" placeholder="password" required/>
                                  <label for="password" class="form-label">Password</label>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="d-grid">
                                  <button class="btn btn-dark btn-lg" type="submit" value="login">Login</button>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div class="row">
                            <div class="col-12">
                              <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-3">
                                <a href="register.php" class="link-secondary text-decoration-none">Criar Conta</a>
                                <a href="#!" class="link-secondary text-decoration-none">Esqueceu a Password?</a>
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

export default Login;