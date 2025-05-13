#!/bin/bash

# Script pour copier les fichiers de contenu du site Hugo vers le site Astro
# Auteur: GitHub Copilot
# Date: 13 mai 2025

# Définition des chemins source et destination
SOURCE_DIR="/Users/ericst-pierre/Source/Projets/myriamtousignant.com/src/content"
DEST_DIR="/Users/ericst-pierre/Source/repos/myriamtousignant-astro/src/content"

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
  echo -e "${2}${1}${NC}"
}

# Vérifier si le dossier source existe
if [ ! -d "$SOURCE_DIR" ]; then
  print_message "Erreur: Le dossier source '$SOURCE_DIR' n'existe pas." "$RED"
  exit 1
fi

# Créer le dossier destination s'il n'existe pas
if [ ! -d "$DEST_DIR" ]; then
  print_message "Création du dossier destination '$DEST_DIR'..." "$BLUE"
  mkdir -p "$DEST_DIR"
  
  if [ $? -ne 0 ]; then
    print_message "Erreur: Impossible de créer le dossier destination." "$RED"
    exit 1
  fi
else
  print_message "Le dossier destination '$DEST_DIR' existe déjà." "$BLUE"
fi

# Compter le nombre de fichiers à copier
MD_FILES_COUNT=$(find "$SOURCE_DIR" -type f -name "*.md" | wc -l)
IMG_DIRS_COUNT=$(find "$SOURCE_DIR" -type d -name "images" | wc -l)
TOTAL_FILES=$(find "$SOURCE_DIR" -type f | wc -l)

print_message "=== Informations ===" "$BLUE"
print_message "Fichiers Markdown à copier: $MD_FILES_COUNT" "$BLUE"
print_message "Dossiers d'images à copier: $IMG_DIRS_COUNT" "$BLUE"
print_message "Nombre total de fichiers: $TOTAL_FILES" "$BLUE"
print_message "===================" "$BLUE"

# Demander confirmation
print_message "Cette opération va copier tous les fichiers du dossier source vers le dossier destination." "$YELLOW"
read -p "Voulez-vous continuer? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  print_message "Opération annulée." "$YELLOW"
  exit 0
fi

# Copier tous les fichiers et dossiers
print_message "Copie des fichiers en cours..." "$BLUE"

# Option -r pour copier récursivement
# Option -p pour préserver les permissions, dates, etc.
# Option -v pour afficher les fichiers copiés
rsync -rpv "$SOURCE_DIR/" "$DEST_DIR/"

if [ $? -ne 0 ]; then
  print_message "Erreur: La copie a échoué." "$RED"
  exit 1
fi

# Vérifier que tous les fichiers ont été copiés
DEST_FILES=$(find "$DEST_DIR" -type f | wc -l)

if [ "$DEST_FILES" -lt "$TOTAL_FILES" ]; then
  print_message "Avertissement: Certains fichiers n'ont peut-être pas été copiés." "$YELLOW"
  print_message "Fichiers source: $TOTAL_FILES, Fichiers destination: $DEST_FILES" "$YELLOW"
else
  print_message "Tous les fichiers ont été copiés avec succès!" "$GREEN"
fi

print_message "===== Résumé =====" "$BLUE"
print_message "Structure du dossier destination:" "$BLUE"
find "$DEST_DIR" -type d -name "images" | sort
print_message "Nombre de fichiers Markdown copiés: $(find "$DEST_DIR" -type f -name "*.md" | wc -l)" "$GREEN"
print_message "Nombre de dossiers d'images copiés: $(find "$DEST_DIR" -type d -name "images" | wc -l)" "$GREEN"
print_message "===================" "$BLUE"

print_message "Opération terminée avec succès!" "$GREEN"
