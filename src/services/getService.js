class GotService {
    constructor() {
        this._API = 'https://anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._API}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} due to ${res.status}`);
        }

        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');

        return res.map(this._transformCharacter)
    }

    async getSpecificCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);

        for (const [key, value] of Object.entries(character)) {
            if (value.length === 0) {
                character[key] = 'unknown';
            }
        }

        return this._transformCharacter(character);
    }

    getHouses() {
        return this.getResource('/houses?page=5&pageSize=10');
    }

    getSpecificHouse(id) {
        return this.getResource(`/houses/${id}`);
    }

    getBooks() {
        return this.getResource('/books?page=5&pageSize=10');
    }

    getSpecificBook(id) {
        return this.getResource(`/books/${id}`);
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        };
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        };
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        };
    }
        

}

export default GotService;