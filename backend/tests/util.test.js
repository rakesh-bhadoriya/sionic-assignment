const expect = require("expect");
const util = require("../helper/util");

describe("Test Suite", () => {
    it('should return undefined if array as undefined passed', () => {
        var data = undefined;
        var result = util.sort(data);
        expect(result).toEqual(data);
        
    });

    it('should return same array if array as empty passed', () => {
        var data = [];
        var result = util.sort(data);
        expect(result).toEqual(data);
    });

    it('should return sorted array on username if valid array passed', () => {
        var data = [
            {
              "id": 1,
              "username": "James",
              "email": "James@123.com",
              "password": "1!23#4",
              "role": "EMPLOYEE"
            },
            {
              "id": 2,
              "username": "Peter",
              "email": "Peter @123.com",
              "password": "8^23!3",
              "role": "EMPLOYEE"
            },
            {
              "id": 3,
              "username": "John",
              "email": "John @123.com",
              "password": "98!891",
              "role": "ADMIN"
            },
            {
              "id": 4,
              "username": "Fred",
              "email": "Fred @123.com",
              "password": 68651,
              "role": "ADMIN"
            }
          ];
        var result = util.sort(JSON.parse(JSON.stringify(data)));
        expect(result[0].username).toMatch(data[3].username);
        expect(result[1].username).toMatch(data[0].username);
        expect(result[2].username).toMatch(data[2].username);
        expect(result[3].username).toMatch(data[1].username);
    });
})
