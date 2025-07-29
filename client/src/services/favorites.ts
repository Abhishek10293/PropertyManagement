// Favorites service for managing favorite properties
export class FavoritesService {
  private static STORAGE_KEY = "property-favorites"

  static getFavorites(): string[] {
    try {
      const favorites = localStorage.getItem(this.STORAGE_KEY)
      return favorites ? JSON.parse(favorites) : []
    } catch {
      return []
    }
  }

  static addToFavorites(propertyId: string): void {
    const favorites = this.getFavorites()
    if (!favorites.includes(propertyId)) {
      favorites.push(propertyId)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites))
    }
  }

  static removeFromFavorites(propertyId: string): void {
    const favorites = this.getFavorites()
    const updated = favorites.filter((id) => id !== propertyId)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated))
  }

  static isFavorite(propertyId: string): boolean {
    return this.getFavorites().includes(propertyId)
  }

  static clearFavorites(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }

  // Remove deleted properties from favorites
  static syncWithExistingProperties(existingPropertyIds: string[]): void {
    const favorites = this.getFavorites()
    const validFavorites = favorites.filter((id) => existingPropertyIds.includes(id))
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(validFavorites))
  }
}
