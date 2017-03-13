// Please refer to counting-sort.js for explainations about the algorithm

/**
 * Test data
 * @type {*[]}
 */
var people = [
    {
        name: "Marco",
        age: 25
    },
    {
        name: "Girolamo",
        age: 30
    },
    {
        name: "Helizabeth",
        age: 30
    },
    {
        name: "San Francesco",
        age: 15
    },
    {
        name: "Messi",
        age: 50
    },
    {
        name: "Another",
        age: 70
    }
];

/**
 * Given an array a people Objects, defined by their name and age,
 * This function returns an sorted array by their age.
 * @param peopleList: list of people to order
 * @param asc: Boolean. If true, the list is sorted by ascending order. Descending order otherwise.
 * @returns {*}
 */
function orderPeopleByAge(peopleList, asc) {

    if(peopleList.length < 2) {
        return peopleList;
    }

    // I suppose ages are between 0 and 150
    const MAX_AGE = 150;
    const PEOPLE_SIZE = peopleList.length;

    var counterList = new Array(MAX_AGE),
        counterCase,
        ordoredArray = new Array(PEOPLE_SIZE),
        person, personPosition,
        i = 0;

    for(; i < peopleList.length ; i++) {
        person = peopleList[i];
        counterCase = counterList[person.age];
        counterList[person.age] = counterCase === undefined ? 1 : counterCase + 1;
    }

    if(counterList[0] === undefined) counterList[0] = 0;

    i = 0;
    for(; i < counterList.length - 1; i++) {
        counterCase = counterList[i];
        var counterCaseNext = counterList[i+1];
        counterList[i+1] = counterCaseNext === undefined ? counterCase : counterCaseNext + counterCase;
    }

    i = 0;
    for(; i < peopleList.length ; i++) {
        person = peopleList[i];
        personPosition = counterList[person.age];
        if (!asc) personPosition = PEOPLE_SIZE - personPosition;
        ordoredArray[personPosition] = person;
        counterList[person.age] -= 1;
    }

    console.log(ordoredArray);
    return ordoredArray;
}

window.onload = function() {

    // false : desc / true : asc
    orderPeopleByAge(people, false);
};
