# 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
# 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
# 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
# 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.

# 1 = +
# 2 = *
# 99 = stop

INPUT = [1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,9,19,23,1,6,23,27,1,10,27,31,1,5,31,35,2,6,35,39,1,5,39,43,1,5,43,47,2,47,6,51,1,51,5,55,1,13,55,59,2,9,59,63,1,5,63,67,2,67,9,71,1,5,71,75,2,10,75,79,1,6,79,83,1,13,83,87,1,10,87,91,1,91,5,95,2,95,10,99,2,9,99,103,1,103,6,107,1,107,10,111,2,111,10,115,1,115,6,119,2,119,9,123,1,123,6,127,2,127,10,131,1,131,6,135,2,6,135,139,1,139,5,143,1,9,143,147,1,13,147,151,1,2,151,155,1,10,155,0,99,2,14,0,0]
class Intcode

    def initialize(program)
        @programFreeze = program.dup
        @program = program
        @position = 0
    end

    def process
        isTrue = true
        while isTrue do 
            if @program[@position].length == 4
                




                @position+=4
            elsif @program[@position] == 1
                noun = @program[@program[@position +1]]
                verb = @program[@program[@position +2]]
                @program[@program[@position +3]] = noun + verb
                @position+=4
            elsif @program[@position] == 2
                noun = @program[@program[@position +1]]
                verb = @program[@program[@position +2]]
                @program[@program[@position +3]] = noun * verb
                @position+=4
            elsif @program[@position] == 3
                p 'got 3, enter your input '
                input = gets.chomp
                positionToSaveTo = @program[@position + 1]
                @program[positionToSaveTo] = input
                @position+=2
            elsif @program[@position] == 4
                p 'got 4, enter your input '
                input = gets.chomp
                return input
            elsif @program[@position] == 99
                isTrue = false
            else
                isTrue = false
            end
        end
        @program[0]
    end

    def part2
        for noun in 0..99 do
            for verb in 0..99 do
                @position = 0
                @program = @programFreeze.dup
                @program[1] = noun
                @program[2] = verb
                 if process() == 19690720
                     p (100* noun) + verb
                 end

            end
        end
    end
end

program = Intcode.new([3,0,4,0,99])
p program.process()
#  program.part2()