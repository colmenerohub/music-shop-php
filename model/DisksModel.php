<?php  
    class DisksModel {
        private $db;
        private $disks;
        private $id_products;
        private $name;
        private $section;
        private $artist;
        private $price;
        private $stamp;
        private $format;
        private $state;
        private $quantity;
        private $image;
        public function __construct()
        {
            require "Connection.php";
            $this->db = Connection::__connect();
        }

        public function insertOrUpdateDisk($formData){
            $this->name = htmlentities(addslashes($formData["name"]));
            $this->section = htmlentities(addslashes($formData["section"]));
            $this->artist = htmlentities(addslashes($formData["artist"]));
            $this->price = (float)$formData["price"];
            $this->stamp = htmlentities(addslashes($formData["stamp"]));
            $this->format = htmlentities(addslashes($formData["format"]));
            $this->state = htmlentities(addslashes($formData["state"]));
            $this->quantity = (int)$formData["quantity"];

            if(isset($formData["newImage"])){
                $this->image = htmlentities(addslashes($formData["newImage"]));
            } else {
                $this->image = htmlentities(addslashes($formData["currentImage"]));
            }
            
            if (isset($formData["id_products"])) {
                $query = "UPDATE productos 
                          SET nombre=:name,
                          seccion=:section,
                          artista=:artist,
                          precio=:price,
                          sello=:stamp,
                          formato=:format,
                          estado=:state,
                          cantidad=:quantity,
                          imagen=:image
                          WHERE id_productos = :id_products";
                $this->id_products = htmlentities(addslashes($formData["id_products"]));

                $res = $this->db->prepare($query);
                $res->bindParam(":id_products", $this->id_products);
            } else {
                $query = "INSERT INTO productos (nombre, seccion, artista, precio, sello, formato, estado, cantidad, imagen) 
                          VALUES (:name, :section, :artist, :price, :stamp, :format, :state, :quantity, :image)";

                $res = $this->db->prepare($query);
            }
            
            $res->bindParam(":name", $this->name);
            $res->bindParam(":section", $this->section);
            $res->bindParam(":artist", $this->artist);
            $res->bindParam(":price", $this->price);
            $res->bindParam(":stamp", $this->stamp);
            $res->bindParam(":format", $this->format);
            $res->bindParam(":state", $this->state);
            $res->bindParam(":quantity", $this->quantity);
            $res->bindParam(":image", $this->image);

            //$lastInsertedId = $this->db->lastInsertId();
            return $res->execute();
        }

        public function deleteDiskById($id_productos){
            $query = "delete from productos where id_productos = :id_products";

            $this->id_products = htmlentities(addslashes($id_productos));

            $res = $this->db->prepare($query);
            $res->bindParam(":id_products", $this->id_products);

            return $res->execute();
        }

        public function getAllDisks(){
            $this->disks = array();
            $query = "select * from productos";
            $res = $this->db->prepare($query);
            
            if($res->execute()){
                if($res->rowCount() > 0){
                    while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                        $this->disks[] = $reg;
                    }
                    return $this->disks;
                }
            }
        }

        public function getDiskById($id_productos){
            $query = "select * from productos where id_productos = :id_products";
            $this->id_products = htmlentities(addslashes($id_productos));

            $res = $this->db->prepare($query);
            $res->bindParam(":id_products", $this->id_products);

            if($res->execute()){
                if($res->rowCount() > 0){
                    $reg = $res->fetch(PDO::FETCH_ASSOC);
                    return $reg;
                }
            } else {
                return false;
            }
        }

        public function getDisksByPage($actualPage) {
            $this->disks = array();
            $offset = ($actualPage - 1) * DISKNUM;
            $limit = DISKNUM;
        
            $query = "SELECT * FROM productos ORDER BY id_productos LIMIT :offset, :limit";
            $res = $this->db->prepare($query);
            $res->bindParam(':offset', $offset, PDO::PARAM_INT);
            $res->bindParam(':limit', $limit, PDO::PARAM_INT);
            $res->execute();
        
            $disks = $res->fetchAll(PDO::FETCH_ASSOC);
        
            $totalCountQuery = "SELECT COUNT(*) as total_count FROM productos";
            $totalCountRes = $this->db->query($totalCountQuery);
            $totalCount = $totalCountRes->fetch(PDO::FETCH_ASSOC)['total_count'];
        
            $responseArray = [
                'info' => [
                    'count' => $totalCount,
                    'pages' => ceil($totalCount / DISKNUM),
                    'next' => ($actualPage < ceil($totalCount / DISKNUM)) ? "/MarioMusicShop/controller/disksController.php?page=" . ($actualPage + 1) : null,
                    'prev' => ($actualPage > 1) ? "/MarioMusicShop/controller/disksController.php?page=" . ($actualPage - 1) : null
                ],
                'results' => $disks
            ];
        
            return $responseArray;
        }
    }