class AddUnitsOfMeasurementToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :units_of_measurement, :string
  end
end
