module.exports = {
    carObj: {
        drop: {
            tipo: ["dropdown_types","autos"],
            marca: ["dropdown_brands","acura"],
            modelo: ["dropdown_models","ilx"],
            subtipo: ["dropdown_subtypes","sedan"],
            año: ["dropdown_years","2018"],
            estado:["dropdown_provinces", "nuevo leon"],
            ciudad: ["dropdown_cities","monterrey"],
        },
        recorrido: "20000",
        precio: undefined,
        telefono: "5663756355",
        transaccion: "negociable",
        descripcion: undefined,
        paquete: "Free",
    },
    delay:1000,
    midDelay:5000,
    bigDelay:10000,
    user: {
        username: "jose.carlos9123@gmail.com",
        password: "S3m1n*v05",
    },
    web: {
        url: "https://www.seminuevos.com/login",
        uSelector: "#email_login",
        pSelector: "#password_login",
        bSelector: ".input__submit",
        sellUrl: "https://www.seminuevos.com/wizard?f_dealer_id=-1",
        inputAño: "#dropdown_years",
        inputEstado: "#dropdown_provinces",
        inputCiudad: "#dropdown_cities",
        inputRecorrido: ".input_recorrido",
        inputPrecio: "#input_precio",
        inputTelefono: "#input_teléfono",
        inputTransaccion: "#dropdown_negotiable",
        inputDescripcion: "#input_text_area_review",
        inputImagenes: "input[type=file]",
        inputPaquete: "",
        nextSelector: "button.next-button:not(.back)",
        finalButton:"#cancelButton"
    },
    resMessage: {
        success: false,
        message: "Faltan datos",
        data: null
    },
    errors: {
        default: "Faltan datos",
        price: "El precio es incorrecto",
        descripcion: "La descripción es incorrecta",
        serverError: "Estamos experimentando problemas, nuestros técnicos estan trabajando para resolverlos."
    },
    success: {
        userUpdated: "¡Vehiculo publicado exitosamente!",
    },

};