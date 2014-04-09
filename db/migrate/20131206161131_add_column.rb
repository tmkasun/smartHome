class AddColumn < ActiveRecord::Migration
  def change

    add_column(:users, :nic_number, :string)
  end
end
