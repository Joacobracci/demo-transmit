var express = require("express");
var path = require("path");
var routes = require("./routes");
var global = {
    "Type " : " Testing de App",
    "Wait " : " Por favor espere, se estan cargando los datos"
}
var app = express();


// Variables que usa la api para validar que somos nosotros como empresa
var redirect_uri ="http://localhost:5000/home";
var clientID = "ea854282.0bee69f4.tid_671f9079.bindid.io";
var clientSecret = "911f24e5-5141-40b4-9ffb-115b04f48f00";

app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);
app.use("/static",express.static("static"));
app.use(express.json());


// Metodo de autenticacion para obtener los datos del usuario
// cuando accedemos a /home automaticamente nos envia el codigo devuelto
app.post("/auth", function (req,res){

    var url = "https://signin.bindid-sandbox.io/token"

    console.log(req.body.code)
    //CODE = El codigo enviado por la web /home
    code = req.body.code
    
    //Funcion para obtener la informacion de usuario de la api de BIND ID 
    //Necesita el Token de acceso asi que aca solamente definimos la funcion para usarla mas tarde
    function getUserInfo(bearerCode){
        
        //La url a enviar el token es /userinfo
        var optionsBearer = {
            method: 'GET',
            url: 'https://signin.bindid-sandbox.io/userinfo',
            // bearerCode es el codigo obtenido cuando nos devuelven el token despues del paso de autenticacion
            headers: {'content-type': 'application/json', authorization: "Bearer "+bearerCode}
        };
        
        axios.request(optionsBearer).then(function (response) {
            console.log(response.data);
            global = response.data;
        }).catch(function (error) {
            console.error(error);
        });
    }

    //Paso de Autenticacion (TOKEN)
    var axios = require("axios").default;

    var options = {
        
    method: 'POST',
    //Consultar por POST el url /token enviando secret id, client, etc etc 
    // Y EL CODIGO OBTENIDA DESPUES DE LA AUTENTICACION DE /HOME
    url: 'https://signin.bindid-sandbox.io/token',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientID,
        client_secret: clientSecret,
        //Codigo devuelto por /Home
        code: code,
        redirect_uri: redirect_uri
    })
    };

    //Peticion AXIOS al sv 
    axios.request(options).then(function (response) {

    console.log(response.data + "response data");

    dataRes = response.data["access_token"]
    
    //dataRes es la respuesta del AXIOS en la funcion 
    getUserInfo(dataRes);
    //Esa funcion es la de arriba para enviar el token y obtener los datos de usuario

    }).catch(function (error) {
    console.error(error);
    });

    
});

//API para solicitar los datos de usuario obtenidos en el getUserInfo
app.get("/getUserData", function(req, res){
    res.json({ message  : global });
    
});

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})


