#     It is a six-digit number.
#     The value is within the range given in your puzzle input. // 356261..846303
#     Two adjacent digits are the same (like 22 in 122345).
#     Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
#     Other than the range rule, the following are true:
    
#     111111 meets these criteria (double 11, never decreases).
#     223450 does not meet these criteria (decreasing pair of digits 50).
#     123789 does not meet these criteria (no double).

class Day3
    
    def initialize range
        p (range).to_a
            .map {|n| n.to_s.split("")}
            .select { |a| has_adjecent_digits(a)}
            .select { |a| numbers_always_increase_or_equal(a)}.length
    end


    def has_adjecent_digits array_of_string_numbers 
        array_of_string_numbers.select.with_index { |num, index| 
            array_of_string_numbers[index + 1 ] == num  && 
            array_of_string_numbers[index - 1 ] != num  &&
            array_of_string_numbers[index + 2 ] != num  
        }
            .length >0
    end
    
    def numbers_always_increase_or_equal array_of_string_numbers
        @largest_num = 0
        array_of_string_numbers.select.with_index do |num, index| 
            @result = false
            if (num.to_i >= @largest_num)
                @largest_num = num.to_i
                @result = true
            end
             @result
        end.length == array_of_string_numbers.length
    end

end    

Day3.new(356261..846303)
