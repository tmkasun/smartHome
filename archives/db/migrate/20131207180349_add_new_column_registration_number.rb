class AddNewColumnRegistrationNumber < ActiveRecord::Migration
  def change
    add_column :users, :nic_number, :string ,default: ""

  end
end
