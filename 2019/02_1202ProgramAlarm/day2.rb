 # 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
# 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
# 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
# 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.

# 1 = +
# 2 = *
# 99 = stop

class Intcode

    def initialize(program)
        @program = File.open(program).readlines[0].split(',').map(&:to_i)
        @programFreeze = @program.dup
        @position = 0
    end

    def process
        while true
            noun = @program[@program[@position +1]]
            verb = @program[@program[@position +2]]
            case @program[@position]
                when 1
                    @program[@program[@position +3]] = noun + verb
                when 2
                    @program[@program[@position +3]] = noun * verb
                else 99
                    break
            end
            @position+=4
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
                    return  (100* noun) + verb
                 end

            end
        end
    end
end

program = Intcode.new("input.txt")
p "part 1: #{program.process()}"
p "part 2: #{program.part2()}"
