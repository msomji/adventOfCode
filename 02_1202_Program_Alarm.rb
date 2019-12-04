arr = [1,1,1,4,99,5,6,0,99]
updatedarrady = []
position = 0
while position < arr.length do
  if (arr[position] == 1) 
    indexOfNumber1= arr[position+1]
    valueOfNumber1 = arr[indexOfNumber1]
    indexOfNumber2= arr[position+2]
    valueOfNumber2 = arr[indexOfNumber2]
    locationOfIndexToPlaceSum = arr[position+3]
    p valueOfNumber1
    p valueOfNumber2
    p arr[locationOfIndexToPlaceSum]
    arr[locationOfIndexToPlaceSum] = valueOfNumber1 + valueOfNumber2
p arr
    position++4

  elsif (arr[position] == 2) 
    indexOfNumber1= arr[position+1]
    valueOfNumber1 = arr[indexOfNumber1]
    indexOfNumber2= arr[position+2]
    valueOfNumber2 = arr[indexOfNumber2]
    locationOfIndexToPlaceSum = arr[position+3]
    arr[locationOfIndexToPlaceSum] = valueOfNumber1 * valueOfNumber2

    position++4
  elsif (arr[position] == 99) 
    break;
  end
break;
end 
p arr