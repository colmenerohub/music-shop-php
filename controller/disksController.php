<?php
    require_once '../model/DisksModel.php';

    $disks = new DisksModel();

    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["action"])) {
        $action = $_POST["action"];

        function getFormData(){
            $formData = [
                'id_products' => isset($_POST["id_products"]) ? $_POST["id_products"] : null,
                'name' => $_POST["name"],
                'section' => $_POST["section"],
                'artist' => $_POST["artist"],
                'price' => $_POST["price"],
                'stamp' => $_POST["stamp"],
                'format' => $_POST["format"],
                'state' => $_POST["state"],
                'quantity' => $_POST["quantity"],
                'newImage' => isset($_FILES['newImage']['name']) ? $_FILES['newImage']['name'] : null,
                'currentImage' => isset($_POST["currentImage"]) ? $_POST["currentImage"] : null
            ];

            return $formData;
        }

        $result = null;

        switch ($action) {
            case "insertDisk":
                try {
                    $formData = getFormData();

                    if (isset($_FILES["newImage"]) && $_FILES["newImage"]["error"] == 0) {
                        $archivo_temporal = $_FILES["newImage"]["tmp_name"];
                        $nombre_archivo = $result . $_FILES["newImage"]["name"];
                        $ruta_destino = "../uploads/productos/" . $nombre_archivo;
                        move_uploaded_file($archivo_temporal, $ruta_destino);
                    }
                    
                    $result = $disks->insertOrUpdateDisk($formData);
                    if ($result) echo json_encode(['message' => 'Disco insertado con éxito']);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo "Error en la base de datos: " . $e->getMessage();
                }
                break;
            case "updateDisk":
                try {
                    $formData = getFormData();

                    if (isset($_FILES["newImage"]) && $_FILES["newImage"]["error"] == 0) {
                        $archivo_temporal = $_FILES["newImage"]["tmp_name"];
                        $nombre_archivo = $result . $_FILES["newImage"]["name"];
                        $ruta_destino = "../uploads/productos/" . $nombre_archivo;
                        move_uploaded_file($archivo_temporal, $ruta_destino);
                    }

                    $result = $disks->insertOrUpdateDisk($formData);
                    if ($result) echo json_encode(['message' => 'Disco actualizado con éxito']);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo "Error en la base de datos: " . $e->getMessage();
                }
                break;
            case "deleteDisk":
                try {
                    $result = $disks->deleteDiskById($_POST['id_products']);
                    if ($result) echo json_encode(['message' => 'Disco eliminado con éxito']);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo "Error en la base de datos: " . $e->getMessage();
                }
                break;
            case "getAllDisks":
                try {
                    $result = $disks->getAllDisks();
                    if (count($result) > 0) echo json_encode($result);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo "Error en la base de datos: " . $e->getMessage();
                }
                break;
            case "getDiskById":
                try {
                    $result = $disks->getDiskById($_POST['id_products']);
                    if ($result) echo json_encode($result);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo "Error en la base de datos: " . $e->getMessage();
                }
                break;
            default:
                echo json_encode(['error' => 'Invalid action']);
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["page"])) {
        $page = $_GET["page"];
        try {
            $result = $disks->getDisksByPage($page);
            if (count($result) > 0) {
                echo json_encode($result);
            } else {
                http_response_code(404);
                echo json_encode(array("error" => "No se encontraron resultados para la página especificada."));
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(array("error" => "Error en la base de datos: " . $e->getMessage()));
        }
    }