# MyCards
A private, self-hosted wallet for loyalty cards, IDs and other documents.

# Prerequisites
- Webserver
- PHP 7.x

# Security
## Apache
The supplied .htaccess files protect the keys, cards and photos in the /data folder.
## Nginx
For nginx muss das in der Konfiguration selbst erscheinen. Diese kann bspw. wie folgt aussehen:
```
server {
    listen 443 ssl;
    server_name example.com;
    root /var/www/html;                 # the folder that contains MyCards/

    # Block direct access to the data folder (keys, cards, photos).
    # ^~ makes this win over the PHP location below.
    location ^~ /MyCards/data/ {
        deny all;
        return 404;
    }

    # Photos from the phone can be a few MB
    client_max_body_size 10m;

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;   # your PHP-FPM socket
    }
}
```
## Test the security
1. Open https://example.com/MyCards/data/keys.php in a browser. It must not show anything, only an error such as 404. Try the same with data/c_….json once you have cards.
2. Open the app and let it sync. If it loads your cards, PHP can read the keys and write the data

# SETUP
1. Copy keys.example.php to data/keys.php and put a long random key per person/device into it
   ($WRITE_KEYS = can edit, $READ_KEYS = view only). data/ holds your keys, cards and photos:
   back up only that folder, and when updating the app upload everything except data/.
2. Upload this whole folder to your server (HTTPS required), e.g. https://example.com/MyCards/
   Make sure data/ is writable by PHP (chmod 750/770).
   Apache: data/.htaccess already blocks direct access. Nginx: add  location /wallet/data { deny all; }
3. Open the URL in Chrome on Android -> menu -> "Install app" / "Add to Home screen".
4. First start asks for the access key. Each person enters their own key.
5. Revoke access: delete that key's line in data/keys.php. Their app stops syncing and wipes its local copy the next time it connects.

# A SECOND COPY (E.G. FOR TESTING)
You can run several copies side by side, e.g. https://example.com/MyCards/ and
https://example.com/MyCardsTest/. Upload the app files again into the new folder
(put it next to the first one, not inside it) and give the copy its own data/ folder:
copy keys.example.php to data/keys.php, add a key for it, and keep data/ protected
(Apache: data/.htaccess; nginx: the deny rule above). The app keeps access key, cards
and offline cache separate per folder, so the copies never mix, even in the same
browser. Note: renaming or moving a folder makes the browser treat it as a fresh install.

# CARD ARTWORK
art/*.png are the logos used on the cards. To add one for another store:
1. put art/<id>.png in the folder
2. add an entry to ART in stores.js (c = card colour, w = logo width 0-1)
3. put the id as 5th part of the store line, e.g. "IKEA|ikea.com|CDA||ikea".
