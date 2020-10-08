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
  it("foo quality does not go negative when degrading twice as fast", function() {
    const gildedRose = new Shop([new Item("foo", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })
  it("foo goes down by 1 when over 50", function() {
    const gildedRose = new Shop([new Item("foo", 10, 60)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(59);
  })
  it("foo does not degrade when negative", function() {
    const gildedRose = new Shop([new Item("foo", 10, -10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(-10);
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
  it("aged brie does not continue to increase once over 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 54)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(54);
  })
  it("sulfuras", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 54)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(54);
  })
});
