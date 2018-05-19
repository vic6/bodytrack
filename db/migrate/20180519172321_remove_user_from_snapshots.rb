class RemoveUserFromSnapshots < ActiveRecord::Migration[5.1]
  def change
    remove_reference :snapshots, :user
  end
end
