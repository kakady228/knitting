<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

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

    case 'test':
        echo test();
        break;

    case 'saveUser':
        echo save_user();
        break;
    
    default:
        echo '404 Not Found';
        break;
}

function save_user()
{
    $con = create_connection();

    $post = json_decode(file_get_contents('php://input'));
    $img = create_file($post->img_name, $post->image);
    $description = $post->description;
    $id = $post->id;

    $txt_query_1 = "INSERT into images set type='lot', link='$img', name='{$post->img_name}', size='123';";

    $id_image = null;
    mysqli_query($con, $txt_query_1);
    $rows = mysqli_query($con, 'SELECT @@IDENTITY as id;');
    while ($r = $rows->fetch_assoc()) {
        $id_image = $r['id'];
    }

    $set = "";
    if ($img != '' && $img != null)
        $set .= "image='{$id_image}',";
    if ($description != '' && $description != null)
        $set .= "description='{$description}';";

    $set = substr_replace($set,'',-1);

    $txt_query = "UPDATE users SET ". $set ." WHERE id=$id";
    $res = mysqli_query($con, $txt_query);
    echo json_encode($txt_query );

    return json_encode((object)array("ok"=>true));

    $con->close();
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
        l.id, i.link as link, i2.link as link2, i3.link as link3, i4.link as link4
        , l.title ,l.type, l.author, l.difficulty
        , l.uo, l.material, l.description
    FROM lot l
    LEFT JOIN images i ON i.id = l.id_Image
    LEFT JOIN images i2 ON i2.id = l.id_Image_2
    LEFT JOIN images i3 ON i3.id = l.id_Image_3
    LEFT JOIN images i4 ON i4.id = l.id_Image_4
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
    {
        $con->close();
        return json_encode(array('ok'=>false));
    }

    $result = null;
    $txt_query = "SELECT
        l.id, i.link as link, i2.link as link2, i3.link as link3, i4.link as link4
        , l.title ,l.type, l.author, l.difficulty
        , l.uo, l.material, l.description
    FROM lot l
    LEFT JOIN images i ON i.id = l.id_Image
    LEFT JOIN images i2 ON i2.id = l.id_Image_2
    LEFT JOIN images i3 ON i3.id = l.id_Image_3
    LEFT JOIN images i4 ON i4.id = l.id_Image_4
    WHERE l.id=$id_Lot;";

    $rows = mysqli_query($con, $txt_query);
    while ($r = $rows->fetch_assoc()) {
        $result[] = $r;
    }
    $res = json_encode($result);

    $con->close();

    return $res;
}

function create_file($filename, $filecontent)
{
    $filecontent = base64_decode(preg_replace('#^data:image/\S+;base64,#i', '', $filecontent));
    $dir_path = __DIR__;
    $path_to_save = './images/';
    $file = fopen($path_to_save . $filename, 'w');
    fwrite($file, $filecontent);
    fclose($file);
    
    $full_path = 'http://space12490.temp.swtest.ru/api/images/'.$filename;

    return $full_path;
}

function create_lot_entry()
{

    $con = create_connection();

    $post = json_decode(file_get_contents('php://input'));

    if (!$post->image1)
    {
        $con->close();
        return null;
    }

    $img1 = create_file($post->img1_name, $post->image1);
    $img2 = create_file($post->img2_name, $post->image2);
    $img3 = create_file($post->img3_name, $post->image3);
    $img4 = create_file($post->img4_name, $post->image4);

    $txt_query_1 = "INSERT into images set type='lot', link='$img1', name='{$post->img1_name}', size='123';";
    $txt_query_2 = "INSERT into images set type='lot', link='$img2', name='{$post->img2_name}', size='123';";
    $txt_query_3 = "INSERT into images set type='lot', link='$img3', name='{$post->img3_name}', size='123';";
    $txt_query_4 = "INSERT into images set type='lot', link='$img4', name='{$post->img4_name}', size='123';";

    $result = null;
    mysqli_query($con, $txt_query_1);
    $rows = mysqli_query($con, 'SELECT @@IDENTITY as id;');
    while ($r = $rows->fetch_assoc()) {
        $result[] = $r['id'];
    }
    mysqli_query($con, $txt_query_2);
    $rows2 = mysqli_query($con, 'SELECT @@IDENTITY as id;');
    while ($r = $rows2->fetch_assoc()) {
        $result[] = $r['id'];
    }
    mysqli_query($con, $txt_query_3);
    $rows3 = mysqli_query($con, 'SELECT @@IDENTITY as id;');
    while ($r = $rows3->fetch_assoc()) {
        $result[] = $r['id'];
    }
    mysqli_query($con, $txt_query_4);
    $rows4 = mysqli_query($con, 'SELECT @@IDENTITY as id;');
    while ($r = $rows4->fetch_assoc()) {
        $result[] = $r['id'];
    }


    $txt_lot = "INSERT into lot set id_Image=".$result[0].",id_Image_2=".$result[1].",id_Image_3=".$result[2].",id_Image_4=".$result[3].",author='test', title='Название изделия', type='{$post->type}', difficulty='{$post->difficulty}', uo='{$post->uo}', material='{$post->material}', description='{$post->description}';";
    mysqli_query($con, $txt_lot);

    return json_encode((object)array("ok"=>true));

    $con->close();
}


