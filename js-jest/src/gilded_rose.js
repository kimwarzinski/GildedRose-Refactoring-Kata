class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
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
      if (item.name !== BRIE && item.name !== PASSES && item.name !== SULFURAS) {
        item.sellIn--;
        const qualityChange = item.sellIn > 0 ? -1 : -2;
        item.quality = Math.max(0, item.quality + qualityChange);
      } else {
        if (item.name !== BRIE && item.name !== PASSES) {
          if (item.quality > 0) {
            if (item.name !== SULFURAS) {
              item.quality = item.quality - 1;
            }
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
            if (item.name === PASSES) {
              if (item.sellIn < 11) {
                if (item.quality < 50) {
                  item.quality = item.quality + 1;
                }
              }
              if (item.sellIn < 6) {
                if (item.quality < 50) {
                  item.quality = item.quality + 1;
                }
              }
            }
          }
        }
        if (item.name !== SULFURAS) {
          item.sellIn = item.sellIn - 1;
        }
        if (item.sellIn < 0) {
          if (item.name !== BRIE) {
            if (item.name !== PASSES) {
              if (item.quality > 0) {
                if (item.name !== SULFURAS) {
                  item.quality = item.quality - 1;
                }
              }
            } else {
              item.quality = item.quality - item.quality;
            }
          } else {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
