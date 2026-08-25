import re, os

CANON_SELECT = '''<select class="lang-dropdown" onchange="switchLang(this.value)" aria-label="Sélectionner la langue">
  <option value="en">🌐 EN</option><option value="zh">🌐 中文</option><option value="es">🌐 ES</option><option value="ar">🌐 AR</option><option value="pt">🌐 PT</option><option value="fr" selected>🌐 FR</option><option value="ru">🌐 RU</option>
</select>'''

REPL = [
    ('Línea de Détergent en Bouteilles', 'Ligne de Détergent en Bouteilles'),
    ('Línea de Détergent en Sachets', 'Ligne de Détergent en Sachets'),
    ('Línea de Détergent en Fûts', 'Ligne de Détergent en Fûts'),
    ('Línea de Détergent de Recharge', 'Ligne de Détergent de Recharge'),
    ('Línea de Détergent en Poches à Col', 'Ligne de Détergent en Poches à Bec'),
    ('Línea en Botellas', 'Ligne en Bouteilles'),
    ('Línea en Bolsas', 'Ligne en Sachets'),
    ('Línea en Bidones', 'Ligne en Fûts-Bidons'),
    ('Línea de Recarga', 'Ligne de Recharge'),
    ('Línea avec Boquilla', 'Ligne en Poches à Bec'),
    ('Projets Mondeaux', 'Projets Mondiaux'),
    ('À Propos de Nous', 'À propos de nous'),
    ('Enlaces de Interés', 'Liens Utiles'),
    ('Seleccionar idioma', 'Sélectionner la langue'),
]

def fix_hreflang(text):
    pat = re.compile(r'<link rel="alternate" hreflang="([a-z]{2}|x-default)" href="([^"]+)"\s*>')
    found = pat.findall(text)
    if not found:
        return text
    d = {}
    for lang, url in found:
        if lang == 'fr':
            if 'fr' not in d or ('/fr/' not in d.get('fr','') and '/fr/' in url):
                d['fr'] = url
            continue
        if lang not in d:
            d[lang] = url
    fr_url = d.get('fr')
    if not fr_url:
        return text
    base = fr_url.replace('/fr/', '/')
    def mk(lang):
        if lang in ('en','x-default'):
            return base
        return fr_url.replace('/fr/', '/%s/' % lang)
    order = ['en','zh','es','ar','pt','fr','ru','x-default']
    newblock = '\n'.join('  <link rel="alternate" hreflang="%s" href="%s">' % (l, mk(l)) for l in order)
    lines = text.split('\n')
    out = []
    i = 0
    n = len(lines)
    while i < n:
        if pat.match(lines[i].strip()):
            i += 1
            while i < n and pat.match(lines[i].strip()):
                i += 1
            out.append(newblock)
        else:
            out.append(lines[i])
            i += 1
    return '\n'.join(out)

def fix_dropdown(text):
    sel_pat = re.compile(r'<select class="lang-dropdown"[^>]*>.*?</select>', re.DOTALL)
    return sel_pat.sub(CANON_SELECT, text)

cnt = 0
for root, dirs, files in os.walk('.'):
    for name in files:
        if not name.endswith('.html'):
            continue
        f = os.path.join(root, name)
        with open(f, 'r', encoding='utf-8') as fh:
            t = fh.read()
        orig = t
        t = fix_dropdown(t)
        t = fix_hreflang(t)
        for a, b in REPL:
            t = t.replace(a, b)
        if t != orig:
            with open(f, 'w', encoding='utf-8') as fh:
                fh.write(t)
            cnt += 1
            print('FIXED', f)
print('TOTAL FIXED:', cnt)
