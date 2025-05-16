/**
 * Utilitaire pour gérer les chemins d'images dans les collections de contenu Astro
 */

/**
 * Fonction pour construire le chemin de l'image relative à un contenu
 * @param collectionName Nom de la collection (projets, expositions, etc.)
 * @param entryId ID de l'entrée dans la collection
 * @param imagePath Chemin relatif de l'image dans le dossier du projet
 * @returns Chemin d'accès complet à l'image
 */
export function getContentImagePath(collectionName: string, entryId: string, imagePath?: string): string | undefined {
  if (!imagePath) return undefined;
  
  // Si le chemin commence par / ou http, on le retourne tel quel
  if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
    return imagePath;
  }

  // Extraire le nom de dossier du projet
  const projectDir = entryId.includes('/') 
    ? entryId.split('/')[0] 
    : entryId.replace(/\.md$/, '');
  
  // Retourner le chemin pour l'importation dynamique
  return `../content/${collectionName}/${projectDir}/${imagePath}`;
}

/**
 * Fonction pour récupérer dynamiquement les images d'un projet
 * @param collectionName Nom de la collection (projets, expositions, etc.)
 * @param entryId ID de l'entrée dans la collection
 * @param imagePaths Liste de chemins d'images
 * @returns Tableau de données d'images optimisées
 */
export async function loadContentImages(collectionName: string, entryId: string, imagePaths: string[]): Promise<any[]> {
  const images = [];
  
  for (const path of imagePaths) {
    try {
      const imagePath = getContentImagePath(collectionName, entryId, path);
      if (imagePath) {
        // Cette technique sera remplacée par une approche plus élégante quand nous aurons
        // plus d'informations sur la structure exacte des fichiers
        const imageImport = await import(imagePath);
        images.push(imageImport.default);
      }
    } catch (error) {
      console.error(`Erreur lors du chargement de l'image ${path}:`, error);
    }
  }
  
  return images;
}
