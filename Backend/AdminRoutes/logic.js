let today = new Date(); // original

let startTime = new Date(today.getTime()); // make exact timestamp copy
startTime.setHours(10,0,0,0);

let endTime = new Date(today.getTime());
endTime.setHours(17,0,0,0);

console.log("Today     =>", today.toString())
console.log("StartTime =>", startTime.toString())
console.log("EndTime   =>", endTime.toString())
