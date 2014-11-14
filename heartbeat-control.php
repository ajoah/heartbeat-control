<?php
/**
 * Plugin Name: Heartbeat Control
 * Plugin URI: http://jeffmatson.net/heartbeat-killer
 * Description: Completely controls the WordPress heartbeat.
 * Version: 1.0
 * Author: Jeff Matson
 * Author URI: http://jeffmatson.net
 * License: GPL2
 */

$directory            = plugin_dir_path( __FILE__ );

require_once $directory . '/heartbeat-control-menu.php';
require_once $directory . '/heartbeat_control_actions.php';