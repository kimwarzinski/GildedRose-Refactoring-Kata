const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
  it("foo degrades normally", function() {
    const gildedRose = new Shop([new Item("foo", 10, 9)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(8);
  });
  it("foo degrades normally after sell in has passed", function() {
    const gildedRose = new Shop([new Item("foo", -1, 9)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(7);
  })
  it("foo degrades normally when sell in is negative", function() {
    const gildedRose = new Shop([new Item("foo", 0, 9)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(7);
  })
  it("foo quality does not go negative", function() {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })
  it("foo quality does not go below 0 even if given 0", function() {
    const gildedRose = new Shop([new Item("foo", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })
  it("foo goes down by 1 when over 50", function() {
    const gildedRose = new Shop([new Item("foo", 10, 60)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(59);
  })
  it("foo does goes to 0 when negative", function() {
    const gildedRose = new Shop([new Item("foo", 10, -10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })
  it("aged brie increases", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  })
  it("aged brie increases twice as fast after sell in", function() {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  })
  it("aged brie does not go past 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })
  it("aged brie does not go past 50 past sell in", function() {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })
  it("aged brie does not go over 50, even if given a number over 50 to start", function() {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 54)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })
  it("sulfuras does not change from 80", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  })
  it("sulfuras does not change", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 54)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(54);
  })
  it("backstage pass increases when there are over 10 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(41);
  })
  it("backstage pass increases by 2 when there are 10 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(42);
  })
  it("backstage pass increases by 2 when there are 9 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(42);
  })
  it("backstage pass increases by 2 when there are 6 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(42);
  })
  it("backstage pass increases by 3 when there are 5 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(43);
  })
  it("backstage pass increases by 3 when there are 4 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(43);
  })
  it("backstage pass drops to 0 when no days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })
  it("backstage pass drops to 0 when the date has passed", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -2, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })
  it("backstage pass does not go above 50", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })
  it("backstage pass does not go above 50", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })
  it.skip("conjured degrades twice as fast", function() {
    const gildedRose = new Shop([new Item("Conjured", 5, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(47);
  })
});
