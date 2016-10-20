<?php

/*
*****************************************
             INCLUDE SCRIPS
*****************************************
*/
function jomgulp_script_enqueue() {
    wp_enqueue_style( 'customstyle', get_template_directory_uri() . '/assets/css/theme.css', array(), '1.0.0', 'all' );
}

add_action( 'wp_enqueue_scripts', 'jomgulp_script_enqueue' );