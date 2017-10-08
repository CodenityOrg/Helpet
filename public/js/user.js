const user = {
	init(){
        this.initLoginModal();
		this.initRegisterModal();
        this.loginForm();
    },
    loginForm() {
		const self = this;
        document.getElementById("form-login").onsubmit = function(e){
            e.preventDefault();
            e.stopPropagation();
            self.login(this);
        }
    },
    registerForm() {
        const self = this;
        document.getElementById("register-form").onsubmit = function(e){
            e.preventDefault();
            e.stopPropagation();
            self.register(this);
        };
    },
    initLoginModal() {
        const loginModal = document.getElementById("start-login");
        const loginBodyModal = document.getElementById("modal-login");
        const loginCloseModal = document.getElementById("close-login");

        if(loginModal){
            loginModal.addEventListener("click",function(){
                loginBodyModal.classList.toggle("showlogin");
            });
        }

        if(loginCloseModal){
            loginCloseModal.addEventListener("click",function(){
                loginBodyModal.classList.toggle("showlogin");
            });
        }
    },
	initRegisterModal() {
		const registerModal = document.getElementById("start-register");
		const bgback = document.getElementById("bg-register");
		const closeModal = document.getElementById("close-register");

		if (registerModal) {
			registerModal.addEventListener("click",function(){
				bgback.classList.toggle("showregister");
			});

			closeModal.addEventListener("click",function(){
				bgback.classList.toggle("showregister");
			});
		}
	},
    login(form) {
        const data = {
            email: form.email.value,
            password: form.password.value
        };
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (data) {
            if(xhr.readyState == 4 && xhr.status === 200) {
                location = "/mapa";
            } else {
                showSnackBar("Email o contraseña incorrecta, intentelo de nuevo", "danger");
            }
        };
        xhr.open("POST", "/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(data));
    },
    register(form) {
        const data = {
            email: form.email.value,
            password: form.password.value,
            name: form.name.value,
            lastname: form.lastname.value,
            phone: form.phone.value
        };  

        if (email && password && name && lastname) {
            return showSnackBar("Por favor complete los datos antes de continuar", "danger");
        }

        if (grecaptcha.getResponse() !== "") {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4 && xhr.status === 200) {
                    location = "/mapa";
                }
            };
            xhr.open("POST", "/user", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));    
        } else {
            showSnackBar("Por favor acepte el captcha antes de continuar", "danger");
        }
      
    }

}
