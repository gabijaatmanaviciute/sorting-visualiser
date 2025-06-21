/*
RADIX SORT:
* Find the maximum number of digits in the largest number in the input array.
* Repeat for each digit position, starting from the least significant digit (rightmost) to the most significant digit (leftmost):
    a. Create 10 buckets (for digits 0 to 9).
    b. Place each number into a bucket based on the current digit at that position.
    c. Reassemble the array by collecting numbers from the buckets in order from 0 to 9.
* Repeat step 2 until all digit positions have been processed.
* Return the sorted array.
*/
