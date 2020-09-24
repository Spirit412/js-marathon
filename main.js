const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';


function getRow(first, second, char) {

    function countChar(word, char) {
        let result = 0;
        for (let i = 0; i < word.length; i++) {
            if (word.charAt(i) === char) {
                result++
            }
        }
        return result;
    }

    console.log(countChar(first, char) > countChar(second, char) ? firstRow.toString() : secondRow.toString());
}

// Вывод строки с максимальным количеством букв указанных в условии.
getRow(firstRow, secondRow, 'а');

