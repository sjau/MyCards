// Artwork (logos in art/*.png): c = card colour, w = logo width in the card header, lo = low resolution
const ART={"coop": {"c": "#205ca2", "w": 0.869, "lo": 0}, "ikea": {"c": "#0157ac", "w": 0.731, "lo": 0}, "kaufland": {"c": "#d80100", "w": 0.291, "lo": 0}, "lidl": {"c": "#1053a4", "w": 0.291, "lo": 0}, "migros": {"c": "#15408f", "w": 0.873, "lo": 0}, "miles": {"c": "#0a174e", "w": 0.871, "lo": 0}, "rega": {"c": "#ffffff", "w": 0.655, "lo": 0}, "tcs": {"c": "#fce600", "w": 0.269, "lo": 0}, "topcc": {"c": "#9c3682", "w": 0.748, "lo": 0}, "manor": {"c": "#d81f25", "w": 0.45, "lo": 1}, "ochsner": {"c": "#000000", "w": 0.45, "lo": 1}, "aligro": {"c": "#e01e26", "w": 0.45, "lo": 1}};
const POPULAR=['coop','migros','ikea','manor','ochsner','lidl','aligro','rega'];
// Store catalog: "Name|website|countries|#colour (optional)|artwork id (optional, file art/<id>.png)|barcode type (optional, default for manual entry)|category (optional: loyalty, member, id, docs, other — default loyalty)" (C = Switzerland, D = Germany, A = Austria). Edit freely.
const STORES=[
"Rega|rega.ch|C||rega","Touring Club Schweiz|tcs.ch|C||tcs||member","TopCC|topcc.ch|C||topcc","Aligro|aligro.ch|C||aligro",
"Migros|migros.ch|C||migros|EAN13","Coop|coop.ch|C||coop|EAN13","Denner|denner.ch|C","Aldi Suisse|aldi-suisse.ch|C","Lidl|lidl.ch|CDA||lidl",
"Manor|manor.ch|C||manor","Volg|volg.ch|C","Spar Schweiz|spar.ch|C","Landi|landi.ch|C","Avec|avec.ch|C","Kiosk (k kiosk)|kkiosk.ch|C",
"Interdiscount|interdiscount.ch|C","Melectronics|melectronics.ch|C","Galaxus / Digitec|galaxus.ch|C","Fust|fust.ch|C","Brack|brack.ch|C","MediaMarkt Schweiz|mediamarkt.ch|C",
"Jumbo|jumbo.ch|C","Hornbach Schweiz|hornbach.ch|C","Do it + Garden|doitgarden.ch|C","Lipo|lipo.ch|C","Conforama Schweiz|conforama.ch|C","Pfister|pfister.ch|C","Micasa|micasa.ch|C",
"Migrol|migrol.ch|C","Shell Schweiz|shell.ch|C","Avia|avia.ch|C","Orell Füssli|orellfuessli.ch|C","Ex Libris|exlibris.ch|C",
"Dosenbach|dosenbach.ch|C","Ochsner Sport|ochsnersport.ch|C||ochsner","SportXX|sportxx.ch|C","Decathlon Schweiz|decathlon.ch|C",
"Import Parfumerie|import-parfumerie.ch|C","Douglas Schweiz|douglas.ch|C","Sephora Schweiz|sephora.ch|C","Amavita|amavita.ch|C","Sun Store|sunstore.ch|C",
"Globus|globus.ch|C","PKZ|pkz.ch|C","Jelmoli|jelmoli.ch|C","Fressnapf Schweiz|fressnapf.ch|C","Mobility|mobility.ch|C","SBB|sbb.ch|C",
"Rewe|rewe.de|D","Edeka|edeka.de|D","Marktkauf|marktkauf.de|D","Aldi Nord|aldi-nord.de|D","Aldi Süd|aldi-sued.de|D","Kaufland|kaufland.de|CD||kaufland",
"Penny|penny.de|D","Netto Marken-Discount|netto-online.de|D","Netto (Nord)|netto.de|D","Norma|norma-online.de|D","tegut|tegut.com|D","V-Markt|v-markt.de|D","Globus (Deutschland)|globus.de|D",
"Alnatura|alnatura.de|D","denn's Biomarkt|denns-biomarkt.de|D","Rossmann|rossmann.de|D","dm-drogerie markt|dm.de|D","Müller|mueller.de|D","Budni|budni.de|D",
"Douglas|douglas.de|D","Sephora|sephora.de|D","Flaconi|flaconi.de|D","Payback|payback.de|D","DeutschlandCard|deutschlandcard.de|D",
"MediaMarkt|mediamarkt.de|D","Saturn|saturn.de|D","Obi|obi.de|D","Bauhaus|bauhaus.info|D","Toom|toom.de|D","Hagebau|hagebau.de|D","Hornbach|hornbach.de|D",
"Roller|roller.de|D","XXXLutz|xxxlutz.de|D","Poco|poco.de|D","Decathlon|decathlon.de|D","Intersport|intersport.de|D",
"Thalia|thalia.de|D","Hugendubel|hugendubel.de|D","Tchibo|tchibo.de|D","Galeria|galeria.de|D","Breuninger|breuninger.com|D","Peek & Cloppenburg|peek-cloppenburg.de|D",
"Ernsting's family|ernstings-family.de|D","Takko|takko.com|D","KiK|kik.de|D","Bonprix|bonprix.de|D","Action|action.com|D","Tedi|tedi.com|D","Woolworth|woolworth.de|D","Depot|depot-online.com|D",
"Fressnapf|fressnapf.de|D","Zooplus|zooplus.de|D","Aral|aral.de|D","Shell|shell.de|D","Esso|esso.de|D","JET|jet-tankstellen.de|D",
"Deutsche Bahn (BahnCard)|bahn.de|D","Cinemaxx|cinemaxx.de|D","McFit|mcfit.com|D","FitX|fitx.de|D",
"Billa / Billa Plus|billa.at|A","Jö Bonus Club|joe-club.at|A","Spar Österreich|spar.at|A","Interspar|interspar.at|A","Hofer|hofer.at|A",
"Penny Österreich|penny.at|A","MPreis|mpreis.at|A","Merkur|merkur.at|A","Unimarkt|unimarkt.at|A","Adeg|adeg.at|A",
"Bipa|bipa.at|A","dm Österreich|dm.at|A","Müller Österreich|mueller.at|A","Douglas Österreich|douglas.at|A","Libro|libro.at|A","Pagro|pagro.at|A","Thalia Österreich|thalia.at|A",
"Hervis|hervis.at|A","Intersport Österreich|intersport.at|A","Decathlon Österreich|decathlon.at|A","MediaMarkt Österreich|mediamarkt.at|A","Hartlauer|hartlauer.at|A",
"Obi Österreich|obi.at|A","Bauhaus Österreich|bauhaus.at|A","Hornbach Österreich|hornbach.at|A","Lagerhaus|lagerhaus.at|A","Leiner|leiner.at|A","XXXLutz Österreich|xxxlutz.at|A","Möbelix|moebelix.at|A",
"Kastner & Öhler|kastner-oehler.at|A","Palmers|palmers.at|A","Tchibo Österreich|tchibo.at|A","Fressnapf Österreich|fressnapf.at|A",
"ÖBB Vorteilscard|oebb.at|A","OMV VIVA|omv.at|A","BP Österreich|bp.com|A","Cineplexx|cineplexx.at|A",
"IKEA|ikea.com|CDA||ikea","H&M|hm.com|CDA","Starbucks|starbucks.com|CDA","McDonald's|mcdonalds.com|CDA","Miles & More|miles-and-more.com|CDA||miles"
].map(x=>{const[n,d,c,col,art,fmt,ct]=x.split('|');return{n,d,c,col:col||'',art:art||'',fmt:fmt||'',cat:ct||'loyalty'}});
