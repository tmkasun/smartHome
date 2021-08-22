class ChangeColumAttrs < ActiveRecord::Migration
  def change
    change_column(:users, :nic_number, :string)
  end
end
