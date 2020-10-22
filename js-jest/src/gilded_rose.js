class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class UpdatableItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }
}

const BRIE = 'Aged Brie';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const CONJURED = 'Conjured';

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let item of this.items) {
      if (item.name === BRIE) {
        item.sellIn--;
        const qualityChange = item.sellIn > 0 ? 1 : 2;
        item.quality = Math.min(50, item.quality + qualityChange);
      } else if (item.name === PASSES) {
        item.sellIn--;
        let qualityChange = 1;
        if (item.sellIn < 1) {
          qualityChange = -item.quality;
        } else if (item.sellIn < 5) {
          qualityChange = 3;
        } else if (item.sellIn < 10) {
          qualityChange = 2;
        }
        item.quality = Math.min(50, item.quality + qualityChange);
      } else if(item.name !== SULFURAS) {
        item.sellIn--;
        const qualityChange = item.sellIn > 0 ? -1 : -2;
        item.quality = Math.max(0, item.quality + qualityChange);
      }
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
