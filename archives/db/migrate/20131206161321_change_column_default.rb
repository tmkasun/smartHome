class ChangeColumnDefault < ActiveRecord::Migration
  def change

    change_column_default :users, :nic_number, default: ""
  end
end
