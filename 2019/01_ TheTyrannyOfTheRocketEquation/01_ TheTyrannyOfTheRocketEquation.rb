 class MassCalculator
  def initialize path
    file = File.open(path)
    @masses = file.readlines.map(&:chomp).map(&:to_i)
  end

  def part1
    @masses.reduce(0) { |sum, mass|
      sum + calculate_fuel_needed_to_carry_mass(mass)
    }
  end

  def part2 
    @masses.reduce(0) { |sum, mass| 
      fuel = calculate_fuel_needed_to_carry_mass(mass)
       sum + fuel + calculate_fuel_needed_to_carry_fuel(fuel)
     }
  end

  private 

  def calculate_fuel_needed_to_carry_mass module_mass 
    (module_mass / 3).floor - 2 
  end
  
  def calculate_fuel_needed_to_carry_fuel fuel_mass
  additional_fuel_needed = calculate_fuel_needed_to_carry_mass(fuel_mass)
  additional_fuel_needed >= 0 ? (additional_fuel_needed  + calculate_fuel_needed_to_carry_fuel(additional_fuel_needed)) : 0
  end
  
 end

 calculator = MassCalculator.new("input.txt")

 p "part 1: #{calculator.part1}"
 p "part 2: #{calculator.part2}"