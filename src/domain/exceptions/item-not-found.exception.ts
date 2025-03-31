export class ItemNotFoundException extends Error {
  constructor(itemId: string) {
    super(`Item con id ${itemId} no fue encontrado`);
  }
}
