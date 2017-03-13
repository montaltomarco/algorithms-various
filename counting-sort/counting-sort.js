/**
 * This function sort an array of numbers (or objects containing a number : the key parameters)
 * using the counting sort algorithm
 * @param array: the array to be sorted
 * @param asc: Boolean. If true, the list is sorted by ascending order. Descending order otherwise
 * @param asc: Boolean. If true, the list is sorted by ascending order. Descending order otherwise
 * @param maxRange: The maximum value in the range
 * @param minRange: The minumum value in the range
 * @param key: A string containing the name of the numerical attribute inside the objects that populate the array
 * (easier : in case the array contains the Object 'Person', defined by a name and an age, the key param will be 'age', to indicate that
 * we want to order the array by 'age')
 * @returns {*}
 */
 function orderUsingCountingSort(array, asc, maxRange, minRange, key) {

   const ARRAY_LENGTH = array.length; // The length of the array

    // If the length is less than 2, then no need to order, we return the array itself
    if(ARRAY_LENGTH < 2) {
        console.log("ATTENTION. The length array is less than 2, no need to order");
        return array;
    }

    const MAX_ELEMENTS = maxRange - minRange; // Constant definined the number of elements in the range maxRange - minRange

    var counterList = new Array(MAX_ELEMENTS),    // The temporary list to perfom the algorithm
        counterCase,                              // A case in the counterList array
        ordoredArray = new Array(ARRAY_LENGTH),   // The sorted array that we will return. Its size is the name as the assay given in param
        arrayElement, elementPosition,            // Useful variables, to avoid repetitions later in the code
        i = 0;

    /**
     * FIRST Step :
     * We store the count of each unique object in the count array
     */
    for(; i < ARRAY_LENGTH ; i++) {
        elementPosition = array[i];

        // If a key has been given in parameter, we take the key at the position array[i] (== elementPosition)
        if (key != undefined) elementPosition = elementPosition[key];
        counterCase = counterList[elementPosition];
        counterList[elementPosition] = counterCase === undefined ? 1 : counterCase + 1;
    }

    console.log("#############After first step, counter array : ");
    console.log(counterList);

    // We initialize the value of the array to 0 to avoid NaN at next step (sum from the first case)
    if(counterList[0] === undefined) counterList[0] = 0;

    /**
     * SECOND Step :
     * We modify the count array so that each element at each index stores the sum of previous counts.
     * At the end of this step, the count array indicates the position of each object in ascending order.
     */
    i = 0;
    for(; i < MAX_ELEMENTS - 1; i++) {
        counterCase = counterList[i];
        var counterCaseNext = counterList[i+1];
        counterList[i+1] = counterCaseNext === undefined ? counterCase : counterCaseNext + counterCase;
    }

    console.log("#############After second step, counter array : ");
    console.log(counterList);

    /**
     * Third and last Step :
     * We populate the sorted array taking the numbers from the count array and decreasing its count by 1
     */
    i = 0;
    for(; i < ARRAY_LENGTH ; i++) {
        arrayElement = array[i];
        if (key != undefined) {
          elementPosition = counterList[arrayElement[key]];
        } else {
          elementPosition = counterList[arrayElement];
        }

        // If asc != true, the index will be the length of the array minus its value in the ascending order
        // Ex. elementPosition = 2, ARRAY_LENGTH = 6. If asc != true, elementPosition -> 6 - 2 = 4
        if (!asc) elementPosition = ARRAY_LENGTH - elementPosition;
        ordoredArray[elementPosition] = arrayElement;
        counterList[arrayElement[key]] -= 1;
    }

    // We log and return the sorted Array
    if(asc) console.log("#############Sorted array, order is asc : ");
    else console.log("#############Sorted array, order is desc : ");
    console.log(ordoredArray);
    return ordoredArray;
}


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
 * window.onload calls the function
 */
window.onload = function() {
    console.log("Executing counting sort algorith on the following array :");
    console.log(people);
    console.log("I will order by age, descending order...");
    orderUsingCountingSort(people, false, 150, 0, 'age');
};
