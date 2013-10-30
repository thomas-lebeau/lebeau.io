<?php

class Form {

  //$form = $_POST
  public $form = '';

  // $response['status'] = 'ok' | 'error_validation' | 'error_critical'
  public $response  = array('status' => '', 'errors' => '');

  //validation rules
  private $validate = array(
    'name' => array(
      'rule' => 'notEmpty',
      'message' => 'Please, tell me who you are.'
    ),
    'email' => array(
      'rule' => 'email',
      'message' => 'This doesn\'t looks like an email address.'
    ),
    'message' => array(
      'rule' => 'notEmpty',
      'message' => 'Oops, looks like you forgot to write something.'
    )
  );

  public function __construct($form) {
    $this->form = $form;
  }

  public function validate(){
    foreach ($this->validate as $k => $v) {
      if(!isset($this->form[$k])){
        $this->response['errors'][$k] = $v['message'];
      }else{
        if($v['rule'] === 'notEmpty'){
          if(empty($this->form[$k]))
            $this->response['errors'][$k] = $v['message'];
        }
        if($v['rule'] === 'email'){
          if(!filter_var($this->form[$k], FILTER_VALIDATE_EMAIL))
            $this->response['errors'][$k] = $v['message'];
        }
        if($v['rule'] === 'numeric'){
          if(!is_numeric($this->form[$k]))
            $this->response['errors'][$k] = $v['message'];
        }
      }
    }
    if (empty($this->response['errors'])) {
      return true;
    }else{
      $this->response['status'] = 'error_validation';
      return false;
    }
  }

}// END Class Form

if(isset($_POST['name'])){
  $form = new Form($_POST);
  if ($form->validate()){

    ini_set("include_path", ".:".$_SERVER['DOCUMENT_ROOT']."/php/");
    require("class.phpmailer.php");

    $mail = new PHPMailer();

    $mail->IsSMTP();                                 // telling the class to use SMTP
    $mail->SMTPAuth   = true;                        // enable SMTP authentication
    $mail->SMTPSecure = "tls";                       // set secutity protocol for GMAIL server
    $mail->Host       = "mail.gandi.net";            // sets the SMTP server
    $mail->Port       = 587;                         // set the SMTP port for the GMAIL server
    $mail->Username   = "no-reply@lebeau.io";        // SMTP account username
    $mail->Password   = "edGzjTsAckiYS2ZOno";        // SMTP account password
    $mail->CharSet    = "UTF-8";

    $mail->SetFrom($form->form['email'], $form->form['name']);
    $mail->AddReplyTo($form->form['email'], $form->form['name']);
    $mail->AddAddress("lebeau.thomas@gmail.com");    // To:@

    $mail->IsHTML(true);
    $mail->Subject    = "[lebeau.io] New email from contact form";
    $body             = 'Sender   : '.$form->form['name'].'<br>';
    $body            .= 'Email    : '.$form->form['email'].'<br><br>';
    $body            .= $form->form['message'];
    $mail->Body       = $body;
    $mail->WordWrap   = 50;

    if(!$mail->Send()) {
       $form->response['status']= 'error_critical';
       $form->response['errors'] = $mail->ErrorInfo;
    }else{
      $form->response['status'] = 'ok';
    }
  }
  print json_encode($form->response);
}
?>
