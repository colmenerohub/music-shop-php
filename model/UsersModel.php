<?php
    Class UsersModel{
        private $db;
        public function __construct()
        {
            require "Connection.php";
            $this->db = Connection::__connect();
        }

        public function insertUser($formData){
            $query = "insert into usuarios (nombre, apellidos, direccion, email, telefono, codigo_postal, password, rol) values (:nombre, :apellidos, :direccion, :email, :telefono, :codigo_postal, :password, 'user')";
            
            $name = htmlentities(addslashes($formData["registerName"]));
            $surnames = htmlentities(addslashes($formData["registerSurnames"]));
            $address = htmlentities(addslashes($formData["registerAddress"]));
            $email = htmlentities(addslashes($formData["registerEmail"]));
            $phone = preg_replace('/\s/', '',htmlentities(addslashes($formData["registerPhone"])));
            $codep = htmlentities(addslashes($formData["registerCodep"]));
            $password = htmlentities(addslashes($formData["registerPassword"]));
            $hash = password_hash($password, PASSWORD_BCRYPT);

            $res = $this->db->prepare($query);
            $res->bindParam(":nombre", $name);
            $res->bindParam(":apellidos", $surnames);
            $res->bindParam(":direccion", $address);
            $res->bindParam(":email", $email);
            $res->bindParam(":telefono", $phone);
            $res->bindParam(":codigo_postal", $codep);
            $res->bindParam(":password", $hash);
            
            return $res->execute();
        }

        public function initSession($formData){
            $query = "SELECT * FROM usuarios WHERE email=:email";

            $email = htmlentities(addslashes($formData["loginEmail"]));
            $password = htmlentities(addslashes($formData["loginPassword"]));

            $res = $this->db->prepare($query);
            $res->bindParam(":email", $email);

            $res->execute();

            if($res->rowCount() > 0){
                $reg = $res->fetch(PDO::FETCH_ASSOC);
                if(password_verify($password,$reg["password"])){
                    session_start();
                    $_SESSION["name"] = $reg["nombre"];
                    $_SESSION["surnames"] = $reg["apellidos"];
                    $_SESSION["role"] = $reg["rol"];
                    $_SESSION["email"] = $email;
                    return 0;
                } else {
                    return 1;
                }
            } else {
                return 2;
            }  
        }

        public function logOut(){
            session_start();
            session_destroy();
            return true;
        }
    }