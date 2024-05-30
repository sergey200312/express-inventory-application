console.log(
    'Этот скрипт заполняет БД некоторыми тестовыми значениями'
  );
  
  const userArgs = process.argv.slice(2);

  const Item = require("./models/item");
  const Category = require("./models/category");
  
  const items = [];
  const categories = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await console.log(categories);
    await createItems();
    await console.log(items);
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  

  async function createCategory(index, name) {
    const category = new Category({ name: name});
    await category.save();
    categories[index] = category;
    console.log(`Added genre: ${name}`);
  }
  
 
  
  async function itemCreate(index, name, description, price, weight, inStock, category) {
    const itemdetail = {
      name: name, 
      description: description,
      price: price, 
      weight: weight,
      inStock: inStock,
      genre: category,
    };
  
    const item = new Item(itemdetail);
    await item.save();
    items[index] = item;
    console.log(`Added book: ${name}`);
  }
  

  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      createCategory(0, "Смартфоны"),
      createCategory(1, "Ноутбуки"),
      createCategory(2, "Телевизоры"),
      createCategory(3, "Камеры"),
    ]);
  }
  
  
  async function createItems() {
    console.log("Adding categories");
    await Promise.all([
      itemCreate(0,
        "iPhone 13 Pro",
        "Последняя модель iPhone с 6.1-дюймовым дисплеем Super Retina XDR, тройной камерой с ночным режимом и процессором A15 Bionic.",
        "999",
        "204",
        "true",
        categories[0],
      ),
      itemCreate(1,
        "Samsung Galaxy S21",
        "Флагманский смартфон от Samsung с 6.2-дюймовым дисплеем Dynamic AMOLED 2X, тройной камерой и процессором Exynos 2100.",
        "799",
        "169",
        "true",
        categories[0]
      ),
      itemCreate(2,
        "Xiaomi Mi 11",
        "Высокопроизводительный смартфон с 6.81-дюймовым дисплеем AMOLED, тройной камерой и процессором Snapdragon 888.",
        "749",
        "196",
        "false",
        categories[0]
      ),
      itemCreate(3,
        "MacBook Air",
        "Тонкий и легкий ноутбук от Apple с 13.3-дюймовым Retina дисплеем, процессором Apple M1 и длительным временем автономной работы.",
        "999",
        "1290",
        "true",
        categories[1]
      ),
      itemCreate(4,
        "Lenovo ThinkPad X1 Carbon",
        "Надежный и производительный ноутбук с 14-дюймовым дисплеем, процессором Intel Core i7 и длительным временем автономной работы.",
        "1499",
        "1090",
        "false",
        categories[1]
      ),
      itemCreate(5,
        "Dell XPS 13",
        "Компактный и мощный ноутбук с 13.4-дюймовым дисплеем InfinityEdge, процессором Intel Core i7 и SSD на 512 ГБ.",
        "1190",
        "1200",
        "true",
        categories[1]
      ),
      itemCreate(6,
        "Samsung QLED 4K",
        "55-дюймовый 4K телевизор с технологией QLED, поддержкой HDR и интеллектуальной платформой Samsung Smart TV.",
        "899",
        "17200",
        "true",
        categories[2]
      ),
      itemCreate(7,
        "LG OLED CX",
        "55-дюймовый 4K OLED телевизор с невероятной контрастностью, поддержкой Dolby Vision и платформой LG webOS.",
        "1499",
        "18900",
        "false",
        categories[2]
      ),
      itemCreate(8,
        "Canon EOS R5",
        " Полнокадровая беззеркальная камера с 45-мегапиксельным сенсором, возможностью записи видео в 8K и системой автофокуса Dual Pixel.",
        "3899",
        "738",
        "true",
        categories[3]
      ),
      itemCreate(9,
        "Sony Alpha a7 III",
        "Полнокадровая беззеркальная камера с 24-мегапиксельным сенсором, возможностью записи видео в 4K и системой автофокуса Fast Hybrid.",
        "1999",
        "650",
        "false",
        categories[3]
      )
    ]);
  }
  
