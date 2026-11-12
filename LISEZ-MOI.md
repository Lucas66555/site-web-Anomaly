# Site de téléchargement d'Anomaly — guide de mise en ligne

Site statique (HTML/CSS/JS, aucune installation nécessaire). Tout le dossier se publie tel quel sur Netlify.

## Important : où mettre l'installateur

L'installateur Windows pèse typiquement plusieurs dizaines de Mo. La documentation de Netlify recommande des déploiements de moins de 50 Mo et signale que les fichiers de plus de 10 Mo peuvent bloquer un déploiement par glisser-déposer.
**N'ajoute donc pas le .exe dans ce dossier.** Héberge-le ailleurs (GitHub Releases, gratuit, convient bien) et mets son lien dans `config.js`.

Le fichier `.exe` doit d'abord être créé sur ton PC Windows avec `creer-installateur.bat` : je ne peux pas le fabriquer à ta place.

## Étapes

1. **Crée l'installateur** : double-clique sur `creer-installateur.bat` dans le projet du navigateur. Le fichier apparaît dans le dossier `dist`.
   *Astuce :* le nom par défaut contient des espaces (`Anomaly Setup 1.0.0.exe`). Renomme-le `Anomaly-Setup-1.0.0.exe` avant de l'envoyer, pour éviter les liens cassés.

2. **Envoie-le sur GitHub Releases** : crée un dépôt GitHub, puis *Releases → Draft a new release*, glisse le .exe dans la zone « Attach binaries », donne un tag (`v1.0.0`) et clique *Publish release*. Clic droit sur le fichier publié → copier l'adresse du lien.

3. **Colle le lien dans `config.js`** (champ `downloadUrl`). Tant qu'il est vide, le site affiche « Bientôt disponible » au lieu d'un bouton cassé.

4. **(Recommandé) Ajoute l'empreinte SHA-256.** Dans un terminal Windows, dans le dossier du fichier :
   `certutil -hashfile Anomaly-Setup-1.0.0.exe SHA256`
   Colle la ligne obtenue dans `sha256`. Une section « Vérifier ton fichier » apparaît alors sur le site.

5. **Complète `mentions.html`** : remplace les passages entre crochets par tes informations d'éditeur.

6. **Publie sur Netlify** : va sur https://app.netlify.com/drop et glisse ce dossier (dézippé). Pour les mises à jour suivantes, modifie `config.js` puis redépose le dossier complet.

## À chaque nouvelle version

Modifie dans `config.js` : `version`, `downloadUrl`, `sha256`, éventuellement `taille` et `dateSortie`. Rien d'autre.

## Avertissement Windows SmartScreen

L'installateur n'étant pas signé numériquement, Windows affichera « Windows a protégé votre ordinateur » à l'installation. Le site l'explique aux visiteurs. Seul un certificat de signature de code (payant) supprime cet avertissement.

## Nom de fichier propre (facultatif)

Dans le `package.json` du navigateur, tu peux imposer un nom sans espaces à l'installateur :

```json
"nsis": {
  "artifactName": "Anomaly-Setup-${version}.exe"
}
```

(à ajouter dans la section `build.nsis` existante).

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Page principale : présentation, installation, FAQ |
| `mentions.html` | Mentions légales et licences (à compléter) |
| `404.html` | Page d'erreur |
| `config.js` | **Le seul fichier à modifier à chaque version** |
| `style.css`, `script.js` | Mise en forme et comportement |
| `logo.svg`, `favicon.svg` | Logo |
| `netlify.toml` | En-têtes de sécurité (CSP, etc.) |
| `robots.txt` | Autorise l'indexation |
