console.log(
    'Этот скрипт заполняет БД некоторыми тестовыми значениями'
  );
  
  const userArgs = process.argv.slice(2);
  
  const Game = require("./models/game");
  const Author = require("./models/author");
  const Genre = require("./models/genre");
  
  const genres = [];
  const authors = [];
  const games = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createGenres();
    await createAuthors();
    await createGames();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  

  async function genreCreate(index, name, description) {
    const genre = new Genre({ name: name, description: description });
    await genre.save();
    genres[index] = genre;
    console.log(`Added genre: ${name}`);
  }
  
  async function authorCreate(index, name) {
    const authordetail = { name: name };
  
    const author = new Author(authordetail);
  
    await author.save();
    authors[index] = author;
    console.log(`Added author: ${name}`);
  }
  
  async function gameCreate(index, name, description, year_of_release, price, genre, author) {
    const gamedetail = {
      name: name, 
      description: description,
      year_of_release: year_of_release, 
      price: price, 
      genre: genre,
      author: author,
    };
  
    const game = new Game(gamedetail);
    await game.save();
    games[index] = game;
    console.log(`Added book: ${name}`);
  }
  

  
  async function createGenres() {
    console.log("Adding genres");
    await Promise.all([
      genreCreate(0, "Ролевые игры", "Игроки управляют персонажами в вымышленном мире," +
       "принимая на себя роли этих персонажей и следуя сюжету, который часто включает выполнение квестов и борьбу с врагами. Развитие персонажа и накопление опыта играют ключевую роль."),
      genreCreate(1, "Шутеры от первого лица", "Игры, в которых игрок видит мир через глаза персонажа и основное внимание уделяется стрельбе и боевым действиям. Обычно требуют быстрых рефлексов и точности."),
      genreCreate(2, "Стратегии в реальном времени", "Игроки управляют армиями и базами, собирают ресурсы и строят структуры в реальном времени. Основное внимание уделяется тактическому планированию и управлению ресурсами."),
    ]);
  }
  
  async function createAuthors() {
    console.log("Adding authors");
    await Promise.all([
      authorCreate(0, "CD Projekt Red"),
      authorCreate(1, "Bethesda Game Studios"),
      authorCreate(2, "Infinity Ward, Treyarch"),
      authorCreate(3, "Valve"),
      authorCreate(4, "Blizzard Entertainment"),
    ]);
  }
  
  async function createGames() {
    console.log("Adding Books");
    await Promise.all([
      gameCreate(0,
        "The Witcher",
        "Игра основана на сериях книг Анджея Сапковского, где игрок управляет ведьмаком Геральтом из Ривии, выполняя квесты и борясь с чудовищами.",
        "2015-05-19",
        "2000",
        authors[0],
        [genres[0]]
      ),
      gameCreate(1,
        "The Elder Scrolls V: Skyrim",
        "Пятая часть серии The Elder Scrolls, открытый мир фэнтези, где игрок может исследовать мир, выполнять квесты и развивать своего персонажа.",
        "2011-11-11",
        "2500",
        authors[1],
        [genres[0]]
      ),
      gameCreate(2,
        "Call of Duty: Modern Warfare",
        "Популярная часть серии военных шутеров, предлагающая как одиночную кампанию, так и многопользовательский режим.",
        "2019-10-25",
        "3000",
        authors[2],
        [genres[1]]
      ),
      gameCreate(3,
        "Counter-Strike ",
        "Тактический командный шутер, в котором террористы и контртеррористы сражаются в различных режимах.",
        "2000-11-09",
        "3000",
        authors[3],
        [genres[1]]
      ),
      gameCreate(4,
        "StarCraft",
        "Космическая стратегия, где три расы борются за господство в галактике.",
        "1998-03-31",
        "2400",
        authors[4],
        [genres[2]]
      )
    ]);
  }
  
