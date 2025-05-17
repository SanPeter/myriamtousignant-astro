import { JSDOM } from 'jsdom';
import type { RenderResult } from '@testing-library/svelte';

/**
 * Crée un objet DOM à partir d'une chaîne HTML pour les tests
 */
export async function getDocument(html: string): Promise<Document> {
  const dom = new JSDOM(html);
  return dom.window.document;
}

/**
 * Simule un événement de clic
 */
export function fireEvent(element: Element | null, eventName: string) {
  if (!element) return;
  
  const event = new Event(eventName, {
    bubbles: true,
    cancelable: true,
  });
  
  element.dispatchEvent(event);
}

/**
 * Simule un clic sur un élément
 */
export function click(element: Element | null) {
  fireEvent(element, 'click');
}

/**
 * Attend qu'une condition soit vraie
 */
export function waitFor(callback: () => boolean, timeout = 1000): Promise<void> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const check = () => {
      try {
        if (callback()) {
          resolve();
          return;
        }
      } catch (e) {
        // Continuer à attendre
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'));
        return;
      }
      
      setTimeout(check, 50);
    };
    
    check();
  });
}
