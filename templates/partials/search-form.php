<?php
// set input value after submit
$input_value = '';

if (is_search()):
    $input_value = urlencode( get_query_var( 's' ) );
endif; ?>

<div class="na-search-form-navbar js-search-form-navbar order-md-12" data-value="<?= $input_value ?>"></div>
