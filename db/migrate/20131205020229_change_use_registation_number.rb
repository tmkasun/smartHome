class ChangeUseRegistationNumber < ActiveRecord::Migration
  def change
    change_column(:users, :nic_number, :string, null: false, default: "")
  end
end
