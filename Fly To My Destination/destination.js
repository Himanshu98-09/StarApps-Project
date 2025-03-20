function minPlanesToReachEnd(fuelArr) {
    let n = fuelArr.length; // Get the total number of airports
    
    let planes = 0; // Counter for the number of planes hired
    let maxReach = 0; // The farthest airport we can reach
    let currentEnd = 0; // The current boundary within which we can travel
    let i = 0; // Pointer to traverse the array
    
    if (n === 1) return 0; // If there's only one airport, no planes are needed

    while (i < n) {
        planes++; // Hire a new plane
        let farthest = maxReach; // Track the farthest reachable airport in this step
        
        while (i <= currentEnd) { // Traverse all airports within the current reach
            farthest = Math.max(farthest, i + fuelArr[i]); // Update the farthest reachable airport
            i++; // Move to the next airport
            if (farthest >= n - 1) return planes; // If we can reach the last airport, return planes count
        }
        
        if (farthest == currentEnd) return -1; // If no progress is made, return -1 (not possible to reach)
        
        currentEnd = farthest; // Update the boundary for the next step
    }
    
    return -1; // If we exit the loop, it means we can't reach the last airport
}

// Test cases
console.log(minPlanesToReachEnd([2,1,2,3,1])); // Output: 2
console.log(minPlanesToReachEnd([1,6,3,4,5,0,0,0,6])); // Output: 3
console.log(minPlanesToReachEnd([1,0,0,0])); // Output: -1


/*
Algorithm Explanation:
1. **Initialize Variables**:
   - `n`: Length of the fuel array.
   - `planes`: Counter for the number of planes hired.
   - `maxReach`: The farthest airport we can reach at any point.
   - `currentEnd`: The current boundary within which we can travel before needing a new plane.
   - `i`: Pointer to traverse the array.

2. **Edge Case Handling**:
   - If `n` is 1, return 0 as we're already at the last airport.

3. **Traversal Using a Greedy Approach**:
   - Start from the first airport and hire a plane.
   - See how far this plane can take you (`farthest`).
   - Iterate through all airports you can currently reach (`currentEnd`) and find the farthest you can go.
   - If you can reach the last airport, return the number of planes used.
   - If you get stuck (can't move further), return -1
   - Otherwise, move to the farthest airport found and repeat the process.

4. **Return `-1` if no solution is found**.
*/
