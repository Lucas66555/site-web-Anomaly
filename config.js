// ============================================================
//  CONFIGURATION DU SITE — le seul fichier à modifier à chaque version
// ============================================================
window.ANOMALY_CONFIG = {
  // Numéro de version affiché sur le site
  version: "1.0.0",

  // Lien DIRECT vers l'installateur Windows (.exe).
  // Exemple GitHub Releases :
  //   https://github.com/TON-PSEUDO/anomaly/releases/download/v1.0.0/Anomaly-Setup-1.0.0.exe
  // Tant que ce champ est vide, le bouton affiche « Bientôt disponible ».
  downloadUrl: "",

  // Empreinte SHA-256 du fichier (facultatif mais recommandé : elle permet aux
  // visiteurs de vérifier que le fichier n'a pas été modifié).
  // Calcul sous Windows :  certutil -hashfile "Anomaly-Setup-1.0.0.exe" SHA256
  sha256: "",

  // Informations facultatives affichées sous le bouton
  taille: "",       // ex. "85 Mo"
  dateSortie: ""    // ex. "15 novembre 2026"
};
