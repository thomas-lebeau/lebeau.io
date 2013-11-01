<?php

$branch = "gh_pages";               // which branch to pull
$wd = ".";                          // working directory

ignore_user_abort(true);
function syscall ($cmd, $cwd) {
  $descriptorspec = array(1 => array('pipe', 'w'));
  $resource = proc_open($cmd, $descriptorspec, $pipes, $cwd);
  if (is_resource($resource)) {
    $output = stream_get_contents($pipes[1]);
    fclose($pipes[1]);
    proc_close($resource);
    return $output;
  }
}

try{
  if( $HTTP_RAW_POST_DATA ){
    if( $oData = json_decode( $HTTP_RAW_POST_DATA ) ){
      if( ( $branch = array_pop( preg_split("/[\/]+/", $oData->ref) ) ) != $branch ){
           $result = syscall("git pull", "$wd");
           return 1;
      } else {
        throw new Exception("branch variable is not set or !== to '$branch'");
      }
    } else {
      throw new Exception("An error was encountered while attempting to json_decode the HTTP_RAW_POST_DATA str");
    }
  } else {
    throw new Exception("HTTP_RAW_POST_DATA is not set or 'ref' is not a valid array element");
  }
} catch (Exception $e) {
    error_log(sprintf("%s", $e));
}
?>
