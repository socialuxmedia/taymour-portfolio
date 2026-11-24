# Taymour Chalak — portfolio

Refonte du portfolio Flask original : identité noir charbon, blanc et orange cuivré, couvertures Instagram locales, sélection interactive façon timeline, galerie de reels, services, présentation et contact.

## Voir le site en local sans installation

Dans le ZIP fourni, ouvrir **dist/index.html** dans un navigateur. Cette version contient déjà les styles, polices et couvertures. Une connexion Internet est nécessaire uniquement pour ouvrir les reels Instagram.

## Développer en local

Python 3.10 ou supérieur.

```sh
python -m pip install -r requirements.txt
python app.py
```

Ouvrir **http://127.0.0.1:5000**. Le mode debug est désactivé par défaut.

En production, le `Procfile` existant reste compatible :

```sh
gunicorn app:app
```

## Modifier les projets

Les projets et les services sont définis dans **content.json**. Pour chaque projet :

- `id` : identifiant du reel, présent dans son URL ;
- `title` : nom affiché ;
- `url` : lien Instagram original ;
- `cover` : chemin du fichier local, relatif à `static/` ;
- `alt` : description courte de la couverture.

Placer les nouvelles couvertures dans **static/images/**. Les couvertures livrées proviennent des reels sélectionnés, récupérées le 24 novembre 2026. Le premier projet présente le reel « Life in 2040 » de @taymourchalak. Elles sont stockées localement : aucun scraping, jeton, URL de CDN temporaire ou connexion Instagram n’est nécessaire pour les afficher. La photo de profil vient du profil public fourni.

La galerie ouvre le lecteur intégré Instagram uniquement après un clic. Instagram peut imposer une connexion ou empêcher l’intégration selon le visiteur, les cookies, la confidentialité du reel ou ses paramètres d’intégration. Le lien **Open on Instagram** reste toujours disponible. Sans JavaScript, les cartes ouvrent directement leurs liens originaux.

Les intitulés « Project 01 / 02 / 03 » sont ceux du portfolio fourni. Remplacez-les dans `content.json` par ses vrais noms de projets si souhaité.

## Version statique

```sh
python scripts/export_static.py
```

Cette commande génère **dist/** à partir du même template Flask et copie les ressources locales. Les chemins sont relatifs pour fonctionner aussi sous un sous-dossier GitHub Pages. Après une modification, relancer l’export. Le dossier `dist` du ZIP livré est déjà généré ; il n'est pas versionné dans Git.

Pour tester avec un serveur HTTP :

```sh
python -m http.server 8000 --directory dist
```

Ouvrir **http://localhost:8000**.

## Publication sur GitHub Pages

Le workflow **.github/workflows/pages.yml** génère et publie le site à chaque push sur `main`. Dans **Settings → Pages → Build and deployment**, la source doit être **GitHub Actions**.

Pour mettre à jour le portfolio, modifier les fichiers source, puis committer et pousser sur `main`. Le résultat de la publication apparaît dans l'onglet **Actions** du dépôt. Ne pas modifier directement `dist/` : le workflow le régénère depuis `content.json`, le template et `static/`.

GitHub Pages sert la version statique : aucun serveur Python, secret ou jeton Instagram n'est nécessaire en production. L'application Flask est conservée pour le développement local et pour un éventuel hébergement Python.

## Structure

- `app.py` : application et route Flask d’origine.
- `content.json` : source unique du contenu.
- `templates/index.html` : page avec HTML sémantique.
- `static/style.css` : styles et adaptation mobile.
- `static/app.js` : interactions, lecteur et animations.
- `static/images/` : véritables couvertures des reels et photo de profil.
- `static/fonts/` : polices locales Barlow Condensed et DM Sans, licences SIL OFL incluses.
- `scripts/export_static.py` : génération du site statique.
- `.github/workflows/pages.yml` : publication automatique sur GitHub Pages.

Le site respecte la réduction des animations définie dans le système. Le bouton « Pause motion » arrête le curseur animé. Le lecteur utilise un dialogue natif, la touche Échap ferme la fenêtre et le focus revient au projet sélectionné. Aucun formulaire fictif ni statistique inventée.
