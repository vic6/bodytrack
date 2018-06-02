class CreateSnapshots < ActiveRecord::Migration[5.1]
  def change
    create_table :snapshots do |t|
      t.string :picture
      t.integer :weight
      t.integer :neck_size
      t.integer :chest_size
      t.integer :waist_size
      t.integer :hip_size
      t.text :note
      t.belongs_to :user

      t.timestamps
    end
  end
end
