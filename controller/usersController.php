<?php
    require_once '../model/UsersModel.php';

    $user = new UsersModel();

    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["action"])) {
        $action = $_POST["action"];
        if(isset($_POST["formData"])) $formData = $_POST["formData"];
        $result = null;

        switch ($action) {
            case "registerUser":
                
                try {
                    $result = $user->insertUser($formData);
                    if ($result) echo json_encode(['message' => 'Usuario registrado con exito']);
                } catch (PDOException $e) {
                    if ($e->getCode() == '23000') {
                        http_response_code(409);
                        echo json_encode(['error' => 'Ya existe un usuario con ese email.']);
                    } else {
                        http_response_code(500);
                        echo "Error en la base de datos: " . $e->getMessage();
                    }
                }
                break;
            case "login":
                try {
                    $result = $user->initSession($formData);
                    if ($result === 0){
                        http_response_code(200);
                        echo json_encode(['message' => 'Sesion inciada con exito.']);
                    } else if($result === 1) {
                        http_response_code(401);
                        echo json_encode(['error' => 'Contraseña incorrecta.']);
                    } else if($result === 2) {
                        http_response_code(404);
                        echo json_encode(['error' => 'Correo no encontrado.']);
                    } 
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(['error' => "Error al conectar con la base de datos.",
                                      'errorDebug' => "Error en la base de datos: " . $e->getMessage()]);
                }
                break;
            case "logOut":
                    $result = $user->logOut();
                    if ($result) {
                        echo json_encode(['message' => 'User logOut successfully']);
                    } else {
                        echo json_encode(['error' => 'LogOut failed']);
                    }
                    break;
            default:
                echo json_encode(['error' => 'Invalid action']);
        }
    }