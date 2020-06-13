<?php
// set input value after submit
$input_value = '';

if (isset($_GET['s'])):
    $input_value = $_GET['s'];
endif; ?>

<div class="js-search-form-navbar" data-value="<?= $input_value ?>"></div>
