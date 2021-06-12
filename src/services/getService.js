class GotService {
    constructor() {
        this._API = 'https://anapioficeandfire.com/api';
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    isSet(data) {
        if (data) {
            return data
        } 
        return 'unknown'
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
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture),
            id: this._extractId(char)
        };
    }

    _transformHouse = (house) => {
        return {
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapons: this.isSet(house.ancestralWeapons),
            id: this._extractId(house)
        };
    }

    _transformBook = (book) => {
        return {
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released),
            id: this._extractId(book)
        };
    }
        

}

export default GotService;