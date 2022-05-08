# diwhy-webshop.angular
# Webfejlesztési keretrendszerek kötprog

Ez a kötprog egy webshop, amin vendégként (regisztráció/belépés nélkül) is tudunk rendeléseket leadni, de ha regisztrált felhasználóként szeretnénk rendelni, akkor az oldal megjegyzi a regisztrációnál megadott rendelési adatainkat.

Az odalhoz tartozik egy **admin** jogosultságú felhasználó (ez firestore-ben egy isAdmin mezővel van megvalósítva), amelynek az alábbiak a belépési adatai:
 - **email**: admin@gmail.com
 - **pass**: admin123

## **Kérlek, a weboldal megtekintését kezdd azzal, hogy belépsz ebbe az admin felhasznalóba!**

(ha ezt nem teszed meg, akkor a cart oldal hibát fog dobni a localstorage miatt, valamiért az admin-nal való bejelentkezés ezt megoldja)

**Host**: https://diwhy-webshop.web.app
