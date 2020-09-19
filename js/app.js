document.addEventListener("DOMContentLoaded", () => {
  // Obtiene el formulario
  const formulario = document.getElementById("formulario");

  // Agrega el listener el enviar la información
  formulario.addEventListener("submit", (e) => {
    // Evita que el formulario se envíe
    e.preventDefault();

    // Obtiene los datos del formulario
    const datosFormulario = new FormData(formulario).entries();
    const { email, password } = Object.fromEntries(datosFormulario);

    // Obtiene los errores de los datos digitados
    const errorEmail = validarEmail(email);
    const errorPassword = validarPassword(password, 10);

    // Obtiene los elementos para mostrar los errores
    const elementoEmailError = document.getElementById("errorEmail");
    const elementoPasswordError = document.getElementById("errorPassword");

    // Si existen errores se muestran en la página
    elementoEmailError.innerText = errorEmail ? errorEmail : "";
    elementoPasswordError.innerText = errorPassword ? errorPassword : "";

    // Si no existen errores, hace submit del formulario
    if (!errorEmail && !errorPassword) {
      formulario.submit();
    }
  });

  /**
   * @function validarEmail - Esta función valida si un email es válido.
   * @param {String} email - Email a validar
   * @returns {String} Una cadena con el error detectado y una cadena vacía de lo contrario
   */
  function validarEmail(email) {
    // Valida si se recibió un email
    if (!email) return "El email es requerido";

    // REGEX:
    // ^  => Inicio de la cadena
    // \S => caracteres que no sean espacio en blanco
    // +  => uno o muchos
    // @  => caracter arroba
    // $  => final de la cadena
    // /g => global. Todos los matches (no retorna después del primer match)

    // Valida si la estructura del email es válida
    const isValidEmail = /^\S+@\S+$/g;
    if (!isValidEmail.test(email)) {
      return "Digite un email válido";
    }

    return "";
  }

  /**
   * @function validarPassword - Esta función valida si un password es válido.
   * @param {String} password - Password a validar
   * @returns {String} Una cadena con el error detectado y una cadena vacía de lo contrario
   */
  function validarPassword(password, minlength) {
    // Verifica si el password tiene algún valor
    if (!password) return "El password es requerido";

    // Verifica si el password tiene una longitud mínima
    if (password.length < minlength) {
      return `El password debe tener al menos ${minlength} caracteres`;
    }

    // REGEX
    // [A-Z] => Un caracter que esté entre A y Z
    // /g => global. Todos los matches (no retorna después del primer match)

    // Verifica si el password contiene al menos una mayúscula
    const hasCapitalLetter = /[A-Z]/g;
    if (!hasCapitalLetter.test(password)) {
      return "El password debe tener al menos una mayúscula.";
    }

    // REGEX
    // \d => Un caracter que esté entre 0 y 9
    // /g => global. Todos los matches (no retorna después del primer match)

    // Verifica si el password contiene al menos un número
    const hasNumber = /\d/g;
    if (!hasNumber.test(password)) {
      return "El password debe tener al menos un número.";
    }

    return "";
  }
});
