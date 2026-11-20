<?php
// Access keys live in data/keys.php (see keys.example.php), so they are backed up with the data folder
// and never overwritten by an update. (An old keys.php next to this file is still accepted.)
$kf = is_file(__DIR__ . '/data/keys.php') ? __DIR__ . '/data/keys.php' : __DIR__ . '/keys.php';
if (!is_file($kf)) { http_response_code(500); exit('data/keys.php missing: copy keys.example.php to data/keys.php and edit it'); }
require $kf;   // defines $WRITE_KEYS and $READ_KEYS
$t = $_SERVER['HTTP_X_TOKEN'] ?? ($_GET['t'] ?? '');
$role = null;
if ($t !== '') {
  foreach ($WRITE_KEYS as $k) if (hash_equals((string)$k, $t)) $role = 'write';
  if (!$role) foreach ($READ_KEYS as $k) if (hash_equals((string)$k, $t)) $role = 'read';
}
if (!$role) { http_response_code(401); exit('unauthorized'); }
header('X-Role: ' . $role);
header('Cache-Control: no-store');
$D = __DIR__ . '/data/';
@mkdir($D . 'img', 0750, true);
function sid($s) { return preg_replace('/[^a-zA-Z0-9_]/', '', (string)$s); }
$a = $_GET['a'] ?? '';
if ($a === 'list') {
  $o = [];
  foreach (glob($D . 'c_*.json') as $f) $o[] = json_decode(file_get_contents($f));
  header('Content-Type: application/json'); echo json_encode($o);
} elseif ($a === 'me') { echo json_encode(['role'=>$role]);
} elseif ($a === 'put') {
  if ($role !== 'write') { http_response_code(403); exit('read-only'); }
  $c = json_decode(file_get_contents('php://input'), true);
  if (!$c || empty($c['id'])) { http_response_code(400); exit; }
  $f = $D . 'c_' . sid($c['id']) . '.json';
  if (is_file($f)) { $old = json_decode(file_get_contents($f), true); if (($old['u'] ?? 0) > ($c['u'] ?? 0)) { echo '{"skipped":1}'; exit; } }
  if(@file_put_contents($f, json_encode($c), LOCK_EX)===false){http_response_code(500);exit('could not write: is data/ writable by PHP?');}
  echo '{"ok":1}';
} elseif ($a === 'up') {
  if ($role !== 'write') { http_response_code(403); exit('read-only'); }
  $b = file_get_contents('php://input');
  if (strlen($b) < 100 || strlen($b) > 8000000) { http_response_code(413); exit; }
  if(@file_put_contents($D . 'img/' . sid($_GET['n'] ?? '') . '.jpg', $b)===false){http_response_code(500);exit('could not write: is data/ writable by PHP?');}
  echo '{"ok":1}';
} elseif ($a === 'img') {
  $f = $D . 'img/' . sid($_GET['n'] ?? '') . '.jpg';
  if (!is_file($f)) { http_response_code(404); exit; }
  header('Content-Type: ' . (file_get_contents($f, false, null, 0, 4) === "\x89PNG" ? 'image/png' : 'image/jpeg')); header('Cache-Control: private, max-age=31536000'); readfile($f);
} elseif ($a === 'logo') {   // fetches a website's icon (via Google's favicon service) for use as a card icon
  if ($role !== 'write') { http_response_code(403); exit('read-only'); }
  $d = strtolower(trim($_GET['d'] ?? ''));
  $d = preg_replace('#^https?://#', '', $d); $d = preg_replace('#/.*$#', '', $d); $d = preg_replace('#^www\.#', '', $d);
  if (!preg_match('/^[a-z0-9.-]+\.[a-z]{2,}$/', $d)) { http_response_code(400); exit; }
  $u = 'https://www.google.com/s2/favicons?sz=128&domain=' . $d; $b = null;
  if (function_exists('curl_init')) { $ch = curl_init($u); curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER=>1, CURLOPT_TIMEOUT=>8, CURLOPT_FOLLOWLOCATION=>1]); $b = curl_exec($ch); curl_close($ch); }
  if (!$b && ini_get('allow_url_fopen')) $b = @file_get_contents($u, false, stream_context_create(['http'=>['timeout'=>8]]));
  if (!$b || strlen($b) < 100) { http_response_code(404); exit; }
  header('Content-Type: image/png'); echo $b;
} else { http_response_code(400); }
