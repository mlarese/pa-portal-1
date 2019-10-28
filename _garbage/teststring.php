<?php

$d= [
  'name'=>'mauro',
  'surname'=>'larese'
];

$a='

<html>
<body>
  <span style="border:3px"> %NOME% %COGNOME%</span> 
</body>

</html>
';

function evalTemplate($code, $d) {
    $search  = [
        '%NOME%',
        '%COGNOME%',
        '%LOGO%'
    ];
    $replace = [
        '<?=$d["name"]?>',
        '<?=$d["surname"]?>',
        '<?=$d["logo"]?>'
    ];

    $code = str_replace($search, $replace, $code);
    $tmp = tmpfile ();
    $tmpf = stream_get_meta_data ( $tmp );
    $tmpf = $tmpf ['uri'];
    fwrite ( $tmp, $code );
    $ret = include ($tmpf);
    fclose ( $tmp );
    return $ret;
}


echo evalTemplate($a, $d);
