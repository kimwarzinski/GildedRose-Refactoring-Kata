class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class UpdatableItem extends Item {
  update() {
    this.sellIn--;
    const qualityChange = this.getQualityChange();
    this.quality = Math.min(50, Math.max(0, this.quality + qualityChange));
  }
  getQualityChange() {
    return this.sellIn > 0 ? -1 : -2;
  }
}

class UpdatableBrieItem extends UpdatableItem {
  getQualityChange() {
    return this.sellIn > 0 ? 1 : 2;
  }
}

class UpdatablePassesItem extends UpdatableItem {
  getQualityChange() {
    if (this.sellIn < 1) {
      return -this.quality;
    } else if (this.sellIn < 5) {
      return 3;
    } else if (this.sellIn < 10) {
      return 2;
    }
    return 1;
  }
}

class UpdatableSulfurasItem extends UpdatableItem {
  update() {
  }
}

class UpdatableConjuredItem extends UpdatableItem {
  getQualityChange() {
    return super.getQualityChange() * 2;
  }
}

const BRIE = 'Aged Brie';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const CONJURED = 'Conjured';

function updatableItemFactory(item) {
  switch (item.name) {
    case BRIE:
      return new UpdatableBrieItem(item.name, item.sellIn, item.quality);
    case PASSES:
      return new UpdatablePassesItem(item.name, item.sellIn, item.quality);
    case SULFURAS:
      return new UpdatableSulfurasItem(item.name, item.sellIn, item.quality);
    case CONJURED:
      return new UpdatableConjuredItem(item.name, item.sellIn, item.quality);
    default:
      return new UpdatableItem(item.name, item.sellIn, item.quality);
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    return this.items.map(item => {
      const updatableItem = updatableItemFactory(item);
      updatableItem.update();
      return updatableItem;
    });
  }
}

module.exports = {
  Item,
  Shop
}
