/*
 * Module description: memoization structrue
 */
const memoizer = (memo, formula) => {
    const recur = function(n) {
        let result = memo[n];
        if (typeof result !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    }
    return recur;
}

/*
*    const fibonacci = memoizer([0, 1], (recur, n) => {
*        return recur(n - 1) + recur(n - 2);
*    });
*    const fib = fibonacci(18);
*    console.log(fib);
*
*    const factorial = memoizer([1, 1], (recur, n) => {
*        return n * recur(n - 1);
*    });
*    const fator = factorial(18);
*    console.log(fator);
*/

module.exports = exports = memoizer;