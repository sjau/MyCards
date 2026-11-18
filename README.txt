SETUP
1. Copy keys.example.php to data/keys.php and put a long random key per person/device into it
   ($WRITE_KEYS = can edit, $READ_KEYS = view only). data/ holds your keys, cards and photos:
   back up only that folder, and when updating the app upload everything except data/.
2. Upload this whole folder to your server (HTTPS required), e.g. https://example.com/wallet/
   Needs PHP 7+. Make sure data/ is writable by PHP (chmod 750/770).
   Apache: data/.htaccess already blocks direct access. Nginx: add  location /wallet/data { deny all; }
3. Open the URL in Chrome on Android -> menu -> "Install app" / "Add to Home screen".
4. First start asks for the access key. Each person enters their own key.
5. Revoke access: delete that key's line in data/keys.php. Their app stops syncing and wipes its local copy the next time it connects.

CARD ARTWORK
art/*.png are the logos used on the cards (cut from your Stocard screenshots). To add one for another store:
put art/<id>.png in the folder, add an entry to ART in stores.js (c = card colour, w = logo width 0-1) and put
the id as 5th part of the store line, e.g. "Manor|manor.ch|C||manor".
