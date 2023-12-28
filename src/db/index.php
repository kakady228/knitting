<?php
header('Access-Control-Allow-Origin: *');

$action = $_GET['action'];

switch ($action) {
    case 'getSomeLots':
        echo get_some_lots(8);
        break;

    case 'createLotEntry':
        echo create_lot_entry();
        break;

    case 'getCurrentLot':
        echo get_current_lot();
        break;

    case 'regUser':
        echo reg_user();
        break;

    case 'login':
        echo login();
        break;
    
    default:
        echo '404 Not Found';
        break;
}

function create_connection()
{
    $host = 'localhost';
    // $db_name = 'knitting';
    // $user = 'root';
    // $password = '';
    $db_name = 'space12490';
    $user = 'space12490';
    $password = 'Apelsinka69';
    
    $conn = new mysqli($host, $user, $password, $db_name);

    if ($conn->connect_error)
        die("Connection failed: ". $conn->connect_error);

    return $conn;
}

function login()
{
    $login = $_GET['login'];
    $pass = $_GET['pass'];

    $con = create_connection();
    $res = null;
    $txt_query = "SELECT 
        u.id, FirstName, LastName
        ,email, description, login
        ,i.link as image
    FROM users u
    LEFT JOIN images i on i.id = u.image
    WHERE login='$login' and pass='$pass';
    ";

    $rows = mysqli_query($con, $txt_query);
    while ($r = $rows->fetch_assoc()) {
        $result[] = $r;
    }
    $res = json_encode($result[0]);

    $con->close();

    return $res;
}

function reg_user()
{
    $firstName = $_GET['firstName'];
    $lastName = $_GET['lastName'];
    $login = $_GET['login'];
    $email = $_GET['email'];
    $pass = $_GET['pass'];

    $con = create_connection();
    $res = null;
    $txt_query = "INSERT into users set FirstName='$firstName', LastName='$lastName', login='$login', email='$email', pass='$pass';";
    mysqli_query($con, $txt_query);

    $txt_query_login = "SELECT 
        u.id, FirstName, LastName
        ,email, description, login
        ,i.link as image
    FROM users u
    LEFT JOIN images i on i.id = u.image
    WHERE login='$login' and pass='$pass';
    ";
    
    $rows = mysqli_query($con, $txt_query_login);
    while ($r = $rows->fetch_assoc()) {
        $result[] = $r;
    }
    $res = json_encode($result[0]);
    
    $con->close();
}

function get_some_lots($count = 8)
{
    $count_get = $_GET['count'];
    $count_get && $count = $count_get;

    $con = create_connection();
    $result = null;
    $txt_query = "SELECT
        l.id, i.link as link, i2.link as link2, i3.link as link3
        , l.title ,l.type, l.author, l.difficulty
    FROM lot l
    LEFT JOIN images i ON i.id = l.id_Image
    LEFT JOIN images i2 ON i.id = l.id_Image_2
    LEFT JOIN images i3 ON i.id = l.id_Image_3
    LIMIT $count;";

    $rows = mysqli_query($con, $txt_query);
    while ($r = $rows->fetch_assoc()) {
        $result[] = $r;
    }
    $res = json_encode($result);

    $con->close();

    return $res;
}

function get_current_lot()
{
    $con = create_connection();

    $id_Lot = $_GET['id_Lot'];
    if (!$id_Lot)
        return json_encode(array('ok'=>false));

    $result = null;
    $txt_query = "SELECT
        l.id, i.link as link, i2.link as link2, i3.link as link3
        , l.title ,l.type, l.author, l.difficulty
    FROM lot l
    LEFT JOIN images i ON i.id = l.id_Image
    LEFT JOIN images i2 ON i.id = l.id_Image_2
    LEFT JOIN images i3 ON i.id = l.id_Image_3
    WHERE l.id=$id_Lot;";

    $rows = mysqli_query($con, $txt_query);
    while ($r = $rows->fetch_assoc()) {
        $result[] = $r;
    }
    $res = json_encode($result);

    $con->close();

    return $res;
}

function create_lot_entry()
{
    $con = create_connection();

    $image = file_get_contents('C:\Users\playK\Desktop\knitting\src\assets\icons\lot_image.png');
    $image_base64 = base64_encode($image);
    $txt_query = "INSERT INTO lot (image, title, type, author, difficulty) VALUES ('$image_base64', 'test', 'test', 'test', 'test');";

    $dir_path = __DIR__;
    $path_to_save = './images/';
    $filename = 'test_file_name.png';
    $filecontent = $image;
    $file = fopen($path_to_save . $filename, 'w');
    fwrite($file, $filecontent);
    fclose($file);

    $full_path = $dir_path . $path_to_save . $filename;

    // if ($con->query($txt_query) == true)
    //     echo json_encode(array("ok"=>true));
    // else
    //     echo json_encode(array("ok"=>false, "message"=>$conn->error, "txt_query"=>$txt_query));

    $con->close();
}