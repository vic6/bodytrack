class AddBodyFatToSnapshots < ActiveRecord::Migration[5.1]
  def change
    add_column :snapshots, :body_fat, :float
  end
end
