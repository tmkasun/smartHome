class RemoveColumn < ActiveRecord::Migration
  def change

    remove_column(:users, :nic_number)
  end
end
