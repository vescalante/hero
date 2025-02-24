<?php
  include('../config.php');
  include('../function.php');
 //dbConnect();

date_default_timezone_set("America/Mexico_City");
$today = date('Y-m-d H:i:s');
$reg_origen = "WEBFORM";

$nombre       = $_POST["nombre"];
$apellido     = $_POST["apellido"];
$email        = $_POST["email"];
$puesto       = $_POST["puesto"];
$empresa      = $_POST["empresa"];
$telefono     = $_POST["telefono"];

if($nombre=="" or $apellido=="" or $email==""  or $puesto=="" or $empresa=="" or  $telefono=="") {
    $response_array['status'] = 'error';
    $response_array['message'] = 'Debes llenar todos los campos para seguir avanzando';
    echo json_encode($response_array);
}else{
    $query = "SELECT * FROM `registro` WHERE `reg_email` = '$email'";
    $result = mysqli_query($link,$query);
    if ($row = mysqli_fetch_array($result)){ 
        $response_array['status'] = 'error';
        $response_array['message'] = 'El correo ya há sido registrado anteriormente';
        echo json_encode($response_array);  
    }else{
      $idAleatorio=GenerarCodigoGafete(3); 
      $Upquery = "INSERT INTO registro
        (reg_origen
        ,reg_nombre
        ,reg_apellido
        ,reg_email
        ,reg_empresa
        ,reg_puesto
        ,reg_telefono
        ,qrcode
        ,reg_fecha_alta) 
        VALUES
        ('{$reg_origen}'
        ,'{$nombre}'
        ,'{$apellido}'
        ,'{$email}'
        ,'{$empresa}'
        ,'{$puesto}'
        ,'{$telefono}'
        ,'{$idAleatorio}'
        ,'{$today}')"; 
      $queryresult = mysqli_query($link,$Upquery);
      if( $queryresult==1){
        setcookie("USER",$email, time()+31536000,'/');
        setcookie("NOMBRE",$nombre, time()+31536000,'/');
        setcookie("IDUSER",$idAleatorio, time()+31536000,'/');
        $_SESSION['login_usr'] = 1;
        
        $response_array['status'] = 'success';
        $response_array['message'] = 'Tus datos se han mandado correctamente, Gracias.';
        echo json_encode($response_array);
      }else{
        $response_array['status'] = 'error';
        $response_array['message'] = 'Hubo un error al enviar, inténtalo de nuevo mas tarde';
        echo json_encode($response_array);
      }
    }
}

?>
