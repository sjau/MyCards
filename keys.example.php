<?php
// Copy this file to data/keys.php and edit it. The data/ folder is protected by data/.htaccess,
// is the only thing you need to back up, and is never touched when you update the app.
// One line per person/device:  'name' => 'long random key'
// Generate a key:  openssl rand -hex 24    (or any long random string)
// To revoke someone: delete their line. To change their rights: move the line to the other list.
$WRITE_KEYS = [            // can view, add, edit and delete
  'me'   => 'CHANGE-ME-write-key-1',
  'wife' => 'CHANGE-ME-write-key-2',
];
$READ_KEYS = [             // can only view
  'spare-phone' => 'CHANGE-ME-read-key-1',
];
