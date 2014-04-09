class RenameRegistrationNumberToDefault < ActiveRecord::Migration
  def change
    rename_column(:users, :nic_number, :email)
  end
end
