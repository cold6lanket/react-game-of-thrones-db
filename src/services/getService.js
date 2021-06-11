class GotService {
    constructor() {
        this._API = 'https://anapioficeandfire.com/api';
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    getResource = async (url) => {
        const res = await fetch(`${this._API}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} due to ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');

        return res.map(this._transformCharacter)
    }

    getSpecificCharacter  = async (id) => {
        const character = await this.getResource(`/characters/${id}`);

        character.id = id;

        for (const [key, value] of Object.entries(character)) {
            if (value.length === 0) {
                character[key] = 'unknown';
            }
        }

        return this._transformCharacter(character);
    }

    

    getHouses = async () => {
        const houses = await this.getResource('/houses?page=5&pageSize=10');
        return houses.map(house => this._transformHouse(house));
    }

    getSpecificHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    getBooks = async () => {
        const books = await this.getResource('/books');
        return books.map(book => this._transformBook(book));
    }

    getSpecificBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            id: this._extractId(char)
        };
    }

    _transformHouse = (house) => {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
            id: this._extractId(house)
        };
    }

    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
            id: this._extractId(book)
        };
    }
        

}

export default GotService;