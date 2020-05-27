<?php
// set input value after submit
$input_value = '';

if (isset($_GET['s'])):
    $input_value = $_GET['s'];
endif; ?>

<form role="search" method="get" action="/" class="js-search-form na-search-form form-inline my-2 my-lg-0" autocomplete="off">
    <input class="js-search-input form-control mr-sm-2" type="search" name="s" placeholder="Search" aria-label="Search" value="<?= $input_value ?>">
    <button class="btn btn-outline-success my-2 my-sm-0 js-search-button" type="submit">Search</button>
    <div class="js-search-results na-search-results hidden"></div>
</form>
